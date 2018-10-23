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
                this.appMenuLoad(items);
            });
            // 部件选中
            appmenu.on(IBizAppMenu.SELECTION).subscribe((item) => {
                this.appMenuSelection(item);
            })
            appmenu.load(this.getViewParam());
        }
    }

    public onInit(): void {
        super.onInit();
    }

    public getAppMenu(): any {
        return this.getControl('appmenu');
    }

    public appMenuBeforeLoad(params: any = {}): void {

    }

    public appMenuLoad(items: Array<any>): void {
        let _this = this;
        let path: string = _this.$route.path;
        let path_arr: Array<any> = path.split('/');
        if (path_arr.length < 2) {
            return ;
        }
        const appmenu = this.getAppMenu();
        if (!appmenu) {
            return ;
        }
        let  appFun = appmenu.getAppFunc(null, path_arr[2]);
        if (Object.keys(appFun).length === 0) {
            return ;
        }
        appmenu.setSelection(appFun, items);
    }

    /**
     * 菜单项选中
     *
     * @param {*} [item={}]
     * @memberof IBizIndexViewController
     */
    public appMenuSelection(item: any = {}): void {
        let _this = this;
        _this.openView(item.viewname, item.openviewparam);
    }


}