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
     * @param event 事件名称
     * @param callback 回调函数<不支持字符串><3个参数 sender,data,event>
     * @param scope 作用域
     */
    IBizObject.prototype.on = function (name) {
        return;
    };
    /**
     * 呼出事件<参数会封装成JSON对象进行传递>
     * @param event 事件名称
     * @param sender 源
     * @param args 参数
     */
    IBizObject.prototype.fire = function (name, data) {
    };
    return IBizObject;
}());
