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
 * 应用菜单
 *
 * @class IBizAppMenu
 * @extends {IBizControl}
 */
var IBizAppMenu = /** @class */ (function (_super) {
    __extends(IBizAppMenu, _super);
    /**
     * Creates an instance of IBizAppMenu.
     * 创建 IBizAppMenu 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizAppMenu
     */
    function IBizAppMenu(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 应用功能数据
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this_1.appFunctions = [];
        /**
         * 展开数据项
         *
         * @type {Array<string>}
         * @memberof IBizAppMenu
         */
        _this_1.expandItems = [];
        /**
         * 菜单数据项
         *
         * @type {any[]}
         * @memberof IBizAppMenu
         */
        _this_1.items = [];
        /**
         * 导航树部件是否收缩，默认展开
         *
         * @type {boolean}
         * @memberof IBizAppMenu
         */
        _this_1.isCollapsed = true;
        /**
         * 选中项
         *
         * @type {*}
         * @memberof IBizAppMenu
         */
        _this_1.selectItem = {};
        _this_1.setAppFunctions();
        return _this_1;
    }
    /**
     * 设置应用功能参数
     *
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.setAppFunctions = function () {
    };
    /**
     * 获取应用功能数据
     *
     * @param {string} [appfuncid] 应用功能id 可选
     * @param {string} [viewname] 应用功能代码名称 可选
     * @returns {*}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getAppFunction = function (appfuncid, viewname) {
        var appfunc = {};
        this.appFunctions.some(function (_appFunction) {
            if (_appFunction === void 0) { _appFunction = {}; }
            if (appfuncid && Object.is(appfuncid, _appFunction.appfuncid)) {
                Object.assign(appfunc, _appFunction);
                return true;
            }
            if (viewname && Object.is(viewname, _appFunction.viewname)) {
                Object.assign(appfunc, _appFunction);
                return true;
            }
        });
        return appfunc;
    };
    /**
     * 部件加载
     *
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.load = function () {
        var _this_1 = this;
        var params = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (success) {
            if (success.ret === 0) {
                _this_1.items = success.items;
                _this_1.fire(IBizAppMenu.LOADED, _this_1.items);
            }
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * 菜单选中
     *
     * @param {*} [item={}]
     * @returns {*}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.onSelectChange = function (item) {
        if (item === void 0) { item = {}; }
        // tslint:disable-next-line:prefer-const
        var _item = {};
        Object.assign(_item, item);
        var _appFunction = this.appFunctions.find(function (appfunction) { return Object.is(appfunction.appfuncid, item.appfuncid); });
        if (!_appFunction) {
            return;
        }
        Object.assign(_item, _appFunction);
        this.fire(IBizAppMenu.MENUSELECTION, [_item]);
    };
    /**
     * 设置选中菜单
     *
     * @param {*} [item={}]
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.setAppMenuSelected = function (item) {
        if (item === void 0) { item = {}; }
        if (item && Object.keys(item).length > 0) {
            Object.assign(this.selectItem, item);
        }
    };
    /**
     * 根据应用功能数据获取菜单数据项
     *
     * @param {Array<any>} items
     * @param {*} [appfunction={}]
     * @returns {*}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getSelectMenuItem = function (items, appfunction) {
        var _this_1 = this;
        if (appfunction === void 0) { appfunction = {}; }
        // tslint:disable-next-line:prefer-const
        var item = {};
        items.some(function (_item) {
            if (Object.is(_item.appfuncid, appfunction.appfuncid)) {
                Object.assign(item, _item);
                return true;
            }
            if (_item.items) {
                var subItem = _this_1.getSelectMenuItem(_item.items, appfunction);
                if (subItem && Object.keys(subItem).length > 0) {
                    Object.assign(item, subItem);
                    return true;
                }
            }
        });
        return item;
    };
    /**
    * 获取菜单数据
    *
    * @returns {Array<any>}
    * @memberof IBizAppMenu
    */
    IBizAppMenu.prototype.getItems = function () {
        return this.items;
    };
    /**
     * 根据菜单节点获取菜单数据项
     *
     * @param {Array<any>} items 菜单数据项
     * @param {*} [data={}]
     * @returns {*}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getItem = function (items, data) {
        if (data === void 0) { data = {}; }
        var _this = this;
        var _item = {};
        items.some(function (item) {
            if (Object.is(item.id, data.id)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items && item.items.length > 0 && Array.isArray(item.items)) {
                var _subItem = _this.getItem(item.items, data);
                if (_subItem && Object.keys(_subItem).length > 0) {
                    Object.assign(_item, _subItem);
                    return true;
                }
            }
        });
        return _item;
    };
    /**
     * 菜单加载
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.LOADED = 'LOADED';
    /**
     * 菜单选中
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.MENUSELECTION = 'MENUSELECTION';
    return IBizAppMenu;
}(IBizControl));
