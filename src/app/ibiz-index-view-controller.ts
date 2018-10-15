/**
 * 首页视图控制器基类
 *
 * @class IBizIndexViewController
 * @extends {IBizMianViewController}
 */
class IBizIndexViewController extends IBizMianViewController {
    constructor(opts: any = {}) {
        super(opts);
    }

    public init(params: any = {}): void {
        super.init(params)
        const appmenu = this.getAppMenu();
        if (appmenu) {
            // 部件加载之前
            appmenu.on(IBizAppMenu.BEFORELOAD).subscribe((params) => {

            });
            // 部件加载完成
            appmenu.on(IBizAppMenu.LOAD).subscribe((items) => {

            });
            // 部件选中
            appmenu.on(IBizAppMenu.SELECTION).subscribe((item) => {
                this.appMenuSelection(item);
            })
            appmenu.load(this.getViewParam());
        }
    }

    public getAppMenu(): any {
        return this.getControl('appmenu');
    }

    public appMenuBeforeLoad(params: any = {}): void {

    }

    public appMenuLoad(items: Array<any>): void {

    }

    /**
     * 菜单项选中
     *
     * @param {*} [item={}]
     * @memberof IBizIndexViewController
     */
    public appMenuSelection(item: any = {}): void {
        console.log(item);
        let _this = this;
        _this.$router.push({ name: item.viewname, query: item.openviewparam });
    }


}