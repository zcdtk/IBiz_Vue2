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
 * 导航视图控制器
 *
 * @class IBizExpViewController
 * @extends {IBizMianViewController}
 */
var IBizExpViewController = /** @class */ (function (_super) {
    __extends(IBizExpViewController, _super);
    /**
     * Creates an instance of IBizExpViewController.
     * 创建 IBizExpViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizExpViewController
     */
    function IBizExpViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        var _this = _this_1;
        return _this_1;
    }
    IBizExpViewController.prototype.init = function (opts) {
        var _this_1 = this;
        if (opts === void 0) { opts = {}; }
        _super.prototype.init.call(this, opts);
        var expCtrl = this.getExpCtrl();
        if (expCtrl) {
            expCtrl.on(IBizWFExpBar.SELECTIONCHANGE).subscribe(function (item) {
                _this_1.onExpCtrlSelectionChange(item);
            });
            expCtrl.on(IBizWFExpBar.LOADED).subscribe(function (item) {
                _this_1.onExpCtrlLoaded(item);
            });
        }
    };
    /**
     * 视图部件初始化
     *
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        var expCtrl = this.getExpCtrl();
        if (expCtrl) {
            expCtrl.load({});
        }
    };
    /**
     * 视图销毁
     *
     * @memberof IBizExpViewController
     */
    // public onDestroy(): void {
    //     super.onDestroy();
    //     if (this.$expRouteRvents) {
    //         this.$expRouteRvents.unsubscribe();
    //     }
    // }
    /**
     * 获取导航部件
     *
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getExpCtrl = function () {
        var expctrl = this.getExpBar();
        if (expctrl) {
            return expctrl;
        }
        expctrl = this.getExpTab();
        if (expctrl) {
            return expctrl;
        }
        return undefined;
    };
    /**
     * 获取导航部件
     *
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getExpBar = function () {
        return this.getControl('expbar');
    };
    /**
     * 获取导航分页部件
     *
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getExpTab = function () {
        return this.getControl('exptab');
    };
    /**
     * 导航部件值选中变化
     *
     * @param {*} [item={}]
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.onExpCtrlSelectionChange = function (item) {
        if (item === void 0) { item = {}; }
    };
    /**
     * 导航树部件加载完成
     *
     * @param {*} [item={}]
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.onExpCtrlLoaded = function (item) {
        if (item === void 0) { item = {}; }
    };
    /**
     * 获取导航项视图参数，在发布视图控制器内重写
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getExpItemView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return undefined;
    };
    /**
     * 获取新建导航视图参数，在发布视图控制器中重写
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getNewDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return undefined;
    };
    /**
     * 获取编辑导航视图参数，在发布视图控制器中重写
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getEditDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return undefined;
    };
    /**
     * 是否需要手动跳转路由
     *
     * @private
     * @param {*} [item={}]
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizExpViewController.prototype.isRefreshView = function (routeSting) {
        var refreshView = false;
        // if (this.$routeActive && this.$routeActive.children && this.$routeActive.children.length > 0) {
        //     const arr = this.$routeActive.children[0];
        //     if (Object.is(arr.routeConfig.path, routeSting.toLowerCase())) {
        //         refreshView = true;
        //     }
        // }
        return refreshView;
    };
    /**
     * 打开导航子视图
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.openExpChildView = function (item) {
        if (item === void 0) { item = {}; }
        if (!item || Object.keys(item).length === 0) {
            return;
        }
        var view = this.getExpItemView(item.expitem);
        if (!view) {
            return;
        }
        var data = {};
        Object.assign(data, item.expitem.viewparam);
        if (this.isRefreshView(view.routelink)) {
            Object.assign(data, { refreshView: true });
        }
        var exp = this.getExpBar();
        if (exp) {
            exp.setSelectItem(item);
        }
        this.openView(view.routelink, data);
    };
    return IBizExpViewController;
}(IBizMainViewController));
