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
 * 编辑表单
 *
 * @class IBizEditForm
 * @extends {IBizForm}
 */
var IBizEditForm = /** @class */ (function (_super) {
    __extends(IBizEditForm, _super);
    /**
     * Creates an instance of IBizEditForm.
     * 创建 IBizEditForm 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizEditForm
     */
    function IBizEditForm(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 数据保存
     *
     * @param {*} [opt={}]
     * @returns {void}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.save2 = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        this.fire(IBizEditForm.FORMBEFORESAVE, arg);
        if (opt) {
            Object.assign(arg, opt);
        }
        var data = this.getValues();
        Object.assign(arg, data);
        if (Object.is(data.srfuf, '1')) {
            Object.assign(arg, { srfaction: 'update', srfctrlid: this.getName() });
        }
        else {
            Object.assign(arg, { srfaction: 'create', srfctrlid: this.getName() });
        }
        arg.srfcancel = false;
        // this.fireEvent(IBizEditForm.FORMBEFORESAVE, this, arg);
        if (arg.srfcancel) {
            return;
        }
        delete arg.srfcancel;
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        this.submit(arg).subscribe(function (action) {
            _this.resetFormError();
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            // 判断是否有提示
            if (action.info && !Object.is(action.info, '')) {
                // IBiz.alert('', action.info, 1);
                _this.iBizNotification.info('', action.info);
            }
            // this.fireEvent('formsaved', this, action);
            _this.fire(IBizForm.FORMSAVED, _this);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // this.fireEvent('formfieldchanged', null);
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
            _this.onSaved();
        }, function (action) {
            if (action.error) {
                _this.setFormError(action.error);
            }
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // this.fireEvent(IBizEditForm.FORMSAVEERROR, this);
            _this.fire(IBizEditForm.FORMSAVEERROR, _this);
            action.failureType = 'SERVER_INVALID';
            if (action.ret === 10) {
                _this.iBizNotification.confirm('保存错误信息', '保存数据发生错误, ' + _this.getActionErrorInfo(action) + ', 是否要重新加载数据？').subscribe(function (result) {
                    if (result && Object.is(result, 'OK')) {
                        _this.reload();
                    }
                });
            }
            else {
                _this.iBizNotification.error('保存错误信息', '保存数据发生错误,' + _this.getActionErrorInfo(action));
            }
        });
    };
    /**
     *
     *
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.onSaved = function () {
    };
    /**
     * 表单数据刷新
     *
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.reload = function () {
        var field = this.findField('srfkey');
        // tslint:disable-next-line:prefer-const
        var loadarg = {};
        if (field) {
            loadarg.srfkey = field.getValue();
            if (loadarg.srfkey.indexOf('SRFTEMPKEY:') === 0) {
                field = this.findField('srforikey');
                if (field) {
                    loadarg.srfkey = field.getValue();
                }
            }
            var viewController = this.getViewController();
            if (viewController) {
                var viewParmams = viewController.getViewParam();
                if (!Object.is(loadarg.srfkey, viewParmams.srfkey)) {
                    loadarg.srfkey = viewParmams.srfkey;
                }
            }
        }
        this.autoLoad(loadarg);
    };
    /**
     * 删除
     *
     * @param {*} [opt={}]
     * @returns {void}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.remove = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        if (opt) {
            Object.assign(arg, opt);
        }
        if (!arg.srfkey) {
            var field = this.findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
        }
        if (!arg.srfkey || Object.is(arg.srfkey, '')) {
            // IBiz.alert(IGM('IBIZEDITFORM.REMOVEFAILED.TITLE', '删除错误信息'), IGM('IBIZEDITFORM.UNLOADDATA', '当前表单未加载数据！'), 2);
            this.iBizNotification.error('删除错误信息', '当前表单未加载数据！');
            return;
        }
        Object.assign(arg, { srfaction: 'remove', srfctrlid: this.getName() });
        this.ignoreUFI = true;
        this.load(arg).subscribe(function (action) {
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            // this.fireEvent(IBizForm.FORMREMOVED);
            _this.fire(IBizForm.FORMREMOVED, _this);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            _this.iBizNotification.error('删除错误信息', '删除数据发生错误, ' + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
        });
    };
    /**
     * 工作流启动
     *
     * @param {*} [opt={}]
     * @returns {void}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.wfstart = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        if (opt) {
            Object.assign(arg, opt);
        }
        if (!arg.srfkey) {
            var field = this.findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
            field = this.findField('srforikey');
            if (field) {
                // tslint:disable-next-line:prefer-const
                var v = field.getValue();
                if (v && !Object.is(v, '')) {
                    arg.srfkey = v;
                }
            }
        }
        if (!arg.srfkey || Object.is(arg.srfkey, '')) {
            // IBiz.alert(IGM('IBIZEDITFORM.WFSTARTFAILED.TITLE', '启动流程错误信息'), IGM('IBIZEDITFORM.UNLOADDATA', '当前表单未加载数据！'), 2);
            this.iBizNotification.error('启动流程错误信息', '当前表单未加载数据！');
            return;
        }
        Object.assign(arg, { srfaction: 'wfstart', srfctrlid: this.getName() });
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (action) {
            if (action.ret !== 0) {
                action.failureType = 'SERVER_INVALID';
                _this.iBizNotification.error('启动流程错误信息', '启动流程发生错误,' + _this.getActionErrorInfo(action));
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                return;
            }
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED);
            // this.fireEvent(IBizForm.FORMWFSTARTED);
            _this.fire(IBizForm.FORMWFSTARTED, _this);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            _this.iBizNotification.error('启动流程错误信息', '启动流程发生错误,' + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
        });
    };
    /**
     * 工作流提交
     *
     * @param {*} [opt={}]
     * @returns {void}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.wfsubmit = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        if (opt) {
            Object.assign(arg, opt);
        }
        var data = this.getValues();
        Object.assign(arg, data);
        Object.assign(arg, { srfaction: 'wfsubmit', srfctrlid: this.getName() });
        //        if (!arg.srfkey) {
        //            var field = this.findField('srfkey');
        //            if (field) {
        //                arg.srfkey = field.getValue();
        //            }
        //        }
        if (!arg.srfkey || Object.is(arg.srfkey, '')) {
            // IBiz.alert(IGM('IBIZEDITFORM.WFSUBMITFAILED.TITLE', '提交流程错误信息'), IGM('IBIZEDITFORM.UNLOADDATA', '当前表单未加载数据！'), 2);
            this.iBizNotification.error('提交流程错误信息', '当前表单未加载数据！');
            return;
        }
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        this.load(arg).subscribe(function (action) {
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED);
            // this.fireEvent(IBizForm.FORMWFSUBMITTED);
            _this.fire(IBizForm.FORMWFSUBMITTED, _this);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            _this.iBizNotification.error('提交流程错误信息', '工作流提交发生错误,' + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
        });
    };
    /**
     * 界面行为
     *
     * @param {*} [arg={}]
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.doUIAction = function (arg) {
        var _this = this;
        if (arg === void 0) { arg = {}; }
        // tslint:disable-next-line:prefer-const
        var opt = {};
        if (arg) {
            Object.assign(opt, arg);
        }
        Object.assign(opt, { srfaction: 'uiaction', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (data) {
            if (data.ret === 0) {
                // IBiz.processResultBefore(data);
                _this.fire(IBizEditForm.UIACTIONFINISHED, data);
                if (data.reloadData) {
                    _this.reload();
                }
                if (data.info && !Object.is(data.info, '')) {
                    _this.iBizNotification.info('', data.info);
                }
                // IBiz.processResult(data);
            }
            else {
                _this.iBizNotification.error('界面操作错误信息', '操作失败,' + data.errorMessage);
            }
        }, function (error) {
            _this.iBizNotification.error('界面操作错误信息', '操作失败,' + error.info);
        });
    };
    /**
     * 表单类型
     *
     * @returns {string}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.getFormType = function () {
        return 'EDITFORM';
    };
    /**
     * 表单权限发生变化
     */
    IBizEditForm.UIACTIONFINISHED = 'UIACTIONFINISHED';
    /**
     * 表单保存之前触发
     */
    IBizEditForm.FORMBEFORESAVE = 'FORMBEFORESAVE';
    /**
     * 表单保存错误触发
     */
    IBizEditForm.FORMSAVEERROR = 'FORMSAVEERROR';
    return IBizEditForm;
}(IBizForm));
