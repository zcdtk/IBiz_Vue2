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

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ibiz_obejct_1 = require("../ibiz-obejct");
/**
 * 控制器对象基类
 *
 * @export
 * @class IBizControl
 * @extends {IBizObejct}
 */
var IBizControl = /** @class */ (function (_super) {
    __extends(IBizControl, _super);
    /**
     * Creates an instance of IBizControl.
     * 创建 IBizControl 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizControl
     */
    function IBizControl(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 设置名称
     *
     * @param {string} name
     * @memberof IBizControl
     */
    IBizControl.prototype.setName = function (name) {
        _super.prototype.setName.call(this, name);
    };
    return IBizControl;
}(ibiz_obejct_1.IBizObejct));
exports.IBizControl = IBizControl;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ibiz_obejct_1 = require("../ibiz-obejct");
/**
 * 视图控制器基类
 *
 * @export
 * @class IBizViewController
 * @extends {IBizObejct}
 */
var IBizViewController = /** @class */ (function (_super) {
    __extends(IBizViewController, _super);
    /**
     * Creates an instance of IBizViewController.
     * 创建 IBizViewController 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizViewController
     */
    function IBizViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizViewController;
}(ibiz_obejct_1.IBizObejct));
exports.IBizViewController = IBizViewController;
