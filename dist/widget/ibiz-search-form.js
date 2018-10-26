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
 * 搜索表单
 *
 * @class IBizSearchForm
 * @extends {IBizForm}
 */
var IBizSearchForm = /** @class */ (function (_super) {
    __extends(IBizSearchForm, _super);
    /**
     * Creates an instance of IBizSearchForm.
     * 创建 IBizSearchForm 实例
     *
     * @param {*} [opt={}]
     * @memberof IBizSearchForm
     */
    function IBizSearchForm(opt) {
        if (opt === void 0) { opt = {}; }
        var _this = _super.call(this, opt) || this;
        /**
         * 是搜重置搜索
         *
         * @type {boolean}
         * @memberof IBizSearchForm
         */
        _this.bResetting = false;
        /**
         * 是否有更多搜索
         *
         * @memberof IBizSearchForm
         */
        _this.searchMore = false;
        /**
         * 搜索表单是否打开
         *
         * @type {boolean}
         * @memberof IBizSearchForm
         */
        _this.opened = false;
        return _this;
    }
    /**
     * 表单类型
     *
     * @returns {string}
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.getFormType = function () {
        return 'SEARCHFORM';
    };
    /**
     * 更多搜索
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.toggleSearchMore = function () {
        this.searchMore = !this.searchMore;
    };
    /**
     * 执行搜索功能
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.onSearch = function () {
        this.fire(IBizSearchForm.FORMSEARCHED, null);
    };
    /**
     * 重置表单
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.onReset = function () {
        this.bResetting = true;
        this.reset();
    };
    /**
     * 搜索表单草稿加载完成
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.onDraftLoaded = function () {
        _super.prototype.onDraftLoaded.call(this);
        if (this.bResetting) {
            this.bResetting = false;
            this.fire(IBizSearchForm.FORMRESETED, null);
        }
    };
    /**
     * 搜索表单加载完成
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this.bResetting) {
            this.bResetting = false;
            this.fire(IBizSearchForm.FORMRESETED, null);
        }
    };
    /**
     * 搜索功能是否支持,全支持
     *
     * @returns {boolean}
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.isOpen = function () {
        // return this.opened;
        return true;
    };
    /**
     * 设置搜索表单是否展开
     *
     * @param {boolean} open
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.setOpen = function (open) {
        this.opened = open;
    };
    /**
     * 关闭搜索功能
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.close = function () {
        this.opened = false;
    };
    /*****************事件声明************************/
    /**
     * 搜索表单重置事件
     */
    IBizSearchForm.FORMRESETED = 'FORMRESETED';
    /**
     * 搜索表单搜索事件
     */
    IBizSearchForm.FORMSEARCHED = 'FORMSEARCHED';
    /**
     * 搜索表单收缩事件
     */
    IBizSearchForm.FORMCONTRACT = 'FORMCONTRACT';
    return IBizSearchForm;
}(IBizForm));
