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
 * 表单属性项
 *
 * @class IBizFormField
 * @extends {IBizFormItem}
 */
var IBizFormField = /** @class */ (function (_super) {
    __extends(IBizFormField, _super);
    /**
     * Creates an instance of IBizFormField.
     * 创建 IBizFormField 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormField
     */
    function IBizFormField(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * label 宽度
         *
         * @type {number}
         * @memberof IBizFormField
         */
        _this_1.labelWidth = 130;
        /**
         * 实体属性输入旧值
         *
         * @private
         * @type {string}
         * @memberof IBizFormField
         */
        _this_1.oldVal = '';
        /**
         * 数据流观察对象
         *
         * @private
         * @type {Subject<any>}
         * @memberof IBizFormField
         */
        _this_1.subject = new rxjs.Subject();
        /**
         * 编辑器参数
         *
         * @type {*}
         * @memberof IBizFormField
         */
        _this_1.editorParams = {};
        var _this = _this_1;
        _this.labelWidth = opts.labelWidth;
        if (opts.editorParams) {
            Object.assign(_this_1.editorParams, opts.editorParams);
        }
        // 停止输入值间隔500 毫秒，进行值绑定
        _this.subject.pipe(rxjs.operators.debounceTime(500), rxjs.operators.distinctUntilChanged(function (o, n) {
            if (o === void 0) { o = {}; }
            if (n === void 0) { n = {}; }
            return !Object.is(o.oldVal, o.newVal) && !Object.is(n.oldVal, n.newVal)
                && Object.is(o.oldVal, n.oldVal) && Object.is(o.newVal, n.newVal);
        })).subscribe(function (data) {
            if (data === void 0) { data = {}; }
            _this.setOldValue(data.oldVal);
            _this.setValue(data.newVal);
        });
        return _this_1;
    }
    /**
     * 设置旧值
     *
     * @param {string} val
     * @memberof IBizFormField
     */
    IBizFormField.prototype.setOldValue = function (val) {
        var _this = this;
        _this.oldVal = val;
    };
    /**
     * 获取旧值
     *
     * @returns {string}
     * @memberof IBizFormField
     */
    IBizFormField.prototype.getOldValue = function () {
        var _this = this;
        return _this.oldVal;
    };
    /**
     * 属性值变化
     *
     * @param {*} event
     * @memberof IBizFormField
     */
    IBizFormField.prototype.valueChange = function (event) {
        var _this = this;
        if (!event || !event.target) {
            return;
        }
        var target = event.target;
        var oldVal = target._value;
        var newVal = target.value;
        if ((typeof newVal !== 'string')) {
            oldVal = JSON.stringify(oldVal);
        }
        if ((typeof newVal !== 'string')) {
            newVal = JSON.stringify(newVal);
        }
        _this.subject.next({ oldVal: oldVal, newVal: newVal });
    };
    return IBizFormField;
}(IBizFormItem));
