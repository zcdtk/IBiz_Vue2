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
 * 分页编辑视图
 *
 * @class IBizEditView3Controller
 * @extends {IBizEditViewController}
 */
var IBizEditView3Controller = /** @class */ (function (_super) {
    __extends(IBizEditView3Controller, _super);
    /**
     * Creates an instance of IBizEditView3Controller.
     * 创建 IBizEditView3Controller 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizEditView3Controller
     */
    function IBizEditView3Controller(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 关系分页禁用
         *
         * @type {boolean}
         * @memberof IBizEditView3Controller
         */
        _this.drTabDisabled = false;
        return _this;
    }
    /**
     * 视图部件初始化，注册所有事件
     *
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var drTab = this.getDRTab();
        if (drTab) {
            // 分页导航选中
            drTab.on(IBizDRTab.SELECTCHANGE).subscribe(function (data) {
                _this.doDRTabSelectChange(data);
            });
        }
    };
    /**
     * 表单加载完成
     *
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.onFormLoaded = function () {
        _super.prototype.onFormLoaded.call(this);
        this.setDrTabState();
        var drtab = this.getDRTab();
        var form = this.getForm();
        var _field = form.findField('srfkey');
        var _srfuf = form.findField('srfuf');
        if (this.isHideEditForm()) {
            if (!_field) {
                return;
            }
            if (Object.is(_srfuf.getValue(), '0') && Object.is(_field.getValue(), '')) {
                this.iBizNotification.warning('警告', '新建模式，表单主数据不存在');
                if (drtab) {
                    drtab.setActiveTab(0);
                }
                return;
            }
        }
        if (form.findField('srfkey') && !Object.is(form.findField('srfkey').getValue(), '')) {
            var index = this.getDRTabIndex();
            if (drtab) {
                drtab.setActiveTab(index);
            }
        }
    };
    /**
     * 表单保存完成
     *
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.onFormSaved = function () {
        _super.prototype.onFormSaved.call(this);
        this.setDrTabState();
    };
    /**
     * 是否隐藏编辑表单
     *
     * @returns {boolean}
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.isHideEditForm = function () {
        return false;
    };
    /**
     * 视图信息更新
     *
     * @returns {void}
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.updateViewInfo = function () {
        _super.prototype.updateViewInfo.call(this);
        var form = this.getForm();
        if (!form) {
            return;
        }
        var field = form.findField('srfkey');
        if (!field) {
            return;
        }
        var keyvalue = field.getValue();
        var srforikey = form.findField('srforikey');
        if (field) {
            var keyvalue2 = field.getValue();
            if (keyvalue2 && !Object.is(keyvalue2, '')) {
                keyvalue = keyvalue2;
            }
        }
        var deid = '';
        var deidfield = form.findField('srfdeid');
        if (deidfield) {
            deid = deidfield.getValue();
        }
        var parentData = { srfparentkey: keyvalue };
        if (!Object.is(deid, '')) {
            parentData.srfparentdeid = deid;
        }
        if (this.getDRTab()) {
            this.getDRTab().setParentData(parentData);
        }
    };
    /**
     * 关系分页部件选择变化处理
     *
     * @param {*} [data={}]
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.doDRTabSelectChange = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        var params = {};
        var _isShowToolBar = Object.is(data.viewid, 'form') ? true : false;
        setTimeout(function () {
            _this.isShowToolBar = _isShowToolBar;
        });
        Object.assign(params, data.parentMode);
        Object.assign(params, data.parentData);
        this.openView(data.viewid, params);
    };
    /**
     * 获取关系视图参数
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.getDRItemView = function (arg) {
        if (arg === void 0) { arg = {}; }
    };
    /**
     * 刷新视图
     *
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.onRefresh = function () {
        if (this.getDRTab()) {
            this.getDRTab().refresh();
        }
    };
    /**
     * 获取关系分页部件
     *
     * @returns {*}
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.getDRTab = function () {
        return this.getControl('drtab');
    };
    /**
     * 获取关系分页下标
     *
     * @private
     * @returns {number}
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.getDRTabIndex = function () {
        var _tab = 0;
        return _tab;
    };
    /**
     * 设置关系分页状态
     *
     * @private
     * @memberof IBizEditView3Controller
     */
    IBizEditView3Controller.prototype.setDrTabState = function () {
        var form = this.getForm();
        var _field = form.findField('srfkey');
        var _srfuf = form.findField('srfuf');
        var state = Object.is(_srfuf.getValue(), '0') && Object.is(_field.getValue(), '');
        this.drTabDisabled = state ? true : false;
    };
    return IBizEditView3Controller;
}(IBizEditViewController));
