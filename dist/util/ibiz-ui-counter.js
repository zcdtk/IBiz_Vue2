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
/**
 * 计数器
 *
 * @class IBizUICounter
 * @extends {IBizControl}
 */
var IBizUICounter = /** @class */ (function (_super) {
    __extends(IBizUICounter, _super);
    /**
     * Creates an instance of IBizUICounter.
     * 创建 IBizUICounter 服务对象
     *
     * @param {*} [config={}]
     * @memberof IBizUICounter
     */
    function IBizUICounter(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        /**
         * 定时器时间
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this.timer = null;
        /**
         * 定时器
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this.timerTag = null;
        /**
         * 计数器id
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this.counterId = '';
        /**
         * 计数器参数
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this.counterParam = {};
        /**
         * 最后加载数据
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this.lastReloadArg = {};
        /**
         * 计数器结果
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this.result = {};
        /**
         * 计数器交互数据
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this.data = {};
        /**
         * url
         *
         * @type {string}
         * @memberof IBizUICounter
         */
        _this.url = '';
        _this.counterId = config.counterId;
        Object.assign(_this.counterParam, config.counterParam);
        _this.timer = config.timer;
        _this.load();
        _this.url = config.url;
        return _this;
    }
    /**
     * 加载定时器
     *
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.load = function () {
        var _this = this;
        if (this.timer > 1000) {
            this.timerTag = setInterval(function () {
                _this.reload();
            }, this.timer);
        }
        this.reload();
    };
    /**
     * 刷新计数器
     *
     * @private
     * @param {*} [arg={}]
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.reload = function (arg) {
        var _this = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        Object.assign(this.lastReloadArg, arg);
        Object.assign(params, this.lastReloadArg);
        Object.assign(params, { srfcounterid: this.counterId, srfaction: 'FETCH', srfcounterparam: JSON.stringify(this.counterParam) });
        this.iBizHttp.post(this.url, params).subscribe(function (res) {
            if (res.ret === 0) {
                _this.setData(res);
            }
        }, function (error) {
            console.log('加载计数器异常');
        });
    };
    /**
     * 处理数据
     *
     * @private
     * @param {*} result
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.setData = function (result) {
        this.result = result;
        this.data = result.data;
        this.fire(IBizUICounter.COUNTERCHANGED, this.data);
    };
    /**
     * 获取结果
     *
     * @returns {*}
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.getResult = function () {
        return this.result;
    };
    /**
     * 获取数据
     *
     * @returns {*}
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.getData = function () {
        return this.data;
    };
    /**
     * 关闭计数器
     *
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.close = function () {
        if (this.timerTag !== undefined) {
            clearInterval(this.timerTag);
            delete this.timer;
        }
    };
    /**
     * 计数发生变化
     *
     * @static
     * @memberof IBizUICounter
     */
    IBizUICounter.COUNTERCHANGED = "COUNTERCHANGED";
    return IBizUICounter;
}(IBizObject));
