<template>
  <div class="blog">
    <BlogPost :fileContents="currentArticle" />
  </div>
</template>

<script lang="ts">
import fm, { FrontMatterResult } from 'front-matter';
import Vue from 'vue';
import BlogPost from './BlogPost.vue';

export interface BlogArticleMarkdownFile {
  title: string;
  date: string;
}

export const getBlogArticles = async () => {
  const articles = await Promise.all([
    import('../_content/blog/2020-10-09-another.md'),
    import('../_content/blog/2020-10-09-hello.md'),
  ]);

  return articles.map(file => {
    const article = file; // eslint-disable-line
    return fm<BlogArticleMarkdownFile>(article.default);
  });
};

export default Vue.extend({
  name: 'Blog',
  components: {
    BlogPost,
  },
  data() {
    return {
      currentArticle: undefined as
        | FrontMatterResult<BlogArticleMarkdownFile>
        | undefined,
    };
  },
  async created() {
    const currentRoute = this.$route.path;
    const articles = await getBlogArticles();
    this.currentArticle = articles.find(article => {
      const title = article.attributes.title;
      return currentRoute?.toLowerCase().indexOf(title.toLowerCase()) > -1;
    });
  },
});
</script>
