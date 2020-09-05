"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ValidationException = void 0;
var common_1 = require("@nestjs/common");
var ValidationException = /** @class */ (function (_super) {
    __extends(ValidationException, _super);
    function ValidationException(objectOrError, description) {
        if (description === void 0) { description = 'Validation Exception'; }
        return _super.call(this, common_1.HttpException.createBody(objectOrError, description, common_1.HttpStatus.BAD_REQUEST), common_1.HttpStatus.BAD_REQUEST) || this;
    }
    return ValidationException;
}(common_1.HttpException));
exports.ValidationException = ValidationException;
