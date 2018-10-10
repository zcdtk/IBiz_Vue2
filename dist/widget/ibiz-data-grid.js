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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/**
 * 表格部件控制器
 *
 * @class IBizDataGrid
 * @extends {IBizMDControl}
 */
var IBizDataGrid = /** @class */ (function (_super) {
    __extends(IBizDataGrid, _super);
    /**
     * Creates an instance of IBizDataGrid.
     * 创建 IBizDataGrid 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizDataGrid
     */
    function IBizDataGrid(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 是否全部选中
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.allChecked = false;
        /**
         * 备份数据（行编辑使用）
         *
         * @type {Array<any>}
         * @memberof IBizDataGrid
         */
        _this_1.backupData = [];
        /**
         * 当前显示页码
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.curPage = 1;
        /**
         * 表格编辑项集合
         *
         * @type {*}
         * @memberof IBizDataGrid
         */
        _this_1.editItems = {};
        /**
         * 表格全部排序字段
         *
         * @type {Array<any>}
         * @memberof IBizDataGrid
         */
        _this_1.gridSortField = [];
        /**
         * 表格行选中动画
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.indeterminate = false;
        /**
         * 是否启用行编辑
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.isEnableRowEdit = false;
        /**
         * 每次加载条数
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.limit = 20;
        /**
         * 是否支持多项
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.multiSelect = true;
        /**
         * 最大导出行数
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.maxExportRow = 1000;
        /**
         * 打开行编辑
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.openRowEdit = false;
        /**
         * 行多项选中设置，用于阻塞多次触发选中效果
         *
         * @private
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.rowsSelection = false;
        /**
         * 查询开始条数
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.start = 0;
        /**
         * 编辑行数据处理
         *
         * @type {*}
         * @memberof IBizDataGrid
         */
        _this_1.state = {};
        /**
         * 总条数
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.totalrow = 0;
        var _this = _this_1;
        _this.regEditItems();
        return _this_1;
    }
    /**
     * 加载数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.load = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var opt = {};
        Object.assign(opt, arg);
        if (this.loading) {
            return;
        }
        Object.assign(opt, { srfctrlid: this.getName(), srfaction: 'fetch' });
        if (!opt.start) {
            Object.assign(opt, { start: (this.curPage - 1) * this.limit });
        }
        if (!opt.limit) {
            Object.assign(opt, { limit: this.limit });
        }
        Object.assign(opt, { sort: JSON.stringify(this.gridSortField) });
        // 设置为正在加载，使load方法在加载中时不可用。
        this.loading = true;
        // 发送加载数据前事件
        this.fire(IBizMDControl.BEFORELOAD, opt);
        this.allChecked = false;
        this.indeterminate = false;
        this.selections = [];
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (response) {
            if (!response.items || response.ret !== 0) {
                if (response.errorMessage) {
                    // this.showToast(this.$showErrorToast, '', response.errorMessage);
                }
                _this_1.loading = false;
                return;
            }
            _this_1.items = _this_1.rendererDatas(response.items);
            _this_1.totalrow = response.totalrow;
            _this_1.fire(IBizMDControl.LOADED, response.items);
            _this_1.loading = false;
        }, function (error) {
            _this_1.loading = false;
            console.log(error.info);
        });
    };
    /**
     * 刷新数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.refresh = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var opt = {};
        Object.assign(opt, arg);
        if (this.loading) {
            return;
        }
        Object.assign(opt, { srfctrlid: this.getName(), srfaction: 'fetch' });
        if (!opt.start) {
            Object.assign(opt, { start: (this.curPage - 1) * this.limit });
        }
        if (!opt.limit) {
            Object.assign(opt, { limit: this.limit });
        }
        Object.assign(opt, { sort: JSON.stringify(this.gridSortField) });
        // 设置为正在加载，使load方法在加载中时不可用。
        this.loading = true;
        // 发送加载数据前事件
        this.fire(IBizMDControl.BEFORELOAD, opt);
        this.allChecked = false;
        this.indeterminate = false;
        this.selections = [];
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (response) {
            if (!response.items || response.ret !== 0) {
                if (response.errorMessage) {
                    // this.showToast(this.$showErrorToast, '', response.errorMessage);
                }
                _this_1.loading = false;
                return;
            }
            _this_1.fire(IBizMDControl.LOADED, response.items);
            _this_1.items = _this_1.rendererDatas(response.items);
            _this_1.totalrow = response.totalrow;
            _this_1.loading = false;
        }, function (error) {
            _this_1.loading = false;
            console.log(error.info);
        });
    };
    /**
     * 删除数据
     *
     * @param {*} [arg={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.remove = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        Object.assign(params, arg);
        Object.assign(params, { srfaction: 'remove', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (response) {
            if (response.ret === 0) {
                if (_this_1.allChecked) {
                    var rows = _this_1.curPage * _this_1.limit;
                    if (_this_1.totalrow <= rows) {
                        _this_1.curPage = _this_1.curPage - 1;
                        if (_this_1.curPage === 0) {
                            _this_1.curPage = 1;
                        }
                    }
                }
                _this_1.load({});
                _this_1.fire(IBizDataGrid.REMOVED, {});
                if (response.info && response.info !== '') {
                    // this.showToast(this.$showSuccessToast, '', '删除成功!');
                }
                _this_1.selections = [];
                IBizUtil.processResult(response);
            }
            else {
                // this.showToast(this.$showErrorToast, '', '删除数据失败,' + response.info);
            }
        }, function (error) {
            // this.showToast(this.$showErrorToast, '', '删除数据失败');
        });
    };
    /**
     * 行数据复选框单选
     *
     * @param {boolean} value
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.onItemSelect = function (value, item) {
        if (item === void 0) { item = {}; }
        if (item.disabled) {
            return;
        }
        if (this.isEnableRowEdit && this.openRowEdit) {
            return;
        }
        var index = this.selections.findIndex(function (data) { return Object.is(data.srfkey, item.srfkey); });
        if (index === -1) {
            this.selections.push(item);
        }
        else {
            this.selections.splice(index, 1);
        }
        if (!this.multiSelect) {
            this.selections.forEach(function (data) {
                data.checked = false;
            });
            this.selections = [];
            if (index === -1) {
                this.selections.push(item);
            }
        }
        this.rowsSelection = true;
        this.allChecked = this.selections.length === this.items.length ? true : false;
        this.indeterminate = (!this.allChecked) && (this.selections.length > 0);
        item.checked = value;
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
    };
    /**
     * 行数据复选框全选
     *
     * @param {boolean} value
     * @memberof IBizMDService
     */
    IBizDataGrid.prototype.selectAll = function (value) {
        var _this_1 = this;
        if (this.isEnableRowEdit && this.openRowEdit) {
            return;
        }
        if (!this.multiSelect) {
            setTimeout(function () {
                _this_1.allChecked = false;
            });
            return;
        }
        this.items.forEach(function (item) {
            if (!item.disabled) {
                item.checked = value;
            }
        });
        this.selections = [];
        if (value) {
            this.selections = this.items.slice();
        }
        this.indeterminate = (!value) && (this.selections.length > 0);
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
    };
    /**
     * 导出数据
     *
     * @param {any} params
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.exportData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var params = {};
        this.fire(IBizMDControl.BEFORELOAD, params);
        if (params.search) {
            Object.assign(params, { query: params.search });
        }
        Object.assign(params, { srfaction: 'exportdata', srfctrlid: this.getName() });
        if (Object.is(arg.itemTag, 'all')) {
            Object.assign(params, { start: 0, limit: this.maxExportRow });
        }
        else if (Object.is(arg.itemTag, 'custom')) {
            var nStart = arg.exportPageStart;
            var nEnd = arg.exportPageEnd;
            if (nStart < 1 || nEnd < 1 || nStart > nEnd) {
                // this.showToast('INFO', '警告', '请输入有效的起始页');
                return;
            }
            Object.assign(params, { start: (nStart - 1) * this.limit, limit: nEnd * this.limit });
        }
        else {
            Object.assign(params, { start: (this.curPage * this.limit) - this.limit, limit: this.curPage * this.limit });
        }
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (res) {
            if (res.ret === 0) {
                if (res.downloadurl) {
                    var downloadurl = res.downloadurl;
                    if (downloadurl.indexOf('/') === 0) {
                        downloadurl = downloadurl.substring(downloadurl.indexOf('/') + 1, downloadurl.length);
                    }
                    else {
                        downloadurl = downloadurl;
                    }
                    IBizUtil.download(downloadurl);
                }
            }
            else {
                // this.showToast('ERROR', '警告', res.info);
            }
        }, function (error) {
            console.log(error.info);
        });
    };
    /**
     * 重置分页
     *
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.resetStart = function () {
        this.start = 0;
    };
    /**
     * 第几页跳转
     *
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.clickPageIndex = function () {
        var _this = this;
        _this.pageChangeFlag = true;
    };
    /**
     * 分页页数改变
     *
     * @param {number} page 页码
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.changePageIndex = function (page) {
        var _this = this;
        _this.curPage = page;
        _this.refresh();
    };
    /**
     * 每页显示条数
     *
     * @param {number} size 条数
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.changePageSize = function (size) {
        var _this = this;
        _this.curPage = 1;
        _this.limit = size;
        _this.refresh();
    };
    /**
     * 单击行选中
     *
     * @param {*} [data={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.clickRowSelect = function (data) {
        if (data === void 0) { data = {}; }
        if (data.disabled) {
            return;
        }
        if (this.doRowDataSelect(data)) {
            return;
        }
        this.fire(IBizDataGrid.ROWCLICK, this.selections);
    };
    /**
     * 双击行选中
     *
     * @param {*} [data={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.dblClickRowSelection = function (data) {
        if (data === void 0) { data = {}; }
        if (data.disabled) {
            return;
        }
        if (this.doRowDataSelect(data)) {
            return;
        }
        this.fire(IBizDataGrid.ROWDBLCLICK, this.selections);
    };
    /**
     * 表格排序
     *
     * @param {string} name 字段明显
     * @param {string} type 排序类型
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.sort = function (name, type) {
        var item = this.gridSortField.find(function (item) { return Object.is(item.property, name); });
        if (item === undefined) {
            if (Object.is('ascend', type)) {
                this.gridSortField.push({ property: name, direction: 'asc' });
            }
            else if (Object.is('descend', type)) {
                this.gridSortField.push({ property: name, direction: 'desc' });
            }
            else {
                return;
            }
        }
        var index = this.gridSortField.findIndex(function (item) {
            return Object.is(item.property, name);
        });
        if (Object.is('ascend', type)) {
            this.gridSortField[index].direction = 'asc';
        }
        else if (Object.is('descend', type)) {
            this.gridSortField[index].direction = 'desc';
        }
        else {
            this.gridSortField.splice(index, 1);
        }
        this.refresh({});
    };
    /**
     * 设置表格数据当前页
     *
     * @param {number} page 分页数量
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.setCurPage = function (page) {
        this.curPage = page;
    };
    /**
     * 设置是否支持多选
     *
     * @param {boolean} state 是否支持多选
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.setMultiSelect = function (state) {
        this.multiSelect = state;
    };
    /**
     * 界面行为
     *
     * @param {string} tag
     * @param {*} [data={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.uiAction = function (tag, data) {
        if (data === void 0) { data = {}; }
        if (data.disabled) {
            return;
        }
        if (this.doRowDataSelect(data)) {
            return;
        }
        this.fire(IBizMDControl.UIACTION, { tag: tag, data: data });
    };
    /**
     * 处理非复选框行数据选中,并处理是否激活数据
     *
     * @private
     * @param {*} [data={}]
     * @returns {boolean} 是否激活
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.doRowDataSelect = function (data) {
        if (data === void 0) { data = {}; }
        if (this.isEnableRowEdit && this.openRowEdit) {
            return;
        }
        if (this.rowsSelection) {
            this.rowsSelection = false;
            return true;
        }
        this.selections.forEach(function (data) {
            data.checked = false;
        });
        this.selections = [];
        data.checked = true;
        this.selections.push(data);
        this.indeterminate = (!this.allChecked) && (this.selections.length > 0);
        return false;
    };
    /**
     * 渲染绘制多项数据
     *
     * @param {Array<any>} items
     * @returns {Array<any>}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.rendererDatas = function (items) {
        var _this_1 = this;
        _super.prototype.rendererDatas.call(this, items);
        items.forEach(function (item) {
            var names = Object.keys(item);
            names.forEach(function (name) { item[name] = item[name] ? item[name] : ''; });
        });
        if (this.isEnableRowEdit) {
            items.forEach(function (item) { item.openeditrow = (_this_1.isEnableRowEdit) ? true : false; });
        }
        return items;
    };
    /**
     * 注册表格所有编辑项
     *
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.regEditItems = function () {
    };
    /**
     * 注册表格编辑项
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.regEditItem = function (item) {
        if (item === void 0) { item = {}; }
        if (Object.keys(item).length === 0) {
            return;
        }
        this.editItems[item.name] = item;
    };
    /**
     * 设置编辑项状态
     *
     * @param {string} srfkey
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.setEditItemState = function (srfkey) {
        var _this_1 = this;
        if (!this.state) {
            return;
        }
        if (!srfkey) {
            // this.$notification.warning('警告', '数据异常');
        }
        var editItems = {};
        var itemsName = Object.keys(this.editItems);
        itemsName.forEach(function (name) {
            var item = {};
            var _editor = JSON.stringify(_this_1.editItems[name]);
            Object.assign(item, JSON.parse(_editor));
            editItems[name] = item;
        });
        this.state[srfkey] = editItems;
    };
    /**
     * 删除信息编辑项状态
     *
     * @param {string} srfkey
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.deleteEditItemState = function (srfkey) {
        if (srfkey && this.state.hasOwnProperty(srfkey)) {
            delete this.state.srfkey;
        }
    };
    /**
     * 设置编辑项是否启用
     *
     * @param {string} srfkey
     * @param {number} type
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.setEditItemDisabled = function (srfkey, type) {
        if (this.state && this.state.hasOwnProperty(srfkey)) {
            var item_1 = this.state[srfkey];
            var itemsName = Object.keys(item_1);
            itemsName.forEach(function (name) {
                var disabled = (item_1[name].enabledcond === 3 || item_1[name].enabledcond === type);
                item_1[name].disabled = !disabled;
            });
            Object.assign(this.state[srfkey], item_1);
        }
    };
    /**
     * 获取行编辑状态
     *
     * @returns {boolean}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.getOpenEdit = function () {
        return this.openRowEdit;
    };
    /**
     * 保存表格所有编辑行 <在插件模板中提供重写>
     *
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.saveAllEditRow = function () {
    };
    /**
     * 是否启用行编辑
     *
     * @param {string} tag
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.isOpenEdit = function (tag) {
        var _this_1 = this;
        if (!this.isEnableRowEdit) {
            // this.$notification.info('提示', '未启用行编辑');
            return;
        }
        this.openRowEdit = !this.openRowEdit;
        if (this.openRowEdit) {
            this.items.forEach(function (item) { item.openeditrow = true; });
            this.selections.forEach(function (data) {
                data.checked = false;
            });
            this.selections = [];
            this.indeterminate = false;
            this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
            this.items.forEach(function (item) {
                var data = __rest(item, []);
                _this_1.backupData.push(data);
                _this_1.setEditItemState(item.srfkey);
            });
        }
        else {
            this.items = [];
            this.backupData.forEach(function (data) {
                _this_1.items.push(data);
            });
            this.backupData = [];
            this.state = {};
        }
    };
    /**
     * 编辑行数据
     *
     * @param {*} [data={}]
     * @param {number} rowindex
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.editRow = function (data, rowindex) {
        if (data === void 0) { data = {}; }
        data.openeditrow = !data.openeditrow;
        this.setEditItemState(data.srfkey);
        if (data.openeditrow) {
            var index = this.backupData.findIndex(function (item) { return Object.is(item.srfkey, data.srfkey); });
            if (index !== -1) {
                Object.assign(data, this.backupData[index]);
            }
            if (Object.is(data.srfkey, '')) {
                this.items.splice(rowindex, 1);
            }
        }
        else {
            this.setEditItemDisabled(data.srfkey, 2);
        }
    };
    /**
     * 保存编辑行数据
     *
     * @param {*} [data={}]
     * @param {number} rowindex
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.editRowSave = function (data, rowindex) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var _index = this.backupData.findIndex(function (item) { return Object.is(item.srfkey, data.srfkey); });
        var srfaction = (_index !== -1) ? 'update' : 'create';
        // if (Object.is(srfaction, 'create')) {
        //     delete data.srfkey;
        // }
        var params = { srfaction: srfaction, srfctrlid: 'grid' };
        var viewController = this.getViewController();
        if (viewController && viewController.getViewParam() && Object.keys(viewController.getViewParam()).length > 0) {
            Object.assign(params, viewController.getViewParam());
        }
        var _names = Object.keys(data);
        _names.forEach(function (name) {
            data[name] = data[name] ? data[name] : '';
        });
        Object.assign(params, data);
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (responce) {
            if (responce.ret === 0) {
                data.openeditrow = !data.openeditrow;
                var index = _this_1.backupData.findIndex(function (item) { return Object.is(data.srfkey, item.srfkey); });
                if (index !== -1) {
                    Object.assign(_this_1.backupData[index], responce.data);
                }
                else {
                    _this_1.deleteEditItemState(data.srfkey);
                    _this_1.setEditItemState(responce.data.srfkey);
                    _this_1.backupData.push(data);
                }
                Object.assign(data, responce.data);
                // this.showToast(this.$showSuccessToast, '提示', '保存成功');
                _this_1.fire(IBizMDControl.LOADED, data);
            }
            else {
                var info_1 = '';
                if (responce.error && (responce.error.items && Array.isArray(responce.error.items))) {
                    var items = responce.error.items;
                    items.forEach(function (item, index) {
                        if (index > 0) {
                            info_1 += '\n';
                        }
                        info_1 += item.info;
                        Object.assign(_this_1.state[data.srfkey][item.id].styleCss, { 'border': '1px solid #f04134', 'border-radius': '4px' });
                    });
                }
                // this.$notification.error('错误', !Object.is(info, '') ? info : '行编辑保存失败');
            }
        }, function (error) {
            var info = '';
            if (error.error && (error.error.items && Array.isArray(error.error.items))) {
                var items = error.error.items;
                items.forEach(function (item, index) {
                    if (index > 0) {
                        info += '\n';
                    }
                    info += item.info;
                    Object.assign(_this_1.state[data.srfkey][item.id].styleCss, { 'border': '1px solid #f04134', 'border-radius': '4px' });
                });
            }
            // this.$notification.error('错误', !Object.is(info, '') ? info : '行编辑保存失败');
        });
    };
    /**
     * 行编辑文本框光标移出事件
     *
     * @param {*} $event
     * @param {string} name
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.onBlur = function ($event, name, data) {
        if (data === void 0) { data = {}; }
        if ((!$event) || Object.keys(data).length === 0) {
            return;
        }
        if (Object.is($event.target.value, data[name])) {
            return;
        }
        this.colValueChange(name, $event.target.value, data);
    };
    /**
     * 行编辑文本框键盘事件
     *
     * @param {*} $event
     * @param {string} name
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.onKeydown = function ($event, name, data) {
        if (data === void 0) { data = {}; }
        if ((!$event) || Object.keys(data).length === 0) {
            return;
        }
        if ($event.keyCode !== 13) {
            return;
        }
        if (Object.is($event.target.value, data[name])) {
            return;
        }
        this.colValueChange(name, $event.target.value, data);
    };
    /**
     * 行编辑单元格值变化
     *
     * @param {string} name
     * @param {*} data
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.colValueChange = function (name, value, data) {
        var srfkey = data.srfkey;
        var _data = this.backupData.find(function (back) { return Object.is(back.srfkey, srfkey); });
        if (_data && !Object.is(_data[name], value)) {
            Object.assign(this.state[srfkey][name].styleCss, { 'border': '1px solid #49a9ee', 'border-radius': '4px' });
        }
        else {
            Object.assign(this.state[srfkey][name].styleCss, { 'border': '0px', 'border-radius': '0px' });
        }
        data[name] = value;
        this.fire(IBizDataGrid.UPDATEGRIDITEMCHANGE, { name: name, data: data });
    };
    /**
     * 更新表格编辑列值
     *
     * @param {string} srfufimode
     * @param {*} [data={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.updateGridEditItems = function (srfufimode, data) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var opt = { srfaction: 'updategridedititem', srfufimode: srfufimode, srfctrlid: 'grid' };
        var viewController = this.getViewController();
        if (viewController && viewController.getViewParam() && Object.keys(viewController.getViewParam()).length > 0) {
            Object.assign(opt, viewController.getViewParam());
        }
        var _names = Object.keys(data);
        _names.forEach(function (name) {
            data[name] = data[name] ? data[name] : '';
        });
        Object.assign(opt, { srfactivedata: JSON.stringify(data) });
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (success) {
            if (success.ret === 0) {
                var index = _this_1.items.findIndex(function (item) { return Object.is(item.srfkey, data.srfkey); });
                if (index !== -1) {
                    Object.assign(_this_1.items[index], success.data);
                }
            }
            else {
                // this.$notification.error('错误', success.info);
            }
        }, function (error) {
            // this.$notification.error('错误', error.info);
        });
    };
    /**
     * 新建编辑行
     *
     * @param {*} [param={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.newRowAjax = function (param) {
        var _this_1 = this;
        if (param === void 0) { param = {}; }
        var opt = {};
        Object.assign(opt, param);
        var viewController = this.getViewController();
        if (viewController && viewController.getViewParam() && Object.keys(viewController.getViewParam()).length > 0) {
            Object.assign(opt, viewController.getViewParam());
        }
        this.fire(IBizMDControl.BEFORELOAD, opt);
        Object.assign(opt, { srfaction: 'loaddraft', srfctrlid: 'grid' });
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (success) {
            if (success.ret === 0) {
                var srfkey = (Object.is(success.data.srfkey, '')) ? IBizUtil.createUUID() : success.data.srfkey;
                success.data.srfkey = srfkey;
                _this_1.setEditItemState(srfkey);
                _this_1.setEditItemDisabled(srfkey, 1);
                _this_1.items.push(Object.assign(success.data, { openeditrow: false }));
            }
            else {
                // this.$notification.error('错误', `获取默认数据失败, ${success.info}`);
            }
        }, function (error) {
            // this.$notification.error('错误', `获取默认数据失败, ${error.info}`);
        });
    };
    /*****************事件声明************************/
    /**
     * 改变启用行编辑按钮信息
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.CHANGEEDITSTATE = 'CHANGEEDITSTATE';
    /**
     * 表格行数据变化
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.UPDATEGRIDITEMCHANGE = 'UPDATEGRIDITEMCHANGE';
    /**
     * 数据删除完成
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.REMOVED = 'REMOVED';
    /**
     * 行单击选中
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.ROWCLICK = 'ROWCLICK';
    /**
     * 行数据双击选中
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.ROWDBLCLICK = 'ROWDBLCLICK';
    return IBizDataGrid;
}(IBizMDControl));
