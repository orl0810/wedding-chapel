import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

/** Canonical public URLs use trailing slashes (e.g. /services/, /es/servicios/). */
function trailingSlashRedirect(pathOnly: string): string | null {
  if (!pathOnly || pathOnly === '/' || pathOnly.endsWith('/')) {
    return null;
  }
  if (
    pathOnly !== '/es' &&
    !/^\/(es\/)?(services|servicios|elopement-miami|contact|contacto|blog)(\/|$)/.test(pathOnly)
  ) {
    return null;
  }
  if (/\.[a-z0-9]+$/i.test(pathOnly.split('/').pop() ?? '')) {
    return null;
  }
  return `${pathOnly}/`;
}

function setStaticCacheHeaders(res: express.Response, filePath: string): void {
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

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use((req, res, next) => {
    const p = req.path || '';
    if (
      p === '/admin' ||
      p.startsWith('/admin/') ||
      p === '/private' ||
      p.startsWith('/private/')
    ) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }
    next();
  });

  server.use((req, res, next) => {
    const pathOnly = req.path || '';
    const slashTarget = trailingSlashRedirect(pathOnly);
    if (slashTarget) {
      const q = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      res.redirect(301, slashTarget + q);
      return;
    }
    next();
  });

  server.use('/api', (_req, res) => {
    res.status(404).send('Not Found');
  });

  // Serve static files from /browser
  server.use(express.static(browserDistFolder, {
    maxAge: 0,
    index: 'index.html',
    setHeaders: setStaticCacheHeaders,
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
