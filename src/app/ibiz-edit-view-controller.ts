/**
 * 编辑视图控制器对象
 *
 * @class IBizEditViewController
 * @extends {IBizMianViewController}
 */
class IBizEditViewController extends IBizMianViewController {

	public afterformsaveaction: string = '';

	public lastwfuaparam: any = {}

	public lastwfuiaction: any = {};

	public srfwfstartmsgtag: number;

	public srfwfstartmsg: string;

    /**
     * Creates an instance of IBizEditViewController.
     * 创建 IBizEditViewController 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizEditViewController
     */
	constructor(opts: any = {}) {
		super(opts);
		let _this = this;
	}

	public init(params: any = {}): void {
		super.init(params);

		var _this = this;
		const form = this.getForm();
		if (form) {
			form.on(IBizForm.FORMSAVED).subscribe((args) => {
				_this.onFormSaved(args);
			});
			form.on(IBizForm.FORMLOADED).subscribe((args) => {
				_this.onFormLoaded();
			});
			form.on(IBizForm.FORMREMOVED).subscribe((args) => {
				_this.onFormRemoved();
			});
			form.on(IBizForm.FORMWFSTARTED).subscribe((args) => {
				_this.onFormWFStarted();
			});
			form.on(IBizForm.FORMWFSUBMITTED).subscribe((args) => {
				_this.onFormWFSubmitted();
			});
			form.on(IBizEditForm.UIACTIONFINISHED).subscribe((args) => {
				if (args.reloadData)
					_this.refreshReferView();
				if (args.closeEditview)
					_this.closeWindow();
			});
			form.on(IBizForm.FORMFIELDCHANGED).subscribe((args) => {
				var fieldname = args.name;
				// if (sender != null) fieldname = sender.getName();
				if (!args) args = {};
				_this.onFormFieldChanged(fieldname, args.newvalue, args.oldvalue);
			});
			form.on(IBizForm.DATAACCACTIONCHANGE).subscribe((args) => {
				_this.onDataAccActionChange(args);
			});
		}

		//是否弹出
	}
	public unloaded(): any {
		//判断表单是否修改了
		var _this = this;
		if (_this.getForm().isDirty()) {
			// return $IGM('EDITVIEWCONTROLLER.UNLOADED.INFO', "表单已经被修改是否关闭");
			return '表单已经被修改是否关闭';
		}
		return null;
	}
	public onInit(): void {
		super.onInit();
		var _this = this;

		let form = this.getForm();
		if (form) {
			form.init();
			form.autoLoad(Object.assign(_this.viewparam, _this.parentData));
		}
		this.initFloatToolbar();
	}
	// public createEditForm():void{
	// 	return IBiz.createEditForm(config);
	// }
	// public createDataInfoBar():void{
	// 	return IBiz.createDataInfoBar(config);
	// }
	/**
	 * 表单权限发生变化
	 */
	public onDataAccActionChange(dataaccaction: any = {}): void {
		var _this = this;
		if (_this.getToolbar())
			_this.getToolbar().updateAccAction(dataaccaction);
		// if (_this.mintoolbar)
		// 	_this.mintoolbar.updateAccAction(dataaccaction);
		// if (_this.floattoolbar)
		// 	_this.floattoolbar.updateAccAction(dataaccaction);
	}
	public onSetParentData(): void {
		var _this = this;
		if (_this.isInited() == true) {
			if (_this.parentData && this.getForm()) {
				var params: any = {};
				// var params = $.extend(_this.viewparam, _this.parentData);
				_this.getForm().autoLoad(Object.assign(_this.viewparam, _this.parentData));
			}
		}
	}
	/**
	 * 获取表单对象
	 */
	public getForm(): any {
		var _this = this;
		return _this.controls.get('form');
	}
	/**
	 * 获取数据信息区对象
	 */
	public getDataInfoBar(): any {
		var _this = this;
		return _this.controls.get('datainfobar');
	}
	/**
	 * 表单保存完成
	 */
	public onFormSaved(result: any = {}): void {
		var _this = this;
		_this.refreshReferView();
		if (_this.afterformsaveaction == 'exit') {
			var window = _this.getWindow();
			if (window) {
				window.dialogResult = 'ok';
				window.activeData = _this.getForm().getValues();
			}
			_this.closeWindow();
			return;
		}
		if (_this.afterformsaveaction == 'new') {
			var arg = _this.getViewParam();
			if (arg == null || arg == undefined) arg = {};
			_this.getForm().loadDraft(arg);
			return;
		}

		if (_this.afterformsaveaction == 'dowfuiaction') {
			_this.afterformsaveaction = 'dowfuiactionok';
			_this.doWFUIAction(_this.lastwfuiaction, _this.lastwfuaparam);
			return;
		}

		if (_this.afterformsaveaction == 'startwf') {
			if (_this.srfwfstartmsgtag == 1 || _this.srfwfstartmsgtag == 3) {
				// IBiz.confirm(_this.srfwfstartmsg ? _this.srfwfstartmsg : "是否启动流程？", function (result) {
				// 	if (result) {
				// 		_this.startWF();
				// 	}
				// });
				_this.iBizNotification.confirm('', _this.srfwfstartmsg ? _this.srfwfstartmsg : "是否启动流程？").subscribe((result) => {
					if (result && Object.is(result, 'OK')) {
						_this.startWF();
					}
				});
			} else {
				_this.startWF();
			}
		}
		else {
			//判断是否已经出现过提示
			if (!result || !result.info) {
				// IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), $IGM('EDITVIEWCONTROLLER.ONFORMSAVED.INFO', '数据保存成功！'), 1);
				_this.iBizNotification.success('信息','数据保存成功！');
			}
		}
		_this.updateViewInfo();
	}
	public onFormLoaded(): void {
		var _this = this;
		_this.updateViewInfo();
	}
	public onFormWFStarted(): void {
		var _this = this;
		_this.refreshReferView();
		_this.closeWindow();
	}
	public onFormWFSubmitted(): void {
		var _this = this;
		_this.refreshReferView();
		_this.closeWindow();
	}
	public updateViewInfo(): void {
		var _this = this;
		var newdata = false;
		var field = _this.getForm().findField('srfuf');
		if (field != null) {
			newdata = field.getValue() != '1';
		}
		var dataAccAction = _this.getForm().getDataAccAction();
		_this.calcToolbarItemState(!newdata, dataAccAction);
		if (newdata) {
			// _this.setCaption('&lt;' + $IGM('EDITVIEWCONTROLLER.UPDATEVIEWINFO.CONTENT', '新建') + '&gt;');
			_this.setCaption('&lt;新建&gt;');
			if (_this.getDataInfoBar()) {
				// _this.getDataInfoBar().setCurrentData({
				// 	srfkey: '',
				// 	srfmajortext: '&lt;' + $IGM('EDITVIEWCONTROLLER.UPDATEVIEWINFO.CONTENT', '新建') + '&gt;'
				// });
				_this.getDataInfoBar().setCurrentData({
					srfkey: '',
					srfmajortext: '&lt;新建&gt;'
				});
			}
		} else {
			field = _this.getForm().findField('srfmajortext');
			if (field != null) {
				var value = field.getValue();
				value = IBizUtil.encodeString(value);
				_this.setCaption(value);
				if (_this.getDataInfoBar()) {
					field = _this.getForm().findField('srfkey');
					var keyvalue = field.getValue();
					_this.getDataInfoBar().setCurrentData({
						srfkey: keyvalue,
						srfmajortext: value
					});
				}
			}
		}
	}
	public onFormRemoved(): void {
		var _this = this;
		_this.refreshReferView();
		_this.closeWindow();
	}
	public onFormFieldChanged(fieldname: string, field: any, value: string): void {
		var _this = this;
	}
	public doDEUIAction(uiaction: any = {}, params: any = {}): void {
		var _this = this;
		if (uiaction.tag == 'Help') {
			_this.doHelp();
			return;
		}
		if (uiaction.tag == 'SaveAndStart') {
			_this.doSaveAndStart();
			return;
		}
		if (uiaction.tag == 'SaveAndExit') {
			_this.doSaveAndExit();
			return;
		}
		if (uiaction.tag == 'SaveAndNew') {
			_this.doSaveAndNew();
			return;
		}
		if (uiaction.tag == 'Save') {
			_this.doSave();
			return;
		}
		if (uiaction.tag == 'Print') {
			_this.doPrint();
			return;
		}
		if (uiaction.tag == 'Copy') {
			_this.doCopy();
			return;
		}
		if (uiaction.tag == 'RemoveAndExit') {
			_this.doRemoveAndExit();
			return;
		}
		if (uiaction.tag == 'Refresh') {
			_this.doRefresh();
			return;
		}
		if (uiaction.tag == 'New') {
			_this.doNew();
			return;
		}
		if (uiaction.tag == 'FirstRecord') {
			_this.doMoveToRecord('first');
			return;
		}
		if (uiaction.tag == 'PrevRecord') {
			_this.doMoveToRecord('prev');
			return;
		}
		if (uiaction.tag == 'NextRecord') {
			_this.doMoveToRecord('next');
			return;
		}
		if (uiaction.tag == 'LastRecord') {
			_this.doMoveToRecord('last');
			return;
		}
		if (uiaction.tag == 'Exit' || uiaction.tag == 'Close') {
			_this.doExit();
			return;
		}
		super.doDEUIAction(uiaction, params);
	}
	public doHelp(): void {
		// IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), $IGM('EDITVIEWCONTROLLER.DOHELP.INFO', '编辑界面_帮助操作！'), 5);
		var _this = this;
		_this.iBizNotification.info('信息','编辑界面_帮助操作！');
	}
	public doSaveAndStart(): void {
		var _this = this;
		_this.afterformsaveaction = 'startwf';
		if (_this.getForm().findField("srfwfstartmsg"))
			_this.srfwfstartmsg = _this.getForm().findField("srfwfstartmsg").getValue();
		if (_this.getForm().findField("srfwfstartmsgtag") && !isNaN(parseInt(_this.getForm().findField("srfwfstartmsgtag").getValue())))
			_this.srfwfstartmsgtag = _this.getForm().findField("srfwfstartmsgtag").getValue();
		_this.saveData({});
	}
	public doSaveAndExit(): void {
		var _this = this;
		_this.afterformsaveaction = 'exit';
		var window = _this.getWindow();
		if (window) {
			window.dialogResult = 'cancel';
		}
		_this.saveData({});
	}
	public doSaveAndNew(): void {
		var _this = this;
		_this.afterformsaveaction = 'new';
		_this.saveData({});
	}
	public doSave(): void {
		var _this = this;
		_this.afterformsaveaction = '';
		_this.saveData({});
	}
	public doPrint(): void {
		var _this = this;
		var arg:any = {};
		arg.srfkey = '';
		var field = _this.getForm().findField('srforikey');
		if (field) {
			arg.srfkey = field.getValue();
		}
		if (arg.srfkey == undefined || arg.srfkey == '') {
			field = _this.getForm().findField('srfkey');
			if (field) {
				arg.srfkey = field.getValue();
			}
		}
		if (arg.srfkey == '')
			return;
		_this.onPrintData(arg);
	}
	public doCopy(): void {
		var _this = this;
		var arg:any = {};
		// $.extend(arg, _this.getViewParam());
		Object.assign(arg, _this.getViewParam());
		arg.srfkey = '';
		var field = _this.getForm().findField('srforikey');
		if (field) {
			arg.srfsourcekey = field.getValue();
		}
		if (arg.srfsourcekey == undefined || arg.srfsourcekey == '') {
			field = _this.getForm().findField('srfkey');
			if (field) {
				arg.srfsourcekey = field.getValue();
			}
		}
		if (arg.srfsourcekey == undefined || arg.srfsourcekey == '') {
			// IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), $IGM('EDITVIEWCONTROLLER.DOCOPY.INFO', '当前表单未加载数据，不能拷贝'), 0);
			_this.iBizNotification.error('信息','当前表单未加载数据，不能拷贝');
			return;
		}
		_this.getForm().autoLoad(arg);
	}
	public doRemoveAndExit(): void {
		var _this = this;
		// IBiz.confirm($IGM('EDITVIEW9CONTROLLERBASE.DOREMOVEANDEXIT.INFO', '确认要删除当前数据，删除操作将不可恢复？'), function (result) {
		// 	if (result) {
		// 		_this.removeData();
		// 	}
		// });
		_this.iBizNotification.confirm('', '确认要删除当前数据，删除操作将不可恢复？').subscribe((result) => {
			if (result && Object.is(result, 'OK')) {
				_this.removeData();
			}
		});
	}
	public doRefresh(): void {
		// IBiz.alert('', $IGM('EDITVIEWCONTROLLER.DOREFRESH.INFO', '编辑界面_刷新操作！'), 0);
		var _this = this;
		_this.iBizNotification.info('','编辑界面_刷新操作！');
	}
	public doNew(): void {
		// IBiz.alert('', $IGM('EDITVIEWCONTROLLER.DONEW.INFO', '编辑界面_新建操作！'), 0);
		var _this = this;
		_this.iBizNotification.info('','编辑界面_新建操作！');
	}
	public doExit(): void {
		var _this = this;
		_this.closeWindow();
	}
	public saveData(arg: any = {}): void {
		if (!arg) arg = {};
		this.getForm().save2(arg);
	}
	public removeData(arg: any = {}): void {
		if (!arg) arg = {};
		this.getForm().remove(arg);
	}
	public refreshReferView(): void {
		var _this = this;
		try {
			// if (_this.pagecontext) {
			// 	var openerid = _this.pagecontext.getParamValue('openerid');
			// 	var refreshitem = _this.pagecontext.getParamValue('srfrefreshitem');
			// 	var view = $.getIBizApp().getSRFController(openerid);
			// 	if (!view) {
			// 		if (window.opener && window.opener.window) {
			// 			if ($.isFunction(window.opener.window.getController)) {
			// 				view = window.opener.window.getController();
			// 			}
			// 		}
			// 	}
			// 	if (view) {
			// 		if (refreshitem && refreshitem != '') {
			// 			if ($.isFunction(view.refreshItem)) {
			// 				view.refreshItem(refreshitem);
			// 			}
			// 		}
			// 		else {
			// 			if ($.isFunction(view.refresh)) {
			// 				view.refresh();
			// 			}
			// 		}
			// 		return;
			// 	}
			// }
		}
		catch (e) {

		}
	}
	public updateFormItems(arg: any = {}): void {
		var _this = this;
		this.getForm().updateFormItems(arg);
	}
	public showCommandBar(bShow: any): void {
		var _this = this;
		var toolbar = _this.getToolbar();
		if (toolbar && (toolbar.isHidden() == bShow)) {
			if (bShow) {
				toolbar.show();
			} else toolbar.hide();
		}
	}
	public doWFUIAction(uiaction: any = {}, params: any = {}): void {
		var _this = this;
		if (_this.isEnableEditData()) {
			if (_this.afterformsaveaction != 'dowfuiactionok') {
				_this.afterformsaveaction = 'dowfuiaction';
				_this.lastwfuiaction = uiaction;
				_this.lastwfuaparam = params;
				_this.saveData({});
				return;
			}
			_this.afterformsaveaction = '';
			_this.lastwfuiaction = null;
			_this.lastwfuaparam = null;
		}

		if (uiaction.actionmode == 'WFBACKEND') {
			var arg = {
				srfwfiatag: uiaction.tag
			};
			_this.getForm().wfsubmit(arg);
			return;
		}
		super.doWFUIAction(uiaction, params);
	}
	public startWF(arg: any = {}): void {
		var _this = this;
		var startuiaction = _this.getUIAction('WFStartWizard');
		if ((startuiaction && _this.srfwfstartmsgtag == undefined) || (startuiaction && _this.srfwfstartmsgtag > 1)) {
			_this.doUIAction(startuiaction, {});
		}
		else {
			_this.getForm().wfstart(arg);
		}
	}
	public doMoveToRecord(target: any): void {
		var _this = this;
		var referView = _this.getReferView();
		if (referView && referView.moveRecord) {
			var record = referView.moveRecord(target);
			if (record) {
				var loadParam = {};
				// $.extend(loadParam, {
				// 	srfkey: record.get('srfkey')
				// });
				Object.assign(loadParam, { srfkey: record.get('srfkey') });
				_this.getForm().autoLoad(loadParam);
			}
		}
	}
	public doBackendUIAction(arg: any = {}): void {
		var _this = this;
		_this.getForm().doUIAction(arg);
	}

	/**
	 * 获取前台行为参数
	 * @param uiaction 行为
	 */
	public getFrontUIActionParam(uiaction: any = {}): any {
		var _this = this;
		var arg = super.getFrontUIActionParam(uiaction);
		if (uiaction.actiontarget == 'SINGLEKEY' || uiaction.actiontarget == 'MULTIKEY') {

			var vlaueitem = "srfkey";
			var paramkey = "srfkeys";
			var paramjo = null;
			var paramitems = null;
			if (uiaction.actionparams) {
				vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
				paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
				paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
			}

			var dataInfo = '';
			var keys = '';
			var field = _this.getForm().findField('srforikey');
			if (field) {
				keys = field.getValue();
			}
			if (keys == undefined || keys == '') {
				field = _this.getForm().findField('srfkey');
				if (field) {
					keys = field.getValue();
				}
				field = _this.getForm().findField(vlaueitem);
				if (field) {
					paramitems = field.getValue();
				}
			}
			var data = { srfkeys: keys, srfkey: keys };
			data[paramkey] = (paramitems != null) ? paramitems : keys;
			if (paramjo) {
				Object.assign(data, paramjo);
			}
			return Object.assign(arg, data);
		}
		return arg;
	}
	public getBackendUIActionParam(uiaction: any = {}): any {
		var _this = this;
		if (uiaction.actiontarget == 'SINGLEKEY' || uiaction.actiontarget == 'MULTIKEY') {
			var vlaueitem = "srfkey";
			var paramkey = "srfkeys";
			var paramjo = null;
			var infoitem = 'srfmajortext';
			if (uiaction.actionparams) {
				vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
				paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
				infoitem = uiaction.actionparams.textitem ? uiaction.actionparams.textitem.toLowerCase() : infoitem;
				paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
			}

			var dataInfo = '';
			var keys = '';

			var field = _this.getForm().findField(vlaueitem);
			if (field) {
				keys = field.getValue();
			}
			field = _this.getForm().findField(infoitem);
			if (field) {
				dataInfo = field.getValue();
			}
			var data = { dataInfo: dataInfo };
			data[paramkey] = keys;
			if (paramjo) {
				Object.assign(data, paramjo);
			}
			return Object.assign(data, _this.getForm().getValues());
			//return {srfkeys: keys,dataInfo: dataInfo};
		}
		return {};
	}
	/**
	 * 初始化浮动工具栏
	 */
	public initFloatToolbar(): void {
		// var offset = 60;
		// var duration = 300;
		// if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
		// 	$(window).bind("touchend touchcancel touchleave", function (e) {
		// 		if ($(this).scrollTop() > offset) {
		// 			$('.scroll-to-top').fadeIn(duration);
		// 		} else {
		// 			$('.scroll-to-top').fadeOut(duration);
		// 		}
		// 	});
		// } else {
		// 	$(window).scroll(function () {
		// 		if ($(this).scrollTop() > offset) {
		// 			$('.scroll-to-top').fadeIn(duration);
		// 		} else {
		// 			$('.scroll-to-top').fadeOut(duration);
		// 		}
		// 	});
		// }
		// $('.scroll-to-top').click(function (e) {
		// 	e.preventDefault();
		// 	return false;
		// });
	}
	public onWFUIFrontWindowClosed(win, data): void {
		var _this = this;
		if (win.dialogResult == 'ok') {
			var window = _this.getWindow();
			if (window) {
				window.dialogResult = 'ok';
				window.activeData = _this.getForm().getValues();
			}
			_this.refreshReferView();
			_this.closeWindow();
			return;
		}
	}
	public isEnableNewData(): boolean {
		return true;
	}
	public isEnableEditData(): boolean {
		return true;
	}
	public isEnableRemoveData(): boolean {
		return true;
	}
	public onPrintData(arg: any = {}): void {
		var _this = this;
		_this.doPrintDataNormal(arg);
	}
    /**
	 * 常规新建数据
	 */
	public doPrintDataNormal(arg: any = {}): boolean {
		var _this = this;
		var view = _this.getPrintDataView(arg);
		if (view == null) {
			return false;
		}
		// var viewurl = view.viewurl;
		// if (!viewurl || viewurl == '') {
		// 	viewurl = BASEURL + '/ibizutil/print.pdf';
		// }
		// else {
		// 	viewurl = BASEURL + viewurl;
		// }
		// viewurl = viewurl + (viewurl.indexOf('?') == -1 ? '?' : '&') + $.param(view.viewparam);
		// window.open(viewurl, '_blank');
		return true;
	}
	public getPrintDataView(arg: any = {}): any {
		return null;
	}
}