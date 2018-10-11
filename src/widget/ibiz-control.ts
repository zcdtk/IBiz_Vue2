/**
 * 控制器对象基类
 *
 * @class IBizControl
 * @extends {IBizObject}
 */
class IBizControl extends IBizObject {

    private backendurl: string = '';

    public loading: boolean = false;

    private viewController: any;

    /**
     * Creates an instance of IBizControl.
     * 创建 IBizControl 实例对象
     * 
     * @param {*} [opts={}]
     * @memberof IBizControl
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
        _this.backendurl = opts.backendurl;
        _this.viewController = opts.viewController;
    }

    public load(params): void {

    }
	/**
	 * 销毁<暂时无效>
	 */
    public destroy(): void {

    }
    public setSize(width, height): void {

    }
    public setWidth(width): void {

    }
    public setHeight(height): void {

    }
    public isVisible(): boolean {
        return true;
    }
    public invoke(command, arg): void {
        var me = this;
        me.onInvoke(command, arg);
    }
    public onInvoke(command, arg): void {

    }

    public getViewController(): any {
        return this.viewController;
    }

    public getBackendUrl(): string {
        let url: string;
        if (this.backendurl && !Object.is(this.backendurl, '')) {
            url = this.backendurl;
        } else if (this.getViewController()) {
            const viewController = this.getViewController();
            url = viewController.getBackendUrl();
        }
        return url;
    }

    public beginLoading(): void {
        let _this = this;
        _this.loading = true;
    }

    public endLoading(): void {
        let _this = this;
        _this.loading = false;
    }
}