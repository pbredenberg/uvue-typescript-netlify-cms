<template>
  <div class="blog__post">
    <article v-html="this.htmlContent"></article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { FrontMatterResult } from 'front-matter';
import { PropValidator } from 'vue/types/options';
import { ArticleMarkdownFile } from 'vue.config';

export interface BlogArticleMarkdownFile extends ArticleMarkdownFile {
  date: string;
}

export default Vue.extend({
  name: 'BlogPost',
  props: {
    fileContent: {
      type: Object,
    } as PropValidator<FrontMatterResult<BlogArticleMarkdownFile>>,
    htmlContent: {
      type: String,
    },
  },
  mounted() {
    console.log(this.fileContent, this.htmlContent);
  },
});
</script>
