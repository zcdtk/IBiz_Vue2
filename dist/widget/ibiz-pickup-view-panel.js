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
 * 拾取数据视图面板
 *
 * @class IBizPickupViewPanel
 * @extends {IBizViewPanel}
 */
var IBizPickupViewPanel = /** @class */ (function (_super) {
    __extends(IBizPickupViewPanel, _super);
    /**
     * Creates an instance of IBizPickupViewPanel.
     * 创建 IBizPickupViewPanel 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizPickupViewPanel
     */
    function IBizPickupViewPanel(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 父数据
         *
         * @type {*}
         * @memberof IBizPickupViewPanel
         */
        _this.parentData = {};
        /**
         * 选中数据
         *
         * @type {Array<any>}
         * @memberof IBizPickupViewPanel
         */
        _this.selections = [];
        /**
         * 所有数据
         *
         * @type {Array<any>}
         * @memberof IBizPickupViewPanel
         */
        _this.allData = [];
        return _this;
    }
    /**
     * 获取所有数据
     *
     * @returns {Array<any>}
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.getAllData = function () {
        return this.allData;
    };
    /**
     * 获取所有选中数据
     *
     * @returns {Array<any>}
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.getSelections = function () {
        return this.selections;
    };
    /**
     * 数据选中
     *
     * @param {Array<any>} event
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.onSelectionChange = function (event) {
        this.selections = event;
        this.fire(IBizPickupViewPanel.SELECTIONCHANGE, this.selections);
    };
    /**
     * 数据激活
     *
     * @param {Array<any>} event
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.onDataActivated = function (event) {
        this.selections = event;
        this.fire(IBizPickupViewPanel.DATAACTIVATED, this.selections);
    };
    /**
     * 全部数据
     *
     * @param {Array<any>} event
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.onAllData = function (event) {
        this.allData = event;
        this.fire(IBizPickupViewPanel.ALLDATA, this.allData);
    };
    /**
     * 设置父数据
     *
     * @param {*} [parentData={}]
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.setParentData = function (parentData) {
        if (parentData === void 0) { parentData = {}; }
        this.parentData = parentData;
    };
    /**
     * 刷新面板
     *
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.refreshViewPanel = function () {
    };
    /*****************事件声明************************/
    /**
     * 数据选中
     *
     * @static
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.SELECTIONCHANGE = 'SELECTIONCHANGE';
    /**
     * 数据激活
     *
     * @static
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.DATAACTIVATED = 'DATAACTIVATED';
    /**
     * 数据全选
     *
     * @static
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.ALLDATA = 'ALLDATA';
    return IBizPickupViewPanel;
}(IBizViewPanel));
