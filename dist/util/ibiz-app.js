"use strict";
/**
 * IBizApp 应用
 *
 * @class IBizApp
 */
var IBizApp = /** @class */ (function () {
    /**
     * Creates an instance of IBizApp.
     * 创建 IBizApp 实例
     *
     * @memberof IBizApp
     */
    function IBizApp() {
        /**
         * 当前窗口所有视图控制器
         *
         * @type {*}
         * @memberof IBizApp
         */
        this.viewControllers = {};
        /**
         * 父窗口window对象
         *
         * @type {*}
         * @memberof IBizApp
         */
        this.parentWindow = null;
        /**
         * rxjs 流观察对象
         *
         * @private
         * @type {Subject<any>}
         * @memberof IBizApp
         */
        this.subject = new rxjs.Subject();
    }
    ;
    /**
     * 注册视图控制
     *
     * @param {*} ctrler
     * @memberof IBizApp
     */
    IBizApp.prototype.regSRFController = function (ctrler) {
        this.viewControllers[ctrler.getId()] = ctrler;
    };
    /**
     * 注销视图控制器
     *
     * @param {*} ctrler
     * @memberof IBizApp
     */
    IBizApp.prototype.unRegSRFController = function (ctrler) {
        var id = ctrler.getId();
        // ctrler.quit();
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    };
    /**
     * 注销视图控制器
     *
     * @param {string} id
     * @memberof IBizApp
     */
    IBizApp.prototype.unRegSRFController2 = function (id) {
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    };
    /**
     * 获取视图控制器
     *
     * @param {string} id
     * @returns {*}
     * @memberof IBizApp
     */
    IBizApp.prototype.getSRFController = function (id) {
        return this.viewControllers[id];
    };
    /**
     * 获取父视图控制器
     *
     * @returns {*}
     * @memberof IBizApp
     */
    IBizApp.prototype.getSRFPController = function () {
        var keys = Object.keys(this.viewControllers);
        var pkey = keys[keys.length - 1];
        return this.viewControllers[pkey];
    };
    /**
     * 注册父窗口window 对象
     *
     * @param {Window} win
     * @memberof IBizApp
     */
    IBizApp.prototype.regParentWindow = function (win) {
        this.parentWindow = win;
    };
    /**
     * 获取父窗口window 对象
     *
     * @returns {Window}
     * @memberof IBizApp
     */
    IBizApp.prototype.getParentWindow = function () {
        return this.parentWindow;
    };
    /**
     * 订阅刷新视图事件
     *
     * @returns {Observable<any>}
     * @memberof IBizApp
     */
    IBizApp.prototype.onRefreshView = function () {
        return this.subject.asObservable();
    };
    /**
     * 通知视图刷新事件
     *
     * @param {*} data
     * @memberof IBizApp
     */
    IBizApp.prototype.fireRefreshView = function (data) {
        this.subject.next(data);
    };
    return IBizApp;
}());
// 初始化IBizApp 对象， 挂载在window对象下
(function (window) {
    var win = window;
    if (!win.iBizApp) {
        win.iBizApp = new IBizApp();
    }
    win.getIBizApp = function () {
        if (win.iBizApp) {
            return win.iBizApp;
        }
        else {
            win.iBizApp = new IBizApp();
        }
    };
    if (window.opener && window.opener.window) {
        win.iBizApp.regPWindow(window.opener.window);
    }
})(window);
