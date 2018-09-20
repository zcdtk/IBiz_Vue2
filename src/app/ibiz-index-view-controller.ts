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
            appmenu.on(IBizAppMenu.BEFORELOAD).subscribe((params) => {

            })
            appmenu.on(IBizAppMenu.LOAD).subscribe((items) => {

            });
            appmenu.on(IBizAppMenu.SELECTION).subscribe((item) => {

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

    public appMenuSelection(item: any = {}): void {

    }


}