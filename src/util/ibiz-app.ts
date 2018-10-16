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
    public PWin: any = null;

    constructor() { }

    public regSRFController(ctrler: any): void {
        this.viewControllers[ctrler.getId()] = ctrler;
    }
    /**
     * 注销视图
     */
    public unRegSRFController(ctrler: any): void {
        var id = ctrler.getId();
        // ctrler.quit();
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    }
    /**
     * 注销视图
     */
    public unRegSRFController2(id: string): void {
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    }
    /**
     * 获取视图
     */
    public getSRFController(openerid: string): any {
        return this.viewControllers[openerid];
    }

    public regPWindow(win): void {
        this.PWin = win;
    }

    public getPWindow(): any {
        return this.PWin;
    }

    /**
     * 刷新视图
     *
     * @static
     * @memberof IBizApp
     */
    public static REFRESHVIEW = 'REFRESHVIEW';
}

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
})(window);