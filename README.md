# Vue.js, UVue, TypeScript + Netlify CMS (EXPERIMENTAL)

An **experimental** project to combine a more conventional static-generated Vue.js app
while leveraging Netlify CMS.

This is not working yet! Not recommended for production.

## Project Setup & Commands

```bash
npm install
```

### Compiles and hot-reloads for development

This is the standard Vue CLI tooling command.

```bash
npm run serve
```

### Runs Netlify CMS local backend

Builds your static site and serves it with [http-server](https://www.npmjs.com/package/http-server).

This doesn't provide hot-reloading or anything fancy, but it does let you test the
CMS locally.

```bash
npm run serve:cms
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

## General Information

Right now this doesn't do anything with the generated content. The intention is, once this project is ready, to automatically generate Vue routes (using `vue-router`), from
static content files, like Markdown or JSON.
