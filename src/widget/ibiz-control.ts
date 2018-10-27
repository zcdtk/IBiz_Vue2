/**
 * 部件对象
 *
 * @class IBizControl
 * @extends {IBizObject}
 */
class IBizControl extends IBizObject {

    /**
     * 后台交互URL
     * 
     * @private
     * @type {string}
     * @memberof IBizControl
     */
    private url: string = '';

    /**
     * 视图控制器对象
     * 
     * @private
     * @type {*}
     * @memberof IBizControl
     */
    private viewController: any = null;;

    /**
     * 部件http请求状态
     *
     * @type {boolean}
     * @memberof IBizControl
     */
    public isLoading: boolean = false;

    /**
     * Creates an instance of IBizControl.
     * 创建 IBizControl 实例。 
     * 
     * @param {*} [opts={}] 
     * @memberof IBizControl
     */
    constructor(opts: any = {}) {
        super(opts);
        this.url = opts.url;
        this.viewController = opts.viewController;
    }

    /**
     * 获取后台路径
     * 
     * @returns {*} 
     * @memberof IBizControl
     */
    public getBackendUrl(): string {
        let url: string = '';
        if (this.url) {
            url = this.url;
        }
        if (this.getViewController()) {
            if (!url) {
                url = this.getViewController().getBackendUrl();
            }
        }
        return url;
    }

    /**
     * 获取视图控制器
     * 
     * @returns {*} 
     * @memberof IBizControl
     */
    public getViewController(): any {
        if (this.viewController) {
            return this.viewController;
        }
        return undefined;
    }

    /** 
     * 部件http请求
     *
     * @private
     * @memberof IBizControl
     */
    private beginLoading(): void {
        this.isLoading = true;
    }

    /**
     * 部件结束http请求
     *
     * @private
     * @memberof IBizControl
     */
    private endLoading(): void {
        this.isLoading = false;
    }
}
