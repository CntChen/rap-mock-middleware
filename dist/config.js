'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 配置文件
 */

// 中间件的端口
var MiddleWarePort = 28080;
var MiddleWareDomain = '0.0.0.0';

// rap服务域名和端口
var RapDomain = '10.75.203.120:8080';

exports.MiddleWarePort = MiddleWarePort;
exports.MiddleWareDomain = MiddleWareDomain;
exports.RapDomain = RapDomain;
exports.default = { MiddleWarePort: MiddleWarePort, MiddleWareDomain: MiddleWareDomain, RapDomain: RapDomain };