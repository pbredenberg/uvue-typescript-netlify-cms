import Vue from 'vue';
import { ContentLibraryDataObject } from 'vue.config';
import App from './App.vue';
import createRouter from './router';

Vue.config.productionTip = false;

export default () => {
  // Webpack converts this variable to a JS object for us,
  // but TypeScript still thinks it's a string | undefined.
  // So in order to use the library object, we cast to unknown,
  // then cast to the correct type.
  const contentLibrary = process.env.CONTENT_LIBRARY as
    | ContentLibraryDataObject
    | undefined;

  const router = createRouter(contentLibrary);

  return new Vue({
    router,
    render: h =>
      h(App, {
        props: {
          contentLibrary: contentLibrary,
        },
      }),
  });
};
