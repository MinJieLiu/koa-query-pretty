# koa-query-pretty

Pretty query middleware for koa.

[![npm](https://img.shields.io/npm/v/koa-query-pretty.svg?style=flat-square)](https://www.npmjs.com/package/koa-query-pretty)
[![Build Status](https://travis-ci.org/MinJieLiu/koa-query-pretty.svg?branch=master)](https://travis-ci.org/MinJieLiu/koa-query-pretty)
[![Coverage Status](https://coveralls.io/repos/github/MinJieLiu/koa-query-pretty/badge.svg?branch=master)](https://coveralls.io/github/MinJieLiu/koa-query-pretty?branch=master)
[![npm](https://img.shields.io/npm/dt/koa-query-pretty.svg?style=flat-square)](https://github.com/MinJieLiu/koa-query-pretty)

[中文 README](README-zh_CN.md)

### Description

`Koa` uses` queryString` to parse the `GET` parameter by default, but the parsed arguments are` string`.

`Koa-query-pretty` can be converted to concrete types like `int`, `float`,` boolean`, `null`, `undefined`.

### install

```
yarn add koa-query-pretty
```

### use

```js
const Koa = require('koa');
const queryPretty = require('koa-query-pretty');

const app = new Koa();
app.use(queryPretty());
```

### effect

/home?id=1&name=jack&enable=true&money=2.5&hobby=1&hobby=2

result

ctx.query:
```json
{
  "id": 1,
  "name": "jack",
  "enable": true,
  "money": 2.5,
  "hobby": [
    1,
    2
  ]
}
```

### configuration

#### override

Overwrite the `ctx.query` parameter, default` true`, otherwise use `ctx.prettyQuery` to get

```js
app.use(queryPretty({ override: false }));

app.use(async (ctx, next) => {
  console.log(ctx.prettyQuery);
  await next();
});
```
