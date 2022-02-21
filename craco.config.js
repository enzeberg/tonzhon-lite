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
              '@layout-body-background': 'whitesmoke',
              '@layout-header-background': 'white',
              '@layout-header-height': 'auto',
              '@layout-trigger-height': 'auto',
              '@layout-zero-trigger-height': 'auto',
              '@layout-header-padding': '6px 0px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};