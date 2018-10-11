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
 * 控制器对象基类
 *
 * @class IBizControl
 * @extends {IBizObject}
 */
var IBizControl = /** @class */ (function (_super) {
    __extends(IBizControl, _super);
    /**
     * Creates an instance of IBizControl.
     * 创建 IBizControl 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizControl
     */
    function IBizControl(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.backendurl = '';
        _this_1.loading = false;
        var _this = _this_1;
        _this.backendurl = opts.backendurl;
        _this.viewController = opts.viewController;
        return _this_1;
    }
    IBizControl.prototype.load = function (params) {
    };
    /**
     * 销毁<暂时无效>
     */
    IBizControl.prototype.destroy = function () {
    };
    IBizControl.prototype.setSize = function (width, height) {
    };
    IBizControl.prototype.setWidth = function (width) {
    };
    IBizControl.prototype.setHeight = function (height) {
    };
    IBizControl.prototype.isVisible = function () {
        return true;
    };
    IBizControl.prototype.invoke = function (command, arg) {
        var me = this;
        me.onInvoke(command, arg);
    };
    IBizControl.prototype.onInvoke = function (command, arg) {
    };
    IBizControl.prototype.getViewController = function () {
        return this.viewController;
    };
    IBizControl.prototype.getBackendUrl = function () {
        var url;
        if (this.backendurl && !Object.is(this.backendurl, '')) {
            url = this.backendurl;
        }
        else if (this.getViewController()) {
            var viewController = this.getViewController();
            url = viewController.getBackendUrl();
        }
        return url;
    };
    IBizControl.prototype.beginLoading = function () {
        var _this = this;
        _this.loading = true;
    };
    IBizControl.prototype.endLoading = function () {
        var _this = this;
        _this.loading = false;
    };
    return IBizControl;
}(IBizObject));
