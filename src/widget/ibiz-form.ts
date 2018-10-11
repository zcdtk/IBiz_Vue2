/**
 * 表单对象
 *
 * @class IBizForm
 * @extends {IBizControl}
 */
class IBizForm extends IBizControl {

    public dataaccaction: any = {};

    public formDirty: boolean = false;

    public fieldMap: any = {};

    public fieldIdMap: any = {};

    public ignoreUFI: boolean = false;

    public ignoreformfieldchange: boolean = false;

    public readonly: boolean = false;

    /**
     * Creates an instance of IBizForm.
     * 创建 IBizForm 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizForm
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
        _this.regFormItems();
    }

    public init(): void {
        var _this = this;
        // $.each(_this.fieldMap,function(key,item){
        // 	//计算表单是否允许为空
        // 	item.setAllowBlank(item.allowBlank);
        // 	//计算表单是否显示
        // 	item.setVisible(item.visible);
        // 	//计算表单是否隐藏
        // 	item.setHidden(item.hidden);
        // });
    }
	/**
	 * 加载
	 * @param arg 参数
	 */
    public autoLoad(arg: any = {}): Promise<any> {
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
    }
    public load2(arg: any = {}): Promise<any> {
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
        return new Promise((resolve, reject) => {
            _this.load(arg).subscribe((action) => {
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
            }, (action) => {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZFORM.LOAD.TITLE', '加载失败'), $IGM('IBIZFORM.LOAD2.INFO', "加载数据发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
                this.iBizNotification.error('加载失败', `加载数据发生错误,${_this.getActionErrorInfo(action)}`);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                reject(action);
            });
        });
    }
    public loadDraft(arg: any = {}): Promise<any> {
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
        } else {
            // $.extend(arg, { srfaction: 'loaddraftfrom' });
            Object.assign(arg, { srfaction: 'loaddraftfrom' });
        }
        return new Promise((resole, reject) => {
            _this.load(arg).subscribe((action) => {
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
            }, (action) => {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZFORM.LOAD.TITLE', '加载失败'), $IGM('IBIZFORM.LOADDRAFT.INFO', "加载草稿发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
                this.iBizNotification.error('加载失败', `加载草稿发生错误,${_this.getActionErrorInfo(action)}`);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                reject(action);
            });
        });

    }
    public onDraftLoaded(): void {
        var _this = this;
    }
    public onLoaded(): void {
        var _this = this;
    }
	/**
	 * 设置表单动态配置
	 */
    public setFieldAsyncConfig(config: any = {}): void {
        if (config == undefined || config == null)
            return;
        var _this = this;
        const fieldNames: Array<any> = Object.keys(config);
        fieldNames.forEach(name => {
            var field = _this.findField(name);
            if (field) {
                field.setAsyncConfig(config[name]);
            }
        });

    }
	/**
	 * 设置当前表单权限信息
	 */
    public setDataAccAction(dataaccaction: any = {}): void {
        var _this = this;
        _this.dataaccaction = dataaccaction;

        _this.fire(IBizForm.DATAACCACTIONCHANGE, dataaccaction);
    }
	/**
	 * 获取当前表单权限信息
	 */
    public getDataAccAction(): any {
        var _this = this;
        return _this.dataaccaction;
    }
	/**
	 * 设置属性状态
	 */
    public setFieldState(state: any = {}): void {
        if (state == undefined || state == null)
            return;
        var _this = this;
        const filedNames: Array<any> = Object.keys(state);
        filedNames.forEach(name => {
            var field = _this.findField(name);
            if (field) {
                var disabled = ((state[name] & 1) == 0);
                if (field.isDisabled() != disabled)
                    field.setDisabled(disabled);
            }
        });
    }
    public isDirty(): boolean {
        var _this = this;
        return _this.formDirty;
    }

    public regFormItems(): void {

    }
	/**
	 * 注册表单属性
	 * @param field 属性
	 */
    public regFormItem(field: any): void {
        var _this = this;
        if (Array.isArray(field)) {
            field.forEach(_field => {
                _this.fieldIdMap[_field.getName()] = _field;
                _this.fieldMap[_field.getName()] = _field;
                _field.setForm(_this);
                // 注册事件
                _field.on(IBizFormItem.VALUECHANGED).subscribe((args) => {
                    if (_this.ignoreformfieldchange)
                        return;
                    _this.formDirty = true;
                    _this.fire(IBizForm.FORMFIELDCHANGED, args);
                });
            });

        } else {
            _this.fieldIdMap[field.getName()] = field;
            _this.fieldMap[field.getName()] = field;
            field.setForm(_this);
            // 注册事件
            field.on(IBizFormItem.VALUECHANGED).subscribe((args) => {
                if (_this.ignoreformfieldchange)
                    return;
                _this.formDirty = true;
                _this.fire(IBizForm.FORMFIELDCHANGED, args);
            });
        }
    }
	/**
	 * 注销表单属性
	 * @param field 属性
	 */
    public unRegister(field: any): void {
        this.fieldMap[field.getName()] = null;
        this.fieldIdMap[field.getUniqueId()] = null;
    }
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
    public findField(name: string): any {
        return this.fieldMap[name];
    }
	/**
	 * 根据唯一标识获取属性
	 */
    public getFieldById(id: string): any {
        return this.fieldIdMap[id];
    }
	/**
	 * 加载数据
	 */
    public load(arg: any = {}): Observable<any> {
        var _this = this;
        if (!arg)
            arg = {};

        Object.assign(arg, { srfctrlid: this.getName() });
        _this.beginLoading();
        const subject: Subject<any> = new rxjs.Subject();
        _this.iBizHttp.post(this.getBackendUrl(), arg).subscribe((data) => {
            this.endLoading();
            if (data && data.ret === 0) {
                subject.next(data);
            } else {
                subject.error(data);
            }
        }, (data) => {
            this.endLoading();
            subject.error(data);
        });
        return subject.asObservable();
    }
    public submit(arg: any = {}): Observable<any> {
        var _this = this;
        if (!arg)
            arg = {};

        Object.assign(arg, { srfctrlid: this.getName() });
        _this.beginLoading();
        const subject: Subject<any> = new rxjs.Subject();
        _this.iBizHttp.post(this.getBackendUrl(), arg).subscribe((data) => {
            this.endLoading();
            if (data && data.ret === 0) {
                subject.next(data);
            } else {
                subject.error(data);
            }
        }, (data) => {
            this.endLoading();
            subject.error(data);
        });
        return subject.asObservable();
    }
    public getActionErrorInfo(action: any = {}): string {
        if (action.failureType === 'CONNECT_FAILURE') {
            return 'Status:' + action.response.status + ': ' + action.response.statusText;
        }
        if (action.failureType === 'SERVER_INVALID') {
            var msg = action.errorMessage;
            if (action.error && action.error.items) {
                action.error.items.some((item, index) => {
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
    }
	/**
	 * 填充表单
	 */
    public fillForm(data: any = {}): void {
        if (!data)
            return;
        var _this = this;
        const names: Array<string> = Object.keys(data);
        names.forEach(name => {
            let val = data[name] ? data[name] : '';
            if (!(typeof val === 'string')) {
                val = JSON.stringify(val);
            }
            _this.setFieldValue(name, val);
        });
    }
	/**
	 * 设置表单项值
	 */
    public setFieldValue(name: string, value: string): void {
        var field = this.findField(name);
        if (field)
            field.setValue(value);
    }
    /**
     * 获取表单项值
     */
    public getFieldValue(name: string): string {
        var _this = this;
        var field = _this.findField(name);
        if (!field) {
            // IBiz.alert($IGM('IBIZFORM.GETFIELDVALUE.TITLE','获取失败'), $IGM('IBIZFORM.GETFIELDVALUE.INFO','无法获取表单项['+name+']',[name]),2);
            this.iBizNotification.error('获取失败', `无法获取表单项[${name}]`);
            return '';
        }
        return field.getValue();
    }
    /**
     * 设置表单项允许为空
     */
    public setFieldAllowBlank(name: string, allowblank: boolean): void {
        var _this = this;
        var field = _this.findField(name);
        if (field) {
            field.setAllowBlank(allowblank);
        }
    }
    /**
     * 设置表单是否禁用
     */
    public setReadonly(disabled): void {
        this.readonly = disabled;
        const fieldNames: Array<any> = Object.keys(this.fieldMap);
        fieldNames.forEach(name => {
            let field = this.findField(name);
            if (field) {
                field.setDisabled(disabled);
            }
        });
    }
    /**
     * 设置表单项属性是否禁用
     */
    public setFieldDisabled(name: string, disabled: boolean): void {
        var _this = this;
        if (_this.readonly) {
            return;
        }
        var field = _this.findField(name);
        if (field) {
            field.setDisabled(disabled);
        }
    }
	/**
	 * 设置表单错误
	 */
    public setFormError(formerror: any): void {
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
    }
    public resetFormError(): void {
        var _this = this;
        const fieldNames: Array<any> = Object.keys(this.fieldMap);
        fieldNames.forEach(name => {
            let field = this.findField(name);
            if (field.hasActiveError()) {
                field.unsetActiveError();
            }
        });
    }
    /**
     * 设置面板<分组、分页面板>隐藏
     */
    public setPanelVisible(name: string, visible: boolean): void {
        var _this = this;
        var field = _this.findField(name);
        if (field) {
            field.setVisible(visible);
        }
    }
    /**
     * 获取当前表单项值
     */
    public getActiveData(): any {
        var _this = this;
        var values = {};
        const fieldNames: Array<any> = Object.keys(this.fieldMap);
        fieldNames.forEach(name => {
            let field = this.findField(name);
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
    }
    /**
     * 获取全部表单项值
     */
    public getValues(): any {
        var _this = this;
        var values = {};
        const fieldNames: Array<any> = Object.keys(this.fieldMap);
        fieldNames.forEach(name => {
            let field = this.findField(name);
            if (field) {
                var value = field.getValue();
                values[name] = value;
            }
        });
        return values;
    }
    public testFieldEnableReadonly(value): boolean {
        return false;
    }
    /**
     * 更新表单项
     */
    public updateFormItems(arg: any = {}): Promise<any> {
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
        return new Promise((resolve, reject) => {
            _this.load(arg).subscribe((action) => {
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
            }, (action) => {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZFORM.UPDATEFORMITEMS.TITLE','更新失败'), $IGM('IBIZFORM.UPDATEFORMITEMS.INFO',"更新表单项发生错误,"+action.info,[action.info]),2);
                _this.iBizNotification.error('更新失败', `更新表单项发生错误,${action.info}`);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                //   if(errorcb){
                //           errorcb(form, action);	
                //     }
                reject(action);
            });
        });
    }
    /**
     * 重置表单
     */
    public reset(): void {
        var _this = this;
        _this.autoLoad();
    }
    public getFormType(): string {
        return '';
    }

    /*****************事件声明************************/
    /**
     * 表单加载完成事件
     */
    public static FORMLOADED = 'FORMLOADED';
    /**
     * 表单属性值变化事件
     */
    public static FORMFIELDCHANGED = 'FORMFIELDCHANGED';
    /**
     * 表单保存完成
     */
    public static FORMSAVED = 'FORMSAVED';
    /**
     * 表单删除完成
     */
    public static FORMREMOVED = 'FORMREMOVED';
    /**
     * 表单工作流启动完成
     */
    public static FORMWFSTARTED = 'FORMWFSTARTED';
    /**
     * 表单工作流提交完成
     */
    public static FORMWFSUBMITTED = 'FORMWFSUBMITTED';
    /**
     * 表单权限发生变化
     */
    public static DATAACCACTIONCHANGE = 'DATAACCACTIONCHANGE';
    /**
     * 表单项更新
     */
    public static UPDATEFORMITEMS = 'UPDATEFORMITEMS';
}