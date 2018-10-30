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
 * 表单成员按钮
 *
 * @class IBizFormButton
 * @extends {IBizFormItem}
 */
var IBizFormButton = /** @class */ (function (_super) {
    __extends(IBizFormButton, _super);
    /**
     * Creates an instance of IBizFormButton.
     * 创建 IBizFormButton 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormButton
     */
    function IBizFormButton(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 实体界面行为
         *
         * @private
         * @type {*}
         * @memberof IBizFormButton
         */
        _this.uiaction = {};
        /**
         * 表单项更新
         *
         * @private
         * @type {*}
         * @memberof IBizFormButton
         */
        _this.fiupdate = {};
        _this.actiontype = opts.actiontype;
        if (opts.uiaction) {
            Object.assign(_this.uiaction, opts.uiaction);
        }
        if (opts.fiupdate) {
            Object.assign(_this.fiupdate, opts.fiupdate);
        }
        return _this;
    }
    /**
     * 表单成员按钮事件
     *
     * @returns {void}
     * @memberof IBizFormButton
     */
    IBizFormButton.prototype.onClick = function () {
        var form = this.getForm();
        if (!form) {
            return;
        }
        var viewController = form.getViewController();
        if (Object.is(this.actiontype, 'UIACTION') && viewController && Object.keys(this.uiaction).length > 0) {
            var uiaction = viewController.getUIAction(this.uiaction.tag);
            viewController.doUIAction(uiaction);
        }
        if (Object.is(this.actiontype, 'FIUPDATE') && Object.keys(this.fiupdate).length > 0) {
            form.updateFormItems(this.fiupdate.tag);
        }
    };
    return IBizFormButton;
}(IBizFormItem));
