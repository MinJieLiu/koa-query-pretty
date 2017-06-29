'use strict';

const { describe, it } = require('mocha');
const assert = require('assert');
const Koa = require('koa');
const request = require('supertest');
const queryPretty = require('../lib');

describe('koa-query-pretty', () => {
  it('should parse query successful', (done) => {
    const app = new Koa();
    app.use(queryPretty());

    app.use(async (ctx, next) => {
      const {
        id,
        name,
        hobby,
        money,
        enable,
        active,
        love,
        check,
        other,
        math,
        version,
      } = ctx.query;

      assert(ctx.prettyQuery === undefined);
      assert(ctx.request.query.id === 1);
      assert(id === 1);
      assert(name === 'jack');
      assert(Array.isArray(hobby));
      assert(hobby.length === 2);
      assert(hobby[0] === 1);
      assert(hobby[1] === 2);
      assert(money === 1.555);
      assert(enable === true);
      assert(active === false);
      assert(love === '1,2');
      assert(check === 'yes');
      assert(other === '1x6');
      assert(math === -1);
      assert(version === '1.1.2');
      await next();
    });

    request(app.listen())
      .get('/home?id=1&name=jack&hobby=1&hobby=2&money=1.555' +
        '&enable=true&active=false&love=1,2&check=yes&other=1x6&math=-1&version=1.1.2')
      .expect(200)
      .end(() => done());
  });

  it('should assign params successful', (done) => {
    const app = new Koa();
    app.use(queryPretty({ override: false }));

    app.use(async (ctx, next) => {
      assert(ctx.prettyQuery !== undefined);
      assert(ctx.prettyQuery.name === 1);
      assert(ctx.query.name === '1');
      await next();
    });

    request(app.listen())
      .get('/user?name=1')
      .expect(200)
      .end(() => done());
  });
});
