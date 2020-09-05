"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResponseWrapperInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var ResponseWrapperInterceptor = /** @class */ (function () {
    function ResponseWrapperInterceptor() {
    }
    ResponseWrapperInterceptor.prototype.intercept = function (context, next) {
        var result;
        result = next.handle();
        if (context.getType() == "http") {
            result = result.pipe(operators_1.map(function (data) { return ({ data: data }); }));
        }
        return result;
    };
    ResponseWrapperInterceptor = __decorate([
        common_1.Injectable()
    ], ResponseWrapperInterceptor);
    return ResponseWrapperInterceptor;
}());
exports.ResponseWrapperInterceptor = ResponseWrapperInterceptor;
