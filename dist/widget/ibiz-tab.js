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
 * 分页控件
 *
 * @class IBizTab
 * @extends {IBizControl}
 */
var IBizTab = /** @class */ (function (_super) {
    __extends(IBizTab, _super);
    /**
     * Creates an instance of IBizTab.
     * 创建 IBizTab 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTab
     */
    function IBizTab(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        var _this = _this_1;
        return _this_1;
    }
    IBizTab.prototype.setActiveItem = function (index) {
        // if ($.isNumeric(index)) {
        //     $('#' + this.config.id + ' li:eq(' + index.toString() + ') a').tab('show');
        // }
        // else {
        //     $('#' + this.config.id + ' a[href="#' + index + '"]').tab('show');
        // }
    };
    IBizTab.prototype.setSize = function (width, height) {
        // var me = this;
        // $('#' + me.id).width(width);
        // $('#' + me.id).height(height);
        /*if(me.activeSubController != null){
            me.activeSubController.setSize(width,height);
        }*/
    };
    IBizTab.prototype.getHeight = function () {
        // var me = this;
        // return $('#' + me.id).height();
    };
    IBizTab.prototype.getWidth = function () {
        // var me = this;
        // return $('#' + me.id).width();
    };
    /*****************事件声明************************/
    /**
     * 选择变化
     *
     * @static
     * @memberof IBizTab
     */
    IBizTab.SELECTIONCHANGE = "SELECTIONCHANGE";
    return IBizTab;
}(IBizControl));
