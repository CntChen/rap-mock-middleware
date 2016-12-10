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
  
});

app.use(async ctx => {
  const user = 'Cntchen';
  ctx.body = user; // ctx instead of this
});

app.listen(Config.MiddleWarePort);
