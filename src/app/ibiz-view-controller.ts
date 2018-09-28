/**
 * 视图控制器基类
 *
 * @class IBizViewController
 * @extends {IBizObject}
 */
class IBizViewController extends IBizObject {

    private itemMap: Map<string, any> = new Map();

    public parentMode: any = {};

    public parentData: any = {};

    public bInited: boolean = false;

    private containerid: string;

    private appctx: string;

    private backendurl: string;

    private ctrlers: Map<string, any> = new Map();

    private codelists: Map<string, any> = new Map();

    public uiactions: Map<string, any> = new Map();

    private uicounters: Map<string, any> = new Map();

    private referData: any = {};

    private viewparam: any = {};

    private updatepanels: Map<string, any> = new Map();

    public controls: Map<string, any> = new Map();

    /**
     * Creates an instance of IBizViewController.
     * 创建 IBizViewController 实例对象
     * 
     * @param {*} [opts={}]
     * @memberof IBizViewController
     */
    constructor(opts: any = {}) {
        super(opts);
        this.containerid = opts.containerid;
        this.appctx = opts.appctx;
        this.backendurl = opts.backendurl;
    }

    public isClosed(): boolean {
        var _this = this;
        return true;
    }
    public quit(): void {
    }
    public isAutoLayout(): void {
        // var me=this;
        // return me.autoLayout;
    }
    public doLayout(): void {
    }
	/**
	 * 执行初始化
	 */
    public onInit(): void {
    }
    public setSize(width, height): void {

    }
    public getItem(itemId: string): any {
        var _this = this;
        return _this.itemMap.get(itemId);
    }

    public setControl(name: string, control: any): void {
        this.controls.set(name, control);
    }

    public getControl(name: string): any {
        this.controls.get(name);
    }

    public regUIActions(opts: any = {}): void {

    }
    public regCodeLists(opts: any = {}): void {

    }
    public regUICounters(opts: any = {}): void {

    }

    public mounted(vue) {

    }

    public registerItem(itemId, item): void {
        var _this = this;
        _this.itemMap.set(itemId, item);
    }
    public unloaded(): any {
        return null;
    }
	/**
	 * 初始化
	 */
    public init(params: any = {}): void {
        var _this = this;
        if (params) {
            _this.parentMode = params.parentMode;
            _this.setParentData(params.parentData);
        }

        _this.bInited = true;
        _this.onInit();
        _this.initViewLogic();
        if (!_this.getPController() && _this.isAutoLayout()) {
            _this.doLayout();
        }
        _this.reloadUpdatePanels();
        _this.fire(IBizViewController.INITED, {});
    }
	/**
	 * 异步初始化<加载HTML内容动态绘制到界面>
	 */
    public asyncInit(params: any = {}): void {
    }
	/**
	 * 绘制内容布局
	 */
    public renderHTML(data): void {
    }
	/**
	 * 是否初始化完毕
	 */
    public isInited(): boolean {
        var _this = this;
        return _this.bInited;
    }
	/**
	 * 获取当前容器标识
	 */
    public getCId(): string {
        var _this = this;
        return _this.containerid;
    }
	/**
	 * 获取当前容器标识2<自动附加_>
	 */
    public getCId2(): string {
        var _this = this;
        var cid = _this.getCId();
        if (cid != '') {
            return cid + '_';
        }
        return cid;
    }
    public getAppCtx(): string {
        var _this = this;
        return _this.appctx;
    }
	/**
	 * 注册子控制器对象
	 */
    public regController(ctrler: any): void {
        var _this = this;
        _this.ctrlers.set(ctrler.getCId(), ctrler);
    }
	/**
	 *获取子控制器对象
	 */
    public getController(id?: string): any {
        var _this = this;
        return _this.ctrlers.get(id);
    }
	/**
	 * 获取父控件
	 */
    public getPController(): any {
        return null;
    }
	/**
	 * 注销子控制器对象
	 */
    public unRegController(ctrler: any): void {
        var _this = this;
        this.ctrlers.delete(ctrler.getCId());
    }
	/**
	 * 注册代码表
	 */
    public regCodeList(codelist: any): void {
        var _this = this;
        _this.codelists.set(codelist.getId(), codelist);
    }
	/**
	 * 获取代码表
	 */
    public getCodeList(codelistId: string): any {
        var _this = this;

        if (_this.codelists) {
            return this.codelists.get(codelistId);
        }
        return null;
    }
	/**
	 * 注册界面行为
	 */
    public regUIAction(uiaction: any): void {
        var _this = this;
        _this.uiactions.set(uiaction.tag, uiaction);
    }
	/**
	 * 获取界面行为
	 */
    public getUIAction(uiactionId: string): any {
        var _this = this;

        if (_this.uiactions) {
            return _this.uiactions.get(uiactionId);
        }
        return null;
    }
	/**
	 * 注册界面计数器
	 */
    public regUICounter(uicounter: any): void {
        var _this = this;
        _this.uicounters.set(uicounter.tag, uicounter);
    }
	/**
	 * 获取界面计数器
	 */
    public getUICounter(uicounterId: string): any {
        var _this = this;

        if (_this.uicounters) {
            return _this.uicounters.get(uicounterId);
        }
        return null;
    }
	/**
	 * 刷新全部界面计数器
	 */
    public reloadUICounters(): void {
        var _this = this;
        _this.uicounters.forEach(uicounter => {
            if (uicounter) {
                uicounter.reload();
            }
        });
        var pController = _this.getPController();
        if (pController) {
            pController.reloadUICounters();
        }
    }
    public getWindow(): any {
        var _this = this;
        // return _this.window;
    }

	/**
	 * 是否支持视图模型
	 */
    public isEnableViewModel(): boolean {
        return false;
    }
	/**
	 * 获取后台地址
	 */
    public getBackendUrl(): string {
        var _this = this;
        if (_this.backendurl) {
            return _this.backendurl;
        }
        return null;
    }

	/**
	 * 销毁 
	 */
    public destroy(): void {
        // var _this = this;
        // $.getIBizApp().unRegSRFView(_this);
        // _this.config = null;
        // arguments.callee.$.destroy.call(this);

    }

	/**
	 * 刷新
	 */
    public refresh(): void {
        var _this = this;
        _this.onRefresh();
    }
    public onRefresh(): void {

    }
    /**
	 * 刷新子项
	 */
    public refreshItem(name: string): void {
        var _this = this;
        var item = _this.getItem(name);
        if (item) {
            if (typeof item.refresh === 'function') {
                item.refresh();
                return;
            }
            if (typeof item.reload === 'function') {
                item.reload();
                return;
            }
        }
    }
    /**
     * 设置父数据
     */
    public setParentData(data: any = {}): void {
        var _this = this;
        _this.parentData = data;
        _this.onSetParentData();
        _this.reloadUpdatePanels();
    }
    public onSetParentData(): void {

    }
    /**
     * 获取父数据
     */
    public getParentData(): any {
        var _this = this;
        return _this.parentData;
    }

    /**
     * 获取父模式
     */
    public getParentMode(): any {
        var _this = this;
        return _this.parentMode;
    }
    /**
     * 获取引用数据
     */
    public getReferData(): any {
        var _this = this;
        return _this.referData;
    }
    /**
     * 获取引用数据
     */
    public getViewParam(): any {
        var _this = this;
        return _this.viewparam;
    }
    public renderCodeList_Normal(codeListId, value, emtpytext): any {
        var codelist = this.getCodeList(codeListId);
        var item = codelist.getItemByValue(value);
        if (item == null) {
            return emtpytext;
        }
        return this.getCodeItemText(item);
    }
    public renderCodeList_NumOr(codeListId, value, emtpytext, textSeparator): any {
        if (!textSeparator || textSeparator == '')
            textSeparator = '、';
        var codelist = this.getCodeList(codeListId);
        if (value == null) {
            return emtpytext;
        }
        var nValue = parseInt(value);
        var strTextOr = '';
        for (var i = 0; i < codelist.datas.length; i++) {
            var item = codelist.datas[i];
            var codevalue = item.value;
            if ((parseInt(codevalue) & nValue) > 0) {
                if (strTextOr.length > 0)
                    strTextOr += (textSeparator);
                strTextOr += this.getCodeItemText(item);
            }
        }

        return strTextOr;
    }
    public renderCodeList_StrOr(codeListId, value, emtpytext, textSeparator, valueSeparator): any {
        if (!textSeparator || textSeparator == '')
            textSeparator = '、';
        if (value == null) {
            return emtpytext;
        }
        var strTextOr = '';
        var codelist = this.getCodeList(codeListId);
        var arrayValue = new Array();
        arrayValue = value.split(valueSeparator);
        for (let i = 0; i < arrayValue.length; i++) {
            var strText = '';
            strText = this.renderCodeList_Normal(codeListId, arrayValue[i], emtpytext);
            if (strTextOr.length > 0)
                strTextOr += (textSeparator);
            strTextOr += strText;
        }

        return strTextOr;
    }
    public getCodeItemText(item: any = {}): string {
        var color = item.color;
        var textCls = item.textcls;
        var iconCls = item.iconcls;
        // var realText = IBiz.encodeString(item.text);
        var realText = item.text;
        var ret = '';
        if (iconCls) {
            ret = ('<i class="' + iconCls + '"></i>');
        }
        if (textCls || color) {
            ret += '<span';
            if (textCls) {
                ret += (' class="' + textCls + '"');
            }
            if (color) {
                ret += (' style="color:' + color + '"');
            }
            ret += '>';
            ret += realText;
            ret += '</span>';
        }
        else {
            ret += realText;
        }

        return ret;
    }
    public hasHtmlElement(id: string): boolean {
        return false;
    }
    public initViewLogic(): void {
        var _this = this;
        _this.onPrepareViewLogics();
        // for (var A in _this.viewLogics) {
        //     var logic = _this.viewLogics[A];
        //     logic.init();
        // }
    }
    public onPrepareViewLogics(): void {

    }
    public regViewLogic(logic): void {
    }
    public getViewLogic(tag): any {
        var _this = this;
        return null;
    }
    public invokeCtrl(ctrlid, command, arg): void {
        var _this = this;
    }
    /**
     * 注册界面更新面板
     */
    public regUpdatePanel(updatepanel): void {
        var _this = this;
        this.updatepanels.set(updatepanel.name, updatepanel);
        _this.registerItem(updatepanel.name, updatepanel);
    }
    /**
     * 获取界面更新面板
     */
    public getUpdatePanel(updatepanelId: string): any {
        var _this = this;
        if (_this.updatepanels) {
            return _this.updatepanels.get(updatepanelId);
        }
        return null;
    }
	/**
	 * 刷新全部界面更新面板
	 */
    public reloadUpdatePanels(): void {
        var _this = this;
        if (!_this.isInited())
            return;
        if (_this.updatepanels) {
            var params = {};
            _this.onFillUpdatePanelParam(params);
            _this.updatepanels.forEach(panel => {
                if (panel) {
                    panel.reload(params);
                }
            });
        }
        var pController = _this.getPController();
        if (pController) {
            pController.reloadUpdatePanels();
        }
    }
    public createUpdatePanel(): any {
        // return IBiz.createUpdatePanel(config);
    }
    /**
     * 填充更新面板调用参数
     */
    public onFillUpdatePanelParam(params: any = {}): void {
        var _this = this;
        if (_this.viewparam) {
            // $.extend(params, _this.viewparam);
            Object.assign(params, _this.viewparam);
        }
        if (_this.getParentMode()) {
            // $.extend(params, _this.getParentMode());
            Object.assign(params, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(params, _this.getParentData());
            Object.assign(params, _this.getParentData());
        }
    }

    /*****************事件声明************************/

    /**
     * 控制器初始化完成
     *
     * @static
     * @memberof IBizViewController
     */
    public static INITED = 'INITED';
}