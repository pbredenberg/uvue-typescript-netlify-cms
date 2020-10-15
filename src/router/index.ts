import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { ContentLibraryDataObject } from '../../vue.config';
import { componentMap } from '../route-component-map';
import Home from '../views/Home.vue';

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

export default (contentLibrary?: ContentLibraryDataObject) => {
  let contentRoutes: RouteConfig[] | undefined;

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

    const indexName = file.indexName;

    return {
      // If an extension is defined, remove that from the route path.
      path: file.extension ? routePath.replace(file.extension, '') : routePath,
      component:
        file.type === 'file'
          ? componentMap[indexName].itemComponent
          : componentMap[indexName].indexComponent,
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

  if (contentLibrary) {
    contentRoutes = contentLibrary?.contentLibraryChildren?.map(file =>
      buildLibraryRoutes(file),
    );

    routes = routes.concat(contentRoutes || []);
  }

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });

  return router;
};
