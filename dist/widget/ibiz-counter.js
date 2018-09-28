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
 * 计数器部件对象
 *
 * @class IBizCounter
 * @extends {IBizControl}
 */
var IBizCounter = /** @class */ (function (_super) {
    __extends(IBizCounter, _super);
    /**
     * Creates an instance of IBizCounter.
     * 创建 IBizCounter 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizCounter
     */
    function IBizCounter(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.counterparam = {};
        _this_1.lastReloadArg = {};
        _this_1.data = {};
        var _this = _this_1;
        _this.counterid = opts.counterId;
        // this.tag = opts.tag;
        _this.counterparam = JSON.stringify(opts.counterParam);
        _this.timer = opts.timer;
        // this.url = me.getController().getBackendUrl();
        if (_this.timer > 1000) {
            _this.tag = setInterval(function () { _this.reload(); }, _this.timer);
        }
        _this.reload();
        return _this_1;
    }
    IBizCounter.prototype.reload = function () {
        var _this = this;
        var params = { srfcounterid: _this.counterid, srfaction: 'FETCH', srfcounterparam: _this.counterparam };
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret == 0) {
                _this.setData(data);
            }
            else {
                console.log('加载计数数据异常.' + data.info);
            }
        }, function (error) {
            console.log(error);
        });
    };
    IBizCounter.prototype.setData = function (data) {
        var _this = this;
        _this.result = data;
        _this.data = data.data;
        _this.fire(IBizCounter.COUNTERCHANGED, _this.data);
    };
    IBizCounter.prototype.getResult = function () {
        var _this = this;
        return _this.result;
    };
    IBizCounter.prototype.getData = function () {
        var _this = this;
        return _this.data;
    };
    IBizCounter.prototype.close = function () {
        if (this.tag !== undefined) {
            clearInterval(this.tag);
            delete this.timer;
        }
    };
    /*****************事件声明************************/
    /**
     * 计数发生变化
     */
    IBizCounter.COUNTERCHANGED = "COUNTERCHANGED";
    return IBizCounter;
}(IBizControl));
