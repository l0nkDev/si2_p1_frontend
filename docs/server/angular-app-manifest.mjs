
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/si2_p1_frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/si2_p1_frontend"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5478, hash: '2bfba6ab8797dc1f8d0b36a1b7dde5de9e9c8e0c78d4d4de05210a299cadd25d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1450, hash: 'cc26125aae440322676e2013b4545d466696be2facace155058d351823d02c01', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 24725, hash: '2a338df9e58d0153ead695d9bea8a855561b064e99fb4b1c585213229c8862db', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-DPQ53L3S.css': {size: 230768, hash: 'eeRGZBkJAUs', text: () => import('./assets-chunks/styles-DPQ53L3S_css.mjs').then(m => m.default)}
  },
};
