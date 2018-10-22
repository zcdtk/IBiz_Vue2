/**
 * 应用菜单
 *
 * @class IBizAppMenu
 * @extends {IBizControl}
 */
class IBizAppMenu extends IBizControl {

    /**
     * 应用菜单数据
     *
     * @type {Array<any>}
     * @memberof IBizAppMenu
     */
    public items: Array<any> = [];

    /**
     * 应用功能集合
     *
     * @type {Array<any>}
     * @memberof IBizAppMenu
     */
    public appFuncs: Array<any> = [];

    /**
     * 选中数据
     *
     * @type {*}
     * @memberof IBizAppMenu
     */
    public selection: any = {};

    /**
     * Creates an instance of IBizAppMenu.
     * 创建 IBizAppMenu 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizAppMenu
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 获取菜单数据
     *
     * @returns {Array<any>}
     * @memberof IBizAppMenu
     */
    public getItems(): Array<any> {
        return this.items;
    }

    /**
     * 获取菜单数据项
     *
     * @param {string} id
     * @param {Array<any>} items
     * @returns {*}
     * @memberof IBizAppMenu
     */
    public getItem(id: string, items: Array<any>): any {
        let _this = this;
        let _item: any = {};
        items.some(item => {
            if (Object.is(item.id, id)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items && item.items.length > 0 && Array.isArray(item.items)) {
                let _subItem = _this.getItem(id, item.items);
                if (_subItem && Object.keys(_subItem).length > 0) {
                    Object.assign(_item, _subItem);
                    return true;
                }
            }
        });
        return _item;
    }

    /**
     * 获取应用功能数据
     *
     * @returns {Array<any>}
     * @memberof IBizAppMenu
     */
    public getAppFuncs(): Array<any> {
        return this.appFuncs;
    }

    /**
     * 获取应用功能
     *
     * @param {string} [appfuncid]  应用功能id 可选
     * @param {string} [name] 名称 可选
     * @returns {*}
     * @memberof IBizAppMenu
     */
    public getAppFunc(appfuncid?: string, name?: string): any {
        let _appfunc: any = {};
        this.appFuncs.some((appfunc) => {
            if (Object.is(appfuncid, appfunc.appfuncid)) {
                Object.assign(_appfunc, appfunc);
                return true;
            }
            if (Object.is(name, appfunc.viewname)) {
                Object.assign(_appfunc, appfunc);
                return true;
            }
        });
        return _appfunc;
    }

    /**
     * 数据加载
     *
     * @param {*} [opt]
     * @memberof IBizAppMenu
     */
    public load(opt?: any): void {
        let _this = this;
        let params: any = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        if (opt) {
            Object.assign(params, opt);
        }
        _this.fire(IBizAppMenu.BEFORELOAD, params);
        _this.iBizHttp.post(this.getBackendUrl(), params).subscribe(success => {
            if (success.ret === 0) {
                this.items = success.items;
                this.fire(IBizAppMenu.LOAD, this.items);
            }
        }, error => {
            console.log(error);
        });
    }

    /**
     * 选中变化
     *
     * @param {*} select
     * @returns {*}
     * @memberof IBizAppMenu
     */
    public onSelectChange(select: any): any {
        let _this = this;
        let hasView = false;
        let appFuncs: Array<any> = this.getAppFuncs();
        appFuncs.some(fun => {
            if (Object.is(fun.appfuncid, select.appfuncid)) {
                Object.assign(select, fun);
                hasView = true;
                return true;
            }
        });
        if (hasView) {
            _this.fire(IBizAppMenu.SELECTION, select);
        }
    }

    /**
     * 设置选中效果
     *
     * @param {*} [appFun={}]
     * @param {Array<any>} items
     * @memberof IBizAppMenu
     */
    public setSelection(appFun: any = {}, items: Array<any>): void {
        let _this = this;
        items.some((item) => {
            if (Object.is(item.appfuncid, appFun.appfuncid)) {
                Object.assign(_this.selection, item);
                return true;
            }
            if (item.items && item.items.length > 0) {
                _this.setSelection(appFun, item.items);
            }
        });
    }

    /*****************事件声明************************/

    /**
     * 部件加载之前
     *
     * @static
     * @memberof IBizAppMenu
     */
    public static BEFORELOAD = 'BEFORELOAD';

    /**
     * 部件加载完成
     *
     * @static
     * @memberof IBizAppMenu
     */
    public static LOAD = 'LOAD';

    /**
     * 部件选中
     *
     * @static
     * @memberof IBizAppMenu
     */
    public static SELECTION = 'SELECTION';
}