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
     * 获取应用功能数据
     *
     * @returns {Array<any>}
     * @memberof IBizAppMenu
     */
    public getAppFuncs(): Array<any> {
        return this.appFuncs;
    }

    public load(opt?: any): void {
        let params: any = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        if (opt) {
            Object.assign(params, opt);
        }
        // this.post(params, this.getBackendUrl()).subscribe(success => {
        //     if (success.ret === 0) {
        //         this.$items = success.items;
        //         const data = this.doMenus(success.items);
        //         this.fire(IBizEvent.IBizAppMenu_LOADED, data);
        //     }
        // }, error => {
        //     console.log(error);
        // });
    }

    public onSelectChange(select: any): any {

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