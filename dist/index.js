'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Koa application is now a class and requires the new operator.
var app = new _koa2.default();

/**
 * 出错控制
 */
app.use(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            ctx.body = { message: _context.t0.message };
            ctx.status = _context.t0.status || 500;

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * 请求参数获取
 */
app.use(function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
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

            _context2.next = 18;
            return next();

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

app.use(function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx) {
    var user;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = 'Cntchen';

            ctx.set({
              'Set-Cookie': 'from=' + ctx.hostname + '; path=/',
              'access-control-allow-origin': ctx.header.origin
            });
            // ctx.cookies.set(name, value, [options])
            ctx.body = user; // ctx instead of this

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5) {
    return _ref3.apply(this, arguments);
  };
}());

app.listen(_config2.default.MiddleWarePort, _config2.default.MiddleWareDomain);