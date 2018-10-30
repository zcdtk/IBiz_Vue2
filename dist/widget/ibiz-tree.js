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
 *  树部件
 *
 * @class IBizTree
 * @extends {IBizControl}
 */
var IBizTree = /** @class */ (function (_super) {
    __extends(IBizTree, _super);
    /**
     * Creates an instance of IBizTree.
     * 创建 IBizTree 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTree
     */
    function IBizTree(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 树部件是否收缩，默认展开
         *
         * @type {boolean}
         * @memberof IBizTree
         */
        _this.isCollapsed = true;
        /**
         * 数据项节点集合
         *
         * @type {Array<any>}
         * @memberof IBizTree
         */
        _this.items = [];
        /**
         * 默认节点
         *
         * @private
         * @type {*}
         * @memberof IBizTree
         */
        _this.node = {};
        _this.selectNode = {};
        return _this;
    }
    /**
     * 加载节点数据
     *
     * @param {*} [treeCfg={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.load = function (treeCfg) {
        // let param: any = {
        //     srfnodeid: this.node.id ? this.node.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
        //     srfviewparam: JSON.stringify(this.getViewController().getViewParam()),
        //     srfctrlid: this.getName()
        // };
        if (treeCfg === void 0) { treeCfg = {}; }
        // this.fire(IBizMDControl.BEFORELOAD, param);
        // this.iBizHttp.post(this.getBackendUrl(), param).subscribe((result) => {
        //     if (result.ret !== 0) {
        //         this.iBizNotification.error('错误', result.info);
        //         return;
        //     }
        //     this.items = this.formatTreeData(result.items);
        //     this.fire(IBizTree.CONTEXTMENU, this.items);
        // }, (error) => {
        //     this.iBizNotification.error('错误', error.info);
        // });
    };
    /**
     * 获取选择节点数据
     *
     * @param {any} bFull true：返回的数据包含节点全部数据，false：返回的数据仅包含节点ID
     * @returns {*}
     * @memberof IBizTree
     */
    IBizTree.prototype.getSelected = function (bFull) {
    };
    /**
     * 获取所有节点数据
     *
     * @returns {Array<any>}
     * @memberof IBizTree
     */
    IBizTree.prototype.getNodes = function () {
        return this.items;
    };
    /**
     * 节点重新加载
     *
     * @param {*} [node={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.reload = function (node) {
        if (node === void 0) { node = {}; }
    };
    /**
     * 删除节点
     *
     * @param {any} node
     * @memberof IBizTree
     */
    IBizTree.prototype.remove = function (node) {
    };
    /**
     * 实体界面行为
     *
     * @param {any} params
     * @memberof IBizTree
     */
    IBizTree.prototype.doUIAction = function (params) {
    };
    /**
     * 格式化树数据
     *
     * @private
     * @param {Array<any>} items
     * @returns {Array<any>}
     * @memberof IBizTree
     */
    IBizTree.prototype.formatTreeData = function (items) {
        var data = [];
        items.forEach(function (item) {
            var tempData = {};
            Object.assign(tempData, item);
            tempData.name = tempData.text;
            data.push(tempData);
        });
        return data;
    };
    /**
     * 树节点激活加载子数据
     *
     * @private
     * @param {*} resolve
     * @memberof IBizTree
     */
    IBizTree.prototype.loadChildren = function (node, resolve) {
        var _this = this;
        var param = {
            srfnodeid: node.data && node.data.id ? node.data.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(this.getViewController().getViewParam()),
            srfctrlid: this.getName()
        };
        this.fire(IBizMDControl.BEFORELOAD, param);
        this.iBizHttp.post(this.getBackendUrl(), param).subscribe(function (result) {
            if (result.ret !== 0) {
                _this.iBizNotification.error('错误', result.info);
                resolve([]);
                return;
            }
            var _items = _this.formatTreeData(result.items).slice();
            if (node.level === 0) {
                _this.items = _items.slice();
                _this.fire(IBizTree.CONTEXTMENU, _this.items);
            }
            resolve(_items);
        }, function (error) {
            _this.iBizNotification.error('错误', error.info);
            resolve([]);
        });
    };
    /**
     * 树节点激活选中数据
     *
     * @param {*} [data={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.nodeSelect = function (data) {
        if (data === void 0) { data = {}; }
        this.fire(IBizTree.SELECTIONCHANGE, [data]);
    };
    /**
     *
     *
     * @param {*} [item={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.setSelectTreeItem = function (item) {
        if (item === void 0) { item = {}; }
        Object.assign(this.selectNode, item);
    };
    /*****************事件声明************************/
    /**
     * 选择变化
     *
     * @static
     * @memberof IBizTree
     */
    IBizTree.SELECTIONCHANGE = "SELECTIONCHANGE";
    /**
     * 上下文菜单
     *
     * @static
     * @memberof IBizTree
     */
    IBizTree.CONTEXTMENU = "CONTEXTMENU";
    return IBizTree;
}(IBizControl));
