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
 * 表单分页面板
 *
 * @class IBizFormTabPanel
 * @extends {IBizFormItem}
 */
var IBizFormTabPanel = /** @class */ (function (_super) {
    __extends(IBizFormTabPanel, _super);
    /**
     * Creates an instance of IBizFormTabPanel.
     * 创建 IBizFormTabPanel 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormTabPanel
     */
    function IBizFormTabPanel(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizFormTabPanel;
}(IBizFormItem));
