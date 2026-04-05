import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

function preferredLocale(acceptLanguage: string | undefined): 'en' | 'es' {
  if (!acceptLanguage?.trim()) {
    return 'en';
  }
  const first =
    acceptLanguage.split(',')[0]?.trim().split(';')[0]?.trim().toLowerCase() ?? '';
  return first.startsWith('es') ? 'es' : 'en';
}

/** Canonical public URLs use trailing slashes (e.g. /en/, /es/servicios/). */
function trailingSlashRedirect(pathOnly: string): string | null {
  if (!pathOnly || pathOnly === '/' || pathOnly.endsWith('/')) {
    return null;
  }
  if (!/^\/(en|es)(\/|$)/.test(pathOnly)) {
    return null;
  }
  if (/\.[a-z0-9]+$/i.test(pathOnly.split('/').pop() ?? '')) {
    return null;
  }
  return `${pathOnly}/`;
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
    if (pathOnly === '/' || pathOnly === '') {
      const target = `/${preferredLocale(req.headers['accept-language'])}/`;
      res.redirect(302, target);
      return;
    }
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
    maxAge: '1y',
    index: 'index.html',
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
