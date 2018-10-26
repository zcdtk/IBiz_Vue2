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
        var _this_1 = _super.call(this, config) || this;
        /**
         * 定时器时间
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.timer = null;
        /**
         * 定时器
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.timerTag = null;
        /**
         * 计数器id
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.counterId = '';
        /**
         * 计数器参数
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.counterParam = {};
        /**
         * 最后加载数据
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.lastReloadArg = {};
        /**
         * 计数器结果
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.result = {};
        /**
         * 计数器交互数据
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.data = {};
        var _this = _this_1;
        _this_1.counterId = config.counterId;
        Object.assign(_this_1.counterParam, config.counterParam);
        _this_1.timer = config.timer;
        _this_1.load();
        return _this_1;
    }
    /**
     * 加载定时器
     *
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.load = function () {
        var _this_1 = this;
        if (this.timer > 1000) {
            this.timerTag = setInterval(function () {
                _this_1.reload();
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
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        Object.assign(this.lastReloadArg, arg);
        Object.assign(params, this.lastReloadArg);
        Object.assign(params, { srfcounterid: this.counterId, srfaction: 'FETCH', srfcounterparam: JSON.stringify(this.counterParam) });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (res) {
            if (res.ret === 0) {
                _this_1.setData(res);
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
}(IBizControl));
