"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiDataPropertyMiddleware = void 0;
var common_1 = require("@nestjs/common");
/**
 * Old fashioned middleware for express
 * Same functionality with the ResponseWrapperInterceptor
 */
var ApiDataPropertyMiddleware = /** @class */ (function () {
    function ApiDataPropertyMiddleware() {
    }
    ApiDataPropertyMiddleware.prototype.use = function (req, res, next) {
        var superJson = res.json;
        res.json = function (body) {
            if (body instanceof Object &&
                !body.hasOwnProperty('data')) {
                body = {
                    data: body
                };
            }
            return superJson.apply(res, [body]);
        };
        next();
    };
    ApiDataPropertyMiddleware = __decorate([
        common_1.Injectable()
    ], ApiDataPropertyMiddleware);
    return ApiDataPropertyMiddleware;
}());
exports.ApiDataPropertyMiddleware = ApiDataPropertyMiddleware;
