"use strict";
var IBizApp = /** @class */ (function () {
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
        this.PWin = null;
    }
    IBizApp.prototype.regSRFController = function (ctrler) {
        this.viewControllers[ctrler.getId()] = ctrler;
    };
    /**
     * 注销视图
     */
    IBizApp.prototype.unRegSRFController = function (ctrler) {
        var id = ctrler.getId();
        // ctrler.quit();
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    };
    /**
     * 注销视图
     */
    IBizApp.prototype.unRegSRFController2 = function (id) {
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    };
    /**
     * 获取视图
     */
    IBizApp.prototype.getSRFController = function (openerid) {
        return this.viewControllers[openerid];
    };
    IBizApp.prototype.regPWindow = function (win) {
        this.PWin = win;
    };
    IBizApp.prototype.getPWindow = function () {
        return this.PWin;
    };
    /**
     * 刷新视图
     *
     * @static
     * @memberof IBizApp
     */
    IBizApp.REFRESHVIEW = 'REFRESHVIEW';
    return IBizApp;
}());
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
})(window);
