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
         * 菜单数据项
         *
         * @type {any[]}
         * @memberof IBizAppMenu
         */
        _this_1.items = [];
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
        this.fire(IBizAppMenu.MENUSELECTION, _item);
    };
    /**
     * 设置选中菜单
     *
     * @param {*} [item={}]
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.setAppMenuSelected = function (item) {
        if (item === void 0) { item = {}; }
        if (!item) {
            return;
        }
        this.selectItem = {};
        var appfunction = this.appFunctions.find(function (_appfunction) { return Object.is(_appfunction.routerlink, item.routerlink); });
        if (!appfunction) {
            return;
        }
        var _selectItem = this.getSelectMenuItem(this.items, appfunction);
        if (_selectItem && Object.keys(_selectItem).length > 0) {
            Object.assign(this.selectItem, _selectItem);
        }
    };
    /**
     * 获取选中菜单项
     *
     * @private
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
     * 获取菜单数据项
     *
     * @param {string} id
     * @param {Array<any>} items
     * @returns {*}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getItem = function (id, items) {
        var _this = this;
        var _item = {};
        items.some(function (item) {
            if (Object.is(item.id, id)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items && item.items.length > 0 && Array.isArray(item.items)) {
                var _subItem = _this.getItem(id, item.items);
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
