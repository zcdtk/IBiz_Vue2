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
 * 表单对象
 *
 * @class IBizForm
 * @extends {IBizControl}
 */
var IBizForm = /** @class */ (function (_super) {
    __extends(IBizForm, _super);
    /**
     * Creates an instance of IBizForm.
     * 创建 IBizForm 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizForm
     */
    function IBizForm(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.dataaccaction = {};
        _this_1.formDirty = false;
        _this_1.fieldMap = {};
        _this_1.fieldIdMap = {};
        _this_1.ignoreUFI = false;
        _this_1.ignoreformfieldchange = false;
        _this_1.readonly = false;
        var _this = _this_1;
        _this.regFormItems();
        return _this_1;
    }
    IBizForm.prototype.init = function () {
        var _this = this;
        // $.each(_this.fieldMap,function(key,item){
        // 	//计算表单是否允许为空
        // 	item.setAllowBlank(item.allowBlank);
        // 	//计算表单是否显示
        // 	item.setVisible(item.visible);
        // 	//计算表单是否隐藏
        // 	item.setHidden(item.hidden);
        // });
    };
    /**
     * 加载
     * @param arg 参数
     */
    IBizForm.prototype.autoLoad = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        if (arg.srfkey != undefined && arg.srfkey != '') {
            return _this.load2(arg);
        }
        if (arg.srfkeys != undefined && arg.srfkeys != '') {
            arg.srfkey = arg.srfkeys;
            //_this.viewparam['srfkey'] = arg.srfkey;
            return _this.load2(arg);
        }
        return _this.loadDraft(arg);
    };
    IBizForm.prototype.load2 = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        // $.extend(arg, { srfaction: 'load' });
        Object.assign(arg, { srfaction: 'load' });
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;
        return new Promise(function (resolve, reject) {
            _this.load(arg).subscribe(function (action) {
                _this.setFieldAsyncConfig(action.config);
                _this.setFieldState(action.state);
                _this.setDataAccAction(action.dataaccaction);
                _this.fillForm(action.data);
                _this.formDirty = false;
                _this.fire(IBizForm.FORMLOADED, _this);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                _this.fire(IBizForm.FORMFIELDCHANGED, null);
                _this.onLoaded();
                // if (successcb) {
                //     successcb(form, action);
                // }
                resolve(action);
            }, function (action) {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZFORM.LOAD.TITLE', '加载失败'), $IGM('IBIZFORM.LOAD2.INFO', "加载数据发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
                _this_1.iBizNotification.error('加载失败', "\u52A0\u8F7D\u6570\u636E\u53D1\u751F\u9519\u8BEF," + _this.getActionErrorInfo(action));
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                reject(action);
            });
        });
    };
    IBizForm.prototype.loadDraft = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        if (!arg.srfsourcekey || arg.srfsourcekey == '') {
            // $.extend(arg, { srfaction: 'loaddraft' });
            Object.assign(arg, { srfaction: 'loaddraft' });
        }
        else {
            // $.extend(arg, { srfaction: 'loaddraftfrom' });
            Object.assign(arg, { srfaction: 'loaddraftfrom' });
        }
        return new Promise(function (resole, reject) {
            _this.load(arg).subscribe(function (action) {
                _this.setFieldAsyncConfig(action.config);
                _this.setFieldState(action.state);
                _this.setDataAccAction(action.dataaccaction);
                _this.fillForm(action.data);
                _this.formDirty = false;
                _this.fire(IBizForm.FORMLOADED, _this);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                _this.fire(IBizForm.FORMFIELDCHANGED, null);
                _this.onDraftLoaded();
                // if (successcb) {
                //     successcb(form, action);
                // } 
                resole(action);
            }, function (action) {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZFORM.LOAD.TITLE', '加载失败'), $IGM('IBIZFORM.LOADDRAFT.INFO', "加载草稿发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
                _this_1.iBizNotification.error('加载失败', "\u52A0\u8F7D\u8349\u7A3F\u53D1\u751F\u9519\u8BEF," + _this.getActionErrorInfo(action));
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                reject(action);
            });
        });
    };
    IBizForm.prototype.onDraftLoaded = function () {
        var _this = this;
    };
    IBizForm.prototype.onLoaded = function () {
        var _this = this;
    };
    /**
     * 设置表单动态配置
     */
    IBizForm.prototype.setFieldAsyncConfig = function (config) {
        if (config === void 0) { config = {}; }
        if (config == undefined || config == null)
            return;
        var _this = this;
        var fieldNames = Object.keys(config);
        fieldNames.forEach(function (name) {
            var field = _this.findField(name);
            if (field) {
                field.setAsyncConfig(config[name]);
            }
        });
    };
    /**
     * 设置当前表单权限信息
     */
    IBizForm.prototype.setDataAccAction = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        var _this = this;
        _this.dataaccaction = dataaccaction;
        _this.fire(IBizForm.DATAACCACTIONCHANGE, dataaccaction);
    };
    /**
     * 获取当前表单权限信息
     */
    IBizForm.prototype.getDataAccAction = function () {
        var _this = this;
        return _this.dataaccaction;
    };
    /**
     * 设置属性状态
     */
    IBizForm.prototype.setFieldState = function (state) {
        if (state === void 0) { state = {}; }
        if (state == undefined || state == null)
            return;
        var _this = this;
        var filedNames = Object.keys(state);
        filedNames.forEach(function (name) {
            var field = _this.findField(name);
            if (field) {
                var disabled = ((state[name] & 1) == 0);
                if (field.isDisabled() != disabled)
                    field.setDisabled(disabled);
            }
        });
    };
    IBizForm.prototype.isDirty = function () {
        var _this = this;
        return _this.formDirty;
    };
    IBizForm.prototype.regFormItems = function () {
    };
    /**
     * 注册表单属性
     * @param field 属性
     */
    IBizForm.prototype.regFormItem = function (field) {
        var _this = this;
        if (Array.isArray(field)) {
            field.forEach(function (_field) {
                _this.fieldIdMap[_field.getName()] = _field;
                _this.fieldMap[_field.getName()] = _field;
                _field.setForm(_this);
                // 注册事件
                _field.on(IBizFormItem.VALUECHANGED).subscribe(function (args) {
                    if (_this.ignoreformfieldchange)
                        return;
                    _this.formDirty = true;
                    _this.fire(IBizForm.FORMFIELDCHANGED, args);
                });
            });
        }
        else {
            _this.fieldIdMap[field.getName()] = field;
            _this.fieldMap[field.getName()] = field;
            field.setForm(_this);
            // 注册事件
            field.on(IBizFormItem.VALUECHANGED).subscribe(function (args) {
                if (_this.ignoreformfieldchange)
                    return;
                _this.formDirty = true;
                _this.fire(IBizForm.FORMFIELDCHANGED, args);
            });
        }
    };
    /**
     * 注销表单属性
     * @param field 属性
     */
    IBizForm.prototype.unRegister = function (field) {
        this.fieldMap[field.getName()] = null;
        this.fieldIdMap[field.getUniqueId()] = null;
    };
    /**
     * 获取控件标识
     */
    // public getSRFCtrlId():string{
    // 	return this.srfctrlid;
    // }
    /**
     * 获取后台服务地址
     */
    // public getBackendUrl(): string {
    //     return this.backendurl;
    // }
    /**
     * 根据名称获取属性
     */
    IBizForm.prototype.findField = function (name) {
        return this.fieldMap[name];
    };
    /**
     * 根据唯一标识获取属性
     */
    IBizForm.prototype.getFieldById = function (id) {
        return this.fieldIdMap[id];
    };
    /**
     * 加载数据
     */
    IBizForm.prototype.load = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        _this.beginLoading();
        var subject = new rxjs.Subject();
        _this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (data) {
            _this_1.endLoading();
            if (data && data.ret === 0) {
                subject.next(data);
            }
            else {
                subject.error(data);
            }
        }, function (data) {
            _this_1.endLoading();
            subject.error(data);
        });
        return subject.asObservable();
    };
    IBizForm.prototype.submit = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        _this.beginLoading();
        var subject = new rxjs.Subject();
        _this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (data) {
            _this_1.endLoading();
            if (data && data.ret === 0) {
                subject.next(data);
            }
            else {
                subject.error(data);
            }
        }, function (data) {
            _this_1.endLoading();
            subject.error(data);
        });
        return subject.asObservable();
    };
    IBizForm.prototype.getActionErrorInfo = function (action) {
        if (action === void 0) { action = {}; }
        if (action.failureType === 'CONNECT_FAILURE') {
            return 'Status:' + action.response.status + ': ' + action.response.statusText;
        }
        if (action.failureType === 'SERVER_INVALID') {
            var msg = action.errorMessage;
            if (action.error && action.error.items) {
                action.error.items.some(function (item, index) {
                    if (index >= 5) {
                        msg += ("<BR>...... ");
                        return true;
                    }
                    if (item.info && item.info != '' && msg.indexOf(item.info) < 0) {
                        msg += ("<BR>" + item.info);
                    }
                });
            }
            return msg;
        }
        if (action.failureType === 'CLIENT_INVALID') {
            return "";
        }
        if (action.failureType === 'LOAD_FAILURE') {
            return "";
        }
    };
    /**
     * 填充表单
     */
    IBizForm.prototype.fillForm = function (data) {
        if (data === void 0) { data = {}; }
        if (!data)
            return;
        var _this = this;
        var names = Object.keys(data);
        names.forEach(function (name) {
            var val = data[name] ? data[name] : '';
            if (!(typeof val === 'string')) {
                val = JSON.stringify(val);
            }
            _this.setFieldValue(name, val);
        });
    };
    /**
     * 设置表单项值
     */
    IBizForm.prototype.setFieldValue = function (name, value) {
        var field = this.findField(name);
        if (field)
            field.setValue(value);
    };
    /**
     * 获取表单项值
     */
    IBizForm.prototype.getFieldValue = function (name) {
        var _this = this;
        var field = _this.findField(name);
        if (!field) {
            // IBiz.alert($IGM('IBIZFORM.GETFIELDVALUE.TITLE','获取失败'), $IGM('IBIZFORM.GETFIELDVALUE.INFO','无法获取表单项['+name+']',[name]),2);
            this.iBizNotification.error('获取失败', "\u65E0\u6CD5\u83B7\u53D6\u8868\u5355\u9879[" + name + "]");
            return '';
        }
        return field.getValue();
    };
    /**
     * 设置表单项允许为空
     */
    IBizForm.prototype.setFieldAllowBlank = function (name, allowblank) {
        var _this = this;
        var field = _this.findField(name);
        if (field) {
            field.setAllowBlank(allowblank);
        }
    };
    /**
     * 设置表单是否禁用
     */
    IBizForm.prototype.setReadonly = function (disabled) {
        var _this_1 = this;
        this.readonly = disabled;
        var fieldNames = Object.keys(this.fieldMap);
        fieldNames.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                field.setDisabled(disabled);
            }
        });
    };
    /**
     * 设置表单项属性是否禁用
     */
    IBizForm.prototype.setFieldDisabled = function (name, disabled) {
        var _this = this;
        if (_this.readonly) {
            return;
        }
        var field = _this.findField(name);
        if (field) {
            field.setDisabled(disabled);
        }
    };
    /**
     * 设置表单错误
     */
    IBizForm.prototype.setFormError = function (formerror) {
        var _this = this;
        _this.resetFormError();
        if (formerror && formerror.items) {
            // $.each(formerror.items, function (index, item) {
            //     var field = _this.findField(item.id);
            //     if (field) {
            //         //  field.markInvalid($IGM('IBIZFORM.SETFORMERROR.ERROR','输入有误'));
            //         //  field.setActiveError($IGM('IBIZFORM.SETFORMERROR.ERROR','输入有误'));
            //     }
            // });
        }
    };
    IBizForm.prototype.resetFormError = function () {
        var _this_1 = this;
        var _this = this;
        var fieldNames = Object.keys(this.fieldMap);
        fieldNames.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field.hasActiveError()) {
                field.unsetActiveError();
            }
        });
    };
    /**
     * 设置面板<分组、分页面板>隐藏
     */
    IBizForm.prototype.setPanelVisible = function (name, visible) {
        var _this = this;
        var field = _this.findField(name);
        if (field) {
            field.setVisible(visible);
        }
    };
    /**
     * 获取当前表单项值
     */
    IBizForm.prototype.getActiveData = function () {
        var _this_1 = this;
        var _this = this;
        var values = {};
        var fieldNames = Object.keys(this.fieldMap);
        fieldNames.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                if (values[field.getName()] == undefined) {
                    var value = field.getValue();
                    if (value) {
                        if (value.toString().length < 8000)
                            values[field.getName()] = field.getValue();
                    }
                }
            }
        });
        return values;
    };
    /**
     * 获取全部表单项值
     */
    IBizForm.prototype.getValues = function () {
        var _this_1 = this;
        var _this = this;
        var values = {};
        var fieldNames = Object.keys(this.fieldMap);
        fieldNames.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                var value = field.getValue();
                values[name] = value;
            }
        });
        return values;
    };
    IBizForm.prototype.testFieldEnableReadonly = function (value) {
        return false;
    };
    /**
     * 更新表单项
     */
    IBizForm.prototype.updateFormItems = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (_this.ignoreUFI)
            return new Promise(null);
        var activeData = _this.getActiveData();
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        // $.extend(arg, { srfaction: 'updateformitem',srfactivedata:JSON.stringify(activeData)});
        Object.assign(arg, { srfaction: 'updateformitem', srfactivedata: JSON.stringify(activeData) });
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
        return new Promise(function (resolve, reject) {
            _this.load(arg).subscribe(function (action) {
                _this.setFieldAsyncConfig(action.config);
                _this.setFieldState(action.state);
                if (action.dataaccaction)
                    _this.setDataAccAction(action.dataaccaction);
                _this.fillForm(action.data);
                _this.fire(IBizForm.UPDATEFORMITEMS, { ufimode: arg.srfufimode, data: action.data });
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                _this.fire(IBizForm.FORMFIELDCHANGED, null);
                // if(successcb){
                // 	successcb(form, action);
                // }
                resolve(action);
            }, function (action) {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZFORM.UPDATEFORMITEMS.TITLE','更新失败'), $IGM('IBIZFORM.UPDATEFORMITEMS.INFO',"更新表单项发生错误,"+action.info,[action.info]),2);
                _this.iBizNotification.error('更新失败', "\u66F4\u65B0\u8868\u5355\u9879\u53D1\u751F\u9519\u8BEF," + action.info);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                //   if(errorcb){
                //           errorcb(form, action);	
                //     }
                reject(action);
            });
        });
    };
    /**
     * 重置表单
     */
    IBizForm.prototype.reset = function () {
        var _this = this;
        _this.autoLoad();
    };
    IBizForm.prototype.getFormType = function () {
        return '';
    };
    /*****************事件声明************************/
    /**
     * 表单加载完成事件
     */
    IBizForm.FORMLOADED = 'FORMLOADED';
    /**
     * 表单属性值变化事件
     */
    IBizForm.FORMFIELDCHANGED = 'FORMFIELDCHANGED';
    /**
     * 表单保存完成
     */
    IBizForm.FORMSAVED = 'FORMSAVED';
    /**
     * 表单删除完成
     */
    IBizForm.FORMREMOVED = 'FORMREMOVED';
    /**
     * 表单工作流启动完成
     */
    IBizForm.FORMWFSTARTED = 'FORMWFSTARTED';
    /**
     * 表单工作流提交完成
     */
    IBizForm.FORMWFSUBMITTED = 'FORMWFSUBMITTED';
    /**
     * 表单权限发生变化
     */
    IBizForm.DATAACCACTIONCHANGE = 'DATAACCACTIONCHANGE';
    /**
     * 表单项更新
     */
    IBizForm.UPDATEFORMITEMS = 'UPDATEFORMITEMS';
    return IBizForm;
}(IBizControl));
