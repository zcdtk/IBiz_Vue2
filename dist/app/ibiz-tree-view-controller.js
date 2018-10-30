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
 * 树视图视图控制器
 *
 * @class IBizTreeViewController
 * @extends {IBizMDViewController}
 */
var IBizTreeViewController = /** @class */ (function (_super) {
    __extends(IBizTreeViewController, _super);
    /**
     * Creates an instance of IBizTreeViewController.
     * 创建 IBizTreeViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeViewController
     */
    function IBizTreeViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 所有选中树数据
         *
         * @type {*}
         * @memberof IBizTreeViewController
         */
        _this.selectedDatas = [];
        /**
         * 当前选中树数据
         *
         * @type {*}
         * @memberof IBizTreeViewController
         */
        _this.selectedData = {};
        return _this;
    }
    /**
     * 部件初始化
     *
     * @memberof IBizTreeViewController
     */
    IBizTreeViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var tree = this.getTree();
        if (tree) {
            // 树加载完成
            tree.on(IBizTree.CONTEXTMENU).subscribe(function (datas) {
                _this.onTreeLoad(datas);
            });
            // 数据选中
            tree.on(IBizTree.SELECTIONCHANGE).subscribe(function (datas) {
                _this.onSelectionChange(datas);
            });
            // 数据激活
            // tree.on(IBizTree.DATAACTIVATED, (datas) => {
            //     this.onDataActivated(datas);
            // });
        }
    };
    /**
     * 获取多数据部件
     *
     * @returns {*}
     * @memberof IBizTreeViewController
     */
    IBizTreeViewController.prototype.getMDCtrl = function () {
        return this.getTree();
    };
    /**
     * 获取数部件
     *
     * @returns {*}
     * @memberof IBizTreeViewController
     */
    IBizTreeViewController.prototype.getTree = function () {
        return undefined;
    };
    /**
     * 数据部件数据加载完成
     *
     * @param {Array<any>} args
     * @memberof IBizTreeViewController
     */
    IBizTreeViewController.prototype.onTreeLoad = function (args) {
    };
    /**
     * 值选中变化
     *
     * @param {Array<any>} args
     * @memberof IBizTreeViewController
     */
    IBizTreeViewController.prototype.onSelectionChange = function (args) {
        var _this = this;
        if (args.length > 0) {
            var record = args[0];
            var selectedData = { srfkey: record.srfkey, srfmajortext: record.srfmajortext };
            this.selectedData = selectedData;
            this.selectedDatas = [];
            args.forEach(function (item, index) {
                var record = item;
                var selectedData = { srfkey: record.srfkey, srfmajortext: record.srfmajortext };
                if (index == 0) {
                    _this.selectedData = selectedData;
                }
                _this.selectedDatas.push(selectedData);
            });
        }
        else {
            this.selectedData = {};
            this.selectedDatas = [];
        }
        _super.prototype.onSelectionChange.call(this, args);
    };
    return IBizTreeViewController;
}(IBizMDViewController));
