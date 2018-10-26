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
 * 树导航
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
        var _this = _super.call(this, opts) || this;
        var viewController = _this.getViewController();
        if (viewController) {
            // viewController.on(IBizViewController.INITED).subscribe(() => {
            //     const tree = viewController.$controls.get(this.getName() + '_tree');
            //     this.tree = tree;
            //     if (this.tree) {
            //         this.tree.on(IBizTree.SELECTIONCHANGE).subscribe((args) => {
            //             this.onTreeSelectionChange(args);
            //         });
            //         this.tree.on(IBizTree.CONTEXTMENU).subscribe((args) => {
            //             this.onTreeContextMenu(args);
            //         });
            //         this.tree.load({});
            //     }
            // });
        }
        return _this;
    }
    /**
     * 获取树控件
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getTree = function () {
        var viewController = this.getViewController();
        if (viewController) {
            return viewController.$controls.get(this.getName() + '_tree');
        }
        return undefined;
    };
    /**
     * 获取导航分页部件服务对象
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getExpTab = function () {
        var viewController = this.getViewController();
        if (viewController) {
            return viewController.$controls.get('exptab');
        }
        return undefined;
    };
    /**
     * 获取树配置信息
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getTreeCfg = function () {
        return undefined || {};
    };
    /**
     * 获取到导航嵌入
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getExpFrame = function () {
        return undefined;
    };
    /**
     * 获取  PickupviewpanelService （选择视图面板部件服务对象）
     * 判断视图视图类型
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getPVPanel = function () {
        var viewController = this.getViewController();
        if (viewController) {
            return viewController.$controls.get('pickupviewpanel');
        }
        return undefined;
    };
    /**
     * 节点选中变化
     *
     * @param {Array<any>} records
     * @returns {void}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.onTreeSelectionChange = function (records) {
        if (!records || records.length === 0) {
            return;
        }
        var record = records[0];
        this.setTreeSelect(record);
        // 替换键值
        var nodeids = record.id.split(';');
        var nodetext = record.text;
        var nodetag = record.nodetag;
        var nodetag2 = record.nodetag2;
        var nodetag3 = record.nodetag3;
        var nodetag4 = record.nodetag4;
        var controller = this.getViewController();
        if (this.getExpTab()) {
            var viewarg = { viewid: record.srfnodetype };
            var viewItem = controller.getExpItemView(viewarg);
            if (!viewItem) {
                this.fire(IBizTreeExpBar.SELECTIONCHANGE, { viewid: record.srfnodetype, viewParam: {} });
                return;
            }
            // tslint:disable-next-line:prefer-const
            var viewParam = {};
            if (viewItem.viewparam) {
                Object.assign(viewParam, viewItem.viewparam);
            }
            for (var key in viewParam) {
                if (viewParam.hasOwnProperty(key)) {
                    var value = viewParam[key];
                    if (value) {
                        value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                        if (nodetag && !Object.is(nodetag, '')) {
                            value = value.replace(new RegExp('%NODETAG%', 'g'), nodetag);
                        }
                        if (nodetag2 && !Object.is(nodetag2, '')) {
                            value = value.replace(new RegExp('%NODETAG2%', 'g'), nodetag2);
                        }
                        if (nodetag3 && !Object.is(nodetag3, '')) {
                            value = value.replace(new RegExp('%NODETAG3%', 'g'), nodetag3);
                        }
                        if (nodetag4 && !Object.is(nodetag4, '')) {
                            value = value.replace(new RegExp('%NODETAG4%', 'g'), nodetag4);
                        }
                        // 进行替换
                        for (var i = 1; i < nodeids.length; i++) {
                            value = value.replace(new RegExp('%NODEID' + ((i === 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                        }
                        viewParam[key] = value;
                    }
                }
            }
            this.fire(IBizTreeExpBar.SELECTIONCHANGE, { viewid: record.srfnodetype, viewParam: viewParam });
            return;
        }
        if (this.getPVPanel()) {
            // tslint:disable-next-line:prefer-const
            var viewarg = { nodetype: record.srfnodetype };
            // tslint:disable-next-line:prefer-const
            var viewParam = controller.getNavViewParam(viewarg);
            if (!viewParam) {
                return;
            }
            for (var key in viewParam) {
                if (viewParam.hasOwnProperty(key)) {
                    var value = viewParam[key];
                    if (value) {
                        value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                        if (nodetag && !Object.is(nodetag, '')) {
                            value = value.replace(new RegExp('%NODETAG%', 'g'), nodetag);
                        }
                        if (nodetag2 && !Object.is(nodetag2, '')) {
                            value = value.replace(new RegExp('%NODETAG2%', 'g'), nodetag2);
                        }
                        if (nodetag3 && !Object.is(nodetag3, '')) {
                            value = value.replace(new RegExp('%NODETAG3%', 'g'), nodetag3);
                        }
                        if (nodetag4 && !Object.is(nodetag4, '')) {
                            value = value.replace(new RegExp('%NODETAG4%', 'g'), nodetag4);
                        }
                        // 进行替换
                        for (var i = 1; i < nodeids.length; i++) {
                            value = value.replace(new RegExp('%NODEID' + ((i === 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                        }
                        viewParam[key] = value;
                    }
                }
            }
            this.getPVPanel().setParentData(viewParam);
            // this.fire(IBizEvent.IBizTreeExpBar_SELECTIONCHANGE, { viewid: record.srfnodetype, viewParam: viewParam });
            return;
        }
        if (this.getExpFrame()) {
            // var viewarg = { viewid: tag.srfnodetype };
            // var viewItem = controller.getExpItemView(viewarg);
            // if (viewItem == null)
            //     return;
            // var viewParam = {};
            // if (viewItem.viewparam) {
            //     $.extend(viewParam, viewItem.viewparam);
            // }
            // for (var key in viewParam) {
            //     var value = viewParam[key];
            //     if (value) {
            //         value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
            //         //进行替换
            //         for (var i = 1; i < nodeids.length; i++) {
            //             value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
            //         }
            //         viewParam[key] = value;
            //     }
            // }
            // var url = $.getIBizApp().parseURL(BASEURL, viewItem.viewurl, {});
            // url += '&' + $.param({ 'srfifchild': true, 'srfparentdata': JSON.stringify(viewParam) });
            // this.getExpFrame().attr('src', url);
            // return;
        }
    };
    /**
     * 树内容菜单
     *
     * @param {Array<any>} nodes
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.onTreeContextMenu = function (nodes) {
        this.node = {};
        if (nodes.length > 0) {
            Object.assign(this.node, nodes[0]);
            this.onTreeSelectionChange([this.node]);
        }
    };
    /**
     * 设置树选中数据
     *
     * @private
     * @param {*} [item={}]
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.setTreeSelect = function (item) {
        if (item === void 0) { item = {}; }
        var viewController = this.getViewController();
        if (viewController) {
            var tree = viewController.$controls.get(this.getName() + '_tree');
            this.tree = tree;
            if (this.tree) {
                this.tree.setSelectTreeItem(item);
            }
        }
    };
    /**
     * 获取计数器名称，在发布器中重写
     *
     * @returns {string}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getUICounterName = function () {
        return undefined;
    };
    IBizTreeExpBar.SELECTIONCHANGE = 'SELECTIONCHANGE';
    IBizTreeExpBar.LOADED = 'LOADED';
    return IBizTreeExpBar;
}(IBizControl));
