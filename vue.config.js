const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'raw-loader',
            },
          ],
        },
      ],
    },
  },
  chainWebpack: config => {
    config.plugin('copy').tap(args => {
      args[0].push({
        from: path.resolve(__dirname, 'public/admin/index.html'),
        to: path.resolve(__dirname, 'dist/admin'),
        toType: 'dir',
      });

      return args;
    });
  },
};
