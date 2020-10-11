import { ProjectOptions } from '@vue/cli-service';
import path from 'path';
import dirTree from 'directory-tree';

/**
 * Parses the `src/_content` directory for markdown files
 * and returns the directory tree.
 */
const generateContentLibrary = () => {
  const tree = dirTree('./src/_content', { extensions: /\.md/ });

  return tree;
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
      definitions[0]['process.env']['CONTENT_LIBRARY'] = JSON.stringify(
        generateContentLibrary(),
      );
      return definitions;
    });
  },
};

module.exports = configuration;
