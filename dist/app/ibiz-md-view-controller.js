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
 * 多项数据视图控制器
 *
 * @class IBizMDViewController
 * @extends {IBizMainViewController}
 */
var IBizMDViewController = /** @class */ (function (_super) {
    __extends(IBizMDViewController, _super);
    /**
     * Creates an instance of IBizMDViewController.
     * 创建 IBizMDViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizMDViewController
     */
    function IBizMDViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 当前数据主键
         *
         * @type {string}
         * @memberof IBizMDViewController
         */
        _this.currentDataKey = '';
        /**
         * 是否支持多选
         *
         * @type {boolean}
         * @memberof IBizMDViewController
         */
        _this.multiSelect = false;
        /**
         * 快速搜索值
         *
         * @type {string}
         * @memberof IBizMDViewController
         */
        _this.searchValue = '';
        /**
         * 父数据改变
         *
         * @type {boolean}
         * @memberof IBizMDViewController
         */
        _this.parentDataChanged = false;
        /**
         * 表格是否支持行编辑
         *
         * @type {boolean}
         * @memberof IBizMDViewController
         */
        _this.isInGridRowEdit = false;
        /**
         * 实体支持快速搜索属性
         *
         * @type {Array<any>}
         * @memberof IBizMDViewController
         */
        _this.quickSearchEntityDEFields = [];
        /**
         * 快速搜索提示信息
         *
         * @type {string}
         * @memberof IBizMDViewController
         */
        _this.quickSearchTipInfo = '';
        _this.regQuickSearchDEFileds();
        return _this;
    }
    /**
     * 初始化部件对象
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        this.parentDataChanged = false;
        var mdctrl = this.getMDCtrl();
        if (mdctrl) {
            // 多数据部件选中
            mdctrl.on(IBizMDControl.SELECTIONCHANGE).subscribe(function (args) {
                _this.onSelectionChange(args);
            });
            // 多数据部件加载之前
            mdctrl.on(IBizMDControl.BEFORELOAD).subscribe(function (args) {
                _this.onStoreBeforeLoad(args);
            });
            // 多数据部件加载完成
            mdctrl.on(IBizMDControl.LOADED).subscribe(function (args) {
                _this.onStoreLoad(args);
            });
            // 多数据部件状态改变
            mdctrl.on(IBizDataGrid.CHANGEEDITSTATE).subscribe(function (args) {
                _this.onGridRowEditChange(undefined, args, undefined);
            });
            // 多数据界面行为
            mdctrl.on(IBizMDControl.UIACTION).subscribe(function (args) {
                if (args.tag) {
                    _this.doUIAction(args.tag, args.data);
                }
            });
            if (this.isEnableQuickSearch()) {
                var columns_1 = mdctrl.getColumns();
                var columns_name = Object.keys(columns_1);
                var _quickFields_1 = [];
                columns_name.forEach(function (name) {
                    var index = _this.quickSearchEntityDEFields.findIndex(function (item) { return Object.is(item.name, name); });
                    if (index !== -1) {
                        _quickFields_1.push(columns_1[name].caption);
                    }
                });
                this.quickSearchTipInfo = _quickFields_1.join('/');
            }
        }
        var searchform = this.getSearchForm();
        if (searchform) {
            // 搜索表单加载完成
            searchform.on(IBizForm.FORMLOADED).subscribe(function (args) {
                _this.onSearchFormSearched(_this.isLoadDefault());
            });
            // 搜索表单搜索触发，手动触发
            searchform.on(IBizSearchForm.FORMSEARCHED).subscribe(function (args) {
                _this.onSearchFormSearched(true);
            });
            // 搜索表单重置
            searchform.on(IBizSearchForm.FORMRESETED).subscribe(function (args) {
                _this.onSearchFormReseted();
            });
            // 搜索表单值变化
            searchform.on(IBizForm.FORMFIELDCHANGED).subscribe(function (args) {
                if (args == null) {
                    _this.onSearchFormFieldChanged('', null, null);
                }
                else {
                    _this.onSearchFormFieldChanged(args.name, args.field, args.value);
                    _this.onSearchFormFieldValueCheck(args.name, args.field.getValue());
                }
            });
            searchform.setOpen(!this.isEnableQuickSearch());
        }
    };
    /**
     * 多数据视图加载，加载部件
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        if (this.getSearchForm()) {
            var viewparams = {};
            Object.assign(viewparams, this.getViewParam());
            this.getSearchForm().autoLoad(viewparams);
        }
        else if (this.isLoadDefault()) {
            this.load();
        }
    };
    /**
     * 加载多视图部件
     *
     * @param {*} [opt={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.load = function (opt) {
        if (opt === void 0) { opt = {}; }
        if (this.getMDCtrl()) {
            this.getMDCtrl().load(opt);
        }
    };
    /**
     * 执行快速搜索
     *
     * @param {*} event
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onQuickSearch = function (event) {
        if (!Object.is(this.searchValue, event)) {
            this.searchValue = event;
        }
        if (this.isEnableQuickSearch()) {
            this.onSearchFormSearched(true);
        }
    };
    /**
     * 清空快速搜索值
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.clearQuickSearchValue = function () {
        this.searchValue = undefined;
        this.onRefresh();
    };
    /**
     * 搜索表单打开
     *
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.openSearchForm = function () {
        if (!this.isEnableQuickSearch()) {
            return;
        }
        var searchForm = this.getSearchForm();
        if (searchForm) {
            searchForm.setOpen(!searchForm.opened);
        }
    };
    /**
     * 获取搜索表单对象
     *
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getSearchForm = function () {
        return undefined;
    };
    /**
     * 获取所有多项数据
     *
     * @returns {Array<any>}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getAllData = function () {
        if (this.getMDCtrl()) {
            return this.getMDCtrl().getAllData();
        }
        return [];
    };
    /**
     * 搜索表单属性值发生变化
     *
     * @param {string} fieldname
     * @param {*} field
     * @param {*} value
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSearchFormFieldChanged = function (fieldname, field, value) {
    };
    /**
     * 搜索表单属性值检测
     *
     * @param {string} fieldname
     * @param {string} value
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSearchFormFieldValueCheck = function (fieldname, value) {
    };
    /**
     * 数据加载之前
     *
     * @param {any} sender
     * @param {any} args
     * @param {any} e
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onStoreBeforeLoad = function (args) {
        var fetchParam = {};
        if (this.getViewParam() && Object.keys(this.getViewParam()).length > 0) {
            Object.assign(fetchParam, this.getViewParam());
        }
        if (this.getParentMode() && Object.keys(this.getParentMode()).length > 0) {
            Object.assign(fetchParam, this.getParentMode());
        }
        if (this.getParentData() && Object.keys(this.getParentData()).length > 0) {
            Object.assign(fetchParam, this.getParentData());
        }
        if ((this.getSearchForm() && this.getSearchCond() && this.getSearchForm().isOpen()) || !this.isEnableQuickSearch()) {
            Object.assign(fetchParam, this.getSearchCond());
        }
        // //是否有自定义查询
        // if (this.searchform && this.searchform.isCustomSearch()) {
        // 	Object.assign(fetchParam, this.searchform.getCustomSearchVal());
        // }
        // 获取关系数据
        if (this.getReferData()) {
            Object.assign(fetchParam, { srfreferdata: JSON.stringify(this.getReferData()) });
        }
        // 获取快速搜索里的搜索参数
        if (this.isEnableQuickSearch() && this.searchValue !== undefined) {
            Object.assign(fetchParam, { query: this.searchValue });
        }
        Object.assign(args, fetchParam);
    };
    /**
     * 数据加载完成
     *
     * @param {any} sender
     * @param {any} args
     * @param {any} e
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onStoreLoad = function (args) {
        var _this = this;
        var lastActive = null;
        if (this.currentDataKey != null && !Object.is(this.currentDataKey, '') && args && args.items) {
            args.items.forEach(function (element) {
                if (Object.is(element.srfkey, _this.currentDataKey)) {
                    lastActive = element;
                    return false;
                }
            });
        }
        if (lastActive) {
            this.getMDCtrl().setSelection(lastActive);
            this.calcToolbarItemState(true, lastActive.srfdataaccaction);
        }
        else {
            this.currentDataKey = null;
            // this.fireEvent(MDViewControllerBase.SELECTIONCHANGE, this, []);
            this.fire(IBizMDViewController.SELECTIONCHANGE, []);
            this.calcToolbarItemState(false);
        }
        this.parentDataChanged = false;
        this.reloadUICounters();
    };
    /**
     * 数据被激活<最典型的情况就是行双击>
     *
     * @param {*} [record={}] 行记录
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onDataActivated = function (record) {
        if (record === void 0) { record = {}; }
        if (!record || !record.srfkey) {
            return;
        }
        this.fire(IBizMDViewController.DATAACTIVATED, [record]);
        this.currentDataKey = record.srfkey;
        this.calcToolbarItemState(true, record.srfdataaccaction);
        this.onEditData({ data: record });
    };
    /**
     * 行选择变化
     *
     * @param {Array<any>} selected
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSelectionChange = function (selected) {
        if (selected == null || selected.length == 0) {
            this.currentDataKey = null;
        }
        else {
            this.currentDataKey = selected[0].srfkey;
        }
        this.fire(IBizMDViewController.SELECTIONCHANGE, selected[0]);
        this.calcToolbarItemState(this.currentDataKey != null, (this.currentDataKey != null) ? selected[0].srfdataaccaction : null);
    };
    /**
     * 改变工具栏启用编辑按钮信息
     *
     * @param {any} sender
     * @param {any} args
     * @param {any} e
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onGridRowEditChange = function (sender, args, e) {
        // var editButton = null;
        // var submitButton = null;
        // if (this.toolbar && this.toolbar.items) {
        //     .each(this.toolbar.items, function (index, ele) {
        //         if (ele.attr('data-ibiz-tag') == 'NewRow')
        //             submitButton = ele;
        //         if (ele.attr('data-ibiz-tag') == 'ToggleRowEdit')
        //             editButton = ele;
        //     });
        // }
        // this.isInGridRowEdit = args.state;
        // if (editButton) {
        //     if (!args.state) {
        //         editButton.find('span').html(IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE', '启用编辑'));
        //     } else {
        //         editButton.find('span').html(IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE2', '关闭编辑'));
        //     }
        // }
        // if (submitButton)
        //     submitButton[0].disabled = !args.state;
    };
    /**
     * 计算工具栏项状态-<例如 根据是否有选中数据,设置 工具栏按钮是否可点击>
     *
     * @param {boolean} hasdata 是否有数据
     * @param {*} [dataaccaction]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.calcToolbarItemState = function (hasdata, dataaccaction) {
        _super.prototype.calcToolbarItemState.call(this, hasdata, dataaccaction);
        var toolbar = this.getToolBar();
        if (!toolbar) {
            return;
        }
        if (Object.keys(toolbar.getItems()).length > 0) {
            var name_arr = Object.keys(toolbar.getItems());
            var btn_items_1 = toolbar.getItems();
            name_arr.forEach(function (name) {
                var item = btn_items_1[name];
                if (Object.is(item.tag, 'NewRow')) {
                    toolbar.setItemDisabled(name, false);
                }
            });
        }
    };
    /**
     * 实体数据发生变化
     *
     * @param {*} [dataaccaction={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onDataAccActionChange = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        var toolBar = this.getToolBar();
        if (!toolbar) {
            return;
        }
        toolBar.updateAccAction(Object.assign({}, this.dataaccaction, dataaccaction));
        // if (this.getToolbar())
        //     this.getToolbar().updateAccAction(dataaccaction);
        // if (this.mintoolbar)
        //     this.mintoolbar.updateAccAction(dataaccaction);
        // if (this.floattoolbar)
        //     this.floattoolbar.updateAccAction(dataaccaction);
    };
    /**
     * 新建数据
     *
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onNewData = function () {
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
        if (this.isEnableRowEdit() && (this.getMDCtrl() && this.getMDCtrl().getOpenEdit())) {
            this.doNewRow(loadParam);
            return;
        }
        if (this.isEnableBatchAdd()) {
            this.doNewDataBatch(loadParam);
            return;
        }
        if (this.doNewDataWizard(loadParam)) {
            return;
        }
        Object.assign(loadParam, { openerid: this.getId() });
        this.doNewDataNormal(loadParam);
    };
    /**
     * 批量新建
     *
     * @param {*} [arg={}]
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNewDataBatch = function (arg) {
        var _this = this;
        if (arg === void 0) { arg = {}; }
        var mpickupview = this.getMPickupView(arg);
        if (mpickupview && !Object.is(mpickupview.className, '')) {
            this.openModal(mpickupview).subscribe(function (data) {
                console.log(data);
                if (data && Object.is(data.ret, 'OK')) {
                    _this.onMPickupWindowClose(data.selection);
                }
            });
            return true;
        }
        return false;
    };
    /**
     * 批量新建关闭
     *
     * @param {Array<any>} selection
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onMPickupWindowClose = function (selection) {
        if (selection) {
            this.addDataBatch(selection);
        }
        return;
    };
    /**
     * 批量添加数据
     *
     * @param {Array<any>} selectedDatas
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.addDataBatch = function (selectedDatas) {
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.ADDDATABATCH.INFO', '[addDataBatch]方法必须重写！'), 2);
        this.iBizNotification.warning('警告', '[addDataBatch]方法必须重写！');
    };
    /**
     * 向导新建数据
     *
     * @param {any} arg
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNewDataWizard = function (arg) {
        var _this = this;
        var hasWizardView = false;
        var wizardView = this.getNewDataWizardView(arg);
        if (wizardView) {
            // 打开模态框
            this.openModal(wizardView).subscribe(function (result) {
                if (result && Object.is(result.ret, 'OK')) {
                    var data = result.selection[0];
                    _this.doNewDataNormal(Object.assign({ srfnewmode: data.srfkey }, arg));
                }
            });
            hasWizardView = true;
        }
        return hasWizardView;
    };
    /**
     * 向导新建数据窗口关闭
     *
     * @param {any} win
     * @param {any} eOpts
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onNewDataWizardWindowClose = function (win, eOpts) {
        // var this = win.scope;
        // var loadParam = {};//win.userData;
        // var dialogResult = win.dialogResult;
        // if (!dialogResult) return;
        // if (dialogResult == 'ok') {
        //     var selectedData = win.selectedData;
        //     if (selectedData) {
        //         var newMode = selectedData.srfkey;
        //         loadParam.srfnewmode = newMode;
        //         var view = this.getNewDataView(loadParam);
        //         if (view == null) {
        //             return;
        //         }
        //         this.openDataView(view);
        //     }
        // }
        // return;
    };
    /**
     * 常规新建数据
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNewDataNormal = function (arg) {
        var view = this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        var openMode = view.openMode;
        if (!openMode || Object.is(openMode, '')) {
            view.openMode = 'INDEXVIEWTAB';
        }
        if (!view.state) {
            view.state = 'new';
            var viewParam = {};
            Object.assign(viewParam, view.viewParam);
            if (viewParam && viewParam.srfnewmode && !Object.is(viewParam.srfnewmode, '')) {
                var srfnewmode = viewParam.srfnewmode.split('@').join('__');
                view.state = view.state + '_' + srfnewmode.toLowerCase();
            }
        }
        return this.openDataView(view);
    };
    /**
     * 编辑数据
     *
     * @param {any} arg
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onEditData = function (arg) {
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
            Object.assign(loadParam, { srfkey: arg.data.srfkey, srfdeid: arg.data.srfdeid });
        }
        var editMode = this.getEditMode(arg.data);
        if (editMode) {
            loadParam.srfeditmode = editMode;
            loadParam.srfviewmode = editMode;
        }
        if (arg.data.srfmstag) {
            loadParam.srfeditmode2 = arg.data.srfmstag;
        }
        Object.assign(loadParam, { openerid: this.getId() });
        this.doEditDataNormal(loadParam);
    };
    /**
     * 执行常规编辑数据
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doEditDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var view = this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        var openMode = view.openMode;
        if (!openMode || Object.is(openMode, '')) {
            view.openMode = 'INDEXVIEWTAB';
        }
        if (!view.state) {
            view.state = 'edit';
            var viewParam = {};
            Object.assign(viewParam, view.viewParam);
            if (Object.keys(viewParam).length > 0) {
                var srfeditmode = '';
                if (viewParam.srfeditmode && !Object.is(viewParam.srfeditmode, '')) {
                    srfeditmode = viewParam.srfeditmode.split('@').join('__');
                }
                // 实体主状态
                if (viewParam.srfeditmode2 && !Object.is(viewParam.srfeditmode2, '') && !Object.is(viewParam.srfeditmode2, 'MSTAG:null')) {
                    srfeditmode = viewParam.srfeditmode2.split(':').join('__');
                }
                if (!Object.is(srfeditmode, '')) {
                    view.state = "{view.state}_{srfeditmode.toLowerCase()}";
                }
            }
        }
        return this.openDataView(view);
    };
    /**
     * 打开数据视图
     *
     * @param {*} [view={}]
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.openDataView = function (view) {
        var _this = this;
        if (view === void 0) { view = {}; }
        var openMode = view.openMode;
        if (view.redirect) {
            this.redirectOpenView(view);
            return false;
        }
        if (openMode != undefined) {
            if (openMode == 'POPUPMODAL') {
                view.modal = true;
            }
            else if (openMode == 'POPUP') {
                view.modal = true;
            }
            else if (openMode == '' || openMode == 'INDEXVIEWTAB') {
                view.modal = false;
            }
        }
        if (view.modal) {
            var modalview = this.openModal(view);
            modalview.subscribe(function (result) {
                if (result && Object.is(result.ret, 'OK')) {
                    _this.onRefresh();
                }
            });
        }
        else {
            this.openWindow(view.viewurl, view.viewparam);
        }
        return true;
    };
    /**
     * 获取编辑模式
     *
     * @param {any} data
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getEditMode = function (data) {
        return data.srfdatatype;
    };
    /**
     * 获取编辑视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getEditDataView = function (arg) {
        return undefined;
    };
    /**
     * 获取新建视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getNewDataView = function (arg) {
        return undefined;
    };
    /**
     * 获取新建向导视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getNewDataWizardView = function (arg) {
        return undefined;
    };
    /**
     * 获取多选视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getMPickupView = function (arg) {
        return undefined;
    };
    /**
     * 获取多数据对象
     *
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getMDCtrl = function () {
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.GETMDCTRL.INFO', '[getMDCtrl]方法必须重写！'), 2);
        this.iBizNotification.warning('警告', '[getMDCtrl]方法必须重写！');
    };
    /**
     * 视图刷新
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    };
    /**
     *
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSetParentData = function () {
        _super.prototype.onSetParentData.call(this);
        this.parentDataChanged = true;
    };
    /**
     * 获取搜索条件
     *
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getSearchCond = function () {
        if (this.getSearchForm()) {
            return this.getSearchForm().getValues();
        }
        return undefined;
    };
    /**
     * 搜索表单搜索执行
     *
     * @param {boolean} isload 是否加载数据
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSearchFormSearched = function (isload) {
        if (this.getMDCtrl() && isload) {
            this.getMDCtrl().setCurPage(1);
            this.getMDCtrl().load();
        }
    };
    /**
     * 搜索表单重置完成
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSearchFormReseted = function () {
        if (this.getMDCtrl() && (!this.isLoadDefault())) {
            this.getMDCtrl().load();
        }
    };
    /**
     *
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.tag, 'Help')) {
            this.doHelp(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Edit')) {
            this.doEdit(params);
            return;
        }
        if (Object.is(uiaction.tag, 'View')) {
            this.doView(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Print')) {
            this.doPrint(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ExportExcel')) {
            this.doExportExcel(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ExportModel')) {
            this.doExportModel(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Copy')) {
            this.doCopy(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Remove')) {
            this.doRemove(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Import')) {
            this.doImport(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Refresh')) {
            this.doRefresh(params);
            return;
        }
        if (Object.is(uiaction.tag, 'NewRow')) {
            this.doCheck(params);
            return;
        }
        if (Object.is(uiaction.tag, 'New')) {
            this.doNew(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ToggleRowEdit')) {
            this.doToggleRowEdit(params);
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    /**
     * 多数据项界面_行编辑操作
     *
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doToggleRowEdit = function (params) {
        if (params === void 0) { params = {}; }
        if (this.getMDCtrl() && typeof (this.getMDCtrl().isOpenEdit) === 'function') {
            this.getMDCtrl().isOpenEdit(params);
        }
    };
    /**
     * 多数据项界面_新建行操作
     *
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNewRow = function (params) {
        if (params === void 0) { params = {}; }
        if (this.getMDCtrl() && typeof (this.getMDCtrl().newRowAjax) === 'function') {
            this.getMDCtrl().newRowAjax(params);
        }
    };
    /**
     * 多数据项界面_检测行操作
     *
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doCheck = function (params) {
        if (params === void 0) { params = {}; }
        if (this.getMDCtrl() && typeof (this.getMDCtrl().saveAllEditRow) === 'function') {
            this.getMDCtrl().saveAllEditRow();
        }
    };
    /**
     * 多数据项界面_帮助操作
     *
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doHelp = function (params) {
        if (params === void 0) { params = {}; }
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.DOHELP.INFO', '帮助操作'), 0);
        this.iBizNotification.warning('警告', '帮助操作');
    };
    /**
     * 多数据项界面_编辑操作
     *
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
        // 获取要编辑的数据集合
        if (params && params.srfkey) {
            // if (.isFunction(this.getMDCtrl().findItem)) {
            //     params = this.getMDCtrl().findItem('srfkey', params.srfkey);
            // }
            var arg = { data: params };
            this.onEditData(arg);
            return;
        }
        var selectedData = this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length === 0) {
            return;
        }
        this.onEditData({ data: selectedData[0] });
    };
    /**
     * 多数据项界面_行编辑操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doView = function (params) {
        this.doEdit(params);
    };
    /**
     * 多数据项界面_打印操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doPrint = function (params) {
    };
    /**
     * 多数据项界面_导出操作（Excel）
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doExportExcel = function (params) {
        // if (params.itemtag == '') {
        // }
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.DOEXPORTEXCEL.INFO', '导出操作（Excel）'), 0);
        this.iBizNotification.warning('警告', '导出操作（Excel）');
    };
    /**
     * 多数据项界面_导出数据模型
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doExportModel = function (params) {
        this.iBizNotification.warning('警告', '导出数据模型');
    };
    /**
     * 多数据项界面_拷贝操作
     *
     * @param {any} params
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doCopy = function (params) {
        // 获取要拷贝的数据集合
        if (!this.getMDCtrl()) {
            return;
        }
        var selectedData = this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length == 0) {
            return;
        }
        var arg = { data: selectedData[0], srfcopymode: true };
        this.onEditData(arg);
    };
    /**
     * 多数据项界面_删除操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doRemove = function (params) {
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.DOREMOVE.INFO', '删除操作'), 0);
        this.iBizNotification.warning('警告', '删除操作');
    };
    /**
     * 多数据项界面_数据导入栏
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doImport = function (params) {
        if (this.getMDCtrl() && this.getDEName() !== '') {
            this.getMDCtrl().doImportData(this.getDEName());
        }
    };
    /**
     * 多数据项界面_刷新操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doRefresh = function (params) {
        this.onRefresh();
    };
    /**
     * 多数据项界面_新建操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNew = function (params) {
        this.onNewData();
    };
    /**
     *
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doWFUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.actionmode, 'WFBACKEND')) {
            var selectedData = this.getMDCtrl().getSelection();
            if (selectedData == null || selectedData.length === 0) {
                return;
            }
            var keys_1 = '';
            selectedData.forEach(function (element, index) {
                var key = element.srfkey;
                if (!Object.is(keys_1, '')) {
                    keys_1 += ';';
                }
                keys_1 += key;
            });
            if (this.getMDCtrl()) {
                this.getMDCtrl().wfsubmit({ srfwfiatag: uiaction.tag, srfkeys: keys_1 });
                return;
            }
        }
        _super.prototype.doWFUIAction.call(this, uiaction, params);
    };
    /**
     *
     *
     * @param {any} win
     * @param {any} data
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
        // this.load();
        this.onRefresh();
    };
    /**
     * 获取UI操作参数
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getFrontUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var arg = {};
        var front_arg = _super.prototype.getFrontUIActionParam.call(this, uiaction, params);
        if (front_arg) {
            Object.assign(arg, front_arg);
        }
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        var target = 'NONE';
        if (uiaction.actiontarget) {
            target = uiaction.actiontarget;
        }
        if (!Object.is(target, 'NONE')) {
            var selectedData = this.getMDCtrl().getSelection();
            if (!(selectedData == null || selectedData.length === 0)) {
                var valueitem_1 = 'srfkey';
                var paramkey = 'srfkeys';
                var paramjo = null;
                if (uiaction.actionparams) {
                    var actionparams = uiaction.actionparams;
                    valueitem_1 = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem_1;
                    paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                    paramjo = actionparams.paramjo ? actionparams.paramjo : {};
                }
                if (Object.is(target, 'SINGLEKEY')) {
                    arg[paramkey] = selectedData[0][valueitem_1];
                }
                else if (Object.is(target, 'SINGLEDATA')) {
                    Object.assign(arg, selectedData[0]);
                }
                else if (Object.is(target, 'MULTIKEY')) {
                    var keys_2 = '';
                    selectedData.forEach(function (item) {
                        var key = item[valueitem_1];
                        if (!Object.is(keys_2, '')) {
                            keys_2 += ';';
                        }
                        keys_2 += key;
                    });
                    arg[paramkey] = keys_2;
                }
                if (paramjo) {
                    Object.assign(arg, paramjo);
                }
            }
        }
        return arg;
    };
    /**
     * 获取后天界面行为参数
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var arg = {};
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        var bSingle = false;
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY')) {
            bSingle = true;
        }
        var selectedData = this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length === 0)) {
            var valueitem_2 = 'srfkey';
            var paramkey = 'srfkeys';
            var paramitems_1 = '';
            var paramjo = null;
            var infoitem = 'srfmajortext';
            if (uiaction.actionparams) {
                var actionparams = uiaction.actionparams;
                valueitem_2 = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem_2;
                paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                infoitem = (actionparams.textitem && !Object.is(actionparams.textitem, '')) ? actionparams.textitem.toLowerCase() : infoitem;
                paramjo = actionparams.paramjo ? actionparams.paramjo : {};
            }
            if (bSingle) {
                paramitems_1 = selectedData[0][valueitem_2];
            }
            else {
                selectedData.forEach(function (item) {
                    var key = item[valueitem_2];
                    if (!Object.is(paramitems_1, '')) {
                        paramitems_1 += ';';
                    }
                    paramitems_1 += key;
                });
            }
            arg[paramkey] = paramitems_1;
            if (paramjo) {
                Object.assign(arg, paramjo);
            }
        }
        return arg;
    };
    /**
     * 移动记录
     *
     * @param {any} target
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.moveRecord = function (target) {
    };
    /**
     *
     *
     * @param {any} arg
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doBackendUIAction = function (arg) {
        if (this.getMDCtrl()) {
            this.getMDCtrl().doUIAction(arg);
        }
    };
    /**
     * 隐藏关系列
     *
     * @param {any} parentMode
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doHideParentColumns = function (parentMode) {
    };
    /**
     *
     *
     * @param {any} arg
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onPrintData = function (arg) {
        this.doPrintDataNormal(arg);
    };
    /**
     * 常规新建数据
     *
     * @param {any} arg
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doPrintDataNormal = function (arg) {
        // var view = this.getPrintDataView(arg);
        // if (view == null) {
        //     return false;
        // }
        // var viewurl = view.viewurl;
        // if (!viewurl || viewurl == '') {
        //     viewurl = BASEURL + '/ibizutil/print.pdf';
        // }
        // else {
        //     viewurl = BASEURL + viewurl;
        // }
        // viewurl = viewurl + (viewurl.indexOf('?') == -1 ? '?' : '&') + .param(view.viewparam);
        // window.open(viewurl, '_blank');
        return true;
    };
    /**
     *
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getPrintDataView = function (arg) {
        // return null;
        return undefined;
    };
    /**
     * 是否默认加载
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isLoadDefault = function () {
        return true;
    };
    /**
     * 支持批量添加
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isEnableBatchAdd = function () {
        return false;
    };
    /**
     * 是否支持快速搜索
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isEnableQuickSearch = function () {
        return true;
    };
    /**
     * 只支持批量添加
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isBatchAddOnly = function () {
        return false;
    };
    /**
     * 是否支持行编辑
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isEnableRowEdit = function () {
        return false;
    };
    /**
     * 是否支持多选
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isEnableMultiSelect = function () {
        return this.multiSelect;
    };
    /**
     * 设置支持多选
     *
     * @param {boolean} multiSelect
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.setEnableMultiSelect = function (multiSelect) {
        this.multiSelect = multiSelect;
    };
    /**
     * 注册快速搜索实体属性
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.regQuickSearchDEFileds = function () {
    };
    /*****************事件声明************************/
    /**
     * 数据激活<例如：表格行双击>
     *
     * @static
     * @memberof IBizMDViewController
     */
    IBizMDViewController.DATAACTIVATED = 'DATAACTIVATED';
    /**
     * 数据选择变化
     *
     * @static
     * @memberof IBizMDViewController
     */
    IBizMDViewController.SELECTIONCHANGE = 'SELECTIONCHANGE';
    return IBizMDViewController;
}(IBizMainViewController));
