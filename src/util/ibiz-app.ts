/**
 * IBizApp 应用
 *
 * @class IBizApp
 */
class IBizApp {

    /**
     * 当前窗口所有视图控制器
     *
     * @type {*}
     * @memberof IBizApp
     */
    public viewControllers: any = {};

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
        this.viewControllers[ctrler.getId()] = ctrler;
    }

    /**
     * 注销视图控制器
     *
     * @param {*} ctrler
     * @memberof IBizApp
     */
    public unRegSRFController(ctrler: any): void {
        var id = ctrler.getId();
        // ctrler.quit();
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    }

    /**
     * 注销视图控制器
     *
     * @param {string} id
     * @memberof IBizApp
     */
    public unRegSRFController2(id: string): void {
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    }

    /**
     * 获取视图控制器
     *
     * @param {string} id
     * @returns {*}
     * @memberof IBizApp
     */
    public getSRFController(id: string): any {
        return this.viewControllers[id];
    }

    /**
     * 获取父视图控制器
     *
     * @param {string} id 视图控制器id
     * @returns {*}
     * @memberof IBizApp
     */
    public getParentController(id: string): any {
        const ctrl_ids: Array<any> = Object.keys(this.viewControllers);
        let index = ctrl_ids.findIndex(ctrl_id => Object.is(id, ctrl_id));
        if (index > 0) {
            return this.viewControllers[ctrl_ids[index - 1]];
        }
        return null;
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
     * @returns {Observable<any>}
     * @memberof IBizApp
     */
    public onRefreshView(): Observable<any> {
        return this.subject.asObservable();
    }

    /**
     * 通知视图刷新事件
     *
     * @param {*} data
     * @memberof IBizApp
     */
    public fireRefreshView(data: any): void {
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