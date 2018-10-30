/**
 * IBizApp 应用
 *
 * @class IBizApp
 */
class IBizApp {

    /**
     * 当前窗口所有视图控制器
     *
     * @type {Array<any>}
     * @memberof IBizApp
     */
    public viewControllers: Array<any> = [];

    /**
     * 父窗口window对象
     *
     * @type {*}
     * @memberof IBizApp
     */
    public parentWindow: any = null;

    /**
     * rxjs 流观察对象
     *
     * @private
     * @type {Subject<any>}
     * @memberof IBizApp
     */
    private subject: Subject<any> = new rxjs.Subject();;

    /**
     * Creates an instance of IBizApp.
     * 创建 IBizApp 实例
     * 
     * @memberof IBizApp
     */
    constructor() { }

    /**
     * 注册视图控制
     *
     * @param {*} ctrler
     * @memberof IBizApp
     */
    public regSRFController(ctrler: any): void {
        this.viewControllers.push(ctrler);
    }

    /**
     * 注销视图控制器
     *
     * @param {*} ctrler
     * @memberof IBizApp
     */
    public unRegSRFController(ctrler: any): void {
        const id = ctrler.getId();
        const viewUsage = ctrler.getViewUsage();
        const index = this.viewControllers.findIndex((ctrl: any) => Object.is(id, ctrl.getId()) && Object.is(viewUsage, ctrl.getViewUsage()));
        if (index !== -1) {
            this.viewControllers[index] = null;
            this.viewControllers.splice(index, 1);
        }
    }

    /**
     * 注销视图控制器
     *
     * @param {string} id 视图id
     * @param {number} viewUsage 视图使用模式
     * @memberof IBizApp
     */
    public unRegSRFController2(id: string, viewUsage: number): void {
        const index = this.viewControllers.findIndex((ctrl: any) => Object.is(id, ctrl.getId()) && Object.is(viewUsage, ctrl.getViewUsage()));
        if (index !== -1) {
            this.viewControllers[index] = null;
            this.viewControllers.splice(index, 1);
        }
    }

    /**
     * 获取视图控制器
     *
     * @param {string} id 视图id
     * @param {number} viewUsage 视图使用模式
     * @returns {*}
     * @memberof IBizApp
     */
    public getSRFController(id: string, viewUsage: number): any {
        let viewController = null;
        const index = this.viewControllers.findIndex((ctrl: any) => Object.is(id, ctrl.getId()) && Object.is(viewUsage, ctrl.getViewUsage()));
        if (index !== -1) {
            viewController = this.viewControllers[index];
        }
        return viewController;
    }

    /**
     * 获取父视图控制器
     *
     * @param {string} id 视图id
     * @param {number} viewUsage 视图使用模式
     * @returns {*}
     * @memberof IBizApp
     */
    public getParentController(id: string, viewUsage: number): any {
        let viewController = null;
        const index = this.viewControllers.findIndex((ctrl: any) => Object.is(id, ctrl.getId()) && Object.is(viewUsage, ctrl.getViewUsage()));
        if (index !== -1) {
            viewController = this.viewControllers[index - 1];
        }
        return viewController;
    }

    /**
     * 注册父窗口window 对象
     *
     * @param {Window} win
     * @memberof IBizApp
     */
    public regParentWindow(win: Window): void {
        this.parentWindow = win;
    }

    /**
     * 获取父窗口window 对象
     *
     * @returns {Window}
     * @memberof IBizApp
     */
    public getParentWindow(): Window {
        return this.parentWindow;
    }

    /**
     * 订阅刷新视图事件
     *
     * @returns {Subject<any>}
     * @memberof IBizApp
     */
    public onRefreshView(): Subject<any> {
        return this.subject;
    }

    /**
     * 通知视图刷新事件
     *
     * @param {*} data
     * @memberof IBizApp
     */
    public fireRefreshView(data: any = {}): void {
        this.subject.next(data);
    }
}

// 初始化IBizApp 对象， 挂载在window对象下
(function (window) {
    let win: any = window;
    if (!win.iBizApp) {
        win.iBizApp = new IBizApp();
    }
    win.getIBizApp = function () {
        if (win.iBizApp) {
            return win.iBizApp;
        } else {
            win.iBizApp = new IBizApp();
        }
    };
    if (window.opener && window.opener.window) {
        win.iBizApp.regParentWindow(window.opener.window);
    }
})(window);