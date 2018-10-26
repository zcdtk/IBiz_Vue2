"use strict";
/**
 * IBizSys控制器借口对象
 *
 * @abstract
 * @class IBizObject
 */
var IBizObject = /** @class */ (function () {
    /**
     * Creates an instance of IBizObject.
     * 创建 IBizObject 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizObject
     */
    function IBizObject(opts) {
        if (opts === void 0) { opts = {}; }
        /**
         * 对象事件集合
         *
         * @private
         * @type {Map<string, any>}
         * @memberof IBizObject
         */
        this.events = new Map();
        /**
         * IBizHttp 服务对象
         *
         * @type {IBizHttp}
         * @memberof IBizObject
         */
        this.iBizHttp = new IBizHttp();
        /**
         * IBiz 通知对象
         *
         * @type {IBizNotification}
         * @memberof IBizObject
         */
        this.iBizNotification = new IBizNotification();
    }
    /**
     * 注册Rx订阅事件
     *
     * @param {string} eventName
     * @returns {Subject<any>}
     * @memberof IBizObject
     */
    IBizObject.prototype.on = function (eventName) {
        var subject;
        if (eventName && !Object.is(eventName, '')) {
            if (!this.events.get(eventName)) {
                subject = new rxjs.Subject();
                this.events.set(eventName, subject);
            }
            else {
                subject = this.events.get(eventName);
            }
            return subject;
        }
    };
    /**
     * Rx事件流触发
     *
     * @param {string} eventName
     * @param {*} data
     * @memberof IBizObject
     */
    IBizObject.prototype.fire = function (eventName, data) {
        var subject = this.events.get(eventName);
        if (subject) {
            subject.next(data);
        }
    };
    return IBizObject;
}());
