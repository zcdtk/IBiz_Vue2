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
        var _this = _super.call(this, opts) || this;
        /**
         * 应用菜单数据
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this.items = [];
        /**
         * 应用功能集合
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this.appFuncs = [];
        return _this;
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
     * 获取应用功能数据
     *
     * @returns {Array<any>}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getAppFuncs = function () {
        return this.appFuncs;
    };
    IBizAppMenu.prototype.load = function (opt) {
        var params = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        if (opt) {
            Object.assign(params, opt);
        }
        // this.post(params, this.getBackendUrl()).subscribe(success => {
        //     if (success.ret === 0) {
        //         this.$items = success.items;
        //         const data = this.doMenus(success.items);
        //         this.fire(IBizEvent.IBizAppMenu_LOADED, data);
        //     }
        // }, error => {
        //     console.log(error);
        // });
    };
    IBizAppMenu.prototype.onSelectChange = function (select) {
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
