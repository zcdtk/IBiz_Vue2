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
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 树数据
         *
         * @type {Array<any>}
         * @memberof IBizTree
         */
        _this_1.items = [];
        _this_1.tableselection = null;
        _this_1.tableselections = {};
        /**
         *  默认节点
         *
         * @private
         * @type {*}
         * @memberof IBizTree
         */
        _this_1.node = {};
        var _this = _this_1;
        return _this_1;
    }
    IBizTree.prototype.setSize = function (width, height) {
    };
    IBizTree.prototype.setCatalog = function (catalog) {
    };
    /**
     * 加载
     *
     * @param {*} [opt]
     * @memberof IBizTree
     */
    IBizTree.prototype.load = function (opt) {
        var _this = this;
        var param = {
            srfnodeid: _this.node.id ? _this.node.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(_this.getViewController().getViewParam()),
            srfctrlid: _this.getName()
        };
        if (opt) {
            Object.assign(param, opt);
        }
        _this.fire(IBizMDControl.BEFORELOAD, param);
        _this.iBizHttp.post(_this.getBackendUrl(), param).subscribe(function (result) {
            if (result.ret !== 0) {
                _this.iBizNotification.error('错误', result.info);
                return;
            }
            _this.items = result.items.slice();
            _this.fire(IBizTree.CONTEXTMENU, _this.items);
            console.log(result);
        }, function (error) {
            _this.iBizNotification.error('错误', error.info);
        });
    };
    /**
     * 获取选择节点数据
     *
     * bFull，true：返回的数据包含节点全部数据，false：返回的数组仅包含节点ID
     */
    IBizTree.prototype.getSelected = function (bFull) {
        return null;
    };
    /**
     * 重新加载
     *
     * @param {*} [node={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.reload = function (node) {
        if (node === void 0) { node = {}; }
    };
    /**
     * 删除
     *
     * @param {*} [node={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.remove = function (node) {
        if (node === void 0) { node = {}; }
        var _this = this;
        var arg = { srfnodeid: node.id };
        Object.assign(arg, { srfaction: 'remove' });
        _this.beginLoading();
        _this.iBizHttp.post(_this.getBackendUrl(), arg).subscribe(function (data) {
            _this.endLoading();
            if (data.ret === 0) {
                _this.tableselection = null;
                _this.tableselections = {};
                _this.reload(node.parent);
                if (data.info && data.info != '') {
                    // IBiz.alert($IGM('IBIZTREE.REMOVE.TITLE', '删除成功'), $IGM('IBIZTREE.REMOVE.INFO', '删除数据成功,' + data.info, [data.info]), 1);
                    _this.iBizNotification.success('删除成功', "\u5220\u9664\u6570\u636E\u6210\u529F" + data.info);
                }
                IBizUtil.processResult(data);
            }
            else {
                // IBiz.alert($IGM('IBIZTREE.REMOVE.TITLE2', '删除失败'), $IGM('IBIZTREE.REMOVE.INFO2', '删除数据失败,' + data.info, [data.info]), 2);
                _this.iBizNotification.error('删除失败', "\u5220\u9664\u6570\u636E\u5931\u8D25" + data.info);
            }
        }, function (error) {
            _this.endLoading();
            // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), $IGM('IBIZTREE.AJAX.INFO', '执行请求发生异常'), 2);
            _this.iBizNotification.warning('警告', '执行请求发生异常');
        });
        ;
    };
    /**
     * 操作界面行为
     *
     * @param {*} [params={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.doUIAction = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var subject = new rxjs.Subject();
        if (params) {
            params = {};
        }
        Object.assign(params, { srfaction: 'uiaction' });
        _this.beginLoading();
        _this.iBizHttp.post(_this.getBackendUrl(), params).subscribe(function (data) {
            _this.endLoading();
            if (data.ret === 0) {
                if (data.reloadData) {
                    // _this.refresh();
                }
                if (data.info && data.info != '') {
                    // IBiz.alert($IGM('IBIZTREE.DOUIACTION.TITLE', '操作成功'), $IGM('IBIZTREE.DOUIACTION.INFO', '操作成功,' + data.info, [data.info]), 1);
                    _this.iBizNotification.success('操作成功', "\u64CD\u4F5C\u6210\u529F" + data.info);
                }
                IBizUtil.processResult(data);
                subject.next(data);
            }
            else {
                // IBiz.alert($IGM('IBIZTREE.DOUIACTION.TITLE2', '操作失败'), $IGM('IBIZTREE.DOUIACTION.INFO2', '操作失败,执行操作发生错误,' + data.info, [data.info]), 2);
                _this.iBizNotification.error('操作失败', "\u64CD\u4F5C\u5931\u8D25,\u6267\u884C\u64CD\u4F5C\u53D1\u751F\u9519\u8BEF," + data.info);
                subject.error(data);
            }
        }, function (error) {
            _this.endLoading();
            // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), $IGM('IBIZTREE.AJAX.INFO', '执行请求发生异常'), 2);
            _this.iBizNotification.warning('警告', '执行请求发生异常');
            subject.error(error);
        });
        return subject.asObservable();
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
