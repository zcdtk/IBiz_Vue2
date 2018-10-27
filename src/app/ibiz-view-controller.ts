/**
 * 视图控制器基类
 *
 * @class IBizViewController
 * @extends {IBizObject}
 */
class IBizViewController extends IBizObject {

    /**
     * 模态框打开视图注入参数
     * 
     * @type {*}
     * @memberof IBizViewController
     */

    public modalViewParam: any = {};

    /**
     * 模态框打开视图注入视图层级参数
     * 
     * @memberof IBizViewController
     */
    public modalZIndex: number = 300;

    /**
     * 关系数据
     *
     * @type {*}
     * @memberof IBizViewController
     */
    public srfReferData: any = {};

    /**
     * 视图控制器父对象数据
     * 
     * @type {*}implements OnInit, OnDestroy, OnChanges
     * @memberof IBizViewController
     */
    public srfParentData: any = {};

    /**
     * 视图控制器父对象模型
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public srfParentMode: any = {};

    /**
     * 视图控制器是否初始化
     *
     * @type {boolean}
     * @memberof IBizViewController
     */
    public bInited: boolean = false;

    /**
     * 暂时废弃
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public itemMap: any = {};

    /**
     * 视图控制器代码表
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public codelists: any = {};

    /**
     * 部件控制器
     *
     * @type {Map<string, any>}
     * @memberof IBizViewController
     */
    public controls: Map<string, any> = new Map();

    /**
     * 实体界面行为
     *
     * @type {Map<string, any>}
     * @memberof IBizViewController
     */
    public uiactions: Map<string, any> = new Map();

    /**
     * 计数器
     *
     * @type {Map<string, any>}
     * @memberof IBizViewController
     */
    public uicounters: Map<string, any> = new Map();

    /**
     * 视图控制器url
     *
     * @private
     * @type {string}
     * @memberof IBizViewController
     */
    private url: string = '';

    /**
     * 视图控制器参数
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public viewParam: any = {};

    /**
     * vue 路由对象
     *
     * @type {*}
     * @memberof IBizViewController
     */
    public $router: any = null;;

    /**
     * vue 实例对象
     *
     * @type {*}
     * @memberof IBizViewController
     */
    public $vue: any = null;

    /**
     * vue 当前路由对象
     *
     * @type {*}
     * @memberof IBizViewController
     */
    public $route: any = null;;

    /**
     *Creates an instance of IBizViewController.
     * 创建 IBizViewController 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizViewController
     */
    constructor(opts: any = {}) {
        super(opts);
        this.url = opts.url;
    }

    /**
     * 初始化
     * 模拟vue生命周期
     *
     * @memberof IBizViewController
     */
    VueOnInit(vue: any): void {
        this.$route = vue.$route;
        this.$router = vue.$router;
        this.$vue = vue;
        this.parseViewParams();
        this.onInit();
        this.onInited();
    }

    /**
     * 销毁
     * 模拟Vue生命周期
     *
     * @memberof IBizViewController
     */
    VueOnDestroy(): void {
        this.onDestroy();
    }

    /**
     * 视图组件销毁时调用
     * 
     * @memberof IBizViewController
     */
    public onDestroy(): void {
        // if (this.ibizAppService) {
        //     this.ibizAppService.deleteViewController(this.getUUID());
        // }
        this.unRegUICounters();
    }

    /**
     * Angular生命周期
     * @input 值变化时调用
     * 
     * @param {*} change 
     * @memberof IBizViewController
     */
    public ngOnChanges(change: any) {
    }


    /**
     * 视图参数变化，嵌入表单，手动刷新数据
     * 
     * @param {*} change 
     * @memberof IBizViewController
     */
    public viewParamChange(change: any) {
        if (change && change.srfparentkey && !Object.is(change.srfparentkey, '')) {
            this.addViewParam(change);
            this.refresh();
        }
    }

    /**
     * 视图初始化
     * 
     * @memberof IBizViewController
     */
    public onInit(): void {
        this.regUIActions();
        this.regUICounters();
        this.regCodeLists();
        this.onInitComponents();
        this.onLoad();
        this.fire(IBizViewController.INITED, this);
    }

    /**
     * 部件初始化
     * 
     * @memberof IBizViewController
     */
    public onInitComponents(): void {
    }

    /**
     * 
     * 数据加载
     * @memberof IBizViewController
     */
    public onLoad(): void {

    }


    /**
     * 视图控制器初始化完成
     * 
     * @memberof IBizViewController
     */
    public onInited(): void {
        this.bInited = true;
        // if (this.ibizAppService) {
        //     this.ibizAppService.setViewController(this);
        // }
    }

    /**
     * 开始触发界面行为
     *
     * @param {*} id
     * @memberof IBizViewController
     */
    public clickButton(id): void {
        this.onClickTBItem({ tag: id });
    }

    /**
     * 
     * 
     * @param {any} params 
     * @memberof IBizViewController
     */
    public onClickTBItem(params): void {

    }

    /**
     * 设置部件
     * 
     * @param {string} name 
     * @param {*} control 
     * @memberof IBizViewController
     */
    public regControl(name: string, control: any): void {
        this.controls.set(name, control);
    }

    /**
     * 获取部件
     * 
     * @param {string} name 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getControl(name: string): any {
        return this.controls.get(name);
    }

    /**
     * 关闭
     * 
     * @returns {boolean} 
     * @memberof IBizViewController
     */
    public isClosed(): boolean {
        return true;
    }

    /**
     * 
     * 
     * @memberof IBizViewController
     */
    public quit(): void {
    }

    /**
     * 
     * 
     * @param {string} itemId 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getItem(itemId: string): any {
        if (this.itemMap[itemId]) {
            return this.itemMap[itemId];
        }

        return undefined;
    }

    /**
     * 
     * 
     * @param {string} itemId 
     * @param {*} item 
     * @memberof IBizViewController
     */
    public registerItem(itemId: string, item: any): void {
        this.itemMap[itemId] = item;
    }

    /**
     * 
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public unloaded(): any {
        return null;
    }

    /**
     * 是否初始化完毕
     * 
     * @returns {boolean} 
     * @memberof IBizViewController
     */
    public isInited(): boolean {
        return this.bInited;
    }

    /**
     * 
     * 
     * @returns {string} 
     * @memberof IBizViewController
     */
    public getAppCtx(): string {
        return '';
    }

    /**
     * 注册子控制器对象
     * 
     * @param {*} ctrler 
     * @memberof IBizViewController
     */
    public regController(ctrler: any): void {
    }

    /**
     * 获取子控制器对象
     * 
     * @param {string} id 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getController(id: string): any {
        return undefined;
    }

    /**
     * 获取父控件
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getPController(): any {
        // if (this.ibizAppService) {
        //     return this.ibizAppService.getParentViewController(this.getUUID());
        // }
        // return undefined;
    }

    /**
     * 注销子控制器对象
     * 
     * @param {*} ctrler 
     * @memberof IBizViewController
     */
    public unRegController(ctrler: any): void {
    }

    /**
     * 注册代码表
     * 
     * @param {*} codelist 
     * @memberof IBizViewController
     */
    public regCodeList(codelist: any): void {
        if (!this.codelists) {
            this.codelists = {};
        }
        this.codelists[codelist.getId()] = codelist;
    }

    /**
     * 获取代码表
     * 
     * @param {string} codelistId 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getCodeList(codelistId: string): IBizCodeList {
        if (!this.codelists) {
            return undefined;
        }

        if (this.codelists[codelistId]) {
            return this.codelists[codelistId];
        }
        return undefined;
    }

    /**
     * 注册界面行为
     * 
     * @param {*} [uiaction={}] 
     * @memberof IBizViewController
     */
    public regUIAction(uiaction: any = {}): void {
        if (uiaction) {
            this.uiactions.set(uiaction.tag, uiaction);
        }
    }

    /**
     * 获取界面行为
     * 
     * @param {string} uiactionId 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getUIAction(uiactionId: string): any {
        return this.uiactions.get(uiactionId);
    }

    /**
     * 注册界面计数器
     * 
     * @param {string} name 
     * @param {*} uicounter 
     * @memberof IBizViewController
     */
    public regUICounter(name: string, uicounter: any): void {
        this.uicounters.set(name, uicounter);
    }

    /**
     * 获取界面计数器
     * 
     * @param {string} name 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getUICounter(name: string): any {
        return this.uicounters.get(name);
    }

    /**
     * 刷新全部界面计数器
     * 
     * @memberof IBizViewController
     */
    public reloadUICounters(): void {
        if (this.uicounters) {
            for (const tag in this.uicounters) {
                const uicounter: IBizUICounter = this.uicounters.get(tag);
                if (uicounter) {
                    uicounter.reload();
                }
            }
        }

        const pController = this.getPController();
        if (pController) {
            pController.reloadUICounters();
        }
    }

    /**
     * 获取窗口对象
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getWindow(): any {
        return window;
    }

    /**
     * 是否支持视图模型
     * 
     * @returns {boolean} 
     * @memberof IBizViewController
     */
    public isEnableViewModel(): boolean {
        return false;
    }

    /**
     * 获取后台地址
     * 
     * @returns {string} 
     * @memberof IBizViewController
     */
    public getBackendUrl(): string {
        if (this.url) {
            return this.url;
        }
        return undefined;
    }

    /**
     * 获取动态视图参数
     *
     * @returns {(any | undefined)}
     * @memberof IBizViewController
     */
    public getDynamicParams(): any {
        return {};
    }

    /**
     * 刷新
     * 
     * @private
     * @memberof IBizViewController
     */
    private refresh(): void {
        this.onRefresh();
    }

    /**
     * 视图刷新方法，继承视图控制器重写
     * 
     * @memberof IBizViewController
     */
    public onRefresh(): void {

    }

    /**
     * 刷新子项
     * 
     * @param {string} name 
     * @memberof IBizViewController
     */
    public refreshItem(name: string): void {
    }

    /**
     * 设置父数据
     * 
     * @param {*} [data={}] 
     * @memberof IBizViewController
     */
    public setParentData(data: any = {}): void {

        this.srfParentData = {};
        Object.assign(this.srfParentData, data);
        this.onSetParentData();
        this.reloadUpdatePanels();
    }

    /**
     * 设置父数据
     * 
     * @memberof IBizViewController
     */
    public onSetParentData(): void {
    }

    /**
     * 获取父数据
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getParentData(): any {
        return this.srfParentData;
    }

    /**
     * 获取父模式
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getParentMode(): any {

        return this.srfParentMode;
    }

    /**
     * 获取引用数据
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getViewParam(): any {
        return this.viewParam;
    }

    /**
     * 设置关系数据
     *
     * @param {*} [data={}]
     * @memberof IBizViewController
     */
    public setReferData(data: any = {}): void {

        Object.assign(this.srfReferData, data);
    }

    /**
     * 获取关系数据
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    public getReferData(): any {

        return this.srfReferData;
    }

    /**
     * 正常代码表模式
     * 
     * @param {string} codeListId 代码表ID
     * @param {string} value 数据值
     * @param {string} emtpytext 空值显示数据
     * @returns {string} 
     * @memberof IBizViewController
     */
    public renderCodeList_Normal(codeListId: string, value: string, emtpytext: string): string {
        if (!value) {
            return emtpytext;
        }
        const codelist: IBizCodeList = this.getCodeList(codeListId);
        if (codelist) {
            let result = '';
            const values = value.split(';');
            values.forEach(value => {
                const item = codelist.getItemByValue(value);
                if (item) {
                    result += '、' + codelist.getCodeItemText(item);
                }
            });
            if (result.length > 1) {
                result = result.substring(1);
            }
            return result;
        }
        return '';
    }

    /**
     * 代码表数字或处理
     * 
     * @param {string} codeListId 代码表ID
     * @param {string} value 数据值
     * @param {string} emtpytext 空值显示信息
     * @param {string} textSeparator 文本拼接方式
     * @returns {string} 
     * @memberof IBizViewController
     */
    public renderCodeList_NumOr(codeListId: string, value: string, emtpytext: string, textSeparator: string): string {
        if (!textSeparator || Object.is(textSeparator, '')) {
            textSeparator = '、';
        }
        let strTextOr = '';
        if (!value) {
            return emtpytext;
        }
        const nValue = parseInt(value, 10);
        const codelist: IBizCodeList = this.getCodeList(codeListId);
        if (codelist) {
            codelist.data.forEach(ele => {
                const codevalue = ele.value;
                if ((parseInt(codevalue, 10) & nValue) > 0) {
                    if (strTextOr.length > 0) {
                        strTextOr += (textSeparator);
                    }
                    strTextOr += codelist.getCodeItemText(ele);
                }
            });
        }

        return strTextOr;
    }

    /**
     * 代码表文本或处理
     * 
     * @param {string} codeListId 代码表ID
     * @param {*} value 数据值
     * @param {*} emtpytext 空值显示信息
     * @param {*} textSeparator 文本凭借方式
     * @param {*} valueSeparator 数据值分割方式
     * @returns {string} 
     * @memberof IBizViewController
     */
    public renderCodeList_StrOr(codeListId: string, value: any, emtpytext: any, textSeparator: any, valueSeparator: any): string {
        if (!textSeparator || Object.is(textSeparator, '')) {
            textSeparator = '、';
        }
        if (!value) {
            return emtpytext;
        }

        let strTextOr = '';
        const codelist = this.getCodeList(codeListId);
        const arrayValue: Array<any> = value.split(valueSeparator);

        arrayValue.forEach((value) => {
            let strText = '';
            strText = this.renderCodeList_Normal(codeListId, value, emtpytext);
            if (strTextOr.length > 0) {
                strTextOr += (textSeparator);
            }
            strTextOr += strText;
        });

        return strTextOr;
    }

    /**
     * 
     * 
     * @memberof IBizViewController
     */
    public initViewLogic(): void {
    }

    /**
     * 
     * 
     * @memberof IBizViewController
     */
    public onPrepareViewLogics(): void {

    }

    /**
     * 
     * 
     * @param {*} logic 
     * @memberof IBizViewController
     */
    public regViewLogic(logic: any): void {
    }

    /**
     * 
     * 
     * @param {*} tag 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getViewLogic(tag: any): any {
        return undefined;
    }

    /**
     * 
     * 
     * @param {any} ctrlid 
     * @param {any} command 
     * @param {any} arg 
     * @memberof IBizViewController
     */
    public invokeCtrl(ctrlid, command, arg): void {
    }

    /**
     * 注册界面更新面板
     * 
     * @param {*} updatepanel 
     * @memberof IBizViewController
     */
    public regUpdatePanel(updatepanel: any): void {
    }

    /**
     * 获取界面更新面板
     * 
     * @param {string} updatepanelId 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getUpdatePanel(updatepanelId: string): any {
        return undefined;
    }

    /**
     * 刷新全部界面更新面板
     * 
     * @memberof IBizViewController
     */
    public reloadUpdatePanels(): void {

    }

    /**
     * 填充更新面板调用参数
     * 
     * @param {*} [params={}] 
     * @memberof IBizViewController
     */
    public onFillUpdatePanelParam(params: any = {}): void {
    }


    // 附加方法

    /**
     * 初始化注册界面行为
     * 
     * @memberof IBizViewController
     */
    public regUIActions(): void {

    }

    /**
     * 初始化注册计数器
     * 
     * @memberof IBizViewController
     */
    public regUICounters(): void {

    }

    /**
     * 销毁计数器
     *
     * @memberof IBizViewController
     */
    public unRegUICounters(): void {
        if (Object.keys(this.uicounters).length == 0) {
            return;
        }

        const _nameArr: Array<any> = Object.keys(this.uicounters);
        _nameArr.forEach(name => {
            const _counter: IBizUICounter = this.getUICounter(name);
            if (_counter) {
                _counter.close();
            }
        });
    }
    /**
     * 初始化代码表
     * 
     * @memberof IBizViewController
     */
    public regCodeLists(): void {

    }

    /**
     * 解析url参数，初始化调用
     * 
     * @private
     * @memberof IBizViewController
     */
    private parseViewParams(): void {
        this.addViewParam(this.$route.query);
        if (this.$vue.params) {
            this.addViewParam(this.$vue.params);
        }
    }

    /**
     * 添加视图参数, 处理视图刷新操作
     *
     * @param {*} [param={}]
     * @memberof IBizViewController
     */
    public addViewParam(param: any = {}): void {
        Object.assign(this.viewParam, param);
        if (this.isInited()) {
            if (this.viewParam.refreshView) {
                this.viewParam = {};
                delete this.viewParam.refreshView;
                Object.assign(this.viewParam, param);
                this.onLoad();
            }
        }

    }

    /**
     * 打开数据视图,模态框打开
     *
     * @param {*} [view={}]
     * @returns {Subject<any>}
     * @memberof IBizViewController
     */
    public openModal(view: any = {}): Subject<any> {
        return null
    }

    /**
     * 打开数据视图;打开方式,路由打开
     * 
     * @param {string} routeString 相对路由地址
     * @param {*} [routeParam={}] 激活路由参数
     * @param {*} [queryParams] 路由全局查询参数
     * @memberof IBizViewController
     */
    public openView(routeString: string, routeParam: any = {}, queryParams?: any) {
        this.$router.pussh({ name: routeString, query: routeParam });
    }

    /**
     * 打开新窗口
     *
     * @param {string} viewurl
     * @param {*} [parsms={}]
     * @memberof IBizViewController
     */
    public openWindow(viewurl: string, parsms: any = {}): void {
        let url_datas: Array<string> = [];
        const params_names = Object.keys(parsms);
        params_names.forEach(name => {
            if (name && parsms[name] && !Object.is(parsms[name], '')) {
                url_datas.push(`${name}=${parsms[name]}`)
            }
        })
        let url = `/${IBizEnvironment.SysName}/${IBizEnvironment.BaseUrl.toLowerCase()}${viewurl}`;
        if (url_datas.length > 0) {
            url = `${url}?${url_datas.join('&')}`;
        }
        let win: any = window;
        win.open(url, '_blank');
    }

    /**
    * 视图是否是模态框对象
    * 
    * @returns {boolean} 
    * @memberof IBizViewController
    */
    public isModal(): boolean {
        if (this.modalViewParam) {
            return true;
        }
        return false;
    }

    /**
     * 获取实体名称
     * 
     * @returns {string} 
     * @memberof IBizViewController
     */
    public getDEName(): string {
        return '';
    }

    /**
     * 返回历史记录
     * 
     * @memberof IBizViewController
     */
    public goBack(): void {

    }

    public static INITED = 'INITED';
}