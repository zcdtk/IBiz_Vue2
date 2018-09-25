/**
 * 应用菜单
 *
 * @class IBizAppMenu
 * @extends {IBizControl}
 */
class IBizAppMenu extends IBizControl {

    /**
     *应用菜单数据
     *
     * @type {any[]}
     * @memberof IBizAppMenu
     */
    public items: any[];

    /**
     * 应用功能集合
     *
     * @type {Map<string, any>}
     * @memberof IBizAppMenu
     */
    public appFuncs: Map<string, any> = new Map();

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

    public load(): void {
        const params: any = { srfctrlid: this.getName(), srfaction: 'FETCH' };
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