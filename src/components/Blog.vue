<template>
  <div class="blog">
    <article v-html="fileContents"></article>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  props: {
    fileContents: {
      type: String,
      default: '',
    },
  },
};
</script>
