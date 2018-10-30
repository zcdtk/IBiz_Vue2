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
 * 选择表格视图控制器（部件视图）
 *
 * @class IBizPickupGridViewController
 * @extends {IBizGridViewController}
 */
var IBizPickupGridViewController = /** @class */ (function (_super) {
    __extends(IBizPickupGridViewController, _super);
    /**
     * Creates an instance of IBizPickupGridViewController.
     * 创建 IBizPickupGridViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizPickupGridViewController
     */
    function IBizPickupGridViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 父数据  <Input>
         *
         * @private
         * @type {*}
         * @memberof IBizPickupGridViewController
         */
        _this.parentData = null;
        /**
         * 是否支持多项数据选择  <Input>
         *
         * @private
         * @type {boolean}
         * @memberof IBizPickupGridViewController
         */
        _this.multiselect = true;
        /**
         *  当前选择数据 <Input>
         *
         * @private
         * @type {*}
         * @memberof IBizPickupGridViewController
         */
        _this.currentValue = null;
        /**
         * 删除数据 <Input>
         *
         * @private
         * @type {*}
         * @memberof IBizPickupGridViewController
         */
        _this.deleteData = null;
        /**
         * 数据选中事件 <Output>
         *
         * @private
         * @type {string}
         * @memberof IBizPickupGridViewController
         */
        _this.selectionChange = 'selectionChange';
        /**
         * 行数据激活事件 <Output>
         *
         * @private
         * @type {string}
         * @memberof IBizPickupGridViewController
         */
        _this.dataActivated = 'dataActivated';
        /**
         * 多数据部件加载所有数据 <Output>
         *
         * @private
         * @type {string}
         * @memberof IBizPickupGridViewController
         */
        _this.allData = 'allData';
        return _this;
    }
    /**
     * 解析视图参数，初始化调用
     *
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.parseViewParams = function () {
        _super.prototype.parseViewParams.call(this);
        if (this.$vue.parentData) {
            this.parentData = this.$vue.parentData;
        }
        if (this.$vue.multiselect) {
            this.multiselect = this.$vue.multiselect;
        }
        if (this.$vue.currentValue) {
            this.currentValue = this.$vue.currentValue;
        }
        if (this.$vue.deleteData) {
            this.deleteData = this.$vue.deleteData;
        }
    };
    /**
     * 部件初始化完成
     *
     * @param {*} opt
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onStoreLoad = function (opt) {
        _super.prototype.onStoreLoad.call(this, opt);
        if (this.multiselect && Array.isArray(opt)) {
            // this.allData.emit(opt);
            this.$vue.$emit(this.allData, opt);
        }
    };
    /**
     * 视图部件初始化完成
     *
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onInited = function () {
        _super.prototype.onInited.call(this);
        var grid = this.getGrid();
        if (grid) {
            grid.setMultiSelect(this.multiselect);
        }
    };
    /**
     * 获取多数据对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizPickupGridViewController.prototype.getMDCtrl = function () {
        return this.getControl('grid');
    };
    /**
     * 数据选择事件触发，提交选中数据
     *
     * @param {Array<any>} selection
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onSelectionChange = function (selection) {
        // this.selectionChange.emit(selection);
        this.$vue.$emit(this.selectionChange, selection);
    };
    /**
     * 数据被激活<最典型的情况就是行双击>
     *
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onDataActivated = function (data) {
        if (data === void 0) { data = {}; }
        _super.prototype.onDataActivated.call(this, data);
        if (Object.keys(data).length === 0) {
            return;
        }
        // this.dataActivated.emit([data]);
        this.$vue.$emit(this.dataActivated, [data]);
    };
    return IBizPickupGridViewController;
}(IBizGridViewController));
