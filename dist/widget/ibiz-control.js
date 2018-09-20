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
        return _super.call(this, opts) || this;
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
    return IBizControl;
}(IBizObject));
