import { ProjectOptions } from '@vue/cli-service';
import MarkDownIt from 'markdown-it';
import fm, { FrontMatterResult } from 'front-matter';
import path from 'path';
import fs from 'fs';
import dirTree from 'directory-tree';

export interface ArticleMarkdownFile {
  title: string;
}

export interface ContentLibraryDataObject {
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
  type: 'directory' | 'file';
  path: string;
  extension?: string;
  /**
   * Identifier for the index this item resides in, as in,
   * the directory name. This is intended to be used to aid
   * resolving components in the app.
   *
   * When `/, this indicates the top level of the content
   * directory tree.
   */
  indexName: string;
}

/**
 * Parses the `src/_content` directory for markdown files
 * and returns the directory tree.
 */
const generateContentLibrary = (
  tree: directoryTree.DirectoryTree,
): ContentLibraryDataObject => {
  const markdown = new MarkDownIt();
  const pathParts = tree.path
    // Handle cases where the directory tree starts with `./`.
    .replace('./', '')
    .split('/');
  let indexName: string | undefined;
  let fileContent: FrontMatterResult<ArticleMarkdownFile> | undefined;
  let htmlContent: string | undefined;

  if (tree.type === 'directory') {
    // In an array of path parts, the last item in the array is the
    // directory name when the file type is 'directory'.
    indexName = pathParts.length > 2 ? pathParts[pathParts.length - 1] : '/';
  } else {
    const file = fs.readFileSync(path.resolve(__dirname, tree.path));

    fileContent = fm<ArticleMarkdownFile>(file.toString());
    htmlContent = markdown.render(fileContent.body);
    // If the file type is 'file', the directory name will be the second-to-last item.
    indexName = pathParts[pathParts.length - 2];
  }

  return {
    fileContent: fileContent,
    htmlContent: htmlContent,
    contentLibraryChildren: tree.children?.map(child =>
      generateContentLibrary(child),
    ),
    type: tree.type,
    path: tree.path,
    extension: tree.extension,
    indexName: indexName,
  };
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
