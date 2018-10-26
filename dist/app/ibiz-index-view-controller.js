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
 * 首页应用视图
 *
 * @class IBizIndexViewController
 * @extends {IBizMainViewController}
 */
var IBizIndexViewController = /** @class */ (function (_super) {
    __extends(IBizIndexViewController, _super);
    /**
     * Creates an instance of IBizIndexViewController.
     * 创建 IBizIndexViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizIndexViewController
     */
    function IBizIndexViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 视图类型
         *
         * @type {string}
         * @memberof IBizIndexViewController
         */
        _this.viewtype = 'index';
        return _this;
    }
    /**
     * 应用菜单部件初始化
     *
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var appMenu = this.getAppMenu();
        if (appMenu) {
            appMenu.on(IBizAppMenu.LOADED, function (items) {
                _this.appMenuLoaded(items);
            });
        }
    };
    /**
     * 部件加载
     *
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var appMenu = this.getAppMenu();
        if (appMenu) {
            appMenu.load();
        }
        this.setMianMenuState();
    };
    /**
     * 应用菜单部件加载完成,调用基类处理
     *
     * @private
     * @param {any[]} items
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.appMenuLoaded = function (items) {
    };
    /**
     * 获取表单项
     *
     * @returns {*}
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.getAppMenu = function () {
        return this.getControl('appmenu');
    };
    /**
     * 导航数据跳转处理
     *
     * @param {*} [data={}]
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.navigationLink = function (data) {
        if (data === void 0) { data = {}; }
    };
    /**
     * 设置主菜单状态
     *
     * @param {string} [align]
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.setMianMenuState = function (align) {
    };
    return IBizIndexViewController;
}(IBizMainViewController));
