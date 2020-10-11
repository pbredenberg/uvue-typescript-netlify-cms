import { ProjectOptions } from '@vue/cli-service';
import path from 'path'; // eslint-disable-line @typescript-eslint/no-var-requires

// const recursive = require('recursive-readdir'); // eslint-disable-line @typescript-eslint/no-var-requires

import dirTree from 'directory-tree'; // eslint-disable-line @typescript-eslint/no-var-requires

const generateContentLibrary = () => {
  const tree = dirTree('./src/_content', { extensions: /\.md/ });

  // const library = {};

  // function createDirectory(pathObject) {

  // }

  // library[tree.name]
  // if (tree.children) {

  // }
  console.log(JSON.stringify(tree));
};

const configuration: ProjectOptions = {
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
    config.plugin('define').tap(definitions => {
      generateContentLibrary();
      definitions[0]['process.env']['CONTENT_LIBRARY'] = JSON.stringify({
        foo: 'bar',
      });
      return definitions;
    });
  },
};

module.exports = configuration;
