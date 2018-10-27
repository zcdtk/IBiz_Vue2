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
 * 表单属性对象<主要管理属性及其标签的值、可用、显示、必填等操作>
 *
 * @class IBizFormItem
 * @extends {IBizObject}
 */
var IBizFormItem = /** @class */ (function (_super) {
    __extends(IBizFormItem, _super);
    /**
     * Creates an instance of IBizFormItem.
     * 创建 IBizFormItem 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormItem
     */
    function IBizFormItem(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 是否是必填
         *
         * @type {boolean}
         * @memberof IBizFormItem
         */
        _this.allowEmpty = false;
        /**
         * 属性动态配置值<代码表>
         *
         * @type {Array<any>}
         * @memberof IBizFormItem
         */
        _this.config = [];
        /**
         * 标题
         *
         * @type {string}
         * @memberof IBizFormItem
         */
        _this.caption = '';
        /**
         * 属性动态配置值<用户字典>
         *
         * @type {Array<any>}
         * @memberof IBizFormItem
         */
        _this.dictitems = [];
        /**
         * 表单项是否禁用
         *
         * @type {boolean}
         * @memberof IBizFormItem
         */
        _this.disabled = false;
        /**
         * 标签是否为空
         *
         * @type {boolean}
         * @memberof IBizFormItem
         */
        _this.emptyCaption = false;
        /**
         * 表达校验错误信息
         *
         * @type {string}
         * @memberof IBizFormItem
         */
        _this.errorInfo = '';
        /**
         *表单项类型
         *
         * @private
         * @type {string}
         * @memberof IBizFormItem
         */
        _this.fieldType = '';
        /**
         * 表单对象
         *
         * @private
         * @type {*}
         * @memberof IBizFormItem
         */
        _this.form = null;
        /**
         * 隐藏表单项
         *
         * @type {boolean}
         * @memberof IBizFormItem
         */
        _this.hidden = false;
        /**
         * 是否有错误信息
         *
         * @type {boolean}
         * @memberof IBizFormItem
         */
        _this.hasError = false;
        /**
         * 是否显示标题
         *
         * @type {boolean}
         * @memberof IBizFormItem
         */
        _this.showCaption = true;
        /**
         * 表单项校验状态
         *
         * @type {string}
         * @memberof IBizFormItem
         */
        _this.validateStatus = 'success';
        /**
         * 是否可见
         *
         * @type {boolean}
         * @memberof IBizFormItem
         */
        _this.visible = true;
        /**
         * 表单项的值
         *
         * @private
         * @type {string}
         * @memberof IBizFormItem
         */
        _this._value = '';
        _this.allowEmpty = opts.allowEmpty ? true : false;
        _this.caption = opts.caption;
        _this.disabled = opts.disabled ? true : false;
        _this.emptyCaption = opts.emptyCaption ? true : false;
        _this.fieldType = opts.fieldType;
        _this.form = opts.form;
        _this.hidden = opts.hidden ? true : false;
        _this.showCaption = opts.showCaption ? true : false;
        _this.visible = opts.visible ? true : false;
        return _this;
    }
    Object.defineProperty(IBizFormItem.prototype, "value", {
        /**
         * 获取值
         *
         * @type {string}
         * @memberof IBizFormItem
         */
        get: function () {
            return this._value ? this._value : '';
        },
        /**
         * 设置值
         *
         * @memberof IBizFormItem
         */
        set: function (val) {
            var oldVal = this._value;
            this._value = val;
            if (oldVal !== this._value) {
                this.onValueChanged(oldVal);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取表单项类型
     *
     * @returns {string}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.getFieldType = function () {
        return this.fieldType;
    };
    /**
     * 设置表单对象
     *
     * @param {*} form
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setForm = function (form) {
        this.form = form;
    };
    /**
     * 获取表单对象
     *
     * @returns {*}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.getForm = function () {
        return this.form;
    };
    /**
     * 获取值
     *
     * @returns {*}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.getValue = function () {
        return this.value;
    };
    /**
     * 设置值
     *
     * @param {string} value
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setValue = function (value) {
        this.value = value;
    };
    /**
     * 是否启用
     *
     * @returns {boolean}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.isDisabled = function () {
        return this.disabled;
    };
    /**
     * 设置是否启用
     *
     * @param {boolean} disabled
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setDisabled = function (disabled) {
        this.disabled = disabled;
    };
    /**
     * 隐藏控件
     *
     * @param {boolean} hidden
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setHidden = function (hidden) {
        this.hidden = hidden;
    };
    /**
     * 设置可见性
     *
     * @param {boolean} visible
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    /**
     * 设置属性动态配置
     *
     * @param {Array<any>} config 代码表
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setAsyncConfig = function (config) {
        if (Array.isArray(config)) {
            this.config = config.slice();
        }
    };
    /**
     * 设置用户字典
     *
     * @param {Array<any>} item
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setDictItems = function (item) {
        if (Array.isArray(item)) {
            this.dictitems = item.slice();
        }
    };
    /**
     * 设置只读<Ext版本方法禁止使用>
     *
     * @param {boolean} readonly
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setReadOnly = function (readonly) {
        this.setDisabled(readonly);
    };
    /**
     * 编辑是否必须输入
     *
     * @param {boolean} allowblank
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setAllowBlank = function (allowblank) {
    };
    /**
     * 标记表单项值无效提示
     *
     * @param {*} info
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.markInvalid = function (info) {
    };
    /**
     * 设置表单项错误
     *
     * @param {*} info
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setActiveError = function (info) {
        this.markInvalid(info);
    };
    /**
     * 表单项是否有错误
     *
     * @returns {boolean}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.hasActiveError = function () {
        return this.hasError;
    };
    /**
     * 重置表单项错误
     *
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.unsetActiveError = function () {
        this.hasError = false;
    };
    /**
     * 值变化
     *
     * @param {string} oldValue
     * @param {string} newValue
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.onValueChanged = function (oldValue) {
        this.fire(IBizFormItem.VALUECHANGED, { name: this.getName(), value: oldValue, field: this });
    };
    /**
     * 输入框失去焦点触发
     *
     * @param {*} $event
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.onBlur = function ($event) {
        if (!$event) {
            return;
        }
        if (Object.is($event.target.value, this.value)) {
            return;
        }
        this.value = $event.target.value;
    };
    /**
     * 键盘事件
     *
     * @param {*} $event
     * @returns {void}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.onKeydown = function ($event) {
        if (!$event) {
            return;
        }
        if ($event.keyCode !== 13) {
            return;
        }
        if (Object.is($event.target.value, this.value)) {
            return;
        }
        this.value = $event.target.value;
    };
    /**
     * 设置表单项错误信息
     *
     * @param {*} [info={}]
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setErrorInfo = function (info) {
        if (info === void 0) { info = {}; }
        this.validateStatus = info.validateStatus;
        this.hasError = info.hasError;
        this.errorInfo = info.errorInfo;
    };
    IBizFormItem.VALUECHANGED = 'VALUECHANGED';
    return IBizFormItem;
}(IBizObject));
