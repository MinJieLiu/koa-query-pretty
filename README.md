# koa-query-pretty

Pretty query middleware for koa.

[![npm](https://img.shields.io/npm/v/koa-query-pretty.svg?style=flat-square)](https://www.npmjs.com/package/koa-query-pretty)
[![Build Status](https://travis-ci.org/MinJieLiu/koa-query-pretty.svg?branch=master)](https://travis-ci.org/MinJieLiu/koa-query-pretty)
[![Coverage Status](https://coveralls.io/repos/github/MinJieLiu/koa-query-pretty/badge.svg?branch=master)](https://coveralls.io/github/MinJieLiu/koa-query-pretty?branch=master)
[![npm](https://img.shields.io/npm/dt/koa-query-pretty.svg?style=flat-square)](https://github.com/MinJieLiu/koa-query-pretty)

### 说明

`koa` 默认使用 `queryString` 解析 `GET` 参数，但解析后的参数都是 `string` 类型。

`koa-query-pretty` 可以将类似于 `int` 、`float`、`boolean` 转换为具体类型

### 安装

```
yarn add koa-query-pretty
```

### 使用

```js
const Koa = require('koa');
const queryPretty = require('koa-query-pretty');

const app = new Koa();
app.use(queryPretty());
```

### 效果

/home?id=1&name=jack&enable=true&money=2.5&hobby=1&hobby=2

结果

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

### 配置

#### override

覆盖 `ctx.query` 参数，默认 `true`，否则使用 `ctx.prettyQuery` 获取

```js
app.use(queryPretty({ override: false }));

app.use(async (ctx, next) => {
  console.log(ctx.prettyQuery);
  await next();
});
```
