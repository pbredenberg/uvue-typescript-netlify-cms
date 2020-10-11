import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import directoryTree from 'directory-tree';
import Home from '../views/Home.vue';
import Blog from '../components/Blog.vue';
import BlogPost from '../components/BlogPost.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/About.vue'),
  },
];

export default () => {
  // Webpack converts this variable to a JS object for us,
  // but TypeScript still thinks it's a string | undefined.
  // So in order to use the library object, we cast to unknown,
  // then cast to the correct type.
  const contentLibrary: unknown | undefined = process.env.CONTENT_LIBRARY;

  /**
   * Recursively constructs a vue-router configuration from the DirectoryTree
   * object provided.
   * @param file
   */
  const buildLibraryRoutesFromTree = function(
    file: directoryTree.DirectoryTree,
  ): RouteConfig {
    // Exclude content directory from what will become the route URL.
    const routePath = file.path.replace('src/_content', '');

    return {
      // If an extension is defined, remove that from the route path.
      path: file.extension ? routePath.replace(file.extension, '') : routePath,
      // TODO: Provide more generic default route components other than "Blog"
      // and "BlogPost," with the intention that users should be able to  implement
      // their own custom component types.
      component: file.type === 'directory' ? Blog : BlogPost,
      children:
        file.children && file.children.length > 0
          ? file.children.map(file => buildLibraryRoutesFromTree(file))
          : [],
    };
  };

  const contentRoutes = (contentLibrary as directoryTree.DirectoryTree)?.children?.map(
    file => buildLibraryRoutesFromTree(file),
  );

  routes.concat(contentRoutes || []);

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });

  return router;
};
