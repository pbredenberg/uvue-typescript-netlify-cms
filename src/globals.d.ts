// Declare Markdown extension for TypeScript imports.
declare module '*.md';

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'markdown-it-vue';
