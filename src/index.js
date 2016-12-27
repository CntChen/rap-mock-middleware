/**
 * created by CntChen
 * date 2016-12-20
 */

import Koa from 'koa';
import Config from './config';
import GetKoaCors from './koa2-cors';

const app = new Koa();

/**
 * error control
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

/**
 * 请求参数获取
 */
app.use(async (ctx, next) => {
  // console.log(ctx.req);
  // console.log('header:\n', ctx.header);
  // console.log('headers:\n', ctx.headers);
  // console.log('method:\n', ctx.method);
  // console.log('url\n', ctx.url);
  // console.log('ctx.originalUrl\n', ctx.originalUrl);
  // console.log('ctx.origin\n', ctx.origin);
  // console.log('ctx.href\n', ctx.href);  
  // console.log('ctx.path\n', ctx.path);  
  // console.log('ctx.query\n', ctx.query);  
  // console.log('ctx.querystring\n', ctx.querystring);  
  // console.log('ctx.host\n', ctx.host);  
  // console.log('ctx.hostname\n', ctx.hostname);
  // console.log('ctx.protocol\n', ctx.protocol);
  // console.log('ctx.secure\n', ctx.secure);
  // console.log('ctx.ip\n', ctx.ip);
  // console.log('ctx.accepts()\n', ctx.accepts());
  // console.log('ctx.get()\n', ctx.get());

  // console.log('Cache-Controls', ctx.get('Cache-Control'), ctx.get('cAche-conTrOl'), ctx.header['cache-control']);
     
  await next();
});

/**
 * set response body
 */
app.use(async (ctx, next) => {
  if(next){
    await next();
  }

  ctx.body = 'RAP TEST';
});

/**
 * set cors headers
 */
app.use(GetKoaCors());


app.listen(Config.MiddleWarePort, Config.MiddleWareDomain);
