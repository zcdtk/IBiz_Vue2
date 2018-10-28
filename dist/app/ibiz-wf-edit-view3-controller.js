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
 * 工作流分页编辑视图
 *
 * @class IBizWFEditView3Controller
 * @extends {IBizEditView3Controller}
 */
var IBizWFEditView3Controller = /** @class */ (function (_super) {
    __extends(IBizWFEditView3Controller, _super);
    /**
     * Creates an instance of IBizWFEditView3Controller.
     * 创建 IBizWFEditView3Controller 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizWFEditView3Controller
     */
    function IBizWFEditView3Controller(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizWFEditView3Controller;
}(IBizEditView3Controller));
