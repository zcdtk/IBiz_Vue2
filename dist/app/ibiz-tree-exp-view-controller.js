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
 * 树导航视图控制器
 *
 * @class IBizTreeExpViewController
 * @extends {IBizMainViewController}
 */
var IBizTreeExpViewController = /** @class */ (function (_super) {
    __extends(IBizTreeExpViewController, _super);
    /**
     * Creates an instance of IBizTreeExpViewController.
     * 创建 IBizTreeExpViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeExpViewController
     */
    function IBizTreeExpViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         *
         *
         * @type {string}
         * @memberof IBizTreeExpViewController
         */
        _this.treeReloadMode = '';
        /**
         * 导航分页对象
         *
         * @type {IBizExpTabService}
         * @memberof IBizTreeExpViewController
         */
        _this.exptab = null;
        _this.exptab = new IBizExpTab({
            name: 'exptab',
            viewController: _this,
            url: opts.url,
        });
        _this.regControl('exptab', _this.exptab);
        return _this;
    }
    /**
     * 部件初始化
     *
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var treeExpBar = this.getTreeExpBar();
        if (treeExpBar) {
            //  树导航选中
            treeExpBar.on(IBizTreeExpBar.SELECTIONCHANGE).subscribe(function (data) {
                _this.treeExpBarSelectionChange(data);
            });
        }
    };
    /**
     * 获取导航部件服务对象
     *
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getTreeExpBar = function () {
        return this.getControl('treeexpbar');
    };
    /**
     * 获取导航分页部件服务对象
     *
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getExpTab = function () {
        return this.getControl('exptab');
    };
    /**
     *
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        this.treeReloadMode = '';
        if (Object.is(uiaction.tag, 'Remove')) {
            this.doRemove(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Refresh')) {
            this.doTreeRefresh(params);
            return;
        }
        if (Object.is(uiaction.tag, 'New')) {
            this.doNew(params);
            return;
        }
        if (Object.is(uiaction.tag, 'EDITDATA')) {
            this.doEdit(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Copy')) {
            this.doCopy(params);
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    /**
     * 新建操作
     *
     * @param {any} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doNew = function (params) {
        this.onNewData(params);
    };
    /**
     * 拷贝操作
     *
     * @param {any} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doCopy = function (params) {
        var arg = {
            data: params,
            srfcopymode: true
        };
        this.onEditData(arg);
    };
    /**
     * 编辑操作
     *
     * @param {*} params
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doEdit = function (params) {
        // 获取要编辑的数据集合
        if (params && params.srfkey) {
            var arg = { data: params };
            this.onEditData(arg);
            return;
        }
    };
    /**
     * 查看操作
     *
     * @param {any} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doView = function (params) {
        this.doEdit(params);
    };
    /**
     * 删除操作
     *
     * @param {*} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doRemove = function (params) {
        this.onRemove(params);
    };
    /**
     * 刷新操作
     *
     * @param {*} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doTreeRefresh = function (params) {
        this.onTreeRefresh(params);
    };
    /**
     * 新建数据
     *
     * @param {*} arg
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onNewData = function (arg) {
        this.treeReloadMode = IBizTreeExpViewController.REFRESHMODE_CURRENTNODE;
        var loadParam = {};
        if (this.getViewParam()) {
            Object.assign(loadParam, this.getViewParam());
        }
        if (this.getParentMode()) {
            Object.assign(loadParam, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(loadParam, this.getParentData());
        }
        if (this.isEnableBatchAdd()) {
            this.doNewDataBatch(loadParam);
            return;
        }
        if (this.doNewDataWizard(loadParam)) {
            return;
        }
        var newMode = this.getNewMode(arg);
        if (newMode) {
            loadParam.srfnewmode = newMode;
        }
        this.doNewDataNormal(loadParam, arg);
    };
    /**
     * 批量新建
     *
     * @param {*} arg
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doNewDataBatch = function (arg) {
        return false;
    };
    /**
     * 批量新建关闭
     *
     * @param {*} win
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onMPickupWindowClose = function (win) {
    };
    /**
     * 批量添加数据
     *
     * @param {*} selectedDatas
     * @returns {string}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.addDataBatch = function (selectedDatas) {
        return '';
    };
    /**
     * 向导新建数据
     *
     * @param {*} arg
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doNewDataWizard = function (arg) {
        return false;
    };
    /**
     * 向导新建数据窗口关闭
     *
     * @param {any} win
     * @param {any} eOpts
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onNewDataWizardWindowClose = function (win, eOpts) {
        return;
    };
    /**
     * 常规新建数据
     *
     * @param {any} arg
     * @param {any} params
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doNewDataNormal = function (arg, params) {
        var view = this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        if (params && view.viewparam && view.viewparam.srfparenttype) {
            var parentType = view.viewparam.srfparenttype;
            if (Object.is(parentType, 'DER1N')) {
                view.viewparam.srfparentkey = params.srfkey;
            }
        }
        return this.openDataView(view);
    };
    /**
     * 编辑数据
     *
     * @param {any} arg
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onEditData = function (arg) {
        this.treeReloadMode = IBizTreeExpViewController.REFRESHMODE_PARENTNODE;
        var loadParam = {};
        if (this.getViewParam()) {
            Object.assign(loadParam, this.getViewParam());
        }
        if (this.getParentMode()) {
            Object.assign(loadParam, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(loadParam, this.getParentData());
        }
        if (arg.srfcopymode) {
            Object.assign(loadParam, {
                srfsourcekey: arg.data.srfkey
            });
        }
        else {
            Object.assign(loadParam, { srfkey: arg.data.srfkey });
        }
        var editMode = this.getEditMode(arg.data);
        if (editMode) {
            loadParam.srfeditmode = editMode;
        }
        if (arg.data.srfmstag) {
            loadParam.srfeditmode2 = arg.data.srfmstag;
        }
        this.doEditDataNormal(loadParam);
    };
    /**
     * 执行常规编辑数据
     *
     * @param {any} arg
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doEditDataNormal = function (arg) {
        var view = this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        return this.openDataView(view);
    };
    /**
     * 打开数据视图
     *
     * @param {any} view
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.openDataView = function (view) {
        return true;
    };
    /**
     *
     *
     * @param {any} params
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onRemove = function (params) {
    };
    /**
     * 界面操作树节点刷新
     *
     * @param {any} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onTreeRefresh = function (params) {
    };
    /**
     * 视图刷新操作
     *
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onRefresh = function () {
        var node;
        if (Object.is(this.treeReloadMode, IBizTreeExpViewController.REFRESHMODE_NONE)) {
            return;
        }
        else if (Object.is(this.treeReloadMode, IBizTreeExpViewController.REFRESHMODE_CURRENTNODE)) {
            var nodes = this.getSelected(true);
            if (nodes && nodes.length > 0) {
                node = nodes[0];
            }
        }
        else if (Object.is(this.treeReloadMode, IBizTreeExpViewController.REFRESHMODE_PARENTNODE)) {
            var nodes = this.getSelected(true);
            if (nodes && nodes.length > 0) {
                node = nodes[0].parent;
            }
        }
        // 刷新树节点
        // this.getTreeExpBar().getTree().reload(node);
    };
    /**
     *
     *
     * @param {any} bFull
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getSelected = function (bFull) {
        var nodes = this.getTreeExpBar().getTree().getSelected(bFull);
        return nodes;
    };
    /**
     * 获取新建模式
     *
     * @param {*} data
     * @returns {string}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getNewMode = function (data) {
        return 'NEWDATA@' + data.srfnodetype.toUpperCase();
    };
    /**
     * 获取编辑模式
     *
     * @param {*} data
     * @returns {string}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getEditMode = function (data) {
        return 'EDITDATA@' + data.srfnodetype.toUpperCase();
    };
    /**
     * 获取编辑视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getEditDataView = function (arg) {
        return this.getEditDataView(arg);
    };
    /**
     * 获取新建视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getNewDataView = function (arg) {
        return this.getNewDataView(arg);
    };
    /**
     * 获取新建向导视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getNewDataWizardView = function (arg) {
        return null;
    };
    /**
     * 获取多选视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getMPickupView = function (arg) {
        return null;
    };
    /**
     *
     *
     * @param {any} arg
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doBackendUIAction = function (arg) {
    };
    /**
     *
     *
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.isEnableBatchAdd = function () {
        return false;
    };
    /**
     *
     *
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.isBatchAddOnly = function () {
        return false;
    };
    /**
     *
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            var node = null;
            var keys = params.srfkey;
            var dataInfo = params.srfmajortext;
            var nodeType = params.srfnodetype;
            return { srfkeys: keys, srfkey: keys, dataInfo: dataInfo, srfnodetype: nodeType };
        }
        return {};
    };
    /**
     * 树导航部件选中变化
     *
     * @param {*} [data={}]
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.treeExpBarSelectionChange = function (data) {
        if (data === void 0) { data = {}; }
        if (!data || Object.keys(data).length === 0 || !data.viewid) {
            return;
        }
        var routeString = data.viewid;
        // if (!this.hasChildRoute(routeString.toLocaleLowerCase())) {
        //     return;
        // }
        var viewParam = data.viewParam;
        Object.assign(viewParam, { refreshView: true });
        this.openView(routeString.toLocaleLowerCase(), viewParam);
    };
    /**
     * 是否子路由
     *
     * @private
     * @param {string} link
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.hasChildRoute = function (link) {
        var hasChildRoute = true;
        return hasChildRoute;
    };
    IBizTreeExpViewController.REFRESHMODE_CURRENTNODE = 'CURRENTNODE';
    IBizTreeExpViewController.REFRESHMODE_PARENTNODE = 'PARENTNODE';
    IBizTreeExpViewController.REFRESHMODE_ALLNODE = 'ALLNODE';
    IBizTreeExpViewController.REFRESHMODE_NONE = 'NONE';
    return IBizTreeExpViewController;
}(IBizMainViewController));
