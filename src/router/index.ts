import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { ContentLibraryDataObject } from '../../vue.config';
import Home from '../views/Home.vue';
import Blog from '../components/Blog.vue';
import BlogPost from '../components/BlogPost.vue';

Vue.use(VueRouter);

let routes: Array<RouteConfig> = [
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
  const buildLibraryRoutes = function(
    file: ContentLibraryDataObject,
  ): RouteConfig {
    // Exclude content directory from what will become the route URL.
    const routePath = file.path.replace('src/_content', '');

    const isDirectory = file.type === 'directory';

    return {
      // If an extension is defined, remove that from the route path.
      path: file.extension ? routePath.replace(file.extension, '') : routePath,
      // TODO: Provide more generic default route components other than "Blog"
      // and "BlogPost," with the intention that users should be able to  implement
      // their own custom component types.
      component: isDirectory ? Blog : BlogPost,
      props: {
        fileContent: file.fileContent,
        htmlContent: file.htmlContent,
      },
      children:
        file.contentLibraryChildren && file.contentLibraryChildren.length > 0
          ? file.contentLibraryChildren.map(file => buildLibraryRoutes(file))
          : [],
    };
  };

  const contentRoutes = (contentLibrary as ContentLibraryDataObject)?.contentLibraryChildren?.map(
    file => buildLibraryRoutes(file),
  );

  routes = routes.concat(contentRoutes || []);

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });

  return router;
};
