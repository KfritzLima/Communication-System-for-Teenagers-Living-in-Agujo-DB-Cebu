
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/AGUJO-FORUM/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/AGUJO-FORUM/login",
    "route": "/AGUJO-FORUM"
  },
  {
    "renderMode": 2,
    "route": "/AGUJO-FORUM/login"
  },
  {
    "renderMode": 2,
    "route": "/AGUJO-FORUM/create-account"
  },
  {
    "renderMode": 2,
    "route": "/AGUJO-FORUM/dashboard"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4979, hash: 'd46dcc2152b72b3c63b7e612f225ac1beb3cc69eaca210cddba6f0d491d38f03', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 5497, hash: '4becea1f07331c5953a7d46c193f4162b59accec35f6fdcc9aba122b9c713a5d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'create-account/index.html': {size: 9095, hash: 'a33f217d48ac7b483c0585902749b51827b9de24e38edc9146a21b9b268327d7', text: () => import('./assets-chunks/create-account_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 5788, hash: '5c9f0317f8e09b5bedc4e7022fb30bd97acde2f37ac083a2054d3a03839db7f3', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 9225, hash: 'fb95b97a0bc5d6d6d3579d4b62771ed81ef1bb249f0de3ee131af2327a8a6c33', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
