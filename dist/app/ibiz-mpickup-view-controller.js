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
 * 多项数据选择视图控制器
 *
 * @class IBizMPickupViewController
 * @extends {IBizMainViewController}
 */
var IBizMPickupViewController = /** @class */ (function (_super) {
    __extends(IBizMPickupViewController, _super);
    /**
     * Creates an instance of IBizMPickupViewController.
     * 创建 IBizMPickupViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizMPickupViewController
     */
    function IBizMPickupViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 按钮文本--确定
         *
         * @type {string}
         * @memberof IBizMPickupViewController
         */
        _this.okBtnText = '确定';
        /**
         * 按钮文本--取消
         *
         * @type {string}
         * @memberof IBizMPickupViewController
         */
        _this.cancelBtnText = '取消';
        /**
         * 多项选择数据集服务对象
         *
         * @type {IBizMPickupResult}
         * @memberof IBizMPickupViewController
         */
        _this.MPickupResult = null;
        _this.MPickupResult = new IBizMPickupResult({
            name: 'mpickupresult',
            viewController: _this,
            url: opts.url,
        });
        _this.regControl('mpickupresult', _this.MPickupResult);
        return _this;
    }
    /**
     * 视图部件初始化
     *
     * @memberof IBizMPickupViewController
     */
    IBizMPickupViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var pickupViewPanel = this.getPickupViewPanel();
        if (pickupViewPanel && this.MPickupResult) {
            // 选择视图面板数据选中
            pickupViewPanel.on(IBizPickupViewPanel.SELECTIONCHANGE).subscribe(function (args) {
                _this.MPickupResult.setCurSelections(args);
            });
            // 选择视图面板数据激活
            pickupViewPanel.on(IBizPickupViewPanel.DATAACTIVATED).subscribe(function (args) {
                _this.MPickupResult.appendDatas(args);
            });
            // 选择视图面板所有数据
            pickupViewPanel.on(IBizPickupViewPanel.ALLDATA).subscribe(function (args) {
                _this.MPickupResult.setAllData(args);
            });
        }
    };
    /**
     * 处理视图参数
     *
     * @memberof IBizMPickupViewController
     */
    IBizMPickupViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        if (this.getViewParam() && Array.isArray(this.getViewParam().selectedData)) {
            if (this.MPickupResult) {
                this.MPickupResult.appendDatas(this.getViewParam().selectedData);
            }
        }
    };
    /**
     * 数据选择，确定功能
     *
     * @memberof IBizPickupViewController
     */
    IBizMPickupViewController.prototype.onClickOkButton = function () {
        if (this.MPickupResult.selections.length === 0) {
            return;
        }
        // this.nzModalSubject.next({ ret: 'OK', selection: this.MPickupResult.selections });
        // this.nzModalSubject.next('DATACHANGE');
        // this.closeWindow();
    };
    /**
     * 关闭显示选择视图
     *
     * @param {*} type
     * @memberof IBizMPickupViewController
     */
    IBizMPickupViewController.prototype.onClickCancelButton = function (type) {
        // this.nzModalSubject.destroy(type);
    };
    /**
     * 获取选中视图面板
     *
     * @returns {*}
     * @memberof IBizMPickupViewController
     */
    IBizMPickupViewController.prototype.getPickupViewPanel = function () {
        return this.getControl('pickupviewpanel');
    };
    return IBizMPickupViewController;
}(IBizMainViewController));
