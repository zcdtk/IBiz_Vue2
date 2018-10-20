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
 * 表格视图控制器对象
 *
 * @class IBizMDViewController
 * @extends {IBizMianViewController}
 */
var IBizMDViewController = /** @class */ (function (_super) {
    __extends(IBizMDViewController, _super);
    /**
     * Creates an instance of IBizMDViewController.
     * 创建 IBizMDViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizMDViewController
     */
    function IBizMDViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.bQuickSearch = true;
        _this_1.currentDataKey = null;
        _this_1.parentDataChanged = false;
        _this_1.multiSelect = false;
        _this_1.quickSearch = null;
        _this_1.quickSearchEntityDEFields = [];
        var _this = _this_1;
        return _this_1;
    }
    IBizMDViewController.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        _super.prototype.init.call(this, params);
        var _this = this;
        _this.parentDataChanged = false;
        var mdctrl = this.getMDCtrl();
        if (mdctrl) {
            // 多数据部件选中变化
            mdctrl.on(IBizMDControl.SELECTIONCHANGE).subscribe(function (args) {
                _this.onSelectionChange(args);
                if (_this.getGridRowActiveMode() === 1) {
                    _this.onDataActivated(args[0]);
                }
            });
            //  多数据部件加载之前
            mdctrl.on(IBizMDControl.BEFORELOAD).subscribe(function (args) {
                _this.onStoreBeforeLoad(args);
            });
            // 多数据部件加载完成
            mdctrl.on(IBizMDControl.LOADED).subscribe(function (args) {
                _this.onStoreLoad(args);
            });
            // 多数据部件编辑状态改变
            mdctrl.on(IBizDataGrid.CHANGEEDITSTATE).subscribe(function (args) {
                _this.onGridRowEditState(args);
            });
            // 多数据部件删除完成
            mdctrl.on(IBizDataGrid.REMOVED).subscribe(function (args) {
                _this.onStoreRemove(args);
            });
        }
        if (_this.getParentMode()) {
            _this.doHideParentColumns(_this.getParentMode());
        }
        var searchform = this.getSearchForm();
        if (searchform) {
            // searchform.on(IBizSearchForm.FORMSEARCHED, function (sender, args, e) {
            //     _this.onSearchFormSearched();
            // } _this);
            // searchform.on(IBizForm.FORMLOADED, function (sender, args, e) {
            //     if (_this.config.loaddefault != undefined && _this.config.loaddefault)
            //         _this.onSearchFormReseted();
            // } _this);
            // searchform.on(IBizSearchForm.FORMRESETED, function (sender, args, e) {
            //     _this.onSearchFormReseted();
            // } _this);
            // searchform.on(IBizSearchForm.FORMCONTRACT, function (sender, args, e) {
            //     _this.onSearchFormOpen(args);
            // } _this);
            // searchform.on(IBizForm.FORMFIELDCHANGED, function (sender, args, e) {
            //     var fieldname = '';
            //     if (sender != null) fieldname = sender.getName();
            //     if (!args) args = {};
            //     _this.onSearchFormFieldChanged(fieldname, sender, args.newvalue, args.oldvalue);
            // } _this);
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
    };
    IBizMDViewController.prototype.onInit = function () {
        var _this_1 = this;
        _super.prototype.onInit.call(this);
        var _this = this;
        var searchform = this.getSearchForm();
        if (searchform) {
            searchform.init();
            searchform.autoLoad(_this.viewparam);
            if (_this.hasQuickSearch() == true) {
                searchform.close();
            }
            else {
                searchform.open();
            }
        }
        var _window = window;
        ;
        var iBizApp = _window.getIBizApp();
        _this.refreshViewEvent = iBizApp.onRefreshView();
        _this.refreshViewEvent.subscribe(function (data) {
            if (data && Object.is(data.openerid, _this_1.getId())) {
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
    };
    /**
     * 视图销毁 已订阅的视图刷新设置
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        var _this = this;
        _this.refreshViewEvent.unsubscribe();
    };
    IBizMDViewController.prototype.hasQuickSearch = function () {
        var _this = this;
        return _this.bQuickSearch;
    };
    IBizMDViewController.prototype.onStoreRemove = function (args) {
    };
    /**
     * 搜索表单展开
     */
    IBizMDViewController.prototype.onSearchFormOpen = function (args) {
        if (args === void 0) { args = {}; }
    };
    /**
     * 获取搜索表单对象
     */
    IBizMDViewController.prototype.getSearchForm = function () {
        return this.controls.get('searchform');
    };
    IBizMDViewController.prototype.getAllData = function () {
        var _this = this;
        if (_this.getMDCtrl()) {
            return _this.getMDCtrl().getAllData();
        }
        return [];
    };
    /**
     * 搜索表单属性值发生变化
     */
    IBizMDViewController.prototype.onSearchFormFieldChanged = function (fieldname, field, value) {
        var _this = this;
    };
    /**
     * 数据加载之前
     */
    IBizMDViewController.prototype.onStoreBeforeLoad = function (args) {
        if (args === void 0) { args = {}; }
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
    };
    /**
     * 数据加载之前
     */
    IBizMDViewController.prototype.onStoreLoad = function (args) {
        var _this = this;
        var lastActive = null;
        if (_this.currentDataKey != null && _this.currentDataKey != '' && args && args.items) {
            args.items.some(function (record) {
                if (record.srfkey == _this.currentDataKey) {
                    lastActive = record;
                    return true;
                }
            });
        }
        if (lastActive) {
            _this.getMDCtrl().setSelection(lastActive);
            _this.calcToolbarItemState(true, lastActive.srfdataaccaction);
        }
        else {
            _this.currentDataKey = null;
            _this.fire(IBizMDViewController.SELECTIONCHANGE, []);
            _this.calcToolbarItemState(false);
        }
        _this.fire(IBizMDViewController.DATALOADED, _this);
        _this.parentDataChanged = false;
        _this.reloadUICounters();
    };
    /**
     * 数据被激活<最典型的情况就是行双击>
     * @param record 记录
     * @param e 事件
     */
    IBizMDViewController.prototype.onDataActivated = function (record) {
        if (record === void 0) { record = {}; }
        var _this = this;
        if (!record || !record.srfkey) {
            return;
        }
        _this.fire(IBizMDViewController.DATAACTIVATED, [record]);
        _this.currentDataKey = record.srfkey;
        _this.calcToolbarItemState(true, record.srfdataaccaction);
        _this.onEditData({ data: record });
    };
    /**
     * 行选择变化
     * @param sender 来源
     * @param selected 选中数据
     */
    IBizMDViewController.prototype.onSelectionChange = function (selected) {
        var _this = this;
        if (selected == null || selected.length == 0) {
            _this.currentDataKey = null;
        }
        else {
            _this.currentDataKey = selected[0].srfkey;
        }
        _this.fire(IBizMDViewController.SELECTIONCHANGE, selected);
        _this.calcToolbarItemState(_this.currentDataKey != null, (_this.currentDataKey != null) ? selected[0].srfdataaccaction : null);
    };
    /**
     * 改变工具栏启用编辑按钮信息
     */
    IBizMDViewController.prototype.onGridRowEditState = function (args) {
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
        if (args === void 0) { args = {}; }
        // _this.doLayout();
    };
    /**
     * 表单权限发生变化
     */
    IBizMDViewController.prototype.onDataAccActionChange = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        var _this = this;
        if (_this.getToolbar()) {
            _this.getToolbar().updateAccAction(dataaccaction);
        }
        // if(_this.mintoolbar)
        // 	_this.mintoolbar.updateAccAction(dataaccaction);
        // if(_this.floattoolbar)
        // 	_this.floattoolbar.updateAccAction(dataaccaction);
    };
    /**
     * 新建数据
     */
    IBizMDViewController.prototype.onNewData = function () {
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
    };
    /**
     * 批量新建
     */
    IBizMDViewController.prototype.doNewDataBatch = function (arg) {
        if (arg === void 0) { arg = {}; }
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
    };
    /**
     * 批量新建关闭
     */
    IBizMDViewController.prototype.onMPickupWindowClose = function (win) {
        var _this = win.scope;
        var loadParam = win.userData;
        var dialogResult = win.dialogResult;
        if (!dialogResult)
            return;
        if (dialogResult == 'ok') {
            var selectedDatas = win.selectedDatas;
            if (!selectedDatas) {
                return;
            }
            _this.addDataBatch(selectedDatas);
        }
        return;
    };
    /**
     * 批量添加数据
     */
    IBizMDViewController.prototype.addDataBatch = function (selectedDatas) {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.ADDDATABATCH.INFO','[addDataBatch]方法必须重写！'),2);
        this.iBizNotification.warning('警告', '[addDataBatch]方法必须重写！');
    };
    /**
     * 向导新建数据
     */
    IBizMDViewController.prototype.doNewDataWizard = function (arg) {
        if (arg === void 0) { arg = {}; }
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
    };
    /**
     * 向导新建数据窗口关闭
     */
    IBizMDViewController.prototype.onNewDataWizardWindowClose = function (win, eOpts) {
        var _this = win.scope;
        var loadParam = {}; //win.userData;
        var dialogResult = win.dialogResult;
        if (!dialogResult)
            return;
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
    };
    /**
     * 常规新建数据
     */
    IBizMDViewController.prototype.doNewDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var view = _this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        return _this.openDataView(view);
    };
    /**
     * 编辑数据
     */
    IBizMDViewController.prototype.onEditData = function (arg) {
        if (arg === void 0) { arg = {}; }
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
        }
        else {
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
    };
    /**
     * 执行常规编辑数据
     */
    IBizMDViewController.prototype.doEditDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var view = _this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        return _this.openDataView(view);
    };
    /**
     * 打开数据视图
     */
    IBizMDViewController.prototype.openDataView = function (view) {
        if (view === void 0) { view = {}; }
        var _this = this;
        var openMode = view.openMode;
        if (openMode != undefined) {
            if (openMode == 'POPUPMODAL') {
                view.modal = true;
            }
            else if (openMode == 'POPUP') {
                view.modal = true;
            }
            else if (openMode == '' || openMode == 'INDEXVIEWTAB') {
                view.modal = false;
            }
        }
        if (_this.isShowModal()) {
            view.modal = true;
        }
        var url_datas = [];
        var params_names = Object.keys(view.viewparam);
        params_names.forEach(function (name) {
            if (name && view.viewparam[name] && !Object.is(view.viewparam[name], '')) {
                url_datas.push(name + "=" + view.viewparam[name]);
            }
        });
        var url = "/" + IBizEnvironment.SysName + "/" + IBizEnvironment.BaseUrl.toLowerCase() + view.viewurl;
        if (url_datas.length > 0) {
            url = url + "?" + url_datas.join('&');
        }
        var _window = window;
        ;
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
    };
    /**
     * 获取编辑模式
     */
    IBizMDViewController.prototype.getEditMode = function (data) {
        if (data === void 0) { data = {}; }
        return data.srfdatatype;
    };
    /**
     * 获取编辑视图
     */
    IBizMDViewController.prototype.getEditDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    /**
     * 获取新建视图
     */
    IBizMDViewController.prototype.getNewDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    /**
     * 获取新建向导视图
     */
    IBizMDViewController.prototype.getNewDataWizardView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    /**
     * 获取多选视图
     */
    IBizMDViewController.prototype.getMPickupView = function (arg) {
        return null;
    };
    /**
     * 获取多数据对象
     */
    IBizMDViewController.prototype.getMDCtrl = function () {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.GETMDCTRL.INFO','[getMDCtrl]方法必须重写！'),2);
        this.iBizNotification.warning('警告', '[getMDCtrl]方法必须重写！');
        return null;
    };
    IBizMDViewController.prototype.isLoadDefault = function () {
        return true;
    };
    IBizMDViewController.prototype.isEnableBatchAdd = function () {
        return false;
    };
    IBizMDViewController.prototype.isBatchAddOnly = function () {
        return false;
    };
    IBizMDViewController.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        var _this = this;
        if (_this.getMDCtrl()) {
            _this.getMDCtrl().load();
        }
    };
    IBizMDViewController.prototype.onSetParentData = function () {
        _super.prototype.onSetParentData.call(this);
        var _this = this;
        _this.parentDataChanged = true;
    };
    IBizMDViewController.prototype.getSearchCond = function () {
        if (this.getSearchForm()) {
            return this.getSearchForm().getValues();
        }
        return null;
    };
    IBizMDViewController.prototype.onSearchFormSearched = function () {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    };
    IBizMDViewController.prototype.onSearchFormReseted = function () {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    };
    IBizMDViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
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
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    IBizMDViewController.prototype.doToggleRowEdit = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().isOpenEdit) == 'function')
            _this.getMDCtrl().isOpenEdit(params);
    };
    IBizMDViewController.prototype.doNewRow = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().newRowAjax) == 'function')
            _this.getMDCtrl().newRowAjax(params);
    };
    IBizMDViewController.prototype.doCheck = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().quitEdit) == 'function')
            _this.getMDCtrl().quitEdit();
    };
    IBizMDViewController.prototype.doHelp = function (params) {
        if (params === void 0) { params = {}; }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOHELP.INFO','帮助操作'),0);
        this.iBizNotification.warning('警告', '帮助操作');
    };
    /*编辑操作*/
    IBizMDViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
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
        if (selectedData == null || selectedData.length == 0)
            return;
        var arg = {
            data: selectedData[0]
        };
        _this.onEditData(arg);
    };
    /*查看操作*/
    IBizMDViewController.prototype.doView = function (params) {
        if (params === void 0) { params = {}; }
        this.doEdit(params);
    };
    /*打印操作*/
    IBizMDViewController.prototype.doPrint = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = {};
        var bSingle = true;
        var selectedData = _this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length == 0)) {
            var keys = '';
            if (bSingle) {
                keys = selectedData[0].srfkey;
            }
            else {
                selectedData.forEach(function (item) {
                    var key = item.srfkey;
                    if (keys != '')
                        keys += ';';
                    keys += key;
                });
            }
            arg.srfkeys = keys;
        }
        else
            return;
        _this.onPrintData(arg);
    };
    /*导出操作（Excel）*/
    IBizMDViewController.prototype.doExportExcel = function (params) {
        if (params === void 0) { params = {}; }
        if (params.itemtag == '') {
        }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOEXPORTEXCEL.INFO','导出操作（Excel）'),0);
        this.iBizNotification.warning('警告', '导出操作（Excel）');
    };
    /*导出数据模型*/
    IBizMDViewController.prototype.doExportModel = function (params) {
        if (params === void 0) { params = {}; }
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
            selectedData.forEach(function (record) {
                var key = record.srfkey;
                if (keys != '')
                    keys += ';';
                keys += key;
            });
            params.srfkeys = keys;
        }
        _this.getMDCtrl().customCall(params);
    };
    /*拷贝操作*/
    IBizMDViewController.prototype.doCopy = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        //获取要拷贝的数据集合
        var selectedData = _this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length == 0)
            return;
        var arg = {
            data: selectedData[0],
            srfcopymode: true
        };
        _this.onEditData(arg);
    };
    /*删除操作*/
    IBizMDViewController.prototype.doRemove = function (params) {
        if (params === void 0) { params = {}; }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOREMOVE.INFO','删除操作'),0);
        this.iBizNotification.warning('警告', '删除操作');
    };
    /*数据导入栏*/
    IBizMDViewController.prototype.doImport = function (params) {
        if (params === void 0) { params = {}; }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOIMPORT.INFO','数据导入栏'),0);
        this.iBizNotification.warning('警告', '数据导入栏');
    };
    /*刷新操作*/
    IBizMDViewController.prototype.doRefresh = function (params) {
        if (params === void 0) { params = {}; }
        this.refresh();
    };
    /*新建操作*/
    IBizMDViewController.prototype.doNew = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.onNewData();
    };
    IBizMDViewController.prototype.doWFUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        if (uiaction.actionmode == 'WFBACKEND') {
            var selectedData = _this.getMDCtrl().getSelection();
            if (selectedData == null || selectedData.length == 0) {
                return;
            }
            var keys = '';
            selectedData.forEach(function (item) {
                var key = item.srfkey;
                if (keys != '')
                    keys += ';';
                keys += key;
            });
            _this.getMDCtrl().wfsubmit({ srfwfiatag: uiaction.tag, srfkeys: keys });
            return;
        }
        _super.prototype.doWFUIAction.call(this, uiaction, params);
    };
    IBizMDViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
        var _this = this;
        // _this.load();
    };
    /**
     * 获取UI操作参数
     */
    IBizMDViewController.prototype.getFrontUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = _super.prototype.getFrontUIActionParam.call(this, uiaction, params);
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
                }
                else if (target == 'SINGLEDATA') {
                    // $.extend(arg, selectedData[0]);
                    Object.assign(arg, selectedData[0]);
                }
                else if (target == 'MULTIKEY') {
                    var keys = '';
                    selectedData.forEach(function (item) {
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
    };
    IBizMDViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = {};
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
            }
            else {
                selectedData.forEach(function (item) {
                    var key = item.srfkey;
                    if (keys != '')
                        keys += ';';
                    keys += key;
                });
            }
            arg.srfkeys = keys;
        }
        return arg;
    };
    /*移动记录*/
    IBizMDViewController.prototype.moveRecord = function (target) {
        var _this = this;
        var store = _this.getMDCtrl().getStore();
        if (!store.isLoaded())
            return null;
        var nCount = store.getCount();
        var nIndex = 0;
        var nLastIndex = -1;
        var selectedData = _this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length == 0)) {
            nIndex = store.indexOf(selectedData[0]);
            nLastIndex = nIndex;
        }
        if (typeof target == 'string') {
            if (target == 'first')
                nIndex = 0;
            else if (target == 'prev')
                nIndex -= 1;
            else if (target == 'next')
                nIndex += 1;
            else if (target == 'last')
                nIndex = nCount - 1;
        }
        if (nIndex < 0 || nIndex >= nCount)
            return null;
        if (nIndex == nLastIndex)
            return null;
        var record = store.getAt(nIndex);
        _this.getMDCtrl().setSelection(record);
        return record;
    };
    IBizMDViewController.prototype.doBackendUIAction = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        _this.getMDCtrl().doUIAction(arg);
    };
    /*隐藏关系列*/
    IBizMDViewController.prototype.doHideParentColumns = function (parentMode) {
    };
    IBizMDViewController.prototype.onPrintData = function (arg) {
        var _this = this;
        _this.doPrintDataNormal(arg);
    };
    /**
     * 常规新建数据
     */
    IBizMDViewController.prototype.doPrintDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
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
    };
    IBizMDViewController.prototype.getPrintDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    IBizMDViewController.prototype.isEnableMultiSelect = function () {
        return this.multiSelect;
    };
    IBizMDViewController.prototype.setEnableMultiSelect = function (multiSelect) {
        this.multiSelect = multiSelect;
    };
    /**
     * 获取表格行激活类型（默认双击）
     * @returns
     */
    IBizMDViewController.prototype.getGridRowActiveMode = function () {
        return 2;
    };
    /*****************事件声明************************/
    /**
     * 数据激活<例如：表格行双击>
     */
    IBizMDViewController.DATAACTIVATED = 'DATAACTIVATED';
    /**
     * 数据选择变化
     */
    IBizMDViewController.SELECTIONCHANGE = 'SELECTIONCHANGE';
    /**
     * 数据刷新完成
     */
    IBizMDViewController.DATALOADED = 'DATALOADED';
    return IBizMDViewController;
}(IBizMianViewController));
