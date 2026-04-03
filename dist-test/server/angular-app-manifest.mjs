
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 632, hash: '7d667970a799b1b0787c25261956fc66224bf226dbf402c167042f143aaee4b8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1172, hash: 'fa197a514cd97ed10b5b133ac2f5e0215ffdcd7a3f5f4724fb3ccf3da16f7a9f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}
  },
};
