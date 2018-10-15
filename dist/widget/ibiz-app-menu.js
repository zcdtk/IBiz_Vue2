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
         * 应用菜单数据
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this_1.items = [];
        /**
         * 应用功能集合
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this_1.appFuncs = [];
        return _this_1;
    }
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
     * 获取应用功能数据
     *
     * @returns {Array<any>}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getAppFuncs = function () {
        return this.appFuncs;
    };
    IBizAppMenu.prototype.load = function (opt) {
        var _this_1 = this;
        var _this = this;
        var params = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        if (opt) {
            Object.assign(params, opt);
        }
        _this.fire(IBizAppMenu.BEFORELOAD, params);
        _this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (success) {
            if (success.ret === 0) {
                _this_1.items = success.items;
                // const data = this.doMenus(success.items);
                _this_1.fire(IBizAppMenu.LOAD, _this_1.items);
            }
        }, function (error) {
            console.log(error);
        });
    };
    IBizAppMenu.prototype.onSelectChange = function (select) {
        var _this = this;
        var hasView = false;
        var appFuncs = this.getAppFuncs();
        appFuncs.some(function (fun) {
            if (Object.is(fun.appfuncid, select.appfuncid)) {
                Object.assign(select, fun);
                hasView = true;
                return true;
            }
        });
        if (hasView) {
            _this.fire(IBizAppMenu.SELECTION, select);
        }
    };
    /*****************事件声明************************/
    /**
     * 部件加载之前
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.BEFORELOAD = 'BEFORELOAD';
    /**
     * 部件加载完成
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.LOAD = 'LOAD';
    /**
     * 部件选中
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.SELECTION = 'SELECTION';
    return IBizAppMenu;
}(IBizControl));
