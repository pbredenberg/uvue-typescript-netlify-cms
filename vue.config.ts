import { ProjectOptions } from '@vue/cli-service';
import MarkDownIt from 'markdown-it';
import fm, { FrontMatterResult } from 'front-matter';
import path from 'path';
import fs from 'fs';
import dirTree from 'directory-tree';

export interface ArticleMarkdownFile {
  title: string;
}

export interface ContentLibraryDataObject extends dirTree.DirectoryTree {
  /**
   * The raw result from the front-matter library so the app can access
   * markdown file frontmatter.
   */
  fileContent?: FrontMatterResult<ArticleMarkdownFile>;
  /**
   * The parsed HTML from markdown-it which can be used to render page content.
   */
  htmlContent?: string;
  contentLibraryChildren?: ContentLibraryDataObject[];
}

/**
 * Parses the `src/_content` directory for markdown files
 * and returns the directory tree.
 */
const generateContentLibrary = (
  tree: directoryTree.DirectoryTree,
): ContentLibraryDataObject => {
  const markdown = new MarkDownIt();
  let fileContent: FrontMatterResult<ArticleMarkdownFile> | undefined;
  let htmlContent: string | undefined;

  if (tree.type !== 'directory') {
    const file = fs.readFileSync(path.resolve(__dirname, tree.path));

    fileContent = fm<ArticleMarkdownFile>(file.toString());
    htmlContent = markdown.render(fileContent.body);
  }

  return Object.assign(tree, {
    fileContent: fileContent,
    htmlContent: htmlContent,
    contentLibraryChildren: tree.children?.map(child =>
      generateContentLibrary(child),
    ),
  });
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
        generateContentLibrary(
          dirTree('./src/_content', { extensions: /\.md/ }),
        ),
      );
      return definitions;
    });
  },
};

module.exports = configuration;
