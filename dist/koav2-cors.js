'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KoaV2CORS = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// KOA v2 CORS middleware
// reference: https://www.w3.org/TR/cors/#resource-processing-model

var KoaV2CORS = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
        var reqHeaders, CORSResponseHeaders, requestMethod, requestHeaders;
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

                        // All headers is lowercase
                        reqHeaders = ctx.headers;
                        CORSResponseHeaders = {};

                        if (reqHeaders['origin']) {
                            _context.next = 9;
                            break;
                        }

                        corsFail();
                        return _context.abrupt('return');

                    case 9:
                        if (!(!reqHeaders['access-control-request-headers'] && !reqHeaders['access-control-request-methods'])) {
                            _context.next = 13;
                            break;
                        }

                        (0, _assign2.default)(CORSResponseHeaders, {
                            'Access-Control-Allow-Origin': reqHeaders['origin'],
                            'Access-Control-Allow-Credentials': 'true'
                        });
                        _context.next = 22;
                        break;

                    case 13:
                        // is preflight request
                        (0, _assign2.default)(CORSResponseHeaders, {
                            'Access-Control-Allow-Origin': reqHeaders['origin'],
                            'Access-Control-Allow-Credentials': 'true'
                        });

                        requestMethod = reqHeaders['access-control-request-method'];

                        if (requestMethod) {
                            _context.next = 18;
                            break;
                        }

                        corsFail();
                        return _context.abrupt('return');

                    case 18:

                        (0, _assign2.default)(CORSResponseHeaders, {
                            'Access-Control-Allow-Method': requestMethod
                        });

                        requestHeaders = reqHeaders['access-control-request-headers'];

                        (0, _assign2.default)(CORSResponseHeaders, {
                            'Access-Control-Allow-Headers': requestHeaders || []
                        });

                        (0, _assign2.default)(CORSResponseHeaders, {
                            'Access-Control-Max-Age': 60 * 60 * 24 * 356
                        });

                    case 22:

                        ctx.set(CORSResponseHeaders);
                        _context.next = 29;
                        break;

                    case 25:
                        _context.prev = 25;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);
                        corsFail();

                    case 29:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 25]]);
    }));

    return function KoaV2CORS(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function corsFail() {
    console.log('CORS fail');
}

exports.KoaV2CORS = KoaV2CORS;
exports.default = KoaV2CORS;