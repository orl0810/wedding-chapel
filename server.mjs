import '@angular/compiler';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './dist/wedding-chapel/server/main.server.mjs';

export function app() {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, 'dist/wedding-chapel/browser');
  const indexHtml = join(serverDistFolder, 'dist/wedding-chapel/server/index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
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

