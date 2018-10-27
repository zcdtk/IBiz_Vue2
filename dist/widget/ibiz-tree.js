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
 * 树部件
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
         * 数据项节点集合
         *
         * @type {Array<any>}
         * @memberof IBizTree
         */
        _this.items = [];
        /**
         * 树节点数据
         *
         * @type {Array<any>}
         * @memberof IBizTree
         */
        _this.nodes = [];
        /**
         * 默认节点
         *
         * @private
         * @type {*}
         * @memberof IBizTree
         */
        _this.node = {};
        /**
         * 选中数据项
         *
         * @type {Array<string>}
         * @memberof IBizTree
         */
        _this.selectedKeys = [];
        return _this;
    }
    /**
     * 加载节点数据
     *
     * @param {*} [treeCfg={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.load = function (treeCfg) {
        var _this = this;
        if (treeCfg === void 0) { treeCfg = {}; }
        // tslint:disable-next-line:prefer-const
        var param = {
            srfnodeid: this.node.id ? this.node.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(this.getViewController().getViewParam()),
            srfctrlid: this.getName()
        };
        this.iBizHttp.post(this.getBackendUrl(), param).subscribe(function (result) {
            if (result.ret !== 0) {
                _this.iBizNotification.error('错误', result.info);
                return;
            }
            _this.items = _this.formatDatas(result.items).slice();
            _this.items.forEach(function (item) {
                // this.nodes.push(new NzTreeNode({ title: item.text, key: item.srfkey, children: [] }));
            });
            _this.fire(IBizTree.CONTEXTMENU, _this.items);
        }, function (error) {
            _this.iBizNotification.error('错误', error.info);
        });
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
    IBizTree.prototype.mouseAction = function (name, e) {
        var _this = this;
        if (!Object.is(name, 'expand') || (!e || !e.node || !e.node.origin)) {
            return;
        }
        if (e.node.getChildren().length !== 0 || !e.node.isExpanded) {
            return;
        }
        var node = e.node.origin;
        var _treeitem = this.getTreeItem(this.items, node.key);
        if (Object.keys(_treeitem).length === 0) {
            return;
        }
        var param = {
            srfnodeid: _treeitem.id ? _treeitem.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(this.getViewController().getViewParam()),
            srfctrlid: this.getName()
        };
        this.iBizHttp.post(this.getBackendUrl(), param).subscribe(function (result) {
            if (result.ret !== 0) {
                return;
            }
            if (!result.items || !Array.isArray(result.items)) {
                return;
            }
            if (result.items.length === 0) {
                e.node.isLeaf = true;
            }
            else {
                // tslint:disable-next-line:prefer-const
                var data_1 = [];
                result.items.forEach(function (item) {
                    data_1.push({ title: item.text, key: item.srfkey, children: [] });
                });
                _this.addTreeChildItems(_this.items, node.key, result.items);
                e.node.addChildren(data_1);
            }
        }, function (error) {
            _this.iBizNotification.error('错误', error.info);
        });
    };
    /**
     * 获取数据数据节点
     *
     * @private
     * @param {Array<any>} items
     * @param {string} srfkey
     * @returns {*}
     * @memberof IBizTree
     */
    IBizTree.prototype.getTreeItem = function (items, srfkey) {
        var _this = this;
        // tslint:disable-next-line:prefer-const
        var _item = {};
        items.some(function (item) {
            if (Object.is(item.srfkey, srfkey)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items) {
                var subItem = _this.getTreeItem(item.items, srfkey);
                if (subItem && Object.keys(subItem).length > 0) {
                    Object.assign(_item, subItem);
                    return true;
                }
            }
        });
        return _item;
    };
    /**
     * 添加子节点数据值树数据中
     *
     * @private
     * @param {Array<any>} items
     * @param {string} srfkey
     * @param {Array<any>} childItems
     * @memberof IBizTree
     */
    IBizTree.prototype.addTreeChildItems = function (items, srfkey, childItems) {
        var _this = this;
        items.some(function (item) {
            if (Object.is(item.srfkey, srfkey)) {
                item.items = [];
                Object.assign(item, { items: childItems });
                return true;
            }
            if (item.items) {
                _this.addTreeChildItems(item.items, srfkey, childItems);
            }
        });
    };
    /**
     * 设置树选中数据节点
     *
     * @private
     * @param {*} [item={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.setSelectTreeItem = function (item) {
        if (item === void 0) { item = {}; }
        this.selectedKeys = [];
        this.selectedKeys.push(item.srfkey);
    };
    /**
     * 格式化树数据
     *
     * @private
     * @param {Array<any>} datas
     * @returns {Array<any>}
     * @memberof IBizTree
     */
    IBizTree.prototype.formatDatas = function (datas) {
        datas.forEach(function (data) {
            data.label = data.text;
            data.children = [];
            data.isLeaf = true;
        });
        return datas;
    };
    /**
     * 节点选中
     *
     * @param {*} [data={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.nodeSelect = function (data) {
        if (data === void 0) { data = {}; }
        this.fire(IBizTree.SELECTIONCHANGE, [data]);
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
