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
         * 默认打开视图
         *
         * @type {*}
         * @memberof IBizIndexViewController
         */
        _this.defOpenView = {};
        _this.regDefOpenView();
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
            // 菜单加载完成
            appMenu.on(IBizAppMenu.LOADED).subscribe(function (items) {
                _this.appMenuLoaded(items);
            });
            // 菜单选中
            appMenu.on(IBizAppMenu.MENUSELECTION).subscribe(function (items) {
                _this.appMenuSelection(items);
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
        var matched = this.$route.matched;
        var appMenu = this.getAppMenu();
        if (matched[this.route_index + 1]) {
            var next_route_name = matched[this.route_index + 1].name;
            var _app = appMenu.getAppFunction('', next_route_name);
            var _item = {};
            if (_app && Object.keys(_app).length > 0) {
                Object.assign(_item, appMenu.getSelectMenuItem(items, _app));
            }
            if (Object.keys(_item).length > 0) {
                appMenu.setAppMenuSelected(_item);
            }
        }
        else {
            var firstItem = {};
            Object.assign(firstItem, this.getFirstMenuItem(items));
            if (firstItem && Object.keys(firstItem).length > 0) {
                appMenu.setAppMenuSelected(firstItem);
                this.appMenuSelection([firstItem]);
            }
        }
    };
    /**
     * 应用菜单选中
     *
     * @param {Array<any>} items
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.appMenuSelection = function (items) {
        var item = {};
        Object.assign(item, items[0]);
        this.openView(item.viewname, item.openviewparam);
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
     * 设置主菜单状态
     *
     * @param {string} [align]
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.setMianMenuState = function (align) {
    };
    /**
     * 注册默认打开视图
     *
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.regDefOpenView = function () {
    };
    /**
     * 获取第一个带导航内容的菜单数据
     *
     * @private
     * @param {Array<any>} items
     * @returns {*}
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.getFirstMenuItem = function (items) {
        var _this = this;
        var app = {};
        var appMenu = this.getAppMenu();
        items.some(function (_item) {
            var _app = appMenu.getAppFunction(_item.appfuncid, '');
            if (_app && Object.keys(_app).length > 0) {
                Object.assign(app, _item, _app);
                return true;
            }
            if (_item.items && _item.items.length > 0) {
                var subapp = _this.getFirstMenuItem(_item.items);
                if (subapp && Object.keys(subapp).length > 0) {
                    Object.assign(app, _item, subapp);
                    return true;
                }
            }
        });
        return app;
    };
    return IBizIndexViewController;
}(IBizMainViewController));
