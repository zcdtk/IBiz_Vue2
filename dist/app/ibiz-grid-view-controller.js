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
 * 表格视图控制
 *
 * @class IBizGridViewController
 * @extends {IBizMDViewController}
 */
var IBizGridViewController = /** @class */ (function (_super) {
    __extends(IBizGridViewController, _super);
    /**
     * Creates an instance of IBizGridViewController.
     * 创建 IBizGridViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizGridViewController
     */
    function IBizGridViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 部件初始化
     *
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var grid = this.getMDCtrl();
        if (grid) {
            // 双击行数据
            grid.on(IBizDataGrid.ROWDBLCLICK, function (args) {
                _this.onSelectionChange(args);
                if (_this.getGridRowActiveMode() === 0) {
                    return;
                }
                _this.onDataActivated(args[0]);
            });
            // 单击行数据
            grid.on(IBizDataGrid.ROWCLICK, function (args) {
                _this.onSelectionChange(args);
                if (_this.getGridRowActiveMode() === 1) {
                    _this.onDataActivated(args[0]);
                }
            });
            // 表格行数据变化
            grid.on(IBizDataGrid.UPDATEGRIDITEMCHANGE, function (param) {
                if (!_this.isEnableRowEdit()) {
                    return;
                }
                _this.onGridRowChanged(param.name, param.data);
            });
        }
    };
    /**
     * 获取多项数据控件对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getMDCtrl = function () {
        return this.getGrid();
    };
    /**
     * 获取表格部件对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getGrid = function () {
        return this.getControl('grid');
    };
    /**
     * 获取搜索表单对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getSearchForm = function () {
        return this.getControl('searchform');
    };
    /**
     * 表格行数据激活模式，默认支持双击激活行数据
     *
     * @returns {number}  0--不激活，1--单击激活模式，2--双击激活行数据
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getGridRowActiveMode = function () {
        return 2;
    };
    /**
     * 隐藏关系列
     *
     * @param {any} parentMode
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.doHideParentColumns = function (parentMode) {
    };
    /**
     * 隐藏列
     *
     * @param {any} columnname
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.hideGridColumn = function (columnname) {
    };
    /**
     * 删除操作
     *
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.doRemove = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (params && params.srfkey) {
            // if ($.isFunction(this.getMDCtrl().findItem)) {
            //     params = this.getMDCtrl().findItem('srfkey', params.srfkey);
            // }
            // //询问框
            // IBiz.confirm($IGM('GRIDVIEWCONTROLLER.DOREMOVE.INFO', '确认要删除数据，删除操作将不可恢复？'), function (result) {
            //     if (result) {
            //         this.removeData({ srfkeys: params.srfkey });
            //     }
            // });
        }
        else {
            var selectedData = this.getGrid().getSelection();
            if (!selectedData || selectedData == null || selectedData.length === 0) {
                return;
            }
            var dataInfo_1 = '';
            selectedData.forEach(function (record, index) {
                var srfmajortext = record.srfmajortext;
                if (index < 5) {
                    if (!Object.is(dataInfo_1, '')) {
                        dataInfo_1 += '、';
                    }
                    dataInfo_1 += srfmajortext;
                }
                else {
                    return false;
                }
            });
            if (selectedData.length < 5) {
                dataInfo_1 = dataInfo_1 + '共' + selectedData.length + '条数据';
            }
            else {
                dataInfo_1 = dataInfo_1 + '...' + '共' + selectedData.length + '条数据';
            }
            dataInfo_1 = dataInfo_1.replace(/[null]/g, '').replace(/[undefined]/g, '').replace(/[ ]/g, '');
            // 询问框
            this.iBizNotification.confirm('警告', '确认要删除 ' + dataInfo_1 + '，删除操作将不可恢复？').subscribe(function (result) {
                if (result && Object.is(result, 'OK')) {
                    _this.removeData(null);
                }
            });
        }
    };
    /**
     * 删除数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.removeData = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg) {
            arg = {};
        }
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        if (!arg.srfkeys) {
            // 获取要删除的数据集合
            var selectedData = this.getGrid().getSelection();
            if (!selectedData || selectedData == null || selectedData.length === 0) {
                return;
            }
            var keys_1 = '';
            selectedData.forEach(function (record) {
                var key = record.srfkey;
                if (!Object.is(keys_1, '')) {
                    keys_1 += ';';
                }
                keys_1 += key;
            });
            arg.srfkeys = keys_1;
        }
        var grid = this.getGrid();
        if (grid) {
            grid.remove(arg);
        }
    };
    /**
     * 批量添加数据
     *
     * @param {Array<any>} selectedDatas
     * @returns {void}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.addDataBatch = function (selectedDatas) {
        var arg = {};
        if (!selectedDatas || selectedDatas == null || selectedDatas.length === 0) {
            return;
        }
        Object.assign(arg, this.viewParam);
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        var keys = '';
        selectedDatas.forEach(function (record) {
            var key = record.srfkey;
            if (!Object.is(keys, '')) {
                keys += ';';
            }
            keys += key;
        });
        arg.srfkeys = keys;
        var grid = this.getGrid();
        if (grid) {
            grid.addBatch(arg);
        }
    };
    /**
     * 编辑操作
     *
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
        var gridCtrl = this.getGrid();
        if (!gridCtrl) {
            return;
        }
        // 获取要编辑的数据集合
        if (params && params.srfkey) {
            var param = gridCtrl.findItem('srfkey', params.srfkey);
            if (!param) {
                return;
            }
            var arg_1 = { data: Object.assign(params, param) };
            this.onEditData(arg_1);
            return;
        }
        var selectedData = gridCtrl.getSelection();
        if (!selectedData || selectedData == null || selectedData.length === 0) {
            return;
        }
        var arg = { data: selectedData[0] };
        this.onEditData(arg);
    };
    /**
     * 实体界面行为参数
     *
     * @param {*} [uiaction={}] 实体界面行为
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getBackendUIActionParam = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            var selectedData = this.getGrid().getSelection();
            if (!selectedData && selectedData == null || selectedData.length === 0) {
                return null;
            }
            var valueitem_1 = 'srfkey';
            var paramkey = 'srfkeys';
            var paramitems_1 = '';
            var paramjo = null;
            var infoitem_1 = 'srfmajortext';
            if (uiaction.actionparams) {
                var actionparams = uiaction.actionparams;
                valueitem_1 = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem_1;
                paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                infoitem_1 = (actionparams.textitem && !Object.is(actionparams.textitem, '')) ? actionparams.textitem.toLowerCase() : infoitem_1;
                paramjo = actionparams.paramjo ? actionparams.paramjo : {};
            }
            var dataInfo_2 = '';
            var firstOnly_1 = (Object.is(uiaction.actiontarget, 'SINGLEKEY'));
            selectedData.some(function (record, index) {
                if (record === void 0) { record = {}; }
                var srfmajortext = record[infoitem_1];
                if (valueitem_1) {
                    var temp = record[valueitem_1];
                    if (!Object.is(paramitems_1, '')) {
                        paramitems_1 += ';';
                    }
                    paramitems_1 += temp ? temp : '';
                }
                if (index < 5) {
                    if (!Object.is(dataInfo_2, '')) {
                        dataInfo_2 += '、';
                    }
                    dataInfo_2 += srfmajortext;
                }
                if (firstOnly_1) {
                    return false;
                }
            });
            var data = { dataInfo: dataInfo_2 };
            data[paramkey] = paramitems_1;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            return data;
        }
        return {};
    };
    /**
     * 导出操作（Excel）
     *
     * @param {*} params
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.doExportExcel = function (params) {
        if (this.getMDCtrl()) {
            this.getMDCtrl().exportData(params);
        }
    };
    /**
     * 表格行数据变化
     *
     * @param {string} name
     * @param {*} [data={}]
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.onGridRowChanged = function (name, data) {
        if (data === void 0) { data = {}; }
    };
    return IBizGridViewController;
}(IBizMDViewController));
