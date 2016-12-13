import Koa from 'koa';
import Config from './config';

// Koa application is now a class and requires the new operator.
const app = new Koa();

/**
 * 出错控制
 */
app.use(async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

/**
 * 请求参数获取
 */
app.use(async (ctx, next) => {
  console.log('header:\n', ctx.header);  
  console.log('headers:\n', ctx.headers);
  console.log('method:\n', ctx.method);
  console.log('url\n', ctx.url);
  console.log('ctx.originalUrl\n', ctx.originalUrl);
  console.log('ctx.origin\n', ctx.origin);
  console.log('ctx.href\n', ctx.href);  
  console.log('ctx.path\n', ctx.path);  
  console.log('ctx.query\n', ctx.query);  
  console.log('ctx.querystring\n', ctx.querystring);  
  console.log('ctx.host\n', ctx.host);  
  console.log('ctx.hostname\n', ctx.hostname);
  console.log('ctx.protocol\n', ctx.protocol);
  console.log('ctx.secure\n', ctx.secure);
  console.log('ctx.ip\n', ctx.ip);
  console.log('ctx.accepts()\n', ctx.accepts());
  // console.log('ctx.get()\n', ctx.get());
    
  
  await next();
});

app.use(async ctx => {
  const user = 'Cntchen';
  ctx.body = user; // ctx instead of this
});

app.listen(Config.MiddleWarePort, Config.MiddleWareDomain);
