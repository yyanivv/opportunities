const { composePlugins, withNx } = require('@nx/webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = composePlugins(
  withNx({
    target: 'node',
  }),
  (config) => {
    // Enable source maps
    config.devtool = 'source-map';

    // Exclude node_modules from bundling (except @nrwl/node_modules)
    config.externals = [
      nodeExternals({
        allowlist: ['@nrwl/node_modules'],
      }),
    ];

    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    return config;
  }
);
