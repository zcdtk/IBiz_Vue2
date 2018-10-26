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
 * 多项数据部件服务对象
 *
 * @export
 * @class IBizMDControl
 * @extends {IBizControl}
 */
var IBizMDControl = /** @class */ (function (_super) {
    __extends(IBizMDControl, _super);
    /**
     * Creates an instance of IBizMDControl.
     * 创建 IBizMDControl 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizMDControl
     */
    function IBizMDControl(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 多数据列头
         *
         * @type {*}
         * @memberof IBizMDControl
         */
        _this.columns = {};
        /**
         * 所有数据项
         *
         * @type {Array<any>}
         * @memberof IBizMDControl
         */
        _this.items = [];
        /**
         * 选中数据项
         *
         * @type {Array<any>}
         * @memberof IBizMDControl
         */
        _this.selection = [];
        _this.regColumns();
        return _this;
    }
    /**
     * 加载数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.load = function (arg) {
        if (arg === void 0) { arg = {}; }
    };
    /**
     * 刷新数据
     * @param arg
     */
    IBizMDControl.prototype.refresh = function (arg) {
        if (arg === void 0) { arg = {}; }
    };
    /**
     * 设置选中项
     *
     * @param {Array<any>} selection
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.setSelection = function (selection) {
        this.selection = selection;
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selection);
    };
    /**
     * 选中对象
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.clickItem = function (item) {
        if (item === void 0) { item = {}; }
        if (this.isLoading) {
            return;
        }
        this.setSelection([item]);
    };
    /**
     *
     *
     * @param {any} item
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.activeItem = function (item) {
    };
    /**
     * 获取列表中某条数据
     *
     * @param {string} name 字段
     * @param {string} value 名称
     * @returns {*}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.findItem = function (name, value) {
        var item;
        this.items.forEach(function (element) {
            if (Object.is(element[name], value)) {
                item = element;
                return;
            }
        });
        return item;
    };
    /**
     * 删除数据
     *
     * @param {*} [arg={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.remove = function (arg) {
        if (arg === void 0) { arg = {}; }
    };
    /**
     * 单选
     *
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.onItemSelect = function (value, item) {
    };
    /**
     * 全选
     *
     * @param {boolean} value
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.selectAll = function (value) {
    };
    /**
     * 获取选中行
     *
     * @returns {Array<any>}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * 工作流提交
     *
     * @param {*} [params={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.wfsubmit = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (!params) {
            params = {};
        }
        Object.assign(params, { srfaction: 'wfsubmit', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret === 0) {
                _this.refresh();
            }
            else {
                _this.iBizNotification.error('', '执行工作流操作失败,' + data.info);
            }
        }, function (error) {
            _this.iBizNotification.error('', '执行工作流操作失败,' + error.info);
        });
    };
    /**
     * 实体界面行为
     *
     * @param {*} [params={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.doUIAction = function (arg) {
        var _this = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        if (arg) {
            Object.assign(params, arg);
        }
        Object.assign(params, { srfaction: 'uiaction', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret === 0) {
                if (data.reloadData) {
                    _this.refresh();
                }
                if (data.info && !Object.is(data.info, '')) {
                    _this.iBizNotification.success('', '操作成功');
                }
                IBizUtil.processResult(data);
            }
            else {
                _this.iBizNotification.error('操作失败', '操作失败,执行操作发生错误,' + data.info);
            }
        }, function (error) {
            _this.iBizNotification.error('操作失败', '操作失败,执行操作发生错误,' + error.info);
        });
    };
    /**
     * 批量添加
     *
     * @param {*} [arg={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.addBatch = function (arg) {
        var _this = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        if (arg) {
            Object.assign(params, arg);
        }
        Object.assign(params, { srfaction: 'addbatch', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret === 0) {
                _this.refresh();
                _this.fire(IBizMDControl.ADDBATCHED, data);
            }
            else {
                _this.iBizNotification.error('添加失败', '执行批量添加失败,' + data.info);
            }
        }, function (error) {
            _this.iBizNotification.error('添加失败', '执行批量添加失败,' + error.info);
        });
    };
    /**
     * 获取所有数据项
     *
     * @returns {Array<any>}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.getItems = function () {
        return this.items;
    };
    /**
     * 注册多数据列头
     *
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.regColumns = function () {
    };
    /**
     * 获取多数据列头
     *
     * @returns {*}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.getColumns = function () {
        return this.columns;
    };
    /**
     * 设置多数据列头
     *
     * @param {*} [column={}]
     * @returns {void}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.regColumn = function (column) {
        if (column === void 0) { column = {}; }
        if (Object.keys(column).length === 0) {
            return;
        }
        if (!this.columns) {
            this.columns = {};
        }
        this.columns[column.name] = column;
    };
    /**
     * 多数据项界面_数据导入栏
     *
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.doImportData = function (name) {
        if (Object.is(name, '')) {
            return;
        }
        // this.nzModalService.open({
        //     content: IBizImportdataViewComponent,
        //     wrapClassName: 'ibiz_wrap_modal',
        //     componentParams: { dename: name },
        //     footer: false,
        //     maskClosable: false,
        //     width: 500,
        // }).subscribe((result) => {
        //     if (result && result.ret) {
        //         this.refresh();
        //     }
        // });
    };
    /**
     * 界面行为
     *
     * @param {string} tag
     * @param {*} [data={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.uiAction = function (tag, data) {
        if (data === void 0) { data = {}; }
    };
    /**
     * 渲染绘制多项数据
     *
     * @param {Array<any>} items
     * @returns {Array<any>}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.rendererDatas = function (items) {
        return items;
    };
    /*****************事件声明************************/
    /**
     * 添加数据
     *
     * @static
     * @memberof IBizMDControl
     */
    IBizMDControl.ADDBATCHED = 'ADDBATCHED';
    /**
     * 加载之前
     *
     * @static
     * @memberof IBizMDControl
     */
    IBizMDControl.BEFORELOAD = 'BEFORELOAD';
    /**
     * 加载完成
     *
     * @static
     * @memberof IBizMDControl
     */
    IBizMDControl.LOADED = 'LOADED';
    /**
     * 行数据选中
     *
     * @static
     * @memberof IBizMDControl
     */
    IBizMDControl.SELECTIONCHANGE = 'SELECTIONCHANGE';
    /**
     * 实体界面行为
     *
     * @static
     * @memberof IBizMDControl
     */
    IBizMDControl.UIACTION = 'UIACTION';
    return IBizMDControl;
}(IBizControl));
