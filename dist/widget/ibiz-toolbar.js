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
        /**
         * 所有工具栏按钮
         *
         * @private
         * @type {Array<any>}
         * @memberof IBizToolbar
         */
        _this_1.items = [];
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
        if (item === void 0) { item = {}; }
        this.items.push(item);
    };
    /**
     * 获取所有工具栏按钮
     *
     * @returns {Array<any>}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.getItems = function () {
        return this.items;
    };
    /**
     * 获取工具栏按钮
     *
     * @param {string} [name] 名称（可选）
     * @param {string} [tag] 标识（可选）
     * @returns {*}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.getItem = function (name, tag) {
        var _item = {};
        Object.assign(this._getItem(this.items, name, tag));
        return _item;
    };
    /**
     *
     *
     * @private
     * @param {Array<any>} items
     * @param {string} [name]
     * @param {string} [tag]
     * @returns {*}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype._getItem = function (items, name, tag) {
        var _this_1 = this;
        var _item = {};
        items.some(function (item) {
            if (Object.is(item.name, name)) {
                Object.assign(_item, item);
                return true;
            }
            if (Object.is(item.tag, tag)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items) {
                var subItem = _this_1._getItem(item.items, name, tag);
                if (Object.keys(subItem).length > 0) {
                    Object.assign(_item, subItem);
                    return true;
                }
            }
        });
        return _item;
    };
    /**
     * 设置工具栏按钮是否启用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.setItemDisabled = function (name, disabled) {
        this.items.some(function (item) {
            if (Object.is(item.name, name)) {
                item.disabled = disabled;
                return true;
            }
        });
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
