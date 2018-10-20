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
 * 树导航栏
 *
 * @class IBizTreeExpBar
 * @extends {IBizControl}
 */
var IBizTreeExpBar = /** @class */ (function (_super) {
    __extends(IBizTreeExpBar, _super);
    /**
     * Creates an instance of IBizTreeExpBar.
     * 创建 IBizTreeExpBar 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeExpBar
     */
    function IBizTreeExpBar(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.tree = null;
        _this_1.tabctrl = null;
        _this_1.treeCfg = {};
        _this_1.expframe = null;
        _this_1.pvpanel = null;
        var viewController = _this_1.getViewController();
        if (viewController) {
            viewController.on(IBizViewController.INITED).subscribe(function () {
                var tree = viewController.controls.get(_this_1.getName() + '_tree');
                _this_1.tree = tree;
                if (_this_1.tree) {
                    _this_1.tree.on(IBizTree.SELECTIONCHANGE).subscribe(function (args) {
                        _this_1.onTreeSelectionChange(args);
                    });
                    _this_1.tree.on(IBizTree.CONTEXTMENU).subscribe(function (args) {
                        _this_1.onTreeContextMenu(args);
                    });
                    _this_1.tree.load({});
                }
            });
        }
        return _this_1;
    }
    ;
    ;
    ;
    IBizTreeExpBar.prototype.setSize = function (width, height) {
    };
    /**
     * 获取树部件
     *
     * @returns {IBizTree}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getTree = function () {
        return this.tree;
    };
    /**
     * 设置分页部件
     *
     * @param {*} tabctrl
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.setExpTab = function (tabctrl) {
        this.tabctrl = tabctrl;
    };
    /**
     * 获取分页部件
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getExpTab = function () {
        return this.tabctrl;
    };
    IBizTreeExpBar.prototype.getTreeCfg = function () {
        return this.treeCfg || {};
    };
    IBizTreeExpBar.prototype.getExpFrame = function () {
        return this.expframe;
    };
    IBizTreeExpBar.prototype.getPVPanel = function () {
        return this.pvpanel;
    };
    IBizTreeExpBar.prototype.onTreeSelectionChange = function (records) {
        var _this = this;
        if (records == null || records.length == 0)
            return;
        var record = records[0];
        if (!record.original)
            return;
        var tag = record.original.tag;
        if (!tag || !(tag.srfnodetype))
            return;
        //替换键值
        var nodeids = record.id.split(';');
        var nodetext = record.text;
        var controller = _this.getViewController();
        if (_this.getExpTab()) {
            var viewarg = { viewid: tag.srfnodetype };
            var viewItem = controller.getExpItemView(viewarg);
            if (viewItem == null)
                return;
            var layoutcard = _this.getExpTab();
            var itemid = layoutcard.id + '_' + tag.srfnodetype;
            layoutcard.setActiveItem(itemid);
            var viewParam = {};
            if (viewItem.viewparam) {
                // $.extend(viewParam, viewItem.viewparam);
                Object.assign(viewParam, viewItem.viewparam);
            }
            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }
            var subController = controller.getController(controller.getCId2() + viewItem.embedviewid);
            layoutcard.setActiveSubController(subController);
            if (!subController.isInited()) {
                subController.asyncInit({ parentData: viewParam, renderTo: itemid, subApp: viewItem.subapp });
                return;
            }
            subController.setParentData(viewParam);
            subController.refresh();
            return;
        }
        if (_this.getPVPanel()) {
            // var viewarg = { nodetype: tag.srfnodetype };
            Object.assign(viewarg, { nodetype: tag.srfnodetype });
            // var viewParam = controller.getNavViewParam(viewarg);
            Object.assign(viewParam, controller.getNavViewParam(viewarg));
            if (viewParam == null)
                return;
            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }
            _this.getPVPanel().setParentData(viewParam);
            return;
        }
        if (_this.getExpFrame()) {
            var viewarg = { viewid: tag.srfnodetype };
            var viewItem = controller.getExpItemView(viewarg);
            if (viewItem == null)
                return;
            var viewParam = {};
            if (viewItem.viewparam) {
                // $.extend(viewParam, viewItem.viewparam);
                Object.assign(viewParam, viewItem.viewparam);
            }
            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }
            // var url = $.getIBizApp().parseURL(BASEURL, viewItem.viewurl, {});
            // url += "&" + $.param({ 'srfifchild': true, 'srfparentdata': JSON.stringify(viewParam) });
            // _this.getExpFrame().attr("src", url);
            return;
        }
    };
    IBizTreeExpBar.prototype.onTreeContextMenu = function (params) {
        var _this = this;
        var node = params.node;
    };
    IBizTreeExpBar.prototype.fetchCat = function (backendurl, arg) {
    };
    return IBizTreeExpBar;
}(IBizControl));
