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
 * 部件对象
 *
 * @class IBizControl
 * @extends {IBizObject}
 */
var IBizControl = /** @class */ (function (_super) {
    __extends(IBizControl, _super);
    /**
     * Creates an instance of IBizControl.
     * 创建 IBizControl 实例。
     *
     * @param {*} [opts={}]
     * @memberof IBizControl
     */
    function IBizControl(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 部件名称
         *
         * @private
         * @type {string}
         * @memberof IBizControl
         */
        _this.name = '';
        /**
         * 后台交互URL
         *
         * @private
         * @type {string}
         * @memberof IBizControl
         */
        _this.url = '';
        /**
         * 视图控制器对象
         *
         * @private
         * @type {*}
         * @memberof IBizControl
         */
        _this.viewController = null;
        /**
         * 部件http请求状态
         *
         * @type {boolean}
         * @memberof IBizControl
         */
        _this.isLoading = false;
        _this.name = opts.name;
        _this.url = opts.url;
        _this.viewController = opts.viewController;
        return _this;
    }
    ;
    /**
     * 获取部件名称
     *
     * @returns {String}
     * @memberof IBizControl
     */
    IBizControl.prototype.getName = function () {
        return this.name;
    };
    /**
     * 获取后台路径
     *
     * @returns {*}
     * @memberof IBizControl
     */
    IBizControl.prototype.getBackendUrl = function () {
        var url = '';
        if (this.url) {
            url = this.url;
        }
        if (this.getViewController()) {
            if (!url) {
                url = this.getViewController().getBackendUrl();
            }
        }
        return url;
    };
    /**
     * 获取视图控制器
     *
     * @returns {*}
     * @memberof IBizControl
     */
    IBizControl.prototype.getViewController = function () {
        if (this.viewController) {
            return this.viewController;
        }
        return undefined;
    };
    /**
     * 部件http请求
     *
     * @private
     * @memberof IBizControl
     */
    IBizControl.prototype.beginLoading = function () {
        this.isLoading = true;
    };
    /**
     * 部件结束http请求
     *
     * @private
     * @memberof IBizControl
     */
    IBizControl.prototype.endLoading = function () {
        this.isLoading = false;
    };
    return IBizControl;
}(IBizObject));
