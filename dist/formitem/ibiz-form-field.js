"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 表单属性项
 *
 * @class IBizFormField
 * @extends {IBizFormItem}
 */
var IBizFormField = /** @class */ (function (_super) {
    __extends(IBizFormField, _super);
    /**
     * Creates an instance of IBizFormField.
     * 创建 IBizFormField 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormField
     */
    function IBizFormField(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        var _this = _this_1;
        _this.labelWidth = opts.labelWidth;
        return _this_1;
    }
    return IBizFormField;
}(IBizFormItem));
