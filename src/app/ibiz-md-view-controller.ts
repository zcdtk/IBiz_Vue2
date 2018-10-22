/**
 * 表格视图控制器对象
 *
 * @class IBizMDViewController
 * @extends {IBizMianViewController}
 */
class IBizMDViewController extends IBizMianViewController {

    public bQuickSearch: boolean = true;

    public currentDataKey = null;

    public parentDataChanged: boolean = false;

    public multiSelect: boolean = false;

    public quickSearch: string = '';

    public quickSearchEntityDEFields: Array<any> = [];

    private refreshViewEvent: Subject<any>;

    /**
     * Creates an instance of IBizMDViewController.
     * 创建 IBizMDViewController 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizMDViewController
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
    }

    public init(params: any = {}): void {
        super.init(params);
        var _this = this;
        _this.parentDataChanged = false;

        var mdctrl = this.getMDCtrl();
        if (mdctrl) {
            // 多数据部件选中变化
            mdctrl.on(IBizMDControl.SELECTIONCHANGE).subscribe((args) => {
                _this.onSelectionChange(args);
                if (_this.getGridRowActiveMode() === 1) {
                    _this.onDataActivated(args[0]);
                }
            });
            //  多数据部件加载之前
            mdctrl.on(IBizMDControl.BEFORELOAD).subscribe((args) => {
                _this.onStoreBeforeLoad(args);
            });
            // 多数据部件加载完成
            mdctrl.on(IBizMDControl.LOADED).subscribe((args) => {
                _this.onStoreLoad(args);
            });
            // 多数据部件编辑状态改变
            mdctrl.on(IBizDataGrid.CHANGEEDITSTATE).subscribe((args) => {
                _this.onGridRowEditState(args);
            });
            // 多数据部件删除完成
            mdctrl.on(IBizDataGrid.REMOVED).subscribe((args) => {
                _this.onStoreRemove(args);
            });
        }
        if (_this.getParentMode()) {
            _this.doHideParentColumns(_this.getParentMode());
        }

        var searchform = this.getSearchForm();
        if (searchform) {
            searchform.on(IBizSearchForm.FORMSEARCHED).subscribe((args) => {
                _this.onSearchFormSearched();
            });
            searchform.on(IBizForm.FORMLOADED).subscribe((args) => {
                // if (_this.config.loaddefault != undefined && _this.config.loaddefault)
                _this.onSearchFormReseted();
            });
            searchform.on(IBizSearchForm.FORMRESETED).subscribe((args) => {
                _this.onSearchFormReseted();
            });
            searchform.on(IBizSearchForm.FORMCONTRACT).subscribe((args) => {
                _this.onSearchFormOpen(args);
            });
            searchform.on(IBizSearchForm.FORMFIELDCHANGED).subscribe((args) => {
                var fieldname = '';
                // if (sender != null) fieldname = sender.getName();
                if (!args) args = {};
                _this.onSearchFormFieldChanged(args.fieldname, args.newvalue, args.oldvalue);
            });
        }

        // var searchform = this.getSearchForm();
        // if (searchform) {
        //     searchform.init();
        //     searchform.autoLoad(_this.viewparam);
        //     if (_this.hasQuickSearch() == true) {
        //         searchform.close();
        //     }
        //     else {
        //         searchform.open();
        //     }
        // }
        // _this.doLayout();
    }
    public onInit(): void {
        super.onInit();
        var _this = this;

        var searchform = this.getSearchForm();
        if (searchform) {
            searchform.init();
            searchform.autoLoad(_this.viewparam);
            if (_this.hasQuickSearch() == true) {
                searchform.close();
            } else {
                searchform.open();
            }
        }

        let _window: any = window;;

        let iBizApp: IBizApp = _window.getIBizApp();
        _this.refreshViewEvent = iBizApp.onRefreshView();
        _this.refreshViewEvent.subscribe((data: any) => {
            if (data && Object.is(data.openerid, this.getId())) {
                _this.refresh();
            }
        });

        // //初始化快速搜索
        // if(_this.hasHtmlElement('searchcond'))
        // {
        // 	_this.bQuickSearch = true;
        // 	_this.quickSearch = $('#'+this.getCId2()+'searchcond');
        // }
        // if(_this.quickSearch){
        // 	_this.quickSearch.keyup(function() {
        //         if (event.keyCode == "13") {
        //         	_this.onSearchFormSearched();
        //         }
        //     });
        // }

        // _this.quickSearchBtn = $('#'+this.getCId2()+'searchbutton');
        // if(_this.quickSearchBtn){
        // 	_this.quickSearchBtn.click(function(e){
        // 		_this.onSearchFormSearched();
        // 	});
        // }
        // _this.moreSearchBtn = $('#'+this.getCId2()+'moresearchbutton');
        // if(_this.moreSearchBtn){
        // 	_this.moreSearchBtn.click(function(e){
        // 		if(_this.searchform){
        // 			if(_this.searchform.isOpen() == true){
        // 				_this.searchform.close();
        // 			}else{
        // 				_this.searchform.open();
        // 			}
        // 			_this.doLayout();
        // 		}
        // 	});
        // }

        // //初始化搜索面板
        // if(_this.hasHtmlElement('searchform')){
        // 	var dataurl = _this.getBackendUrl()+'srfctrlid=searchform&SRFSUBAPP='+_this.subapp+'&';
        // 	var sfCfg = $.extend({id:this.getCId2()+'searchform',url:dataurl,ctrler: _this}_this.config.ctrls.searchForm);
        // 	_this.searchform = _this.createSearchForm(sfCfg);
        // 	_this.registerItem('searchform',_this.searchform);
        // 	_this.searchform.on(IBizSearchForm.FORMSEARCHED, function(sender, args, e) {
        // 		_this.onSearchFormSearched();
        // 	} _this);
        // 	_this.searchform.on(IBizForm.FORMLOADED, function(sender, args, e) {
        // 		if(_this.config.loaddefault != undefined && _this.config.loaddefault)
        // 			_this.onSearchFormReseted();
        // 	} _this);
        // 	_this.searchform.on(IBizSearchForm.FORMRESETED, function(sender, args, e) {
        // 			_this.onSearchFormReseted();
        // 	} _this);
        // 	_this.searchform.on(IBizSearchForm.FORMCONTRACT, function(sender, args, e) {
        // 		_this.onSearchFormOpen(args);
        // 	} _this);
        // 	_this.searchform.on(IBizForm.FORMFIELDCHANGED, function(sender, args, e) {
        // 		var fieldname = '';
        // 		if (sender != null) fieldname = sender.getName();
        // 		if (!args) args = {};
        // 		_this.onSearchFormFieldChanged(fieldname, sender, args.newvalue, args.oldvalue);
        // 	} _this);
        // }
    }

    /**
     * 视图销毁 已订阅的视图刷新设置
     *
     * @memberof IBizMDViewController
     */
    public destroy(): void {
        super.destroy();
        let _this = this;
        // _this.refreshViewEvent.unsubscribe();
    }
    public hasQuickSearch(): boolean {
        var _this = this;
        return _this.bQuickSearch;
    }
    public onStoreRemove(args: Array<any>): void {

    }
	/**
	 * 搜索表单展开
	 */
    public onSearchFormOpen(args: any = {}): void {

    }
	/**
	 * 获取搜索表单对象
	 */
    public getSearchForm(): any {
        return this.controls.get('searchform');
    }

    public getAllData(): Array<any> {
        var _this = this;
        if (_this.getMDCtrl()) {
            return _this.getMDCtrl().getAllData();
        }
        return [];
    }
	/**
	 * 搜索表单属性值发生变化
	 */
    public onSearchFormFieldChanged(fieldname: string, field: any, value: string): void {
        var _this = this;
    }
	/**
	 * 数据加载之前
	 */
    public onStoreBeforeLoad(args: any = {}): void {
        var _this = this;
        var fetchParam = {};
        if (_this.viewparam) {
            // $.extend(fetchParam,_this.viewparam);
            Object.assign(fetchParam, _this.viewparam);
        }
        if (_this.getParentMode()) {
            // $.extend(fetchParam, _this.getParentMode());
            Object.assign(fetchParam, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(fetchParam, _this.getParentData());
            Object.assign(fetchParam, _this.getParentData());
        }
        if ((_this.getSearchCond() && _this.getSearchForm().isOpen()) || !_this.hasQuickSearch()) {
            // $.extend(fetchParam, _this.getSearchCond());
            Object.assign(fetchParam, _this.getSearchCond());
        }
        //是否有自定义查询
        if (_this.getSearchForm() && _this.getSearchForm().isCustomSearch()) {
            // $.extend(fetchParam, _this.searchform.getCustomSearchVal());
            Object.assign(fetchParam, _this.getSearchForm().getCustomSearchVal());
        }
        //获取快速搜索里的搜索参数
        if (_this.hasQuickSearch() && _this.quickSearch) {
            // args['search'] = _this.quickSearch.val();
            Object.assign(args, { search: _this.quickSearch });
        }
        // $.extend(args, fetchParam,{ srfaction: 'fetch',SRFSUBAPP:_this.subapp });
        Object.assign(args, fetchParam, { srfaction: 'fetch' });
    }
	/**
	 * 数据加载之前
	 */
    public onStoreLoad(args: any): void {
        var _this = this;
        var lastActive = null;
        if (_this.currentDataKey != null && _this.currentDataKey != '' && args && args.items) {
            args.items.some(record => {
                if (record.srfkey == _this.currentDataKey) {
                    lastActive = record;
                    return true;
                }
            });
        }
        if (lastActive) {
            _this.getMDCtrl().setSelection(lastActive);
            _this.calcToolbarItemState(true, lastActive.srfdataaccaction);
        } else {
            _this.currentDataKey = null;
            _this.fire(IBizMDViewController.SELECTIONCHANGE, []);
            _this.calcToolbarItemState(false);
        }
        _this.fire(IBizMDViewController.DATALOADED, _this);
        _this.parentDataChanged = false;

        _this.reloadUICounters();
    }
	/**
	 * 数据被激活<最典型的情况就是行双击>
	 * @param record 记录
	 * @param e 事件
	 */
    public onDataActivated(record: any = {}): void {
        var _this = this;
        if (!record || !record.srfkey) {
            return;
        }
        _this.fire(IBizMDViewController.DATAACTIVATED, [record]);
        _this.currentDataKey = record.srfkey;

        _this.calcToolbarItemState(true, record.srfdataaccaction);
        _this.onEditData({ data: record });
    }
	/**
	 * 行选择变化
	 * @param sender 来源
	 * @param selected 选中数据
	 */
    onSelectionChange(selected: Array<any>): void {
        var _this = this;
        if (selected == null || selected.length == 0) {
            _this.currentDataKey = null;
        } else {
            _this.currentDataKey = selected[0].srfkey;
        }
        _this.fire(IBizMDViewController.SELECTIONCHANGE, selected);
        _this.calcToolbarItemState(_this.currentDataKey != null, (_this.currentDataKey != null) ? selected[0].srfdataaccaction : null);
    }
	/**
	 * 改变工具栏启用编辑按钮信息
	 */
    public onGridRowEditState(args: any = {}): void {
        // var _this = this;
        // var editButton = null;
        // var submitButton = null;
        // if (this.toolbar && this.toolbar.items) {
        // 	$.each(this.toolbar.items, function(index, ele) {
        // 		if(ele.attr("data-ibiz-tag")=="NewRow")
        // 			submitButton = ele;
        // 		if(ele.attr("data-ibiz-tag")=="ToggleRowEdit")
        // 			editButton = ele;
        // 		if(ele.attr("data-ibiz-tag")=="Edit") {
        // 			if(args.state) {
        // 				ele.addClass("hidden");
        // 			} else {
        // 				ele.removeClass("hidden");
        // 			}
        // 		}
        // 	});
        // }
        // _this.isInGridRowEdit=args.state;
        // if(editButton){
        // 	if(!args.state){
        // 		editButton.find("span").html($IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE','启用编辑'));
        // 	}else{
        // 		editButton.find("span").html($IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE2','关闭编辑'));
        // 	}
        // }
        // if(submitButton)
        // 	submitButton[0].disabled = !args.state;

        // _this.doLayout();
    }

	/**
	 * 表单权限发生变化
	 */
    public onDataAccActionChange(dataaccaction: any = {}): void {
        var _this = this;
        if (_this.getToolbar()) {
            _this.getToolbar().updateAccAction(dataaccaction);
        }
        // if(_this.mintoolbar)
        // 	_this.mintoolbar.updateAccAction(dataaccaction);
        // if(_this.floattoolbar)
        // 	_this.floattoolbar.updateAccAction(dataaccaction);
    }
	/**
	 * 新建数据
	 */
    public onNewData(): void {
        var _this = this;
        var loadParam = {};
        if (_this.getViewParam()) {
            // $.extend(loadParam, _this.getViewParam());
            Object.assign(loadParam, _this.getViewParam());
        }
        if (_this.getParentMode()) {
            // $.extend(loadParam, _this.getParentMode());
            Object.assign(loadParam, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(loadParam, _this.getParentData());
            Object.assign(loadParam, _this.getParentData());
        }
        // if(_this.isInGridRowEdit){
        // 	_this.doNewRow(loadParam);
        // 	return;
        // }
        if (_this.isEnableBatchAdd()) {
            _this.doNewDataBatch(loadParam);
            return;
        }
        if (_this.doNewDataWizard(loadParam)) {
            return;
        }
        _this.doNewDataNormal(loadParam);
    }

	/**
	 * 批量新建
	 */
    public doNewDataBatch(arg: any = {}): boolean {
        var _this = this;
        var mpickupview = _this.getMPickupView(arg);
        // if (mpickupview){
        // 	var win = $.getIBizApp().createWindow({});
        // 	var viewparam = {};
        // 	$.extend(viewparam, mpickupview.viewparam);
        // 	if(!viewparam.srfreferdata){
        // 		if(viewparam.srfparentdata)
        // 		{
        // 			viewparam.srfreferdata = viewparam.srfparentdata;
        // 			delete viewparam.srfparentdata;
        // 		}
        // 	}
        // 	viewparam['windowid'] = win.getId();
        // 	viewparam['openerid'] = _this.getId();
        // 	win.title = mpickupview.title;
        // 	win.scope = _this;
        // 	win.height = mpickupview.height?mpickupview.height:0;
        // 	win.width = mpickupview.width?mpickupview.width:0;
        // 	win.url = $.getIBizApp().parseURL2(mpickupview.subapp,mpickupview.viewurl,{windowid:win.getId(),openerid:_this.getId()});
        // 	win.viewparam = viewparam;
        // 	win.callback =  _this.onMPickupWindowClose;

        // 	if(mpickupview.modal){
        // 		 win.openModal(window);
        // 	}else{
        // 		 win.openInNewWindow(window);
        // 	}

        //     return true;
        // }
        return false;
    }
	/**
	 * 批量新建关闭
	 */
    public onMPickupWindowClose(win): void {
        var _this = win.scope;
        var loadParam = win.userData;
        var dialogResult = win.dialogResult;
        if (!dialogResult) return;
        if (dialogResult == 'ok') {
            var selectedDatas = win.selectedDatas;
            if (!selectedDatas) {
                return;
            }
            _this.addDataBatch(selectedDatas);
        }
        return;
    }
	/**
	 * 批量添加数据
	 */
    public addDataBatch(selectedDatas: Array<any>): void {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.ADDDATABATCH.INFO','[addDataBatch]方法必须重写！'),2);
        this.iBizNotification.warning('警告', '[addDataBatch]方法必须重写！');
    }
	/**
	 * 向导新建数据
	 */
    public doNewDataWizard(arg: any = {}): boolean {
        var _this = this;
        var wizardview = _this.getNewDataWizardView(arg);
        // if (wizardview != null) {
        // 	var win = $.getIBizApp().createWindow({});
        // 	var viewparam = {};
        // 	viewparam['windowid'] = win.getId();
        // 	viewparam['openerid'] = _this.getId();
        // 	win.title = wizardview.title;
        // 	win.scope = _this;
        // 	win.height = wizardview.height?wizardview.height:0;
        // 	win.width = wizardview.width?wizardview.width:0;
        // 	win.url = $.getIBizApp().parseURL2(wizardview.subapp,wizardview.viewurl,{windowid:win.getId(),openerid:_this.getId()});
        // 	win.viewparam = viewparam;
        // 	win.callback =  _this.onNewDataWizardWindowClose;
        //     if(wizardview.modal){
        // 	 	win.openModal(window);
        // 	}else{
        // 		win.openInNewWindow(window);
        // 	}
        //     return true;
        // }

        return false;
    }
	/**
	 * 向导新建数据窗口关闭
	 */
    public onNewDataWizardWindowClose(win, eOpts): void {
        var _this = win.scope;
        var loadParam: any = {};//win.userData;
        var dialogResult = win.dialogResult;
        if (!dialogResult) return;
        if (dialogResult == 'ok') {
            var selectedData = win.selectedData;
            if (selectedData) {
                var newMode = selectedData.srfkey;
                loadParam.srfnewmode = newMode;
                var view = _this.getNewDataView(loadParam);
                if (view == null) {
                    return;
                }
                _this.openDataView(view);
            }
        }
        return;
    }
	/**
	 * 常规新建数据
	 */
    public doNewDataNormal(arg: any = {}): boolean {
        var _this = this;
        var view = _this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        return _this.openDataView(view);
    }
	/**
	 * 编辑数据
	 */
    public onEditData(arg: any = {}): void {
        var _this = this;
        var loadParam = {};
        if (_this.getViewParam()) {
            // $.extend(loadParam, _this.getViewParam());
            Object.assign(loadParam, _this.getViewParam());
        }
        if (this.getParentMode()) {
            // $.extend(loadParam, _this.getParentMode());
            Object.assign(loadParam, _this.getParentMode());
        }
        if (this.getParentData()) {
            // $.extend(loadParam, _this.getParentData());
            Object.assign(loadParam, _this.getParentData());
        }
        if (arg.srfcopymode) {
            // $.extend(loadParam, { srfsourcekey: arg.data.srfkey });
            Object.assign(loadParam, { srfsourcekey: arg.data.srfkey });
        } else {
            // $.extend(loadParam, {srfkey: arg.data.srfkey});
            Object.assign(loadParam, { srfkey: arg.data.srfkey });
        }

        var editMode = _this.getEditMode(arg.data);
        if (editMode) {
            // loadParam.srfeditmode = editMode;
            Object.assign(loadParam, { srfeditmode: editMode });
        }
        if (arg.data.srfmstag) {
            // loadParam.srfeditmode2 = arg.data.srfmstag;
            Object.assign(loadParam, { srfeditmode2: arg.data.srfmstag });
        }

        // loadParam.openerid = _this.getId();
        Object.assign(loadParam, { openerid: _this.getId() });
        _this.doEditDataNormal(loadParam);
    }
	/**
	 * 执行常规编辑数据
	 */
    public doEditDataNormal(arg: any = {}): boolean {
        var _this = this;
        var view = _this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        return _this.openDataView(view);
    }
	/**
	 * 打开数据视图
	 */
    public openDataView(view: any = {}): boolean {
        var _this = this;
        var openMode = view.openMode;
        if (openMode != undefined) {
            if (openMode == 'POPUPMODAL') {
                view.modal = true;
            } else if (openMode == 'POPUP') {
                view.modal = true;
            } else if (openMode == '' || openMode == 'INDEXVIEWTAB') {
                view.modal = false;
            }
        }
        if (_this.isShowModal()) {
            view.modal = true;
        }

        let url_datas: Array<string> = [];
        const params_names = Object.keys(view.viewparam);
        params_names.forEach(name => {
            if (name && view.viewparam[name] && !Object.is(view.viewparam[name], '')) {
                url_datas.push(`${name}=${view.viewparam[name]}`)
            }
        })
        let url = `/${IBizEnvironment.SysName}/${IBizEnvironment.BaseUrl.toLowerCase()}${view.viewurl}`;
        if (url_datas.length > 0) {
            url = `${url}?${url_datas.join('&')}`;
        }
        let _window: any = window;;
        _window.open(url, '_blank');

        // let iBizApp:IBizApp = _window.getIBizApp();
        // iBizApp.refreshView().subscribe(data => {
        //     _this.refresh();
        // });
        // let opener = win.opener;
        // if (opener.getIBizApp()) {
        //     opener.getIBizApp().regPWindow(window);
        // }
        // var win = $.getIBizApp().createWindow({});
        // var viewparam = view.viewparam;
        // if(!viewparam){
        // 	viewparam = {};
        // }
        // viewparam['windowid'] = win.getId();
        // viewparam['openerid'] = _this.getId();
        // win.title = view.title;
        // win.scope = _this;
        // win.height = view.height?view.height:0;
        // win.width = view.width?view.width:0;
        // win.url = $.getIBizApp().parseURL2(view.subapp,view.viewurl,{windowid:win.getId(),openerid:_this.getId()});
        // win.viewparam = viewparam;
        // if(view.modal){
        // 	 win.openModal(window);
        // }else{
        // 	 win.openInNewWindow(window);
        // }


        return true;
    }
	/**
	 * 获取编辑模式
	 */
    public getEditMode(data: any = {}): any {
        return data.srfdatatype;
    }
	/**
	 * 获取编辑视图
	 */
    public getEditDataView(arg: any = {}): any {
        return null;
    }
	/**
	 * 获取新建视图
	 */
    public getNewDataView(arg: any = {}): any {
        return null;
    }
	/**
	 * 获取新建向导视图
	 */
    public getNewDataWizardView(arg: any = {}): any {
        return null;
    }
	/**
	 * 获取多选视图
	 */
    public getMPickupView(arg): any {
        return null;
    }
	/**
	 * 获取多数据对象
	 */
    public getMDCtrl(): any {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.GETMDCTRL.INFO','[getMDCtrl]方法必须重写！'),2);
        this.iBizNotification.warning('警告', '[getMDCtrl]方法必须重写！');
        return null;
    }
    public isLoadDefault(): boolean {
        return true;
    }
    public isEnableBatchAdd(): boolean {
        return false;
    }
    public isBatchAddOnly(): boolean {
        return false;
    }
    public onRefresh(): void {
        super.onRefresh();
        var _this = this;
        if (_this.getMDCtrl()) {
            _this.getMDCtrl().load();
        }
    }
    public onSetParentData(): void {
        super.onSetParentData();
        let _this = this;
        _this.parentDataChanged = true;
    }
    public getSearchCond(): any {
        if (this.getSearchForm()) {
            return this.getSearchForm().getValues();
        }
        return null;
    }
    public onSearchFormSearched(): void {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    }
    public onSearchFormReseted(): void {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    }
    public doDEUIAction(uiaction: any = {}, params: any = {}): void {
        var _this = this;
        if (uiaction.tag == 'Help') {
            _this.doHelp(params);
            return;
        }
        if (uiaction.tag == 'Edit') {
            _this.doEdit(params);
            return;
        }
        if (uiaction.tag == 'View') {
            _this.doView(params);
            return;
        }
        if (uiaction.tag == 'Print') {

            _this.doPrint(params);
            return;
        }
        if (uiaction.tag == 'ExportExcel') {
            _this.doExportExcel(params);
            return;
        }
        if (uiaction.tag == 'ExportModel') {
            _this.doExportModel(params);
            return;
        }
        if (uiaction.tag == 'Copy') {
            _this.doCopy(params);
            return;
        }
        if (uiaction.tag == 'Remove') {
            _this.doRemove(params);
            return;
        }
        if (uiaction.tag == 'Import') {
            _this.doImport(params);
            return;
        }
        if (uiaction.tag == 'Refresh') {
            _this.doRefresh(params);
            return;
        }
        if (uiaction.tag == 'NewRow') {
            _this.doCheck(params);
            return;
        }
        if (uiaction.tag == 'New') {
            _this.doNew(params);
            return;
        }
        if (uiaction.tag == 'ToggleRowEdit') {
            _this.doToggleRowEdit(params);
            return;
        }
        super.doDEUIAction(uiaction, params);
    }
    public doToggleRowEdit(params: any = {}): void {
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().isOpenEdit) == 'function')
            _this.getMDCtrl().isOpenEdit(params);
    }
    public doNewRow(params: any = {}): void {
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().newRowAjax) == 'function')
            _this.getMDCtrl().newRowAjax(params);
    }
    public doCheck(params: any = {}): void {
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().quitEdit) == 'function')
            _this.getMDCtrl().quitEdit();
    }
    public doHelp(params: any = {}): void {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOHELP.INFO','帮助操作'),0);
        this.iBizNotification.warning('警告', '帮助操作');
    }
    /*编辑操作*/
    public doEdit(params: any = {}): void {
        var _this = this;
        //获取要编辑的数据集合
        if (params && params.srfkey) {
            if (typeof _this.getMDCtrl().findItem === 'function') {
                params = _this.getMDCtrl().findItem('srfkey', params.srfkey);
            }
            var arg = { data: params };
            _this.onEditData(arg);
            return;
        }
        var selectedData = _this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length == 0) return;

        var arg = {
            data: selectedData[0]
        };
        _this.onEditData(arg);
    }
    /*查看操作*/
    public doView(params: any = {}): void {
        this.doEdit(params);
    }
    /*打印操作*/
    public doPrint(params: any = {}): void {
        var _this = this;
        var arg: any = {};
        var bSingle = true;
        var selectedData = _this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length == 0)) {
            var keys = '';
            if (bSingle) {
                keys = selectedData[0].srfkey;
            } else {
                selectedData.forEach((item) => {
                    var key = item.srfkey;
                    if (keys != '') keys += ';';
                    keys += key;
                });
            }
            arg.srfkeys = keys;
        }
        else
            return;
        _this.onPrintData(arg);
    }
    /*导出操作（Excel）*/
    public doExportExcel(params: any = {}): void {
        if (params.itemtag == '') {

        }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOEXPORTEXCEL.INFO','导出操作（Excel）'),0);
        this.iBizNotification.warning('警告', '导出操作（Excel）');
    }
    /*导出数据模型*/
    public doExportModel(params: any = {}): void {
        //IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOEXPORTMODEL.INFO','导出数据模型'),0);
        var _this = this;
        _this.iBizNotification.warning('警告', '导出数据模型');
        if (!params)
            params = {};
        params.srfaction = 'exportmodel';

        if (!params.srfkeys) {
            //获取要导出的数据集合
            var selectedData = _this.getMDCtrl().getSelection();
            if (selectedData == null || selectedData.length == 0)
                return;

            var keys = '';
            selectedData.forEach(record => {
                var key = record.srfkey;
                if (keys != '')
                    keys += ';';
                keys += key;
            });
            params.srfkeys = keys;
        }
        _this.getMDCtrl().customCall(params);
    }
    /*拷贝操作*/
    public doCopy(params: any = {}): void {
        var _this = this;
        //获取要拷贝的数据集合
        var selectedData = _this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length == 0) return;

        var arg = {
            data: selectedData[0],
            srfcopymode: true
        };
        _this.onEditData(arg);
    }
    /*删除操作*/
    public doRemove(params: any = {}): void {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOREMOVE.INFO','删除操作'),0);
        this.iBizNotification.warning('警告', '删除操作');
    }
    /*数据导入栏*/
    public doImport(params: any = {}): void {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOIMPORT.INFO','数据导入栏'),0);
        this.iBizNotification.warning('警告', '数据导入栏');
    }
    /*刷新操作*/
    public doRefresh(params: any = {}): void {
        this.refresh();
    }
    /*新建操作*/
    doNew(params: any = {}): void {
        var _this = this;
        _this.onNewData();
    }
    public doWFUIAction(uiaction: any = {}, params: any = {}): void {
        var _this = this;
        if (uiaction.actionmode == 'WFBACKEND') {
            var selectedData = _this.getMDCtrl().getSelection();
            if (selectedData == null || selectedData.length == 0) {
                return;
            }

            var keys = '';
            selectedData.forEach(item => {
                var key = item.srfkey;
                if (keys != '') keys += ';';
                keys += key;
            });

            _this.getMDCtrl().wfsubmit({ srfwfiatag: uiaction.tag, srfkeys: keys });
            return;
        }
        super.doWFUIAction(uiaction, params);
    }
    public onWFUIFrontWindowClosed(win, data): void {
        var _this = this;
        // _this.load();
    }

	/**
	 * 获取UI操作参数
	 */
    public getFrontUIActionParam(uiaction: any = {}, params: any = {}): any {
        var _this = this;
        var arg = super.getFrontUIActionParam(uiaction, params);
        if (_this.getParentMode()) {
            // $.extend(arg, _this.getParentMode());
            Object.assign(arg, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(arg, this.getParentData());
            Object.assign(arg, _this.getParentData());
        }
        var target = 'NONE';
        if (uiaction.actiontarget) {
            target = uiaction.actiontarget;
        }
        if (target != 'NONE') {
            if (params.hasOwnProperty('srfkey')) {
                // $.extend(arg,{srfkey:params.srfkey});
                Object.assign(arg, { srfkey: params.srfkey });
                return arg;
            }
            var selectedData = _this.getMDCtrl().getSelection();
            if (!(selectedData == null || selectedData.length == 0)) {

                var vlaueitem = "srfkey";
                var paramkey = "srfkeys";
                var paramjo = null;

                if (uiaction.actionparams) {
                    vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
                    paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
                    paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
                }

                if (target == 'SINGLEKEY') {
                    arg[paramkey] = selectedData[0][vlaueitem];
                } else if (target == 'SINGLEDATA') {
                    // $.extend(arg, selectedData[0]);
                    Object.assign(arg, selectedData[0]);
                } else if (target == 'MULTIKEY') {
                    var keys = '';
                    selectedData.forEach(item => {
                        var key = item[vlaueitem];
                        if (keys != '')
                            keys += ';';
                        keys += key;
                    });
                    arg[paramkey] = keys;
                }

                if (paramjo) {
                    Object.assign(arg, paramjo);
                }
            }
        }
        return arg;
    }
    public getBackendUIActionParam(uiaction: any = {}, params: any = {}): any {
        var _this = this;
        var arg: any = {};
        if (_this.getParentMode()) {
            // $.extend(arg, _this.getParentMode());
            Object.assign(arg, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(arg, this.getParentData());
            Object.assign(arg, _this.getParentData());
        }
        var bSingle = false;
        if (uiaction.actiontarget == 'SINGLEKEY') {
            bSingle = true;
        }
        var selectedData = _this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length == 0)) {
            var keys = '';
            if (bSingle) {
                keys = selectedData[0].srfkey;
            } else {
                selectedData.forEach(item => {
                    var key = item.srfkey;
                    if (keys != '') keys += ';';
                    keys += key;
                });
            }
            arg.srfkeys = keys;
        }
        return arg;
    }
    /*移动记录*/
    public moveRecord(target): void {
        var _this = this;
        var store = _this.getMDCtrl().getStore();
        if (!store.isLoaded()) return null;
        var nCount = store.getCount();
        var nIndex = 0;
        var nLastIndex = -1;
        var selectedData = _this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length == 0)) {
            nIndex = store.indexOf(selectedData[0]);
            nLastIndex = nIndex;
        }
        if (typeof target == 'string') {
            if (target == 'first') nIndex = 0;
            else if (target == 'prev') nIndex -= 1;
            else if (target == 'next') nIndex += 1;
            else if (target == 'last') nIndex = nCount - 1;
        }
        if (nIndex < 0 || nIndex >= nCount) return null;
        if (nIndex == nLastIndex) return null;
        var record = store.getAt(nIndex);
        _this.getMDCtrl().setSelection(record);
        return record;
    }
    public doBackendUIAction(arg: any = {}): void {
        var _this = this;
        _this.getMDCtrl().doUIAction(arg);
    }
    /*隐藏关系列*/
    public doHideParentColumns(parentMode): void {
    }
    public onPrintData(arg: any): void {
        var _this = this;
        _this.doPrintDataNormal(arg);
    }
    /**
	 * 常规新建数据
	 */
    public doPrintDataNormal(arg: any = {}): boolean {
        var _this = this;
        var view = _this.getPrintDataView(arg);
        // if (view == null){
        // 	return false;
        // }
        // var viewurl=view.viewurl;
        // if(!viewurl||viewurl==''){
        // 	viewurl = BASEURL+'/ibizutil/print.pdf';
        // }
        // else
        // {
        // 	viewurl = BASEURL+viewurl;
        // }
        // viewurl = viewurl + (viewurl.indexOf('?')==-1?'?':'&') + $.param(view.viewparam);
        // window.open(viewurl, '_blank');
        return true;
    }
    public getPrintDataView(arg: any = {}): any {
        return null;
    }
    public isEnableMultiSelect(): boolean {
        return this.multiSelect;
    }
    public setEnableMultiSelect(multiSelect: boolean): void {
        this.multiSelect = multiSelect;
    }
    /**
     * 获取表格行激活类型（默认双击）
     * @returns
     */
    public getGridRowActiveMode(): number {
        return 2;
    }


    /*****************事件声明************************/
    /**
     * 数据激活<例如：表格行双击>
     */
    public static DATAACTIVATED = 'DATAACTIVATED';
    /**
     * 数据选择变化
     */
    public static SELECTIONCHANGE = 'SELECTIONCHANGE';
    /**
     * 数据刷新完成
     */
    public static DATALOADED = 'DATALOADED';
}