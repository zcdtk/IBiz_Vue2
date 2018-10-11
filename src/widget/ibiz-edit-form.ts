/**
 * 编辑表单对象
 *
 * @class IBizEditForm
 * @extends {IBizForm}
 */
class IBizEditForm extends IBizForm {

    /**
     * Creates an instance of IBizEditForm.
     * 创建 IBizEditForm 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizEditForm
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
    }

    public save2(arg: any = {}): Promise<any> {
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        var data = this.getValues();

        // $.extend(arg, data);
        Object.assign(arg, data);

        if (data.srfuf == "1") {
            // $.extend(arg, { srfaction: 'update' });
            Object.assign(arg, { srfaction: 'update' });
        } else {
            // $.extend(arg, { srfaction: 'create' });
            Object.assign(arg, { srfaction: 'create' });
        }


        //获取所有Disabled数据
        // var disablevalues = {};
        // $.each(this.fieldMap,function (name,item) {
        //     if (item.isDisabled()) {
        //         if (disablevalues[item.name] == undefined) {
        //         	disablevalues[item.name] = item.getValue();
        //         }
        //     }
        // });
        // $.extend(arg, disablevalues);

        arg.srfcancel = false;
        _this.fire(IBizEditForm.FORMBEFORESAVE, arg);
        if (arg.srfcancel == true) {
            return;
        }
        delete arg.srfcancel;

        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }

        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;

        return new Promise((resolve, reject) => {
            _this.submit(arg).subscribe((action) => {
                _this.resetFormError();
                _this.setFieldAsyncConfig(action.config);
                _this.setFieldState(action.state);
                _this.setDataAccAction(action.dataaccaction);
                _this.fillForm(action.data);
                _this.formDirty = false;
                //判断是否有提示
                if (action.info && action.info != '') {
                    // IBiz.alert('',action.info,1);
                    _this.iBizNotification.info('', action.info);
                }
                _this.fire('formsaved', action);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                _this.fire('formfieldchanged', null);
                _this.onSaved();
                // if (successcb) {
                //     successcb(form, action);
                // }
                resolve(action);
            }, (action) => {
                if (action.error) {
                    _this.setFormError(action.error);
                }

                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;

                _this.fire(IBizEditForm.FORMSAVEERROR, null);
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                reject(action);
                action.failureType = 'SERVER_INVALID';
                if (action.ret == 10) {
                    // IBiz.confirm2($IGM('IBIZEDITFORM.SAVE2FAILED.TITLE', "保存错误信息"), $IGM('IBIZEDITFORM.SAVE2FAILED2.INFO', "保存数据发生错误," + _this.getActionErrorInfo(action) + ',是否要重新加载数据？', [_this.getActionErrorInfo(action)]), 2, function (ret) {
                    //     if (ret)
                    //         _this.reload();
                    // });
                    _this.iBizNotification.confirm('保存错误信息', `保存数据发生错误,${_this.getActionErrorInfo(action)},是否要重新加载数据？`).subscribe((ret) => {
                        _this.reload();
                    });
                }
                else {
                    // IBiz.alert($IGM('IBIZEDITFORM.SAVE2FAILED.TITLE', "保存错误信息"), $IGM('IBIZEDITFORM.SAVE2FAILED.INFO', "保存数据发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
                    _this.iBizNotification.error('保存错误信息', `保存数据发生错误,${_this.getActionErrorInfo(action)}`);
                }
            });
        });


    }
    public onSaved(): void {
        var _this = this;
    }
    public reload(): Promise<any> {
        var _this = this;
        var field = _this.findField('srfkey');
        var loadarg: any = {};
        if (field) {
            loadarg.srfkey = field.getValue();
            if (loadarg.srfkey.indexOf('SRFTEMPKEY:') == 0) {
                field = _this.findField('srforikey');
                if (field) {
                    loadarg.srfkey = field.getValue();
                }
            }
        }
        return _this.autoLoad(loadarg);
    }
    public remove(arg: any = {}): Promise<any> {
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        if (!arg.srfkey) {
            var field = _this.findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
        }

        if (arg.srfkey == undefined || arg.srfkey == null || arg.srfkey == '') {
            // IBiz.alert($IGM('IBIZEDITFORM.REMOVEFAILED.TITLE',"删除错误信息"), $IGM('IBIZEDITFORM.UNLOADDATA','当前表单未加载数据！'),2);
            _this.iBizNotification.warning('删除错误信息', '当前表单未加载数据！');
            return new Promise(null);
        }

        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }

        // $.extend(arg, { srfaction: 'remove' });
        Object.assign(arg, { srfaction: 'remove' });
        _this.ignoreUFI = true;
        return new Promise((resolve, reject) => {
            _this.load(arg).subscribe((action) => {
                if (action.ret == 0) {
                    _this.setFieldAsyncConfig(action.config);
                    _this.setFieldState(action.state);
                    _this.fire(IBizForm.FORMREMOVED, null);
                    // if (successcb) {
                    //     successcb(form, action);
                    // }
                    resolve(action);
                } else {
                    // if (errorcb) {
                    //     errorcb(form, action);
                    // }
                    reject(action);
                }
                _this.ignoreUFI = false;
            }, (action) => {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZEDITFORM.REMOVEFAILED.TITLE', "删除错误信息"), $IGM('IBIZEDITFORM.REMOVEFAILED.INFO', "删除数据发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
                _this.iBizNotification.error('删除错误信息', `"删除数据发生错误,${_this.getActionErrorInfo(action)}`);
                _this.ignoreUFI = false;
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                reject(action);
            });
        });

    }
    public wfstart(arg: any = {}): Promise<any> {
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        if (!arg.srfkey) {
            var field = _this.findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
            field = _this.findField('srforikey');
            if (field) {
                var v = field.getValue();
                if (v && v != '') {
                    arg.srfkey = v;
                }
            }
        }
        if (arg.srfkey == undefined || arg.srfkey == null || arg.srfkey == '') {
            // IBiz.alert($IGM('IBIZEDITFORM.WFSTARTFAILED.TITLE',"启动流程错误信息"), $IGM('IBIZEDITFORM.UNLOADDATA','当前表单未加载数据！'),2);
            _this.iBizNotification.error('启动流程错误信息', '当前表单未加载数据！');
            return new Promise(null);
        }

        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }

        // $.extend(arg, { srfaction: 'wfstart' });
        Object.assign(arg, { srfaction: 'wfstart' });
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;

        return new Promise((resolve, reject) => {
            _this.load(arg).subscribe((action) => {
                _this.setFieldAsyncConfig(action.config);
                _this.setFieldState(action.state);
                _this.setDataAccAction(action.dataaccaction);
                _this.fillForm(action.data);
                _this.formDirty = false;
                //	_this.fire(IBizForm.FORMLOADED);
                _this.fire(IBizForm.FORMWFSTARTED, action);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                _this.fire(IBizForm.FORMFIELDCHANGED, null);
                // if (successcb) {
                //     successcb(form, action);
                // }
                resolve(action);
            }, (action) => {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZEDITFORM.WFSTARTFAILED.TITLE', "启动流程错误信息"), $IGM('IBIZEDITFORM.WFSTARTFAILED.INFO', "启动流程发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
                _this.iBizNotification.error('启动流程错误信息', `启动流程发生错误,${_this.getActionErrorInfo(action)}`);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                reject(action);
            });
        });

    }
    public wfsubmit(arg: any = {}): Promise<any> {
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;

        var data = _this.getValues();
        // $.extend(arg, data);
        // $.extend(arg, { srfaction: 'wfsubmit' });
        Object.assign(arg, data, { srfaction: 'wfsubmit' });

        //        if (!arg.srfkey) {
        //            var field = _this.findField('srfkey');
        //            if (field) {
        //                arg.srfkey = field.getValue();
        //            }
        //        }
        if (arg.srfkey == undefined || arg.srfkey == null || arg.srfkey == '') {
            // IBiz.alert($IGM('IBIZEDITFORM.WFSUBMITFAILED.TITLE',"提交流程错误信息"),$IGM('IBIZEDITFORM.UNLOADDATA','当前表单未加载数据！'),2);
            _this.iBizNotification.error('提交流程错误信息', '当前表单未加载数据！');
            return new Promise(null);
        }

        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }

        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;

        return new Promise((resolve, reject) => {
            _this.load(arg).subscribe((action) => {
                _this.setFieldAsyncConfig(action.config);
                _this.setFieldState(action.state);
                _this.setDataAccAction(action.dataaccaction);
                _this.fillForm(action.data);
                _this.formDirty = false;
                //		_this.fire(IBizForm.FORMLOADED);
                _this.fire(IBizForm.FORMWFSUBMITTED, action);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                _this.fire(IBizForm.FORMFIELDCHANGED, null);
                // if (successcb) {
                //     successcb(form, action);
                // }
                resolve(action);
            }, (action) => {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZEDITFORM.WFSUBMITFAILED.TITLE',"提交流程错误信息"),$IGM('IBIZEDITFORM.WFSUBMITFAILED.INFO',"工作流提交发生错误,"+_this.getActionErrorInfo(action),[_this.getActionErrorInfo(action)]),2);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                reject(action);
            });
        });

    }
    public doUIAction(arg: any = {}): Promise<any> {
        var _this = this;
        if (!arg) arg = {};
        // $.extend(arg, { srfaction: 'uiaction' });
        Object.assign(arg, { srfaction: 'uiaction' });
        // if (IBizApp_Data) {
        //     arg.srfappdata = IBizApp_Data;
        // }

        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }

        _this.beginLoading();
        return new Promise((resolve, reject) => {
            _this.iBizHttp.post(_this.getBackendUrl(), arg).subscribe((data) => {
                _this.endLoading();
                if (data.ret == 0) {
                    IBizUtil.processResultBefore(data);
                    _this.fire(IBizEditForm.UIACTIONFINISHED, data);
                    if (data.reloadData) {
                        _this.reload();
                    }
                    if (data.info && data.info != '') {
                        // IBiz.alert('', data.info, 1);
                        _this.iBizNotification.info('', data.info);
                    }
                    IBizUtil.processResult(data);
                    if (successcb) {
                        successcb(data);
                    }
                    resolve(data);
                } else {
                    // if (errorcb) {
                    //     errorcb(data);
                    // }
                    reject(data);
                    // IBiz.alert($IGM('IBIZEDITFORM.DOUIACTIONFAILED.TITLE', "界面操作错误信息"), $IGM('IBIZEDITFORM.DOUIACTIONFAILED.INFO', "操作失败," + data.errorMessage, [data.errorMessage]), 2);
                    _this.iBizNotification.error('界面操作错误信息', `操作失败,${data.errorMessage}`);
                }
            }, (data) => {
                _this.endLoading();
                // IBiz.alert($IGM('IBIZEDITFORM.DOUIACTIONFAILED.TITLE', "界面操作错误信息"), $IGM('IBIZEDITFORM.DOUIACTIONFAILED2.INFO', "执行请求异常！"), 2);
                _this.iBizNotification.error('界面操作错误信息', '执行请求异常！');
                // if (errorcb) {
                //     errorcb(e);
                // }
                reject(data);
            });
        });
    }
    public getFormType(): string {
        return 'EDITFORM';
    }

    /*****************事件声明************************/
    /**
     * 表单权限发生变化
     */
    public static UIACTIONFINISHED = 'UIACTIONFINISHED';

    /**
     * 表单保存之前触发
     */
    public static FORMBEFORESAVE = 'FORMBEFORESAVE';


    /**
     * 表单保存错误触发
     */
    public static FORMSAVEERROR = 'FORMSAVEERROR';
}