/**
 * 树导航界面
 *
 * @class IBizTreeExpViewController
 * @extends {IBizMianViewController}
 */
class IBizTreeExpViewController extends IBizMainViewController {

    public treeReloadMode: string = '';

    /**
     * Creates an instance of IBizTreeExpViewController.
     * 创建 IBizTreeExpViewController 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizTreeExpViewController
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
    }

    /**
     * 初始化
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeExpViewController
     */
    public init(opts: any = {}): void {
        super.init(opts);
        let _this = this;
        // 创建分页部件
        const exptab = new IBizExpTab({
            name: 'exptab',
            url: opts.backendurl,
            viewController: _this,
        });
        _this.controls.set('exptab', exptab);
        const treeexpbar = _this.getTreeExpBar();
        if (treeexpbar) {
            treeexpbar.setExpTab(exptab);
            treeexpbar.on(IBizTreeExpBar.SELECTIONCHANGE).subscribe((args) => {
                this.treeExpBarSelectionChange(args);
            });
        }
    }

    public onInit(): void {
        super.onInit();
        var _this = this;
        //初始化分页
        // _this.exptab = new IBizExpTab({ ctrler: this, id: this.getCId2() + 'exptab', showheader: false });
        // _this.registerItem('exptab', this.exptab);
        // var treeExpBarCfg = _this.getTreeExpBarCfg();
        // treeExpBarCfg = $.extend(treeExpBarCfg, { id: this.getCId2() + 'treeexpbar', ctrler: this, tabctrl: _this.exptab });
        // _this.treeexpbar = new IBizTreeExpBar(treeExpBarCfg);
        // _this.registerItem('treeexpbar', _this.treeexpbar);

    }
    public getTreeExpBar(): any {
        return this.controls.get('treeexpbar');
    }
    public getExpTab(): any {
        return this.controls.get('exptab');
    }
    public getTreeExpBarCfg(): any {
        // return this.config.ctrls.treeexpbar || {};
        return {};
    }
    public getExpTabCfg(): any {
        // return this.config.ctrls.exptab || {};
        return {};
    }
    public doDEUIAction(uiaction: any = {}, params: any = {}): void {
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
        super.doDEUIAction(uiaction, params);
    }
    /*新建操作*/
    public doNew(params: any = {}): void {
        var _this = this;
        _this.onNewData(params);
    }
    /*拷贝操作*/
    public doCopy(params: any = {}): void {
        var _this = this;
        var arg = {
            data: params,
            srfcopymode: true
        };
        _this.onEditData(arg);
    }
    /*编辑操作*/
    public doEdit(params: any = {}): void {
        var _this = this;
        //获取要编辑的数据集合
        if (params && params.srfkey) {
            var arg = { data: params };
            _this.onEditData(arg);
            return;
        }
    }
    /*查看操作*/
    public doView(params: any = {}): void {
        this.doEdit(params);
    }
    /*删除操作*/
    public doRemove(params: any = {}): void {
        this.onRemove(params);;
    }
    /*刷新操作*/
    public doTreeRefresh(params: any = {}): void {
        this.onTreeRefresh(params);
    }
	/**
	 * 新建数据
	 */
    public onNewData(arg: any = {}): void {
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
    }

	/**
	 * 批量新建
	 */
    public doNewDataBatch(arg: any = {}): boolean {
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
    }
	/**
	 * 批量新建关闭
	 */
    public onMPickupWindowClose(win: any): void {
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
    public addDataBatch(selectedDatas: Array<any>): string {
        return "";
    }
	/**
	 * 向导新建数据
	 */
    public doNewDataWizard(arg: any = {}): boolean {
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
    }
	/**
	 * 向导新建数据窗口关闭
	 */
    public onNewDataWizardWindowClose(win: any, eOpts: any = {}): void {
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
    public doNewDataNormal(arg: any = {}, params: any = {}): boolean {
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
    }
	/**
	 * 编辑数据
	 */
    public onEditData(arg: any = {}): void {
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
        } else {
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
    public onRemove(params: any = {}): void {
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
        _this.iBizNotification.confirm('', '').subscribe((result) => {
            if (result && Object.is(result, 'OK')) {
                _this.getTreeExpBar().getTree().remove(node);
            }
        });
    }
    /**
     * 界面操作树节点刷新
     */
    public onTreeRefresh(params: any = {}): void {
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
    }
    /**
     * 视图刷新操作
     */
    public onRefresh(): void {
        var _this = this;
        var node;
        if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_NONE) {
            return;
        } else if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_CURRENTNODE) {
            var nodes = _this.getSelected(true);
            if (nodes && nodes.length > 0)
                node = nodes[0];
        } else if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_PARENTNODE) {
            var nodes = _this.getSelected(true);
            if (nodes && nodes.length > 0)
                node = nodes[0].parent;
        }

        //刷新树节点
        _this.getTreeExpBar().getTree().reload(node);
    }
    public getSelected(bFull): any {
        var _this = this;
        var nodes = _this.getTreeExpBar().getTree().getSelected(bFull);
        return nodes;
    }
	/**
	 * 获取新建模式
	 */
    public getNewMode(data: any = {}): string {
        return 'NEWDATA@' + data.srfnodetype.toUpperCase();
    }
	/**
	 * 获取编辑模式
	 */
    public getEditMode(data: any = {}): string {
        return 'EDITDATA@' + data.srfnodetype.toUpperCase();
    }
	/**
	 * 获取编辑视图
	 */
    public getEditDataView(arg: any = {}): any {
        var _this = this;
        return _this.getEditDataView(arg);
    }
	/**
	 * 获取新建视图
	 */
    public getNewDataView(arg: any = {}): any {
        var _this = this;
        return _this.getNewDataView(arg);
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
    public getMPickupView(arg: any = {}): any {
        return null;
    }
    public doBackendUIAction(arg: any = {}, params: any = {}): void {
        var _this = this;
        _this.getTreeExpBar().getTree().doUIAction(arg, params);
    }
    public isEnableBatchAdd(): boolean {
        return false;
    }
    public isBatchAddOnly(): boolean {
        return false;
    }
    public getBackendUIActionParam(uiaction: any = {}, params: any = {}): any {
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
    }

    /**
     * 导航树节点选中
     *
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    public treeExpBarSelectionChange(data: any = {}): void {
        console.log(data);
        if (!data || Object.keys(data).length === 0 || !data.viewid) {
            return;
        }
        const routeString: string = data.viewid;
        // if (!this.hasChildRoute(routeString.toLocaleLowerCase())) {
        //     return;
        // }
        let viewParam: any = data.viewParam;
        Object.assign(viewParam, { refreshView: true });
        // this.openView(routeString.toLocaleLowerCase(), viewParam);

        let _this = this;
        _this.openView(routeString.toLocaleLowerCase(), viewParam);
    }

    public static REFRESHMODE_CURRENTNODE = 'CURRENTNODE';
    public static REFRESHMODE_PARENTNODE = 'PARENTNODE';
    public static REFRESHMODE_ALLNODE = 'ALLNODE';
    public static REFRESHMODE_NONE = 'NONE';
}

