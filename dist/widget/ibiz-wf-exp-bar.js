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
 * 工作流树导航部件
 *
 * @class IBizWFExpBar
 * @extends {IBizControl}
 */
var IBizWFExpBar = /** @class */ (function (_super) {
    __extends(IBizWFExpBar, _super);
    /**
     * Creates an instance of IBizWFExpBar.
     * 创建 IBizWFExpBar 实例
     *
     * @param {*} [otps={}]
     * @memberof IBizWFExpBar
     */
    function IBizWFExpBar(otps) {
        if (otps === void 0) { otps = {}; }
        var _this_1 = _super.call(this, otps) || this;
        /**
     * 导航树部件是否收缩，默认展开
     *
     * @type {boolean}
     * @memberof IBizWFExpBarService
     */
        _this_1.isCollapsed = true;
        /**
         * 导航菜单数据项
         *
         * @type {Array<any>}
         * @memberof IBizWFExpBarService
         */
        _this_1.items = [];
        /**
         * 选中菜单项
         *
         * @type {*}
         * @memberof IBizWFExpBarService
         */
        _this_1.selectItem = {};
        _this_1.opens = [];
        var _this = _this_1;
        if (_this.getViewController()) {
            var viewController_1 = _this.getViewController();
            viewController_1.on(IBizViewController.INITED).subscribe(function () {
                _this.UICounter = viewController_1.uicounters.get(_this.getUICounterName());
                _this.onCounterChanged(_this.items);
                _this.UICounter.on(IBizCounter.COUNTERCHANGED).subscribe(function (data) {
                    _this.onCounterChanged(_this.items);
                });
            });
        }
        return _this_1;
    }
    /**
     * 加载导航树数据
     *
     * @param {*} _opt
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.load = function (_opt) {
        var _this_1 = this;
        var _this = this;
        var opts = {};
        Object.assign(opts, _opt);
        Object.assign(opts, { srfaction: 'fetch', srfctrlid: this.getName() });
        _this.iBizHttp.post(this.getBackendUrl(), opts).subscribe(function (result) {
            if (result.ret === 0) {
                // this.items = result.items;
                _this_1.onCounterChanged(result.items);
                _this_1.formarItems(_this_1.items);
                _this_1.items = result.items.slice();
                // this.fire(IBizTreeExpBar.LOADED, this.items[0]);
            }
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * 格式化数据项
     *
     * @private
     * @param {*} _items
     * @returns {*}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.formarItems = function (_items) {
        var _this = this;
        _items.forEach(function (item) {
            if (item.checked) {
                Object.assign(_this.selectItem, item);
            }
            item.bchecked = item.checked ? true : false;
            if (item.items) {
                var hasItemCheck = _this.formarItems(item.items);
                if (hasItemCheck) {
                    item.expanded = true;
                }
                _this.opens.push(item.id);
            }
            item.hassubmenu = item.items ? true : false;
        });
    };
    /**
     * 菜单项选中处理
     *
     * @param {*} item
     * @returns {void}
     * @memberof IBizTreeExpBarService
     */
    IBizWFExpBar.prototype.selection = function (item) {
        if (item === void 0) { item = {}; }
        if (item.items && item.items.length > 0) {
            return;
        }
        if (Object.is(item.id, this.selectItem.id)) {
            return;
        }
        this.selectItem = {};
        Object.assign(this.selectItem, item);
        this.fire(IBizTreeExpBar.SELECTIONCHANGE, this.selectItem);
    };
    /**
     * 菜单节点选中处理
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.expandedAndSelectSubMenu = function (item) {
        if (item === void 0) { item = {}; }
        if (Object.is(item.id, this.selectItem.id)) {
            return;
        }
        this.selectItem = {};
        Object.assign(this.selectItem, item);
        this.fire(IBizTreeExpBar.SELECTIONCHANGE, this.selectItem);
    };
    /**
     * 获取计数器名称
     * 在发布器中重写
     *
     * @returns {string}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.getUICounterName = function () {
        return undefined;
    };
    /**
     * 设置选中项
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.setSelectItem = function (item) {
        if (item === void 0) { item = {}; }
        if (item && !Object.is(item.id, this.selectItem.id)) {
            this.selectItem = {};
            Object.assign(this.selectItem, item);
        }
    };
    /**
     * 计数器值变化
     *
     * @private
     * @returns {void}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.onCounterChanged = function (items) {
        if (!this.UICounter) {
            return;
        }
        var data = this.UICounter.getData();
        if (!data) {
            return;
        }
        var bNeedReSelect = this.itemSelect(items, data);
        if (bNeedReSelect) {
            this.selectItem = {};
            Object.assign(this.selectItem, this.items[0]);
            this.fire(IBizTreeExpBar.SELECTIONCHANGE, this.selectItem);
        }
    };
    /**
     * 选中项
     *
     * @private
     * @param {Array<any>} items
     * @param {*} [data={}]
     * @returns {boolean}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.itemSelect = function (items, data) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var bNeedReSelect = false;
        items.forEach(function (item) {
            var counterid = item.counterid;
            var countermode = item.countermode;
            item.show = true;
            var count = data[counterid];
            if (!count) {
                count = 0;
            }
            if (count === 0 && countermode && countermode === 1) {
                item.show = false;
                // 判断是否选中列，如果是则重置选中
                if (_this_1.selectItem && Object.is(_this_1.selectItem.id, item.id)) {
                    bNeedReSelect = true;
                }
            }
            item.counterdata = count;
            if (item.items) {
                bNeedReSelect = _this_1.itemSelect(item.items, data);
            }
        });
        return bNeedReSelect;
    };
    /**
     * 获取数据项
     *
     * @returns {Array<any>}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.getItems = function () {
        return this.items;
    };
    return IBizWFExpBar;
}(IBizControl));
