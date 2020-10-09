<template>
  <div class="blog__post">
    <article v-if="content">
      <VueMarkdown>{{ content }}</VueMarkdown>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueMarkdown from 'vue-markdown';
import { FrontMatterResult } from 'front-matter';
import { PropValidator } from 'vue/types/options';

import { BlogArticleMarkdownFile } from './Blog.vue';

export default Vue.extend({
  name: 'BlogPost',
  components: {
    VueMarkdown,
  },
  props: {
    fileContents: {
      type: Object,
      default: () => {
        return undefined;
      },
    } as PropValidator<FrontMatterResult<BlogArticleMarkdownFile> | undefined>,
  },
  computed: {
    content(): string | undefined {
      return this.fileContents?.body;
    },
  },
  mounted() {
    console.log(JSON.stringify(this.fileContents));
  },
});
</script>
