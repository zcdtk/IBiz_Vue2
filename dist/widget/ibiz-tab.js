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
 * 分页
 *
 * @class IBizTab
 * @extends {IBizControl}
 */
var IBizTab = /** @class */ (function (_super) {
    __extends(IBizTab, _super);
    /**
     * Creates an instance of IBizTab.
     * 创建 IBizTab 实例
     * @param {*} [opts={}]
     * @memberof IBizTab
     */
    function IBizTab(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 激活分页部件分页数
         *
         * @type {number}
         * @memberof IBizTab
         */
        _this.activeTabIndex = 0;
        /**
         * 分页部件对象
         *
         * @type {*}
         * @memberof IBizTab
         */
        _this.tabs = {};
        _this.regTabs();
        return _this;
    }
    /**
     * 注册所有分页部件对象
     *
     * @memberof IBizTab
     */
    IBizTab.prototype.regTabs = function () {
    };
    /**
     * 注册分页部件对象
     *
     * @param {*} [tab={}]
     * @memberof IBizTab
     */
    IBizTab.prototype.regTab = function (tab) {
        if (tab === void 0) { tab = {}; }
        if (Object.keys(tab).length > 0 && tab.name) {
            this.tabs[tab.name] = tab;
        }
    };
    /**
     * 获取分页部件对象
     *
     * @param {string} name
     * @returns {*}
     * @memberof IBizTab
     */
    IBizTab.prototype.getTab = function (name) {
        if (this.tabs[name]) {
            return this.tabs[name];
        }
        return undefined;
    };
    /**
     * 设置激活分页数
     *
     * @param {number} index
     * @memberof IBizTab
     */
    IBizTab.prototype.setActiveTab = function (index) {
        var _this = this;
        setTimeout(function () {
            _this.activeTabIndex = index;
        });
    };
    return IBizTab;
}(IBizControl));
