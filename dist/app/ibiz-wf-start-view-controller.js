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
 * 工作流启动编辑视图
 *
 * @class IBizWFStartViewController
 * @extends {IBizWFEditViewController}
 */
var IBizWFStartViewController = /** @class */ (function (_super) {
    __extends(IBizWFStartViewController, _super);
    /**
     * Creates an instance of IBizWFStartViewController.
     * 创建 IBizWFStartViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizWFStartViewController
     */
    function IBizWFStartViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     *工作流视图启动完成
     *
     * @memberof IBizWFStartViewController
     */
    IBizWFStartViewController.prototype.onFormWFStarted = function () {
        _super.prototype.onFormWFStarted.call(this);
    };
    /**
     * 保存启动表单内容并启动
     *
     * @memberof IBizWFStartViewController
     */
    IBizWFStartViewController.prototype.onClickOkButton = function () {
        this.doSaveAndStart();
    };
    /**
     * 取消启动工作流
     *
     * @memberof IBizWFStartViewController
     */
    IBizWFStartViewController.prototype.onClickCancelButton = function () {
        this.closeWindow();
    };
    return IBizWFStartViewController;
}(IBizWFEditViewController));
