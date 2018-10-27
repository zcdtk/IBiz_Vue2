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
 * 单项选择视图控制器
 *
 * @class IBizPickupViewController
 * @extends {IBizMainViewController}
 */
var IBizPickupViewController = /** @class */ (function (_super) {
    __extends(IBizPickupViewController, _super);
    /**
     * Creates an instance of IBizPickupViewController.
     * 创建 IBizPickupViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizPickupViewController
     */
    function IBizPickupViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 按钮文本--确定
         *
         * @type {string}
         * @memberof IBizPickupViewController
         */
        _this.okBtnText = '确定';
        /**
         * 按钮文本--取消
         *
         * @type {string}
         * @memberof IBizPickupViewController
         */
        _this.cancelBtnText = '取消';
        /**
         * 是否选中
         *
         * @type {boolean}
         * @memberof IBizPickupViewController
         */
        _this.isSelect = false;
        return _this;
    }
    /**
     * 视图部件初始化
     *
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var pickupViewPanel = this.getPickupViewPanel();
        if (pickupViewPanel) {
            // 选择视图面板数据选中
            pickupViewPanel.on(IBizPickupViewPanel.SELECTIONCHANGE).subscribe(function (args) {
                _this.onSelectionChange(args);
            });
            // 选择视图面板数据激活
            pickupViewPanel.on(IBizPickupViewPanel.DATAACTIVATED).subscribe(function (args) {
                _this.onDataActivated(args);
            });
        }
    };
    /**
     * 数据选择，确定功能
     *
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onClickOkButton = function () {
        var pickupViewPanel = this.getPickupViewPanel();
        if (!pickupViewPanel) {
            return;
        }
        if (pickupViewPanel.getSelections().length !== 1) {
            return;
        }
        // this.nzModalSubject.next({ ret: 'OK', selection: pickupViewPanel.getSelections() });
        // this.nzModalSubject.next('DATACHANGE');
        // this.closeWindow();
        this.closeModal({ ret: 'OK', selections: pickupViewPanel.getSelections() });
    };
    /**
     * 取消显示选择视图
     *
     * @param {string} type
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onClickCancelButton = function (type) {
        // this.nzModalSubject.destroy(type);
        this.closeModal();
    };
    /**
     * 接收选择视图数据传递
     *
     * @param {Array<any>} args
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onSelectionChange = function (args) {
        this.isSelect = args.length > 0 ? true : false;
    };
    /**
     * 数据选中激活
     *
     * @param {Array<any>} args
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onDataActivated = function (args) {
        this.onSelectionChange(args);
        this.onClickOkButton();
    };
    /**
     * 获取选择视图面板
     *
     * @returns {*}
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.getPickupViewPanel = function () {
        return this.getControl('pickupviewpanel');
    };
    return IBizPickupViewController;
}(IBizMainViewController));
