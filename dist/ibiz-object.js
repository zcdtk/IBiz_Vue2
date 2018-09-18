"use strict";
/**
 * 抽象接口对象
 *
 * @class IBizObject
 */
var IBizObject = /** @class */ (function () {
    /**
     * Creates an instance of IBizObject.
     * 创建 IBizObject 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizObject
     */
    function IBizObject(opts) {
        if (opts === void 0) { opts = {}; }
        /**
         * 事件对象集合
         *
         * @private
         * @type {Map<string, Subject<any>>}
         * @memberof IBizObject
         */
        this.events = new Map();
        this.id = opts.id;
        this.name = opts.name;
        this.refname = opts.refname;
        this.viewController = opts.viewController;
    }
    /**
     * 对象初始化
     *
     * @param {*} [params={}]
     * @memberof IBizObject
     */
    IBizObject.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        this.onInit();
    };
    /**
     * 执行初始化
     *
     * @memberof IBizObject
     */
    IBizObject.prototype.onInit = function () {
    };
    /**
     * 设置对象id
     *
     * @param {string} id
     * @memberof IBizObject
     */
    IBizObject.prototype.setId = function (id) {
        this.id = id;
    };
    /**
     * 获取对象id
     *
     * @returns {string}
     * @memberof IBizObject
     */
    IBizObject.prototype.getId = function () {
        return this.id;
    };
    /**
     * 设置对象名称
     *
     * @param {string} name
     * @memberof IBizObject
     */
    IBizObject.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     * 获取对象名
     *
     * @returns {string}
     * @memberof IBizObject
     */
    IBizObject.prototype.getName = function () {
        return this.name;
    };
    /**
     * 获取对象关联名称
     *
     * @returns {string}
     * @memberof IBizObject
     */
    IBizObject.prototype.getRefName = function () {
        return this.refname;
    };
    /**
     * 获取界面控制器
     *
     * @returns {*}
     * @memberof IBizObject
     */
    IBizObject.prototype.getController = function () {
        return this.viewController;
    };
    /**
     * 注册事件
     *
     * @param {string} name 事件名称
     * @returns {Observable<any>} 事件订阅对象
     * @memberof IBizObject
     */
    IBizObject.prototype.on = function (name) {
        var subject;
        if (this.events.get(name)) {
            subject = this.events.get(name);
        }
        else {
            subject = new rxjs.Subject();
            this.events.set(name, subject);
        }
        return subject.asObservable();
    };
    /**
     * 呼出事件<参数会封装成JSON对象进行传递>
     * @param event 事件名称
     * @param sender 源
     * @param args 参数
     */
    IBizObject.prototype.fire = function (name, data) {
        if (this.events.get(name)) {
            this.events.get(name).next(data);
        }
    };
    return IBizObject;
}());
