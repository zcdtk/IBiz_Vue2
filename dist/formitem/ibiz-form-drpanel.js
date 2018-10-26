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
 * 表单关系部件
 *
 * @class IBizFormDRPanel
 * @extends {IBizFormItem}
 */
var IBizFormDRPanel = /** @class */ (function (_super) {
    __extends(IBizFormDRPanel, _super);
    /**
     * Creates an instance of IBizFormDRPanel.
     * 创建 IBizFormDRPanel 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormDRPanel
     */
    function IBizFormDRPanel(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizFormDRPanel;
}(IBizFormItem));
