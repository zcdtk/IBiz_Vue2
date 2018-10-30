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
         * @type {Array<any>}
         * @memberof IBizApp
         */
        this.viewControllers = [];
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
        this.viewControllers.push(ctrler);
    };
    /**
     * 注销视图控制器
     *
     * @param {*} ctrler
     * @memberof IBizApp
     */
    IBizApp.prototype.unRegSRFController = function (ctrler) {
        var id = ctrler.getId();
        var viewUsage = ctrler.getViewUsage();
        var index = this.viewControllers.findIndex(function (ctrl) { return Object.is(id, ctrl.getId()) && Object.is(viewUsage, ctrl.getViewUsage()); });
        if (index !== -1) {
            this.viewControllers[index] = null;
            this.viewControllers.splice(index, 1);
        }
    };
    /**
     * 注销视图控制器
     *
     * @param {string} id 视图id
     * @param {number} viewUsage 视图使用模式
     * @memberof IBizApp
     */
    IBizApp.prototype.unRegSRFController2 = function (id, viewUsage) {
        var index = this.viewControllers.findIndex(function (ctrl) { return Object.is(id, ctrl.getId()) && Object.is(viewUsage, ctrl.getViewUsage()); });
        if (index !== -1) {
            this.viewControllers[index] = null;
            this.viewControllers.splice(index, 1);
        }
    };
    /**
     * 获取视图控制器
     *
     * @param {string} id 视图id
     * @param {number} viewUsage 视图使用模式
     * @returns {*}
     * @memberof IBizApp
     */
    IBizApp.prototype.getSRFController = function (id, viewUsage) {
        var viewController = null;
        var index = this.viewControllers.findIndex(function (ctrl) { return Object.is(id, ctrl.getId()) && Object.is(viewUsage, ctrl.getViewUsage()); });
        if (index !== -1) {
            viewController = this.viewControllers[index];
        }
        return viewController;
    };
    /**
     * 获取父视图控制器
     *
     * @param {string} id 视图id
     * @param {number} viewUsage 视图使用模式
     * @returns {*}
     * @memberof IBizApp
     */
    IBizApp.prototype.getParentController = function (id, viewUsage) {
        var viewController = null;
        var index = this.viewControllers.findIndex(function (ctrl) { return Object.is(id, ctrl.getId()) && Object.is(viewUsage, ctrl.getViewUsage()); });
        if (index !== -1) {
            viewController = this.viewControllers[index - 1];
        }
        return viewController;
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
     * @returns {Subject<any>}
     * @memberof IBizApp
     */
    IBizApp.prototype.onRefreshView = function () {
        return this.subject;
    };
    /**
     * 通知视图刷新事件
     *
     * @param {*} data
     * @memberof IBizApp
     */
    IBizApp.prototype.fireRefreshView = function (data) {
        if (data === void 0) { data = {}; }
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
        win.iBizApp.regParentWindow(window.opener.window);
    }
})(window);
