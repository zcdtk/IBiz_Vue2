/**
 * 首页应用视图
 *
 * @class IBizIndexViewController
 * @extends {IBizMainViewController}
 */
class IBizIndexViewController extends IBizMainViewController {

    /**
     * 视图类型
     *
     * @type {string}
     * @memberof IBizIndexViewController
     */
    public viewtype: string = 'index';

    /**
     * Creates an instance of IBizIndexViewController.
     * 创建 IBizIndexViewController 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizIndexViewController
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 应用菜单部件初始化
     * 
     * @memberof IBizIndexViewController
     */
    public onInitComponents(): void {
        super.onInitComponents();

        const appMenu = this.getAppMenu();
        if (appMenu) {
            // 菜单加载完成
            appMenu.on(IBizAppMenu.LOADED).subscribe((items) => {
                this.appMenuLoaded(items);
            });
            // 菜单选中
            appMenu.on(IBizAppMenu.MENUSELECTION).subscribe((items) => {
                this.appMenuSelection(items);
            });
        }
    }

    /**
     * 部件加载
     * 
     * @memberof IBizIndexViewController
     */
    public onLoad(): void {
        super.onLoad();

        const appMenu = this.getAppMenu();
        if (appMenu) {
            appMenu.load();
        }
        this.setMianMenuState();
    }

    /**
     * 应用菜单部件加载完成,调用基类处理
     * 
     * @private
     * @param {any[]} items 
     * @memberof IBizIndexViewController
     */
    public appMenuLoaded(items: any[]): void {

    }

    /**
     * 应用菜单选中
     *
     * @param {Array<any>} items
     * @memberof IBizIndexViewController
     */
    public appMenuSelection(items: Array<any>): void {
        let item: any = {};
        Object.assign(item, items[0]);
        this.openView(item.viewname, item.openviewparam);
    }

    /**
     * 获取表单项
     * 
     * @returns {*} 
     * @memberof IBizIndexViewController
     */
    public getAppMenu(): any {
        return this.getControl('appmenu');
    }

    /**
     * 导航数据跳转处理
     * 
     * @param {*} [data={}] 
     * @memberof IBizIndexViewController
     */
    public navigationLink(data: any = {}) {
    }

    /**
     * 设置主菜单状态
     *
     * @param {string} [align]
     * @memberof IBizIndexViewController
     */
    public setMianMenuState(align?: string): void {
    }
}
