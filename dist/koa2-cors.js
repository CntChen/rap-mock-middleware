'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetKoaCors = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * KOA2 CORS middleware
 *
 * author: CntChen
 * date: 2016-12-20
 * reference: https://www.w3.org/TR/cors/#resource-processing-model
 */

var CorsOptions = {
  allowOrigins: null,
  allowMethods: null,
  allowHeaders: null,
  allowExposedHeaders: null,
  maxAge: undefined,
  isSupportCredentials: true
};

var debugOptions = {
  outputLog: false
};

/**
 * generator for koa cors middleware
 * 
 * @param  {Object} options 
 * @param  {Array} options.allowOrigins
 * @param  {Array} options.allowMethods
 * @param  {Array} options.allowHeaders
 * @param  {Array} options.allowExposedHeaders
 * @param  {Number} options.maxAge
 * @param  {Boolean} options.isSupportCredentials  
 * @return {async Function} function as koa middleware
 */
function GetKoaCors(options) {
  (0, _assign2.default)(CorsOptions, options);

  return KoaV2CORS;
}

var KoaV2CORS = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var reqHeaders, CORSResponseHeaders, requestOrigin, requestMethod, requestHeaders;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!next) {
              _context.next = 4;
              break;
            }

            _context.next = 4;
            return next();

          case 4:
            if (!(!(CorsOptions.allowOrigins === null || Array.isArray(CorsOptions.allowOrigins)) || !(CorsOptions.allowMethods === null || Array.isArray(CorsOptions.allowMethods)) || !(CorsOptions.allowHeaders === null || Array.isArray(CorsOptions.allowHeaders)) || !(CorsOptions.allowExposedHeaders === null || Array.isArray(CorsOptions.allowExposedHeaders)) || !(CorsOptions.maxAge === undefined || typeof CorsOptions.maxAge === 'number') || !(typeof CorsOptions.isSupportCredentials === 'boolean'))) {
              _context.next = 6;
              break;
            }

            throw new Error('options param error.');

          case 6:

            // all headers is lowercase
            reqHeaders = ctx.headers;
            CORSResponseHeaders = {};
            requestOrigin = reqHeaders['origin'];
            // reference 6.1.1 & 6.2.1

            if (requestOrigin) {
              _context.next = 12;
              break;
            }

            finishedWithoutSetHeaders();
            return _context.abrupt('return');

          case 12:
            if (!(CorsOptions.allowOrigins && !CorsOptions.allowOrigins.includes(requestOrigin))) {
              _context.next = 15;
              break;
            }

            finishedWithoutSetHeaders();
            return _context.abrupt('return');

          case 15:
            if (!(!ctx.method == 'OPTIONS')) {
              _context.next = 20;
              break;
            }

            // reference 6.1.3
            if (CorsOptions.isSupportCredentials) {
              (0, _assign2.default)(CORSResponseHeaders, {
                'Access-Control-Allow-Origin': reqHeaders['origin'],
                'Access-Control-Allow-Credentials': 'true'
              });
            } else {
              (0, _assign2.default)(CORSResponseHeaders, {
                'Access-Control-Allow-Origin': '*'
              });
            }

            // reference 6.1.4
            if (CorsOptions.allowExposedHeaders && CorsOptions.allowExposedHeaders.length > 0) {
              (0, _assign2.default)(CORSResponseHeaders, {
                'Access-Control-Expose-Methods': CorsOptions.allowExposedHeaders.join(',\s')
              });
            }

            _context.next = 39;
            break;

          case 20:
            // is preflight request
            // reference 6.2.3
            requestMethod = reqHeaders['access-control-request-method'];

            if (requestMethod) {
              _context.next = 24;
              break;
            }

            finishedWithoutSetHeaders();
            return _context.abrupt('return');

          case 24:
            if (CorsOptions.allowMethods) {
              _context.next = 28;
              break;
            }

            (0, _assign2.default)(CORSResponseHeaders, {
              'Access-Control-Allow-Methods': requestMethod
            });
            _context.next = 34;
            break;

          case 28:
            if (!arrayIncludesAnother(CorsOptions.allowMethods, (0, _from2.default)(requestMethod))) {
              _context.next = 32;
              break;
            }

            (0, _assign2.default)(CORSResponseHeaders, {
              'Access-Control-Allow-Methods': CorsOptions.allowMethods.join(', ')
            });
            _context.next = 34;
            break;

          case 32:
            finishedWithoutSetHeaders();
            return _context.abrupt('return');

          case 34:

            // reference 6.1.4
            requestHeaders = reqHeaders['access-control-request-headers'];

            if (!requestHeaders) {
              (0, _assign2.default)(CORSResponseHeaders, {
                'Access-Control-Allow-Headers': []
              });
            }

            // reference 6.1.6
            if (requestHeaders) {
              if (!CorsOptions.allowHeaders) {
                (0, _assign2.default)(CORSResponseHeaders, {
                  'Access-Control-Allow-Headers': requestHeaders
                });
              } else if (arrayIncludesAnother(CorsOptions.allowHeaders, requestHeaders.split(/\s*,\s*/))) {
                (0, _assign2.default)(CORSResponseHeaders, {
                  'Access-Control-Allow-Headers': CorsOptions.allowHeaders.join(', ')
                });
              } else {
                finishedWithoutSetHeaders();
              }
            }

            // reference 6.1.7
            if (CorsOptions.isSupportCredentials) {
              (0, _assign2.default)(CORSResponseHeaders, {
                'Access-Control-Allow-Origin': reqHeaders['origin'],
                'Access-Control-Allow-Credentials': 'true'
              });
            } else {
              (0, _assign2.default)(CORSResponseHeaders, {
                'Access-Control-Allow-Origin': '*' });
            }

            // reference 6.1.8
            if (!CorsOptions.maxAge) {
              (0, _assign2.default)(CORSResponseHeaders, {
                'Access-Control-Max-Age': 60 * 60 * 24 * 355 });
            } else {
              (0, _assign2.default)(CORSResponseHeaders, {
                'Access-Control-Max-Age': CorsOptions.maxAge
              });
            }

          case 39:

            ctx.set(CORSResponseHeaders);
            _context.next = 45;
            break;

          case 42:
            _context.prev = 42;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 45:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 42]]);
  }));

  function KoaV2CORS(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return KoaV2CORS;
}();

function finishedWithoutSetHeaders() {
  consle.log('finished without set headers');
}

/**
 * ignore case-sensitive
 */
function arrayIncludesAnother(one, another) {
  var lowercaseOne = one.map(function (item) {
    return item.toLowerCase();
  });
  var lowercaseAnother = another.map(function (item) {
    return item.toLowerCase();
  });

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(lowercaseAnother), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      if (!lowercaseOne.includes(value)) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
}

exports.GetKoaCors = GetKoaCors;
exports.default = GetKoaCors;