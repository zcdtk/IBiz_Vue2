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
     * 父数据
     *
     * @memberof IBizPickupGridViewController
     */
    // @Input()
    // set parentData(parentData: any) {
    //     if (parentData) {
    //         this.setParentData(parentData);
    //         this.onRefresh();
    //     }
    // }
    /**
     * 是否支持多项数据选择
     *
     * @type {boolean}
     * @memberof IBizPickupGridViewController
     */
    // @Input()
    // multiselect: boolean;
    /**
     * 当前选择数据
     *
     * @type {*}
     * @memberof IBizPickupGridViewController
     */
    // @Input()
    // currentValue: any;
    /**
     * 删除数据
     *
     * @type {*}
     * @memberof IBizPickupGridViewController
     */
    // @Input()
    // deleteData: any;
    /**
     * 数据选中事件，向外输出处理
     *
     * @type {EventEmitter<any>}
     * @memberof IBizPickupGridViewController
     */
    // @Output()
    // selectionChange: EventEmitter<any> = new EventEmitter();
    /**
     * 行数据激活事件，向外输出处理
     *
     * @type {EventEmitter<any>}
     * @memberof IBizPickupGridViewController
     */
    // @Output()
    // dataActivated: EventEmitter<any> = new EventEmitter();
    /**
     * 多数据部件加载所有数据
     *
     * @type {EventEmitter<any>}
     * @memberof IBizPickupGridViewController
     */
    // @Output()
    // allData: EventEmitter<any> = new EventEmitter();
    /**
     * Creates an instance of IBizPickupGridViewController.
     * 创建 IBizPickupGridViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizPickupGridViewController
     */
    function IBizPickupGridViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 部件初始化完成
     *
     * @param {*} opt
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onStoreLoad = function (opt) {
        _super.prototype.onStoreLoad.call(this, opt);
        // if (this.multiselect && Array.isArray(opt)) {
        //     this.allData.emit(opt);
        // }
    };
    /**
     * 视图部件初始化完成
     *
     * @memberof IBizPickupGridViewController
     */
    // public onInited(): void {
    //     super.onInited();
    //     const grid: any = this.getGrid();
    //     if (grid) {
    //         grid.setMultiSelect(this.multiselect);
    //     }
    // }
    /**
     * 获取多数据对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizPickupGridViewController.prototype.getMDCtrl = function () {
        return this.controls.get('grid');
    };
    /**
     * 数据选择事件触发，提交选中数据
     *
     * @param {Array<any>} selection
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onSelectionChange = function (selection) {
        // this.selectionChange.emit(selection);
        var _this = this;
        _this.$vue.emit('selection-change', selection);
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
        var _this = this;
        if (Object.keys(data).length === 0) {
            return;
        }
        // _this.dataActivated.emit([data]);
        _this.$vue.emit('data-activated', [data]);
    };
    return IBizPickupGridViewController;
}(IBizGridViewController));
