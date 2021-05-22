const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': 'orange',
              '@layout-body-background': 'white',
              '@layout-header-background': 'white',
              '@layout-header-height': 'auto',
              '@layout-trigger-height': 'auto',
              '@layout-zero-trigger-height': 'auto',
              '@layout-header-padding': 0,
              '@layout-footer-padding': 0,
              '@layout-footer-background': '#f7f7f7',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};