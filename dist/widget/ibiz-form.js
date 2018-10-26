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
 * 表单
 *
 * @export
 * @class IBizForm
 * @extends {IBizControl}
 */
var IBizForm = /** @class */ (function (_super) {
    __extends(IBizForm, _super);
    /**
     * Creates an instance of IBizForm.
     * 创建IBizForm的一个实例。
     *
     * @param {*} [opts={}]
     * @memberof IBizForm
     */
    function IBizForm(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 是否忽略表单变化
         *
         * @type {boolean}
         * @memberof IBizForm
         */
        _this_1.ignoreformfieldchange = false;
        /**
         * 是否忽略表单项更新
         *
         * @type {boolean}
         * @memberof IBizForm
         */
        _this_1.ignoreUFI = false;
        /**
         * 当前表单权限
         *
         * @type {*}
         * @memberof IBizForm
         */
        _this_1.dataaccaction = {};
        /**
         * 表单是否改变
         *
         * @type {boolean}
         * @memberof IBizForm
         */
        _this_1.formDirty = false;
        /**
         * 表单表单项
         *
         * @type {*}
         * @memberof IBizForm
         */
        _this_1.fields = {};
        var _this = _this_1;
        _this.regFields();
        return _this_1;
    }
    /**
     * 注册表单项
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.regFields = function () {
    };
    /**
     * 表单加载
     *
     * @param {*} [arg={}] 参数
     * @returns {void}
     * @memberof IBizForm
     */
    IBizForm.prototype.autoLoad = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg) {
            arg = {};
        }
        if (arg.srfkey && !Object.is(arg.srfkey, '')) {
            this.load2(arg);
            return;
        }
        if (arg.srfkeys && !Object.is(arg.srfkeys, '')) {
            Object.assign(arg, { srfkey: arg.srfkeys });
            this.load2(arg);
            return;
        }
        this.loadDraft(arg);
    };
    /**
     * 加载
     *
     * @param {*} [opt={}] 参数
     * @memberof IBizForm
     */
    IBizForm.prototype.load2 = function (opt) {
        var _this_1 = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        Object.assign(arg, opt);
        Object.assign(arg, { srfaction: 'load', srfctrlid: this.getName() });
        this.fire(IBizForm.BEFORELOAD, arg);
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        this.load(arg).subscribe(function (action) {
            _this_1.setFieldAsyncConfig(action.config);
            _this_1.setFieldState(action.state);
            _this_1.setDataAccAction(action.dataaccaction);
            _this_1.fillForm(action.data);
            _this_1.formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED, this);
            _this_1.fire(IBizForm.FORMLOADED, _this_1);
            _this_1.ignoreUFI = false;
            _this_1.ignoreformfieldchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            _this_1.fire(IBizForm.FORMFIELDCHANGED, null);
            _this_1.onLoaded();
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            _this_1.iBizNotification.error('加载失败', '加载数据发生错误, ' + _this_1.getActionErrorInfo(action));
            // IBiz.alert(IGM('IBIZFORM.LOAD.TITLE', '加载失败'), IGM('IBIZFORM.LOAD2.INFO', '加载数据发生错误,' + this.getActionErrorInfo(action), [this.getActionErrorInfo(action)]), 2);
            _this_1.ignoreUFI = false;
            _this_1.ignoreformfieldchange = false;
        });
    };
    /**
     * 加载草稿
     *
     * @param {*} [opt={}]
     * @memberof IBizForm
     */
    IBizForm.prototype.loadDraft = function (opt) {
        var _this_1 = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        Object.assign(arg, opt);
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        if (!arg.srfsourcekey || Object.is(arg.srfsourcekey, '')) {
            // .extend(arg, { srfaction: 'loaddraft' });
            Object.assign(arg, { srfaction: 'loaddraft', srfctrlid: this.getName() });
        }
        else {
            // .extend(arg, { srfaction: 'loaddraftfrom' });
            Object.assign(arg, { srfaction: 'loaddraftfrom', srfctrlid: this.getName() });
        }
        this.load(arg).subscribe(function (action) {
            _this_1.setFieldAsyncConfig(action.config);
            _this_1.setFieldState(action.state);
            _this_1.setDataAccAction(action.dataaccaction);
            _this_1.fillForm(action.data);
            _this_1.formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED, this);
            _this_1.fire(IBizForm.FORMLOADED, _this_1);
            _this_1.ignoreUFI = false;
            _this_1.ignoreformfieldchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            _this_1.fire(IBizForm.FORMFIELDCHANGED, null);
            _this_1.onDraftLoaded();
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert(IGM('IBIZFORM.LOAD.TITLE', '加载失败'), IGM('IBIZFORM.LOADDRAFT.INFO', '加载草稿发生错误,' + this.getActionErrorInfo(action), [this.getActionErrorInfo(action)]), 2);
            _this_1.iBizNotification.error('加载失败', '加载草稿发生错误, ' + _this_1.getActionErrorInfo(action));
            _this_1.ignoreUFI = false;
            _this_1.ignoreformfieldchange = false;
        });
    };
    /**
     *
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.onDraftLoaded = function () {
    };
    /**
     *
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.onLoaded = function () {
    };
    /**
     * 设置表单动态配置
     *
     * @param {*} [config={}]
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldAsyncConfig = function (config) {
        var _this_1 = this;
        if (config === void 0) { config = {}; }
        if (!config) {
            return;
        }
        var _names = Object.keys(config);
        _names.forEach(function (name) {
            var field = _this_1.findField(name);
            if (!field) {
                return;
            }
            if (config[name].hasOwnProperty('items') && Array.isArray(config[name].items)) {
                field.setAsyncConfig(config[name].items);
            }
            if (config[name].hasOwnProperty('dictitems') && Array.isArray(config[name].dictitems)) {
                field.setDictItems(config[name].dictitems);
            }
        });
    };
    /**
     * 设置当前表单权限信息
     *
     * @param {*} [dataaccaction={}] 权限数据
     * @memberof IBizForm
     */
    IBizForm.prototype.setDataAccAction = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        this.dataaccaction = dataaccaction;
        this.fire(IBizForm.DATAACCACTIONCHANGE, this.dataaccaction);
    };
    /**
     * 获取当前表单权限信息
     *
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getdataaccaction = function () {
        return this.dataaccaction;
    };
    /**
     * 设置属性状态
     *
     * @param {*} [state={}]
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldState = function (state) {
        var _this_1 = this;
        if (state === void 0) { state = {}; }
        if (!state) {
            return;
        }
        var stateDats = Object.keys(state);
        stateDats.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                // tslint:disable-next-line:no-bitwise
                var disabled = ((state[name] & 1) === 0);
                if (field.isDisabled() !== disabled) {
                    field.setDisabled(disabled);
                }
            }
        });
    };
    /**
     * 表单是否改变
     *
     * @returns {boolean}
     * @memberof IBizForm
     */
    IBizForm.prototype.isDirty = function () {
        return this.formDirty;
    };
    /**
     * 注册表单属性
     *
     * @param {*} field 表单项
     * @memberof IBizForm
     */
    IBizForm.prototype.regField = function (field) {
        var _this_1 = this;
        if (!this.fields) {
            this.fields = {};
        }
        if (field) {
            field.on(IBizFormItem.VALUECHANGED).subscribe(function (data) {
                if (data === void 0) { data = {}; }
                if (_this_1.ignoreformfieldchange) {
                    return;
                }
                _this_1.formDirty = true;
                _this_1.fire(IBizForm.FORMFIELDCHANGED, data);
            });
            this.fields[field.getName()] = field;
        }
    };
    /**
     * 注销表单属性
     *
     * @param {*} field 属性
     * @memberof IBizForm
     */
    IBizForm.prototype.unRegFiled = function (field) {
        delete this.fields[field.getName()];
    };
    /**
     * 获取控件标识
     *
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getSRFCtrlId = function () {
        // return this.srfctrlid;
    };
    /**
     * 根据名称获取属性
     *
     * @param {string} name 属性名称
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.findField = function (name) {
        if (this.fields[name]) {
            return this.fields[name];
        }
        return undefined;
    };
    /**
     * 根据唯一标识获取属性
     *
     * @param {string} id 表单项id
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getFieldById = function (id) {
        // return this.fieldIdMap[id];
    };
    /**
     * 加载数据
     *
     * @param {*} [opt={}] 参数
     * @returns {Observable<any>}  事件回调
     * @memberof IBizForm
     */
    IBizForm.prototype.load = function (opt) {
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        Object.assign(arg, opt);
        var subject = new rxjs.Subject();
        this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (data) {
            if (data.ret === 0) {
                subject.next(data);
            }
            else {
                subject.error(data);
            }
        }, function (data) {
            subject.error(data);
        });
        return subject;
    };
    /**
     * 数据提交
     *
     * @param {*} [opt={}] 参数
     * @returns {Observable<any>} 事件回调
     * @memberof IBizForm
     */
    IBizForm.prototype.submit = function (opt) {
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        Object.assign(arg, opt);
        var subject = new rxjs.Subject();
        this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (data) {
            if (data.ret === 0) {
                subject.next(data);
            }
            else {
                subject.error(data);
            }
        }, function (data) {
            subject.error(data);
        });
        return subject;
    };
    /**
     * 返回错误提示信息
     *
     * @param {*} [action={}]
     * @returns {string}
     * @memberof IBizForm
     */
    IBizForm.prototype.getActionErrorInfo = function (action) {
        if (action === void 0) { action = {}; }
        if (action.failureType === 'CONNECT_FAILURE') {
            return 'Status:' + action.response.status + ': ' + action.response.statusText;
        }
        if (action.failureType === 'SERVER_INVALID') {
            var msg_1;
            if (action.errorMessage) {
                msg_1 = action.errorMessage;
            }
            if (action.error && action.error.items) {
                var items = action.error.items;
                items.forEach(function (item, index) {
                    if (index >= 5) {
                        msg_1 += ('...... ');
                        return false;
                    }
                    if (item.info && !Object.is(item.info, '') && msg_1.indexOf(item.info) < 0) {
                        msg_1 += item.info;
                    }
                });
            }
            return msg_1;
        }
        if (action.failureType === 'CLIENT_INVALID') {
            return '';
        }
        if (action.failureType === 'LOAD_FAILURE') {
            return '';
        }
    };
    /**
     * 填充表单
     *
     * @param {*} [data={}]
     * @memberof IBizForm
     */
    IBizForm.prototype.fillForm = function (data) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var fillDatas = Object.keys(data);
        fillDatas.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                var _value = data[name];
                if (_value instanceof Array || _value instanceof Object) {
                    _value = JSON.stringify(_value);
                }
                field.setValue(_value);
            }
        });
    };
    /**
     * 设置表单项值
     *
     * @param {string} name
     * @param {*} value
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldValue = function (name, value) {
        var field = this.findField(name);
        if (field) {
            field.setValue(value);
        }
    };
    /**
     * 获取表单项值
     *
     * @param {string} name
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getFieldValue = function (name) {
        var field = this.findField(name);
        if (!field) {
            // IBiz.alert(IGM('IBIZFORM.GETFIELDVALUE.TITLE', '获取失败'), IGM('IBIZFORM.GETFIELDVALUE.INFO', '无法获取表单项[' + name + ']', [name]), 2);
            this.iBizNotification.error('获取失败', '无法获取表单项[' + name + ']');
            return '';
        }
        return field.getValue();
    };
    /**
     * 设置表单项允许为空
     *
     * @param {string} name
     * @param {boolean} allowblank
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldAllowBlank = function (name, allowblank) {
        var field = this.findField(name);
        if (field) {
            field.setAllowBlank(allowblank);
        }
    };
    /**
     * 设置表单项属性是否禁用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldDisabled = function (name, disabled) {
        var field = this.findField(name);
        if (field) {
            field.setDisabled(disabled);
        }
    };
    /**
     * 设置表单错误
     *
     * @param {any} formerror
     * @memberof IBizForm
     */
    IBizForm.prototype.setFormError = function (formerror) {
        var _this_1 = this;
        this.resetFormError();
        if (formerror && formerror.items) {
            var errorItems = formerror.items;
            errorItems.forEach(function (item) {
                var name = item.id;
                if (name) {
                    var _item = _this_1.fields[name];
                    _item.setErrorInfo({ validateStatus: 'error', hasError: true, errorInfo: item.info });
                }
            });
        }
    };
    /**
     *
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.resetFormError = function () {
        var _this_1 = this;
        var itemsData = Object.keys(this.fields);
        itemsData.forEach(function (name) {
            var item = _this_1.fields[name];
            item.setErrorInfo({ validateStatus: 'success', hasError: false, errorInfo: '' });
        });
    };
    /**
     * 设置面板,表单项<分组、分页面板>隐藏
     *
     * @param {string} name
     * @param {boolean} visible
     * @memberof IBizForm
     */
    IBizForm.prototype.setPanelVisible = function (name, visible) {
        var field = this.findField(name);
        if (field) {
            field.setVisible(visible);
        }
    };
    /**
     * 获取当前表单项值
     *
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getActiveData = function () {
        var _this_1 = this;
        // tslint:disable-next-line:prefer-const
        var values = {};
        var items = Object.keys(this.fields);
        items.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field && (Object.is(field.fieldType, 'FORMITEM') || Object.is(field.fieldType, 'HIDDENFORMITEM'))) {
                var value = field.getValue();
                if (Object.keys(values).length <= 1000) {
                    values[name] = value;
                }
            }
        });
        return values;
    };
    /**
     * 获取全部表单项值
     *
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getValues = function () {
        var _this_1 = this;
        // tslint:disable-next-line:prefer-const
        var values = {};
        var items = Object.keys(this.fields);
        items.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field && (Object.is(field.fieldType, 'FORMITEM') || Object.is(field.fieldType, 'HIDDENFORMITEM'))) {
                var value = field.getValue();
                values[name] = value;
            }
        });
        return values;
    };
    /**
     *
     *
     * @param {*} value
     * @returns {boolean}
     * @memberof IBizForm
     */
    IBizForm.prototype.testFieldEnableReadonly = function (value) {
        return false;
    };
    /**
     * 更新表单项
     *
     * @param {string} mode 更新模式
     * @returns {void}
     * @memberof IBizForm
     */
    IBizForm.prototype.updateFormItems = function (mode) {
        var _this_1 = this;
        if (this.ignoreUFI) {
            return;
        }
        var activeData = this.getActiveData();
        // tslint:disable-next-line:prefer-const
        var arg = {};
        this.fire(IBizForm.UPDATEFORMITEMBEFORE, activeData);
        Object.assign(arg, { srfaction: 'updateformitem', srfufimode: mode, srfactivedata: JSON.stringify(activeData), srfctrlid: this.getName() });
        this.ignoreUFI = true;
        // this.ignoreformfieldchange=true;
        this.load(arg).subscribe(function (action) {
            _this_1.fire(IBizForm.UPDATEFORMITEMED, action.data);
            _this_1.setFieldAsyncConfig(action.config);
            _this_1.setFieldState(action.state);
            if (action.dataaccaction) {
                _this_1.setDataAccAction(action.dataaccaction);
            }
            _this_1.fillForm(action.data);
            _this_1.ignoreUFI = false;
            // this.ignoreformfieldchange=false;
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert(IGM('IBIZFORM.UPDATEFORMITEMS.TITLE', '更新失败'), IGM('IBIZFORM.UPDATEFORMITEMS.INFO', '更新表单项发生错误,' + action.info, [action.info]), 2);
            _this_1.iBizNotification.error('更新失败', '更新表单项发生错误, ' + action.info);
            _this_1.ignoreUFI = false;
            // this.ignoreformfieldchange=false;
        });
    };
    /**
     * 重置表单
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.reset = function () {
        this.autoLoad();
    };
    /**
     * 获取表单类型
     *
     * @returns {string}
     * @memberof IBizForm
     */
    IBizForm.prototype.getFormType = function () {
        return undefined;
    };
    /**
     *
     *
     * @param {string} fieldName
     * @param {boolean} state
     * @param {string} errorInfo
     * @memberof IBizForm
     */
    IBizForm.prototype.setFormFieldChecked = function (fieldName, state, errorInfo) {
        var field = this.findField(fieldName);
        if (field) {
            field.setErrorInfo({ validateStatus: state ? 'error' : 'success', hasError: state ? true : false, errorInfo: state ? errorInfo : '' });
        }
    };
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
    IBizForm.UPDATEFORMITEMBEFORE = 'UPDATEFORMITEMBEFORE';
    IBizForm.UPDATEFORMITEMED = 'UPDATEFORMITEMED';
    IBizForm.BEFORELOAD = 'BEFORELOAD';
    return IBizForm;
}(IBizControl));
