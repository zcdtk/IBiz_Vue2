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
 * 关系分页
 *
 * @class IBizDRTab
 * @extends {IBizTab}
 */
var IBizDRTab = /** @class */ (function (_super) {
    __extends(IBizDRTab, _super);
    /**
     * Creates an instance of IBizDRTab.
     * 创建 IBizDRTab 实例
     * @param {*} [opts={}]
     * @memberof IBizDRTab
     */
    function IBizDRTab(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 父数据对象
         *
         * @type {*}
         * @memberof IBizDRTab
         */
        _this.parentData = {};
        return _this;
    }
    /**
     * 设置父数据
     *
     * @param {*} [data={}]
     * @memberof IBizDRTab
     */
    IBizDRTab.prototype.setParentData = function (data) {
        if (data === void 0) { data = {}; }
        Object.assign(this.parentData, data);
    };
    /**
     * 分页部件选中变化
     *
     * @param {string} name
     * @returns {void}
     * @memberof IBizDRTab
     */
    IBizDRTab.prototype.onTabSelectionChange = function (name) {
        var viewid = name;
        var controller = this.getViewController();
        var parentKey = '';
        if (this.parentData.srfparentkey) {
            parentKey = this.parentData.srfparentkey;
        }
        if (!parentKey || Object.is(parentKey, '')) {
            this.iBizNotification.warning('警告', '请先建立主数据');
            var tab_1 = this.getTab('form');
            this.setActiveTab(tab_1);
            return;
        }
        if (Object.is(viewid, 'form')) {
            this.fire(IBizDRTab.SELECTCHANGE, { parentMode: {}, parentData: {}, viewid: 'form' });
            var tab_2 = this.getTab('form');
            this.setActiveTab(tab_2);
            return;
        }
        var dritem = { viewid: viewid.toLocaleUpperCase() };
        if (!dritem.viewid || Object.is(dritem.viewid, '')) {
            return;
        }
        var viewItem = controller.getDRItemView(dritem);
        if (viewItem == null || !viewItem.viewparam) {
            return;
        }
        var viewParam = viewItem.viewparam;
        var parentData = {};
        if (true) {
            Object.assign(parentData, viewParam);
            Object.assign(parentData, this.parentData);
            if (viewParam.srfparentdeid) {
                Object.assign(parentData, { srfparentdeid: viewParam.srfparentdeid });
            }
        }
        var tab = this.getTab(viewid);
        this.setActiveTab(tab);
        this.fire(IBizDRTab.SELECTCHANGE, { parentMode: viewParam, parentData: parentData, viewid: viewid });
    };
    /**
     * 关系分页选中
     *
     * @static
     * @memberof IBizDRTab
     */
    IBizDRTab.SELECTCHANGE = 'SELECTCHANGE';
    return IBizDRTab;
}(IBizTab));
