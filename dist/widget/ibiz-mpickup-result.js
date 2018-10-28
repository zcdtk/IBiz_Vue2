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
 * 多项选择结果集合控件服务对象
 *
 * @class IBizMPickupResult
 * @extends {IBizControl}
 */
var IBizMPickupResult = /** @class */ (function (_super) {
    __extends(IBizMPickupResult, _super);
    /**
     * Creates an instance of IBizMPickupResult.
     * 创建 IBizMPickupResult 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizMPickupResult
     */
    function IBizMPickupResult(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 按钮文本--数据选中
         *
         * @type {string}
         * @memberof IBizMPickupResult
         */
        _this.onRightText = '选中';
        /**
         * 按钮文本--取消选中
         *
         * @type {string}
         * @memberof IBizMPickupResult
         */
        _this.onLeftText = '取消';
        /**
         * 按钮文本--全部选中
         *
         * @type {string}
         * @memberof IBizMPickupResult
         */
        _this.onAllRightText = '全部选中';
        /**
         * 按钮文本--取消全部选中
         *
         * @type {string}
         * @memberof IBizMPickupResult
         */
        _this.onAllLeftText = '全部取消';
        /**
         * 当前结果数据中选中数据
         *
         * @type {Array<any>}
         * @memberof IBizMPickupResult
         */
        _this.resSelecttions = [];
        /**
         * 多项数据结果集中所有数据
         *
         * @type {Array<any>}
         * @memberof IBizMPickupResult
         */
        _this.selections = [];
        /**
         * 当前表格选中数据
         *
         * @type {Array<any>}
         * @memberof IBizMPickupResult
         */
        _this.curSelecttions = [];
        /**
         * 当前表格所有数据
         *
         * @private
         * @type {Array<any>}
         * @memberof IBizMPickupResult
         */
        _this.allData = [];
        return _this;
    }
    /**
     * 结果集数据选中
     *
     * @param {*} [item={}]
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.resultSelect = function (item) {
        if (item === void 0) { item = {}; }
        if (Object.keys(item).length === 0) {
            return;
        }
        var index = this.resSelecttions.findIndex(function (select) { return Object.is(item.srfkey, select.srfkey); });
        if (index === -1) {
            this.resSelecttions.push(item);
            item.select = true;
        }
        else {
            this.resSelecttions.splice(index, 1);
            item.select = false;
        }
    };
    /**
     * 结果数据选中激活
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.dataActivated = function (item) {
        if (item === void 0) { item = {}; }
        if (Object.keys(item).length === 0) {
            return;
        }
        var index = this.selections.findIndex(function (select) { return Object.is(item.srfkey, select.srfkey); });
        this.selections.splice(index, 1);
        var _index = this.resSelecttions.findIndex(function (select) { return Object.is(item.srfkey, select.srfkey); });
        if (_index !== -1) {
            this.resSelecttions.splice(_index, 1);
        }
        item.select = false;
    };
    /**
     * 移除结果数据中已选中数据
     *
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.onLeftClick = function () {
        var _this = this;
        this.resSelecttions.forEach(function (item) {
            var index = _this.selections.findIndex(function (select) { return Object.is(item.srfkey, select.srfkey); });
            if (index !== -1) {
                _this.selections.splice(index, 1);
            }
        });
        this.resSelecttions = [];
    };
    /**
     * 添加表格选中数据至结果数据中
     *
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.onRightClick = function () {
        var _this = this;
        this.curSelecttions.forEach(function (item) {
            var index = _this.selections.findIndex(function (select) { return Object.is(item.srfkey, select.srfkey); });
            if (index === -1) {
                item.select = false;
                _this.selections.push(item);
            }
        });
    };
    /**
     * 将所有表格数据添加到结果数据中
     *
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.onRightAllClick = function () {
        var _this = this;
        this.allData.forEach(function (item) {
            var index = _this.selections.findIndex(function (select) { return Object.is(item.srfkey, select.srfkey); });
            if (index === -1) {
                item.select = false;
                _this.selections.push(item);
            }
        });
    };
    /**
     * 移除所有结果数据
     *
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.onLeftAllClick = function () {
        this.selections = [];
        this.resSelecttions = [];
    };
    /**
     * 获取选中值
     *
     * @returns {Array<any>}
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.getSelections = function () {
        var sele = [];
        sele = this.selections.slice();
        return sele;
    };
    /**
     * 添加结果数据中的选中数据
     *
     * @param {Array<any>} items
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.appendDatas = function (items) {
        var _this = this;
        items.forEach(function (item) {
            var index = _this.selections.findIndex(function (data) { return Object.is(data.srfkey, item.srfkey); });
            if (index === -1) {
                item.select = false;
                _this.selections.push(item);
            }
        });
    };
    /**
     * 设置设置当前选中数据
     *
     * @param {Array<any>} data
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.setCurSelections = function (data) {
        this.curSelecttions = [];
        this.curSelecttions = data.slice();
    };
    /**
     * 设置当前表格所有数据
     *
     * @param {Array<any>} data
     * @memberof IBizMPickupResult
     */
    IBizMPickupResult.prototype.setAllData = function (data) {
        this.curSelecttions = [];
        this.allData = [];
        this.allData = data.slice();
    };
    return IBizMPickupResult;
}(IBizControl));
