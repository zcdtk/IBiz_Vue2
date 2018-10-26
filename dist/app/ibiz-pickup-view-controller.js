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
 * @export
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
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 按钮文本--确定
         *
         * @type {string}
         * @memberof IBizPickupViewController IBizMianViewController
         */
        _this_1.okBtnText = '确定';
        /**
         * 按钮文本--取消
         *
         * @type {string}
         * @memberof IBizPickupViewController
         */
        _this_1.cancelBtnText = '取消';
        /**
         * 是否选中
         *
         * @type {boolean}
         * @memberof IBizPickupViewController
         */
        _this_1.isSelect = false;
        return _this_1;
    }
    IBizPickupViewController.prototype.init = function (opts) {
        if (opts === void 0) { opts = {}; }
        _super.prototype.init.call(this, opts);
        var _this = this;
        var pickupViewPanel = _this.getPickupViewPanel();
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
    // /**
    //  * 视图部件初始化
    //  *
    //  * @memberof IBizPickupViewController
    //  */
    // public onInitComponents(): void {
    //     // super.onInitComponents();
    //     const pickupViewPanel = this.getPickupViewPanel();
    //     if (pickupViewPanel) {
    //         // 选择视图面板数据选中
    //         pickupViewPanel.on(IBizPickupViewPanel.SELECTIONCHANGE).subscribe((args) => {
    //             this.onSelectionChange(args);
    //         });
    //         // 选择视图面板数据激活
    //         pickupViewPanel.on(IBizPickupViewPanel.DATAACTIVATED).subscribe((args) => {
    //             this.onDataActivated(args);
    //         });
    //     }
    // }
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
        // this.modalViewDataChange({ ret: 'DATACHANGE', data: pickupViewPanel.getSelections() });
        // this.closeWindow();
    };
    /**
     * 取消显示选择视图
     *
     * @param {string} type
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onClickCancelButton = function (type) {
        // this.closeModal();
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
        return this.controls.get('pickupviewpanel');
    };
    return IBizPickupViewController;
}(IBizMainViewController));
