'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _koav2Cors = require('./koav2-cors');

var _koav2Cors2 = _interopRequireDefault(_koav2Cors);

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
            _context2.next = 2;
            return next();

          case 2:
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
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
    var user;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!next) {
              _context3.next = 3;
              break;
            }

            _context3.next = 3;
            return next();

          case 3:
            user = 'Cntchen';
            // ctx.set({
            //   'Set-CooKIe': 'from=' + ctx.hostname + '; path=/',
            //   'access-control-allow-origin': ctx.header.origin,
            //   'Access-control-allow-origin': ctx.header.origin,    
            // });
            // ctx.cookies.set(name, value, [options])

            ctx.body = user; // ctx instead of this

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

app.use(_koav2Cors2.default);

app.listen(_config2.default.MiddleWarePort, _config2.default.MiddleWareDomain);