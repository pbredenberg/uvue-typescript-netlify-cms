<template>
  <div class="blog">
    <nav>
      <span v-for="(child, index) of routeIndex" :key="index">
        <router-link :to="child.path">{{ child.path }}</router-link>
      </span>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Blog',
  computed: {
    routeIndex() {
      const currentRoute = this.$router.options.routes?.find(route => {
        return this.$route.name === route.name;
      });

      return currentRoute?.children || [];
    },
  },
});
</script>
