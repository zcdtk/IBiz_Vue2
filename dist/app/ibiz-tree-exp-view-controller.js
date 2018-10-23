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
 * 树导航界面
 *
 * @class IBizTreeExpViewController
 * @extends {IBizMianViewController}
 */
var IBizTreeExpViewController = /** @class */ (function (_super) {
    __extends(IBizTreeExpViewController, _super);
    /**
     * Creates an instance of IBizTreeExpViewController.
     * 创建 IBizTreeExpViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeExpViewController
     */
    function IBizTreeExpViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.treeReloadMode = '';
        var _this = _this_1;
        return _this_1;
    }
    /**
     * 初始化
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.init = function (opts) {
        var _this_1 = this;
        if (opts === void 0) { opts = {}; }
        _super.prototype.init.call(this, opts);
        var _this = this;
        // 创建分页部件
        var exptab = new IBizExpTab({
            name: 'exptab',
            url: opts.backendurl,
            viewController: _this,
        });
        _this.controls.set('exptab', exptab);
        var treeexpbar = _this.getTreeExpBar();
        if (treeexpbar) {
            treeexpbar.setExpTab(exptab);
            treeexpbar.on(IBizTreeExpBar.SELECTIONCHANGE).subscribe(function (args) {
                _this_1.treeExpBarSelectionChange(args);
            });
        }
    };
    IBizTreeExpViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        var _this = this;
        //初始化分页
        // _this.exptab = new IBizExpTab({ ctrler: this, id: this.getCId2() + 'exptab', showheader: false });
        // _this.registerItem('exptab', this.exptab);
        // var treeExpBarCfg = _this.getTreeExpBarCfg();
        // treeExpBarCfg = $.extend(treeExpBarCfg, { id: this.getCId2() + 'treeexpbar', ctrler: this, tabctrl: _this.exptab });
        // _this.treeexpbar = new IBizTreeExpBar(treeExpBarCfg);
        // _this.registerItem('treeexpbar', _this.treeexpbar);
    };
    IBizTreeExpViewController.prototype.getTreeExpBar = function () {
        return this.controls.get('treeexpbar');
    };
    IBizTreeExpViewController.prototype.getExpTab = function () {
        return this.controls.get('exptab');
    };
    IBizTreeExpViewController.prototype.getTreeExpBarCfg = function () {
        // return this.config.ctrls.treeexpbar || {};
        return {};
    };
    IBizTreeExpViewController.prototype.getExpTabCfg = function () {
        // return this.config.ctrls.exptab || {};
        return {};
    };
    IBizTreeExpViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.treeReloadMode = '';
        if (uiaction.tag == 'Remove') {
            _this.doRemove(params);
            return;
        }
        if (uiaction.tag == 'Refresh') {
            _this.doTreeRefresh(params);
            return;
        }
        if (uiaction.tag == 'New') {
            _this.doNew(params);
            return;
        }
        if (uiaction.tag == 'EDIT') {
            _this.doEdit(params);
            return;
        }
        if (uiaction.tag == 'Copy') {
            _this.doCopy(params);
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    /*新建操作*/
    IBizTreeExpViewController.prototype.doNew = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.onNewData(params);
    };
    /*拷贝操作*/
    IBizTreeExpViewController.prototype.doCopy = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = {
            data: params,
            srfcopymode: true
        };
        _this.onEditData(arg);
    };
    /*编辑操作*/
    IBizTreeExpViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        //获取要编辑的数据集合
        if (params && params.srfkey) {
            var arg = { data: params };
            _this.onEditData(arg);
            return;
        }
    };
    /*查看操作*/
    IBizTreeExpViewController.prototype.doView = function (params) {
        if (params === void 0) { params = {}; }
        this.doEdit(params);
    };
    /*删除操作*/
    IBizTreeExpViewController.prototype.doRemove = function (params) {
        if (params === void 0) { params = {}; }
        this.onRemove(params);
        ;
    };
    /*刷新操作*/
    IBizTreeExpViewController.prototype.doTreeRefresh = function (params) {
        if (params === void 0) { params = {}; }
        this.onTreeRefresh(params);
    };
    /**
     * 新建数据
     */
    IBizTreeExpViewController.prototype.onNewData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        _this.treeReloadMode = IBizTreeExpViewController.REFRESHMODE_CURRENTNODE;
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
        if (_this.isEnableBatchAdd()) {
            _this.doNewDataBatch(loadParam);
            return;
        }
        if (_this.doNewDataWizard(loadParam)) {
            return;
        }
        var newMode = _this.getNewMode(arg);
        if (newMode) {
            // loadParam.srfnewmode = newMode;
            Object.assign(loadParam, { srfnewmode: newMode });
        }
        _this.doNewDataNormal(loadParam, arg);
    };
    /**
     * 批量新建
     */
    IBizTreeExpViewController.prototype.doNewDataBatch = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var mpickupview = _this.getMPickupView(arg);
        if (mpickupview) {
            // var win = $.getIBizApp().createWindow({});
            // var viewparam = {};
            // $.extend(viewparam, mpickupview.viewparam);
            // if(!viewparam.srfreferdata){
            // 	if(viewparam.srfparentdata)
            // 	{
            // 		viewparam.srfreferdata = viewparam.srfparentdata;
            // 		delete viewparam.srfparentdata;
            // 	}
            // }
            // viewparam['windowid'] = win.getId();
            // viewparam['openerid'] = _this.getId();
            // win.title = mpickupview.title;
            // win.scope = _this;
            // win.height = mpickupview.height?mpickupview.height:0;
            // win.width = mpickupview.width?mpickupview.width:0;
            // win.url = $.getIBizApp().parseURL2(mpickupview.subapp,mpickupview.viewurl,{windowid:win.getId(),openerid:_this.getId()});
            // win.viewparam = viewparam;
            // win.callback =  _this.onMPickupWindowClose;
            // if(mpickupview.modal){
            // 	 win.openModal(window);
            // }else{
            // 	 win.openInNewWindow(window);
            // }
            return true;
        }
        return false;
    };
    /**
     * 批量新建关闭
     */
    IBizTreeExpViewController.prototype.onMPickupWindowClose = function (win) {
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
    IBizTreeExpViewController.prototype.addDataBatch = function (selectedDatas) {
        return "";
    };
    /**
     * 向导新建数据
     */
    IBizTreeExpViewController.prototype.doNewDataWizard = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var wizardview = _this.getNewDataWizardView(arg);
        if (wizardview != null) {
            // var win = $.getIBizApp().createWindow({});
            // var viewparam = {};
            // viewparam['windowid'] = win.getId();
            // viewparam['openerid'] = _this.getId();
            // win.title = wizardview.title;
            // win.scope = _this;
            // win.height = wizardview.height?wizardview.height:0;
            // win.width = wizardview.width?wizardview.width:0;
            // win.url = $.getIBizApp().parseURL2(wizardview.subapp,wizardview.viewurl,{windowid:win.getId(),openerid:_this.getId()});
            // win.viewparam = viewparam;
            // win.callback =  _this.onNewDataWizardWindowClose;
            // if(wizardview.modal){
            //  	win.openModal(window);
            // }else{
            // 	win.openInNewWindow(window);
            // }
            return true;
        }
        return false;
    };
    /**
     * 向导新建数据窗口关闭
     */
    IBizTreeExpViewController.prototype.onNewDataWizardWindowClose = function (win, eOpts) {
        if (eOpts === void 0) { eOpts = {}; }
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
    IBizTreeExpViewController.prototype.doNewDataNormal = function (arg, params) {
        if (arg === void 0) { arg = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        var view = _this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        if (params && view.viewparam && view.viewparam.srfparenttype) {
            var parentType = view.viewparam.srfparenttype;
            if (parentType == 'DER1N') {
                view.viewparam.srfparentkey = params.srfkey;
            }
        }
        return _this.openDataView(view);
    };
    /**
     * 编辑数据
     */
    IBizTreeExpViewController.prototype.onEditData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        _this.treeReloadMode = IBizTreeExpViewController.REFRESHMODE_PARENTNODE;
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
            // $.extend(loadParam, { srfkey: arg.data.srfkey });
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
    IBizTreeExpViewController.prototype.doEditDataNormal = function (arg) {
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
    IBizTreeExpViewController.prototype.openDataView = function (view) {
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
    IBizTreeExpViewController.prototype.onRemove = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var node;
        if (params && params.node) {
            node = params.node;
        }
        if (node == null || node.length == 0)
            return;
        var dataInfo = params.srfmajortext;
        //询问框
        // IBiz.confirm($IGM('TREEEXPVIEWCONTROLLER.ONREMOVE.INFO', '确认要删除 【' + dataInfo + '】 ，删除操作将不可恢复？'), function (result) {
        //     if (result) {
        //         _this.getTreeExpBar().getTree().remove(node);
        //     }
        // });
        _this.iBizNotification.confirm('', '').subscribe(function (result) {
            if (result && Object.is(result, 'OK')) {
                _this.getTreeExpBar().getTree().remove(node);
            }
        });
    };
    /**
     * 界面操作树节点刷新
     */
    IBizTreeExpViewController.prototype.onTreeRefresh = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var node;
        if (params && params.node) {
            node = params.node;
        }
        if (node == null || node.length == 0) {
            var nodes = _this.getSelected(true);
            if (nodes && nodes.length > 0)
                node = nodes[0];
        }
        //刷新树节点
        _this.getTreeExpBar().getTree().reload(node);
    };
    /**
     * 视图刷新操作
     */
    IBizTreeExpViewController.prototype.onRefresh = function () {
        var _this = this;
        var node;
        if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_NONE) {
            return;
        }
        else if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_CURRENTNODE) {
            var nodes = _this.getSelected(true);
            if (nodes && nodes.length > 0)
                node = nodes[0];
        }
        else if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_PARENTNODE) {
            var nodes = _this.getSelected(true);
            if (nodes && nodes.length > 0)
                node = nodes[0].parent;
        }
        //刷新树节点
        _this.getTreeExpBar().getTree().reload(node);
    };
    IBizTreeExpViewController.prototype.getSelected = function (bFull) {
        var _this = this;
        var nodes = _this.getTreeExpBar().getTree().getSelected(bFull);
        return nodes;
    };
    /**
     * 获取新建模式
     */
    IBizTreeExpViewController.prototype.getNewMode = function (data) {
        if (data === void 0) { data = {}; }
        return 'NEWDATA@' + data.srfnodetype.toUpperCase();
    };
    /**
     * 获取编辑模式
     */
    IBizTreeExpViewController.prototype.getEditMode = function (data) {
        if (data === void 0) { data = {}; }
        return 'EDITDATA@' + data.srfnodetype.toUpperCase();
    };
    /**
     * 获取编辑视图
     */
    IBizTreeExpViewController.prototype.getEditDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        return _this.getEditDataView(arg);
    };
    /**
     * 获取新建视图
     */
    IBizTreeExpViewController.prototype.getNewDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        return _this.getNewDataView(arg);
    };
    /**
     * 获取新建向导视图
     */
    IBizTreeExpViewController.prototype.getNewDataWizardView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    /**
     * 获取多选视图
     */
    IBizTreeExpViewController.prototype.getMPickupView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    IBizTreeExpViewController.prototype.doBackendUIAction = function (arg, params) {
        if (arg === void 0) { arg = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.getTreeExpBar().getTree().doUIAction(arg, params);
    };
    IBizTreeExpViewController.prototype.isEnableBatchAdd = function () {
        return false;
    };
    IBizTreeExpViewController.prototype.isBatchAddOnly = function () {
        return false;
    };
    IBizTreeExpViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        if (uiaction.actiontarget == 'SINGLEKEY' || uiaction.actiontarget == 'MULTIKEY') {
            var node = null;
            var vlaueitem = "srfkey";
            var paramkey = "srfkeys";
            var infoitem = 'srfmajortext';
            var paramjo = null;
            if (uiaction.actionparams) {
                vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
                paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
                infoitem = uiaction.actionparams.textitem ? uiaction.actionparams.textitem.toLowerCase() : infoitem;
                paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
            }
            var keys = params.srfkey;
            var dataInfo = params[infoitem];
            var nodeType = params.srfnodetype;
            var data = { dataInfo: dataInfo, srfnodetype: nodeType };
            data[paramkey] = params[vlaueitem];
            return data;
        }
        return {};
    };
    /**
     * 导航树节点选中
     *
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.treeExpBarSelectionChange = function (data) {
        if (data === void 0) { data = {}; }
        console.log(data);
        if (!data || Object.keys(data).length === 0 || !data.viewid) {
            return;
        }
        var routeString = data.viewid;
        // if (!this.hasChildRoute(routeString.toLocaleLowerCase())) {
        //     return;
        // }
        var viewParam = data.viewParam;
        Object.assign(viewParam, { refreshView: true });
        // this.openView(routeString.toLocaleLowerCase(), viewParam);
        var _this = this;
        _this.openView(routeString.toLocaleLowerCase(), viewParam);
    };
    IBizTreeExpViewController.REFRESHMODE_CURRENTNODE = 'CURRENTNODE';
    IBizTreeExpViewController.REFRESHMODE_PARENTNODE = 'PARENTNODE';
    IBizTreeExpViewController.REFRESHMODE_ALLNODE = 'ALLNODE';
    IBizTreeExpViewController.REFRESHMODE_NONE = 'NONE';
    return IBizTreeExpViewController;
}(IBizMianViewController));
