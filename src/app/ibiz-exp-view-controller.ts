/**
 * 导航视图控制器
 *
 * @class IBizExpViewController
 * @extends {IBizMianViewController}
 */
class IBizExpViewController extends IBizMainViewController {

    /**
     * Creates an instance of IBizExpViewController.
     * 创建 IBizExpViewController 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizExpViewController
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
    }

    public init(opts:any = {}):void {
        super.init(opts);
        const expCtrl = this.getExpCtrl();
        if (expCtrl) {
            expCtrl.on(IBizWFExpBar.SELECTIONCHANGE).subscribe((item) => {
                this.onExpCtrlSelectionChange(item);
            });
            expCtrl.on(IBizWFExpBar.LOADED).subscribe((item) => {
                this.onExpCtrlLoaded(item);
            });
        }
    }

    /**
     * 视图部件初始化
     *
     * @memberof IBizExpViewController
     */
    public onInit(): void {
        super.onInit();
        const expCtrl = this.getExpCtrl();
        if (expCtrl) {
            expCtrl.load({});
        }
    }

    /**
     * 视图销毁
     *
     * @memberof IBizExpViewController
     */
    // public onDestroy(): void {
    //     super.onDestroy();
    //     if (this.$expRouteRvents) {
    //         this.$expRouteRvents.unsubscribe();
    //     }
    // }

    /**
     * 获取导航部件
     * 
     * @returns {*} 
     * @memberof IBizExpViewController
     */
    public getExpCtrl(): any {
        let expctrl = this.getExpBar();
        if (expctrl) {
            return expctrl;
        }

        expctrl = this.getExpTab();
        if (expctrl) {
            return expctrl;
        }

        return undefined;
    }

    /**
     * 获取导航部件
     * 
     * @returns {*} 
     * @memberof IBizExpViewController
     */
    public getExpBar(): any {
        return this.getControl('expbar');
    }

    /**
     * 获取导航分页部件
     * 
     * @returns {*} 
     * @memberof IBizExpViewController
     */
    public getExpTab(): any {
        return this.getControl('exptab');
    }

    /**
     * 导航部件值选中变化
     *
     * @param {*} [item={}]
     * @memberof IBizExpViewController
     */
    public onExpCtrlSelectionChange(item: any = {}): void {

    }

    /**
     * 导航树部件加载完成
     *
     * @param {*} [item={}]
     * @memberof IBizExpViewController
     */
    public onExpCtrlLoaded(item: any = {}): void {

    }

    /**
     * 获取导航项视图参数，在发布视图控制器内重写
     * 
     * @param {*} [arg={}] 
     * @returns {*} 
     * @memberof IBizExpViewController
     */
    public getExpItemView(arg: any = {}): any {
        return undefined;
    }

    /**
     * 获取新建导航视图参数，在发布视图控制器中重写
     * 
     * @param {*} [arg={}] 
     * @returns {*} 
     * @memberof IBizExpViewController
     */
    public getNewDataView(arg: any = {}): any {
        return undefined;
    }

    /**
     * 获取编辑导航视图参数，在发布视图控制器中重写
     * 
     * @param {*} [arg={}] 
     * @returns {*} 
     * @memberof IBizExpViewController
     */
    public getEditDataView(arg: any = {}): any {
        return undefined;
    }

    /**
     * 是否需要手动跳转路由
     * 
     * @private
     * @param {*} [item={}] 
     * @returns {boolean} 
     * @memberof IBizTreeExpViewController
     */
    public isRefreshView(routeSting: string): boolean {
        let refreshView = false;
        // if (this.$routeActive && this.$routeActive.children && this.$routeActive.children.length > 0) {
        //     const arr = this.$routeActive.children[0];
        //     if (Object.is(arr.routeConfig.path, routeSting.toLowerCase())) {
        //         refreshView = true;
        //     }
        // }
        return refreshView;
    }

    /**
     * 打开导航子视图
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizExpViewController
     */
    public openExpChildView(item: any = {}): void {
        if (!item || Object.keys(item).length === 0) {
            return;
        }
        const view = this.getExpItemView(item.expitem);
        if (!view) {
            return;
        }

        let data: any = {};
        Object.assign(data, item.expitem.viewparam);
        if (this.isRefreshView(view.routelink)) {
            Object.assign(data, { refreshView: true });
        }
        const exp = this.getExpBar();
        if (exp) {
            exp.setSelectItem(item);
        }
        this.openView(view.routelink, data);
    }
}