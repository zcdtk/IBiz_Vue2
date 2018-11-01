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
 * 编辑视图控制器
 *
 * @class IBizEditViewController
 * @extends {IBizMainViewController}
 */
var IBizEditViewController = /** @class */ (function (_super) {
    __extends(IBizEditViewController, _super);
    /**
     * Creates an instance of IBizEditViewController.
     * 创建IBizEditViewController实例
     *
     * @param {*} [opts={}]
     * @memberof IBizEditViewController
     */
    function IBizEditViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 表单视图数据标题信息
         *
         * @type {string}
         * @memberof IBizEditViewController
         */
        _this.dataInfo = '';
        /**
         * 表单保存后操作行为
         *
         * @private
         * @type {string}
         * @memberof IBizEditViewController
         */
        _this.afterformsaveaction = '';
        /**
         * 最后的工作流实体界面行为
         *
         * @private
         * @type {*}
         * @memberof IBizEditViewController
         */
        _this.lastwfuiaction = {};
        /**
         * 最后工作流操作参数
         *
         * @private
         * @type {*}
         * @memberof IBizEditViewController
         */
        _this.lastwfuaparam = {};
        return _this;
    }
    /**
     * 初始化表单
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var form = this.getForm();
        if (form) {
            // 表单保存之前
            form.on(IBizEditForm.FORMBEFORESAVE).subscribe(function (data) {
                _this.onFormBeforeSaved(data);
            });
            // 表单保存完成
            form.on(IBizForm.FORMSAVED).subscribe(function (data) {
                _this.onFormSaved(data);
            });
            // 表单加载完成
            form.on(IBizForm.FORMLOADED).subscribe(function (data) {
                _this.onFormLoaded();
            });
            // 表单删除完成
            form.on(IBizForm.FORMREMOVED).subscribe(function (data) {
                _this.onFormRemoved();
            });
            // 工作流启动完成
            form.on(IBizForm.FORMWFSTARTED).subscribe(function (data) {
                _this.onFormWFStarted();
            });
            // 工作流提交完成
            form.on(IBizForm.FORMWFSUBMITTED).subscribe(function (data) {
                _this.onFormWFSubmitted();
            });
            // 编辑表单实体界面行为
            form.on(IBizEditForm.UIACTIONFINISHED).subscribe(function (data) {
                if (data.reloadData) {
                    _this.refreshReferView();
                }
                if (data.closeEditview) {
                    _this.closeWindow();
                }
            });
            // 表单属性值变化
            form.on(IBizForm.FORMFIELDCHANGED).subscribe(function (data) {
                if (data == null) {
                    _this.onFormFieldChanged('', null, null);
                }
                else {
                    _this.onFormFieldChanged(data.name, data.field, data.value);
                    _this.onFormFieldValueCheck(data.name, data.field.getValue());
                }
            });
            // 表单权限发生变化
            form.on(IBizForm.DATAACCACTIONCHANGE).subscribe(function (data) {
                _this.onDataAccActionChange(data);
            });
        }
    };
    /**
     * 加载数据
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var editForm = this.getForm();
        if (editForm) {
            editForm.autoLoad(this.getViewParam());
        }
    };
    /**
     *
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.addEditMenu = function () {
    };
    /**
     * 判断表单是否修改了
     *
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.unloaded = function () {
        // 判断表单是否修改了
        // if (this.form.isDirty()) {
        //     return IGM('EDITVIEWCONTROLLER.UNLOADED.INFO', '表单已经被修改是否关闭');
        // }
        return false;
    };
    /**
     * 表单权限发生变化
     *
     * @param {*} dataaccaction
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onDataAccActionChange = function (dataaccaction) {
        if (this.getToolBar()) {
            this.getToolBar().updateAccAction(dataaccaction);
        }
        // if (this.getToolbar())
        //     this.getToolbar().updateAccAction(dataaccaction);
        // if (this.mintoolbar)
        //     this.mintoolbar.updateAccAction(dataaccaction);
        // if (this.floattoolbar)
        //     this.floattoolbar.updateAccAction(dataaccaction);
    };
    /**
     * 设置父数据
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onSetParentData = function () {
        // if (this.isInited() == true) {
        //     if (this.parentData) {
        //         var params = .extend(this.viewparam, this.parentData);
        //         this.form.autoLoad(params);
        //     }
        // }
    };
    /**
     * 获取表单对象
     *
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getForm = function () {
        return this.getControl('form');
    };
    /**
     * 获取数据信息区对象
     *
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getDataInfoBar = function () {
        // return this.datainfobar;
        return;
    };
    /**
     * 表单保存之前，处理视图数据
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormBeforeSaved = function (arg) {
        if (arg === void 0) { arg = {}; }
        Object.assign(arg, this.getViewParam());
    };
    /**
     * 表单保存完成
     *
     * @param {*} [result={}]
     * @returns {void}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormSaved = function (result) {
        if (result === void 0) { result = {}; }
        this.refreshReferView();
        if (Object.is(this.afterformsaveaction, 'exit')) {
            // var window = this.getWindow();
            // if (window) {
            //     window.dialogResult = 'ok';
            //     window.activeData = this.getForm().getValues();
            // }
            if (this.isModal()) {
                var result_1 = { ret: 'OK', activeData: this.getForm().getValues() };
                this.closeModal(result_1);
                return;
            }
            this.closeWindow();
            return;
        }
        if (Object.is(this.afterformsaveaction, 'new')) {
            var arg = this.getViewParam();
            if (!arg) {
                arg = {};
            }
            this.getForm().loadDraft(arg);
            return;
        }
        if (Object.is(this.afterformsaveaction, 'dowfuiaction')) {
            this.afterformsaveaction = 'dowfuiactionok';
            this.doWFUIAction(this.lastwfuiaction, this.lastwfuaparam);
            return;
        }
        if (Object.is(this.afterformsaveaction, 'startwf')) {
            this.startWF();
        }
        else {
            // 判断是否已经出现过提示
            if (!result || !result.info) {
                // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), IGM('EDITVIEWCONTROLLER.ONFORMSAVED.INFO', '数据保存成功！'), 1);
                this.iBizNotification.success('信息', '数据保存成功！');
            }
        }
        this.updateViewInfo();
    };
    /**
     * 表单加载完成
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormLoaded = function () {
        this.updateViewInfo();
    };
    /**
     * 工作流表单启动完成
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormWFStarted = function () {
        this.refreshReferView();
        this.closeWindow();
    };
    /**
     * 工作流表单提交完成
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormWFSubmitted = function () {
        this.refreshReferView();
        if (this.isModal()) {
            var result = { ret: 'OK', activeData: this.getForm().getValues() };
            this.dataChange();
            this.closeModal(result);
        }
        else {
            this.closeWindow();
        }
    };
    /**
     * 更细视图caption信息
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.updateViewInfo = function () {
        var form = this.getForm();
        if (!form) {
            return;
        }
        var _srfuf = form.findField('srfuf');
        if (!_srfuf) {
            return;
        }
        var newdata = !Object.is(_srfuf.getValue(), '1');
        var dataAccAction = form.getdataaccaction();
        this.calcToolbarItemState(!newdata, dataAccAction);
        var info = '';
        if (newdata) {
            info = '新建';
        }
        else {
            var _srfmajortext = form.findField('srfmajortext');
            if (_srfmajortext) {
                info = _srfmajortext.getValue();
            }
        }
        var _StrInfo = info.replace(/[null]/g, '').replace(/[undefined]/g, '').replace(/[ ]/g, '');
        if (_StrInfo.length > 10) {
            info = _StrInfo.substring(0, 10) + "...";
        }
        this.dataInfo = Object.is(info, '') ? '' : info;
    };
    /**
     * 表单删除完成
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormRemoved = function () {
        this.refreshReferView();
        this.closeWindow();
    };
    /**
     * 表单项更新
     *
     * @param {string} fieldname
     * @param {*} field
     * @param {string} value
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormFieldChanged = function (fieldname, field, value) {
    };
    /**
     * 表单项值检测
     *
     * @param {string} fieldname
     * @param {string} value
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormFieldValueCheck = function (fieldname, value) {
    };
    /**
     * 处理实体界面行为
     *
     * @param {*} [uiaction={}] 界面行为
     * @param {*} [params={}]  参数
     * @returns {void}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.tag, 'Help')) {
            this.doHelp();
            return;
        }
        if (Object.is(uiaction.tag, 'SaveAndStart')) {
            this.doSaveAndStart();
            return;
        }
        if (Object.is(uiaction.tag, 'SaveAndExit')) {
            this.doSaveAndExit();
            return;
        }
        if (Object.is(uiaction.tag, 'SaveAndNew')) {
            this.doSaveAndNew();
            return;
        }
        if (Object.is(uiaction.tag, 'Save')) {
            this.doSave();
            return;
        }
        if (Object.is(uiaction.tag, 'Print')) {
            this.doPrint();
            return;
        }
        if (Object.is(uiaction.tag, 'Copy')) {
            this.doCopy();
            return;
        }
        if (Object.is(uiaction.tag, 'RemoveAndExit')) {
            this.doRemoveAndExit();
            return;
        }
        if (Object.is(uiaction.tag, 'Refresh')) {
            this.doRefresh();
            return;
        }
        if (Object.is(uiaction.tag, 'New')) {
            this.doNew();
            return;
        }
        if (Object.is(uiaction.tag, 'FirstRecord')) {
            this.doMoveToRecord('first');
            return;
        }
        if (Object.is(uiaction.tag, 'PrevRecord')) {
            this.doMoveToRecord('prev');
            return;
        }
        if (Object.is(uiaction.tag, 'NextRecord')) {
            this.doMoveToRecord('next');
            return;
        }
        if (Object.is(uiaction.tag, 'LastRecord')) {
            this.doMoveToRecord('last');
            return;
        }
        if (Object.is(uiaction.tag, 'Exit') || Object.is(uiaction.tag, 'Close')) {
            this.doExit();
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    /**
     * 编辑界面_实体帮助界面操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doHelp = function () {
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), IGM('EDITVIEWCONTROLLER.DOHELP.INFO', '编辑界面_帮助操作！'), 5);
        this.iBizNotification.info('信息', '编辑界面_帮助操作！');
    };
    /**
     * 编辑界面_保存并启动工作流操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doSaveAndStart = function () {
        this.afterformsaveaction = 'startwf';
        this.saveData({ 'postType': 'startwf' });
    };
    /**
     * 编辑界面_保存并退出操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doSaveAndExit = function () {
        this.afterformsaveaction = 'exit';
        var window = this.getWindow();
        // if (window) {
        //     window.dialogResult = 'cancel';
        // }
        this.saveData({});
    };
    /**
     * 编辑界面_保存并新建操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doSaveAndNew = function () {
        this.afterformsaveaction = 'new';
        this.saveData({});
    };
    /**
     * 编辑界面_保存操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doSave = function () {
        this.afterformsaveaction = '';
        this.saveData({});
    };
    /**
     * 编辑界面_打印操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doPrint = function () {
        // var arg = {};
        // arg.srfkey = '';
        // var field = this.getForm().findField('srforikey');
        // if (field) {
        //     arg.srfkey = field.getValue();
        // }
        // if (arg.srfkey == undefined || arg.srfkey == '') {
        //     field = this.getForm().findField('srfkey');
        //     if (field) {
        //         arg.srfkey = field.getValue();
        //     }
        // }
        // if (arg.srfkey == '')
        //     return;
        // this.onPrintData(arg);
    };
    /**
     * 编辑界面_拷贝操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doCopy = function () {
        var arg = {};
        Object.assign(arg, this.getViewParam());
        arg.srfkey = '';
        if (!this.getForm()) {
            return;
        }
        var srforikey = this.getForm().findField('srforikey');
        if (srforikey) {
            arg.srfsourcekey = srforikey.getValue();
        }
        if (!arg.srfsourcekey || Object.is(arg.srfsourcekey, '')) {
            var srfkey = this.getForm().findField('srfkey');
            if (srfkey) {
                arg.srfsourcekey = srfkey.getValue();
            }
        }
        if (!arg.srfsourcekey || Object.is(arg.srfsourcekey, '')) {
            this.iBizNotification.warning('警告', '当前表单未加载数据，不能拷贝');
            return;
        }
        this.getForm().autoLoad(arg);
    };
    /**
     * 编辑界面_删除并退出操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doRemoveAndExit = function () {
        var _this = this;
        this.iBizNotification.confirm('删除提示', '确认要删除当前数据，删除操作将不可恢复？').subscribe(function (result) {
            if (result && Object.is(result, 'OK')) {
                _this.removeData();
            }
        });
    };
    /**
     * 编辑界面_刷新操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doRefresh = function () {
        this.iBizNotification.info('信息', '编辑界面_刷新操作！');
    };
    /**
     * 编辑界面_新建操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doNew = function () {
        this.iBizNotification.info('信息', '编辑界面_新建操作！');
    };
    /**
     * 编辑界面_退出操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doExit = function () {
        this.closeWindow();
    };
    /**
     * 保存视图数据
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.saveData = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg) {
            arg = {};
        }
        this.getForm().save2(arg);
    };
    /**
     * 删除视图数据
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.removeData = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg) {
            arg = {};
        }
        this.getForm().remove(arg);
    };
    /**
     * 刷新关联数据
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.refreshReferView = function () {
        var _window = window;
        var iBizApp = _window.getIBizApp();
        if (!iBizApp) {
            return;
        }
        var parentWindow = iBizApp.getParentWindow();
        if (parentWindow) {
            var pWinIBizApp = parentWindow.getIBizApp();
            var viewparam = this.getViewParam();
            pWinIBizApp.fireRefreshView({ openerid: viewparam.openerid });
        }
        if (this.isModal()) {
            var result = { ret: 'OK', activeData: this.getForm().getValues() };
            this.dataChange(result);
        }
    };
    /**
     * 更新表单项
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.updateFormItems = function (arg) {
        if (arg === void 0) { arg = {}; }
        this.getForm().updateFormItems(arg);
    };
    /**
     *
     *
     * @param {boolean} bShow
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.showCommandBar = function (bShow) {
        // var toolbar = this.getToolbar();
        // if (toolbar && (toolbar.isHidden() == bShow)) {
        //     if (bShow) {
        //         toolbar.show();
        //     } else toolbar.hide();
        // }
    };
    /**
     * 工作流实体界面行为
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doWFUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (this.isEnableEditData()) {
            if (!Object.is(this.afterformsaveaction, 'dowfuiactionok')) {
                this.afterformsaveaction = 'dowfuiaction';
                this.lastwfuiaction = uiaction;
                this.lastwfuaparam = params;
                this.saveData({});
                return;
            }
            this.afterformsaveaction = '';
            this.lastwfuiaction = null;
            this.lastwfuaparam = null;
        }
        if (Object.is(uiaction.actionmode, 'WFBACKEND')) {
            var arg = {
                srfwfiatag: uiaction.tag
            };
            this.getForm().wfsubmit(arg);
            return;
        }
        _super.prototype.doWFUIAction.call(this, uiaction, params);
    };
    /**
     * 启动工作流
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.startWF = function (arg) {
        if (arg === void 0) { arg = {}; }
        var startuiaction = this.getUIAction('WFStartWizard');
        if (startuiaction) {
            this.doUIAction(startuiaction, {});
        }
        else {
            this.getForm().wfstart(arg);
        }
    };
    /**
     *
     *
     * @param {*} target
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doMoveToRecord = function (target) {
        // var referView = this.getReferView();
        // if (referView && referView.moveRecord) {
        //     var record = referView.moveRecord(target);
        //     if (record) {
        //         var loadParam = {};
        //         .extend(loadParam, {
        //             srfkey: record.get('srfkey')
        //         });
        //         this.getForm().autoLoad(loadParam);
        //     }
        // }
    };
    /**
     * 执行后台界面行为
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doBackendUIAction = function (arg) {
        if (arg === void 0) { arg = {}; }
        this.getForm().doUIAction(arg);
    };
    /**
     * 获取前台行为参数
     *
     * @param {*} [uiaction={}] 行为
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getFrontUIActionParam = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        var arg = _super.prototype.getFrontUIActionParam.call(this, uiaction);
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            var valueitem = 'srfkey';
            var paramkey = 'srfkeys';
            var paramjo = null;
            var paramitems = null;
            if (uiaction.actionparams) {
                var actionparams = uiaction.actionparams;
                valueitem = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem;
                paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                paramjo = actionparams.paramjo ? actionparams.paramjo : {};
            }
            var field = this.getForm().findField('srforikey');
            if (field) {
                paramitems = field.getValue();
            }
            if (!paramitems || Object.is(paramitems, '')) {
                field = this.getForm().findField(valueitem);
                if (field) {
                    paramitems = field.getValue();
                }
            }
            var data = {};
            data[paramkey] = paramitems;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            return Object.assign(arg, data);
        }
        return arg;
    };
    /**
     * 获取后台行为参数
     *
     * @param {*} [uiaction={}] 行为
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getBackendUIActionParam = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            var valueitem = 'srfkey';
            var paramkey = 'srfkeys';
            var paramjo = null;
            var infoitem = 'srfmajortext';
            if (uiaction.actionparams) {
                var actionparams = uiaction.actionparams;
                valueitem = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem;
                paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                infoitem = (actionparams.textitem && !Object.is(actionparams.textitem, '')) ? actionparams.textitem.toLowerCase() : infoitem;
                paramjo = actionparams.paramjo ? actionparams.paramjo : {};
            }
            var dataInfo = '';
            var keys = '';
            var field = this.getForm().findField(valueitem);
            if (field) {
                keys = field.getValue();
            }
            field = this.getForm().findField(infoitem);
            if (field) {
                dataInfo = field.getValue();
            }
            var data = { dataInfo: dataInfo };
            data[paramkey] = keys;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            var formData = this.getForm().getValues();
            if (formData.srfkey) {
                delete formData.srfkey;
            }
            return Object.assign(data, this.getForm().getValues());
        }
        return {};
    };
    /**
     * 初始化浮动工具栏
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.initFloatToolbar = function () {
        // var offset = 60;
        // var duration = 300;
        // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
        //     (window).bind('touchend touchcancel touchleave', function (e) {
        //         if ((this).scrollTop() > offset) {
        //             ('.scroll-to-top').fadeIn(duration);
        //         } else {
        //             ('.scroll-to-top').fadeOut(duration);
        //         }
        //     });
        // } else {
        //     (window).scroll(function () {
        //         if ((this).scrollTop() > offset) {
        //             ('.scroll-to-top').fadeIn(duration);
        //         } else {
        //             ('.scroll-to-top').fadeOut(duration);
        //         }
        //     });
        // }
        // ('.scroll-to-top').click(function (e) {
        //     e.preventDefault();
        //     return false;
        // });
    };
    /**
     * 工作流前端实体界面后窗口关闭
     *
     * @param {*} win
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
        // if (win.dialogResult == 'ok') {
        //     var window = this.getWindow();
        //     if (window) {
        //         window.dialogResult = 'ok';
        //         window.activeData = this.getForm().getValues();
        //     }
        // this.refreshReferView();
        // this.closeWindow();
        //     return;
        // }
        if (data === void 0) { data = {}; }
        // if (win) {
        //     if (Object.is(win.ret, 'OK')) {
        //         // this.closeView();
        //     }
        // }
        this.refreshReferView();
        this.closeWindow();
    };
    /**
     * 是否启用新建数据
     *
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.isEnableNewData = function () {
        return true;
    };
    /**
     * 是否启用编辑数据
     *
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.isEnableEditData = function () {
        return true;
    };
    /**
     * 是否启用删除数据
     *
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.isEnableRemoveData = function () {
        return true;
    };
    /**
     * 打印数据
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onPrintData = function (arg) {
        if (arg === void 0) { arg = {}; }
        this.doPrintDataNormal(arg);
    };
    /**
     * 打印常规数据
     *
     * @param {*} [arg={}]
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doPrintDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        // var view = this.getPrintDataView(arg);
        // if (view == null) {
        //     return false;
        // }
        // var viewurl = view.viewurl;
        // if (!viewurl || viewurl == '') {
        //     viewurl = BASEURL + '/ibizutil/print.pdf';
        // }
        // else {
        //     viewurl = BASEURL + viewurl;
        // }
        // viewurl = viewurl + (viewurl.indexOf('?') == -1 ? '?' : '&') + .param(view.viewparam);
        // window.open(viewurl, '_blank');
        return true;
    };
    /**
     * 获取打印数据
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getPrintDataView = function (arg) {
        // return null;
        if (arg === void 0) { arg = {}; }
        return undefined;
    };
    /**
     * 视图数据刷新
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onRefresh = function () {
        var form = this.getForm();
        if (form) {
            form.reload();
        }
    };
    return IBizEditViewController;
}(IBizMainViewController));
