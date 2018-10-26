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
 * 工具栏
 *
 * @class IBizToolbar
 * @extends {IBizControl}
 */
var IBizToolbar = /** @class */ (function (_super) {
    __extends(IBizToolbar, _super);
    /**
     * Creates an instance of IBizToolbar.
     * 创建IBizToolbar的一个实例。
     *
     * @param {*} [opts={}]
     * @memberof IBizToolbar
     */
    function IBizToolbar(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 工具栏按钮
         *
         * @type {Array<any>}
         * @memberof IBizToolbar
         */
        _this_1.items = {};
        var _this = _this_1;
        _this.regToolBarItems();
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
        if (!this.items) {
            this.items = {};
        }
        if (Object.keys(item).length > 0 && !Object.is(item.name, '')) {
            item.dataaccaction = true;
            this.items[item.name] = item;
        }
        if (item.menu && item.menu.length > 0) {
            var _menus = item.menu.slice();
            _menus.forEach(function (menu) {
                _this_1.regToolBarItem(menu);
            });
        }
    };
    /**
     * 获取工具栏按钮
     *
     * @returns {Array<any>}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.getItems = function () {
        if (!this.items) {
            this.items = {};
        }
        return this.items;
    };
    /**
     * 设置工具栏按钮项是否启用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.setItemDisabled = function (name, disabled) {
        if (this.items[name]) {
            this.items[name].disabled = disabled;
        }
    };
    /**
     * 更新权限
     *
     * @param {any} action
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.updateAccAction = function (action) {
        var _this_1 = this;
        if (action === void 0) { action = {}; }
        var _itemsName = Object.keys(this.items);
        _itemsName.forEach(function (name) {
            var priv = _this_1.items[name].priv;
            if ((priv && !Object.is(priv, '')) && (action && Object.keys(action).length > 0 && action[priv] !== 1)) {
                _this_1.items[name].dataaccaction = false;
            }
            else {
                _this_1.items[name].dataaccaction = true;
            }
        });
    };
    /**
     * 工具栏导出功能设置
     *
     * @param {string} type
     * @param {string} [itemTag]
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.itemExportExcel = function (type, itemTag) {
        // tslint:disable-next-line:prefer-const
        var params = { tag: type };
        if (itemTag && Object.is(itemTag, 'all')) {
            Object.assign(params, { itemTag: 'all' });
        }
        else if (itemTag && Object.is(itemTag, 'custom')) {
            if (!this.exportStartPage || !this.exportEndPage) {
                this.iBizNotification.warning('警告', '请输入起始页');
                return;
            }
            var startPage = Number.parseInt(this.exportStartPage, 10);
            var endPage = Number.parseInt(this.exportEndPage, 10);
            if (Number.isNaN(startPage) || Number.isNaN(endPage)) {
                this.iBizNotification.warning('警告', '请输入有效的起始页');
                return;
            }
            if (startPage < 1 || endPage < 1 || startPage > endPage) {
                this.iBizNotification.warning('警告', '请输入有效的起始页');
                return;
            }
            Object.assign(params, { exportPageStart: startPage, exportPageEnd: endPage, itemTag: 'custom' });
        }
        this.fire(IBizToolbar.ITEMCLICK, params);
    };
    /**
     * 点击按钮
     *
     * @param {string} type  界面行为类型
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.itemclick = function (name, type) {
        if (Object.is(type, 'ToggleRowEdit')) {
            this.items[name].rowedit = !this.items[name].rowedit;
            this.items[name].caption = this.items[name].rowedit ? '启用行编辑' : '关闭行编辑';
        }
        this.fire(IBizToolbar.ITEMCLICK, { tag: type });
    };
    /**
     * 点击按钮事件
     *
     * @static
     * @memberof IBizToolbar
     */
    IBizToolbar.ITEMCLICK = 'ITEMCLICK';
    return IBizToolbar;
}(IBizControl));
