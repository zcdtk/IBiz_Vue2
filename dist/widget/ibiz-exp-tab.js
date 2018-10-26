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
 * 导航分页
 *
 * @class IBizExpTab
 * @extends {IBizTab}
 */
var IBizExpTab = /** @class */ (function (_super) {
    __extends(IBizExpTab, _super);
    /**
     * Creates an instance of IBizExpTab.
     * 创建 IBizExpTab 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizExpTab
     */
    function IBizExpTab(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizExpTab;
}(IBizTab));
