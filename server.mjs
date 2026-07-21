import '@angular/compiler';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './dist/wedding-chapel/server/main.server.mjs';

function setStaticCacheHeaders(res, filePath) {
  if (filePath.endsWith('.html')) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return;
  }

  if (/\-[A-Z0-9]{8,}\.(?:css|js)$/i.test(filePath)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return;
  }

  if (/\.(?:avif|gif|ico|jpe?g|png|svg|webp|woff2?)$/i.test(filePath)) {
    res.setHeader('Cache-Control', 'public, max-age=2592000');
    return;
  }

  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
}

function trailingSlashRedirect(pathOnly) {
  if (!pathOnly || pathOnly === '/' || pathOnly.endsWith('/')) {
    return null;
  }
  if (
    pathOnly !== '/es' &&
    !/^\/(es\/)?(services|servicios|elopement-miami|contact|contacto|blog)(\/|$)/.test(
      pathOnly,
    )
  ) {
    return null;
  }
  if (/\.[a-z0-9]+$/i.test(pathOnly.split('/').pop() ?? '')) {
    return null;
  }
  return `${pathOnly}/`;
}

export function app() {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, 'dist/wedding-chapel/browser');
  const indexHtml = join(serverDistFolder, 'dist/wedding-chapel/server/index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use((req, res, next) => {
    const pathOnly = req.path || '';
    if (
      pathOnly === '/admin' ||
      pathOnly.startsWith('/admin/') ||
      pathOnly === '/private' ||
      pathOnly.startsWith('/private/')
    ) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }

    const slashTarget = trailingSlashRedirect(pathOnly);
    if (slashTarget) {
      const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      res.redirect(301, slashTarget + query);
      return;
    }

    next();
  });

  server.use('/api', (_req, res) => {
    res.status(404).send('Not Found');
  });

  server.use(
    express.static(browserDistFolder, {
      maxAge: 0,
      index: 'index.html',
      setHeaders: setStaticCacheHeaders,
    }),
  );

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        allowedHosts: ['localhost', '127.0.0.1', 'wedding-nginx']
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

const port = process.env['PORT'] || 4000;
app().listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Node Express server listening on http://localhost:${port}`);
});
