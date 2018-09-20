/**
 * 应用菜单
 *
 * @class IBizAppMenu
 * @extends {IBizControl}
 */
class IBizAppMenu extends IBizControl {

    public $items: any[];

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
    public static BEFORELOAD = 'BEFORELOAD';
    public static LOAD = 'LOAD';
    public static SELECTION = 'SELECTION';
}