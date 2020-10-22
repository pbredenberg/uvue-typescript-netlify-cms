# Vue.js, UVue, TypeScript + Netlify CMS

This project is a conventional approach to statically generating a Vue.js app while leveraging Netlify CMS.

Many Vue.js-based static site generators require newcomers to learn—to some degree of additional complexity—a layer of abstraction over Vue.js (Nuxt.js, VuePress, Gridsome, etc).

[UVue](https://universal-vue.github.io/docs/) is an excellent option for building server-generated Vue.js sites, and is a little “closer to the metal” in the opinion of this project’s author.

With the help of UVue, this project attempts to expose how site generation actually happens (using [vue-router]([https://router.vuejs.org/](https://router.vuejs.org/)), [vue-ssr]([https://vuejs.org/v2/guide/ssr.html](https://vuejs.org/v2/guide/ssr.html)), [webpack]([https://webpack.js.org/](https://webpack.js.org/))), to allow for more flexibility.

Paired with the [Netlify CMS](https://www.netlifycms.org/), website developers should be able to build robust applications with only Vue.js (and TypeScript), while giving the users who will be managing content a modern tool that is easy to understand. Additionally, infrastructure is simply a hosted git repo and the Netlify platform.

## General Information

Right now this project parses Netlify-generated content into a directory tree object, and exposes
this object to Vue.js at the time the application bundle is created. This directory tree object
is then passed to vue-router, which generates the site map. Content for a specific page is provided
to the page component via props. The raw Markdown, as well as the Markdown parsed into HTML
is exposed to the component, as well as any associated Markdown frontmatter.

Currently, only Markdown Netlify content is supported, but JSON will be supported in the future.

## Deploy To Netlify

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/pbredenberg/uvue-typescript-netlify-cms&amp;stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Project Setup & Commands

```bash
npm install
```

### Compiles and hot-reloads for development

This is the standard Vue CLI tooling command.

```bash
npm run dev
```

### Runs Netlify CMS local backend

Builds your static site and serves it with [http-server](https://www.npmjs.com/package/http-server).

This doesn't provide hot-reloading or anything fancy, but it does let you test the
CMS locally.

```bash
npm run dev:cms
```

The CMS admin should now be available at: <http://127.0.0.1:8080/admin>

### Compiles static site for production

```bash
npm run build
```

### Run your unit tests

```bash
npm run test:unit
```

### Lints and fixes files

```bash
npm run lint
```
