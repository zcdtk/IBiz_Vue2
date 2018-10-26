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
 * 树导航视图控制器
 *
 * @class IBizWFExpViewController
 * @extends {IBizExpViewController}
 */
var IBizWFExpViewController = /** @class */ (function (_super) {
    __extends(IBizWFExpViewController, _super);
    /**
     * Creates an instance of IBizWFExpViewController.
     * 创建 IBizWFExpViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizWFExpViewController
     */
    function IBizWFExpViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 获取树导航部件
     *
     * @memberof IBizTreeExpViewController
     */
    IBizWFExpViewController.prototype.getExpBar = function () {
        return this.getControl('expbar');
    };
    /**
     * 导航视图部件加载完成
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpViewController
     */
    IBizWFExpViewController.prototype.onExpCtrlLoaded = function (item) {
        if (item === void 0) { item = {}; }
        this.openExpChildView(item);
    };
    /**
     * 导航树选中导航变化
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpViewController
     */
    IBizWFExpViewController.prototype.onExpCtrlSelectionChange = function (item) {
        if (item === void 0) { item = {}; }
        this.openExpChildView(item);
    };
    return IBizWFExpViewController;
}(IBizExpViewController));
