import Vue, { VueConstructor } from 'vue';
import BlogIndex from './components/BlogIndex.vue';
import BlogPost from './components/BlogPost.vue';

export interface RouteComponentMap {
  /**
   * A component to list items in this index.
   */
  indexComponent: VueConstructor<Vue>;
  /**
   * An individual item in this index.
   */
  itemComponent: VueConstructor<Vue>;
}

/**
 * Object literal to ease selection of Vue Components for the route generator
 * found at `./src/router/index.ts`.
 *
 * When defining new collections, import the component here, and specify
 * the `indexName` as the directory name in which your collection item resides.
 */
export const componentMap: { [indexName: string]: RouteComponentMap } = {
  // Blog collection components:
  blog: {
    // An individual post: `src/_content/blog/YYYY-MM-DD-title-name.md`
    itemComponent: BlogPost,
    // The index component for listing posts within: `src/_content/blog/`
    indexComponent: BlogIndex,
  },
};
