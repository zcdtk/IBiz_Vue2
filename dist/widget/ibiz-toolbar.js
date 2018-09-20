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
 * 工具栏控件
 *
 * @class IBizToolbar
 * @extends {IBizControl}
 */
var IBizToolbar = /** @class */ (function (_super) {
    __extends(IBizToolbar, _super);
    /**
     * Creates an instance of IBizToolbar.
     * 创建 IBizToolbar 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizToolbar
     */
    function IBizToolbar(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 工具栏项按钮集合
         *
         * @private
         * @type {Map<string, any>}
         * @memberof IBizToolbar
         */
        _this_1.items = new Map();
        _this_1.regToolBarItems();
        return _this_1;
    }
    /**
     * 注册所有工具栏按钮
     *
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.regToolBarItems = function () {
    };
    /**
     * 注册工具栏按钮
     *
     * @param {*} [item={}]
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.regToolBarItem = function (item) {
        var _this_1 = this;
        if (item === void 0) { item = {}; }
        if (Object.keys(item).length > 0 && !Object.is(item.name, '')) {
            item.dataaccaction = true;
            this.items.set(item.name, item);
        }
        if (item.menu && item.menu.length > 0) {
            var _menus = item.menu.slice();
            _menus.forEach(function (menu) {
                _this_1.regToolBarItem(menu);
            });
        }
    };
    /**
     * 获取所有工具栏按钮
     *
     * @returns {Map<string, any>}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.getItems = function () {
        return this.items;
    };
    /**
     * 设置工具栏按钮是否启用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.setItemDisabled = function (name, disabled) {
        if (this.items.get(name)) {
            this.items.get(name).disabled = disabled;
        }
    };
    /**
     * 更新工具栏按钮状态
     *
     * @param {*} [action={}]
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.updateAccAction = function (action) {
        if (action === void 0) { action = {}; }
        var _this = this;
        _this.items.forEach(function (value) {
            var priv = value.priv;
            if ((priv && !Object.is(priv, '')) && (action && Object.keys(action).length > 0 && action[priv] !== 1)) {
                value.dataaccaction = false;
            }
            else {
                value.dataaccaction = true;
            }
        });
    };
    /**
     * 点击按钮
     *
     * @param {string} name
     * @param {string} type
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.itemclick = function (name, type) {
        var _this = this;
        _this.fire(IBizToolbar.ITEMCLICK, { tag: type });
    };
    /** ***************事件声明*********************** */
    /**
     * 点击按钮事件
     *
     * @static
     * @memberof IBizToolbar
     */
    IBizToolbar.ITEMCLICK = 'ITEMCLICK';
    return IBizToolbar;
}(IBizControl));
