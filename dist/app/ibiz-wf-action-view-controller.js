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
 * 工作流交互视图控制器
 *
 * @class IBizWFActionViewController
 * @extends {IBizWFEditViewController}
 */
var IBizWFActionViewController = /** @class */ (function (_super) {
    __extends(IBizWFActionViewController, _super);
    /**
     * Creates an instance of IBizWFActionViewController.
     * 创建 IBizWFActionViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizWFActionViewController
     */
    function IBizWFActionViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 工作流提交
     *
     * @memberof IBizWFActionViewController
     */
    IBizWFActionViewController.prototype.onFormWFSubmitted = function () {
        _super.prototype.onFormWFSubmitted.call(this);
    };
    /**
     * 工作流提交
     *
     * @memberof IBizWFActionViewController
     */
    IBizWFActionViewController.prototype.onClickOkButton = function () {
        var form = this.getForm();
        if (form) {
            form.wfsubmit(this.getViewParam());
        }
    };
    /**
     * 关闭工作流操作界面
     *
     * @memberof IBizWFActionViewController
     */
    IBizWFActionViewController.prototype.onClickCancelButton = function () {
        this.closeWindow();
    };
    return IBizWFActionViewController;
}(IBizWFEditViewController));
