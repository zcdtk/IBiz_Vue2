"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * 抽象接口基类
 *
 * @export
 * @abstract
 * @class IBizObejct
 */
var IBizObejct = /** @class */ (function () {
    /**
     * Creates an instance of IBizObejct.
     * 创建 IBizObejct 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizObejct
     */
    function IBizObejct(opts) {
        if (opts === void 0) { opts = {}; }
        /**
         * 事件注册管理
         *
         * @type {Map<string, Subject<any>>}
         * @memberof IBizObejct
         */
        this.events = new Map();
        this.name = opts.name;
    }
    /**
     * 设置名称
     *
     * @param {string} name
     * @memberof IBizObejct
     */
    IBizObejct.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     * 获取名称
     *
     * @returns {string}
     * @memberof IBizObejct
     */
    IBizObejct.prototype.getName = function () {
        return this.name;
    };
    /**
     * 事件订阅
     *
     * @param {string} name
     * @returns {Observable<any>}
     * @memberof IBizObejct
     */
    IBizObejct.prototype.on = function (name) {
        var subject;
        if (name && !Object.is(name, '')) {
            if (!this.events.get(name)) {
                subject = new rxjs_1.Subject();
                this.events.set(name, subject);
            }
            else {
                subject = this.events.get(name);
            }
            return subject.asObservable();
        }
    };
    /**
     * 事件抛出
     *
     * @param {string} name
     * @param {*} data
     * @memberof IBizObejct
     */
    IBizObejct.prototype.fire = function (name, data) {
        if (this.events.get(name)) {
            var subject = this.events.get(name);
            subject.next(data);
        }
    };
    return IBizObejct;
}());
exports.IBizObejct = IBizObejct;
