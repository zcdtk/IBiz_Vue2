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
var IBizGridViewController = /** @class */ (function (_super) {
    __extends(IBizGridViewController, _super);
    function IBizGridViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        var _this = _this_1;
        return _this_1;
    }
    /**
     * 初始化
     */
    IBizGridViewController.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        _super.prototype.init.call(this, params);
        var _this = this;
        if (!_this.getSearchForm()) {
            _this.getGrid().load();
        }
    };
    /**
     * 执行初始化
     */
    IBizGridViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        var _this = this;
        // if(_this.hasHtmlElement('grid')){
        // 	var dataurl = _this.config.backendurl+'srfctrlid=grid&SRFSUBAPP='+_this.subapp+'&';
        // 	//初始化主表格
        // 	var dgCfg = $.extend({id:this.getCId2()+'grid',url:dataurl}_this.config.ctrls.grid);
        // 	dgCfg.multiselect=_this.isEnableMultiSelect();
        // 	if(dgCfg.width && dgCfg.width>0){
        // 		_this.gridWidth = dgCfg.width;
        // 	}
        // 	if(dgCfg.height && dgCfg.height>0){
        // 		_this.gridHeight = dgCfg.height;
        // 	}
        // 	_this.datagrid = _this.createGrid(dgCfg);
        // 	_this.datagrid.on(IBizDataGrid.ROWDBLCLICK, function(sender,args,e){
        // 		var _this = e.data;
        // 		if(_this.getGridRowActiveMode() === 0) {
        // 			return;
        // 		}
        // 		_this.onDataActivated(args,e);
        //     } _this);	
        // 	_this.datagrid.on(IBizDataGrid.UPDATEGRIDITEMCHANGE,function(sender, args, e){
        // 		_this.onGridRowChanged(args.dataIndx, args, args.newVal, args.oldVal);
        // 	}_this);
        // 	_this.datagrid.on(IBizDataGrid.ADDBATCHED, function(sender,args,e){
        // 		_this.onAddBatched(sender,args,e);
        // 	} _this);	
        // 	_this.registerItem('grid',_this.datagrid);
        // }
        // _this.doLayout();
    };
    /**
     * 搜索表单展开
     */
    IBizGridViewController.prototype.onSearchFormOpen = function (args) {
        var _this = this;
        // if(_this.gridHeight &&　_this.getMDCtrl()){
        // 	_this.getMDCtrl().redHeight(args.height);
        // }
    };
    IBizGridViewController.prototype.onAddBatched = function (args) {
    };
    // public createGrid:function(config){
    // 	return IBiz.createGrid(config);
    // }
    // public setSize:function(width,height){
    // 	arguments.callee.$.setSize.call(this,width,height);
    // }
    /**
     * 获取多项数据控件对象
     */
    IBizGridViewController.prototype.getMDCtrl = function () {
        return this.getGrid();
    };
    IBizGridViewController.prototype.getGrid = function () {
        return this.controls.get('grid');
    };
    IBizGridViewController.prototype.onGridRowChanged = function (args) {
    };
    /*隐藏关系列*/
    IBizGridViewController.prototype.doHideParentColumns = function (parentMode) {
    };
    /*隐藏列*/
    IBizGridViewController.prototype.hideGridColumn = function (columnname) {
    };
    /*删除操作*/
    IBizGridViewController.prototype.doRemove = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (params && params.srfkey) {
            if (typeof _this.getMDCtrl().findItem === 'function') {
                params = _this.getMDCtrl().findItem('srfkey', params.srfkey);
            }
            //询问框
            // IBiz.confirm($IGM('GRIDVIEWCONTROLLER.DOREMOVE.INFO','确认要删除数据，删除操作将不可恢复？'), function(result) {
            //       if(result)
            //       {
            //     	  _this.removeData({srfkeys:params.srfkey});
            //       }
            // });
            _this.iBizNotification.confirm('警告', '确认要删除数据，删除操作将不可恢复？').subscribe(function (result) {
                if (result && Object.is(result, 'OK')) {
                    _this.removeData({ srfkeys: params.srfkey });
                }
            });
        }
        else {
            var selectedData = _this.getGrid().getSelection();
            if (selectedData == null || selectedData.length == 0)
                return;
            var dataInfo = '';
            selectedData.some(function (record, index) {
                var srfmajortext = record.srfmajortext;
                if (index < 5) {
                    if (dataInfo != '')
                        dataInfo += '、';
                    dataInfo += srfmajortext;
                }
                else {
                    return true;
                }
            });
            if (selectedData.length < 5) {
                // dataInfo = dataInfo+$IGM('GRIDVIEWCONTROLLER.DOREMOVE.DATAINFO','共')+selectedData.length+$IGM('GRIDVIEWCONTROLLER.DOREMOVE.DATAINFO2','条数据');
                dataInfo = dataInfo + "\u5171" + selectedData.length + "\u6761\u6570\u636E";
            }
            else {
                // dataInfo = dataInfo+'...'+$IGM('GRIDVIEWCONTROLLER.DOREMOVE.DATAINFO','共')+selectedData.length+$IGM('GRIDVIEWCONTROLLER.DOREMOVE.DATAINFO2','条数据');
                dataInfo = dataInfo + "...\u5171" + selectedData.length + "\u6761\u6570\u636E";
            }
            //询问框
            if (_this.getMDCtrl() && _this.getMDCtrl().getEditState && _this.getMDCtrl().getEditState()) {
                // IBiz.confirm($IGM('GRIDVIEWCONTROLLER.DOREMOVE.INFO3','确定要删除选中的数据吗？',[dataInfo]), function(result) {
                // 	if(result)
                // 	{
                // 		_this.removeData(null);
                // 	}
                // });
                _this.iBizNotification.confirm('警告', '确定要删除选中的数据吗？').subscribe(function (result) {
                    if (result && Object.is(result, 'OK')) {
                        _this.removeData(null);
                    }
                });
            }
            else {
                // IBiz.confirm($IGM('GRIDVIEWCONTROLLER.DOREMOVE.INFO2','确认要删除 '+dataInfo+'，删除操作将不可恢复？',[dataInfo]), function(result) {
                // 	if(result)
                // 	{
                // 		_this.removeData(null);
                // 	}
                // });
                _this.iBizNotification.confirm('警告', "\u786E\u8BA4\u8981\u5220\u9664 " + dataInfo + "\uFF0C\u5220\u9664\u64CD\u4F5C\u5C06\u4E0D\u53EF\u6062\u590D\uFF1F").subscribe(function (result) {
                    if (result && Object.is(result, 'OK')) {
                        _this.removeData(null);
                    }
                });
            }
        }
    };
    IBizGridViewController.prototype.removeAllData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg) {
            arg = {};
        }
        if (_this.getParentMode()) {
            //   $.extend(arg, this.getParentMode());
            Object.assign(arg, this.getParentMode());
        }
        if (_this.getParentData()) {
            //  $.extend(arg, this.getParentData());
            Object.assign(arg, this.getParentData());
        }
        if (!arg.srfkeys) {
            //获取要删除的数据集合
            var allData = _this.getGrid().getAllData();
            if (allData == null || allData.length == 0)
                return;
            var keys = '';
            // $.each(allData, function(index, record) {  
            // 	var key = record.srfkey;
            // 	if(keys!='')
            // 		keys+=';';
            //  	keys += key;
            //   });
            allData.forEach(function (record) {
                var key = record.srfkey;
                if (keys != '')
                    keys += ';';
                keys += key;
            });
            arg.srfkeys = keys;
        }
        _this.getGrid().remove(arg);
    };
    IBizGridViewController.prototype.removeData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg) {
            arg = {};
        }
        if (_this.getParentMode()) {
            //  $.extend(arg, this.getParentMode());
            Object.assign(arg, this.getParentMode());
        }
        if (_this.getParentData()) {
            //  $.extend(arg, this.getParentData());
            Object.assign(arg, this.getParentData());
        }
        if (!arg.srfkeys) {
            //获取要删除的数据集合
            var selectedData = _this.getGrid().getSelection();
            if (selectedData == null || selectedData.length == 0)
                return;
            var keys = '';
            selectedData.forEach(function (record) {
                var key = record.srfkey;
                if (keys != '') {
                    keys += ';';
                }
                keys += key;
            });
            arg.srfkeys = keys;
        }
        _this.getGrid().remove(arg);
    };
    /**
     * 批量添加数据
     */
    IBizGridViewController.prototype.addDataBatch = function (selectedDatas) {
        var _this = this;
        var arg = {};
        if (selectedDatas == null || selectedDatas.length == 0)
            return;
        if (_this.getParentMode()) {
            //  $.extend(arg, this.getParentMode());
            Object.assign(arg, this.getParentMode());
        }
        if (_this.getParentData()) {
            //  $.extend(arg, this.getParentData());
            Object.assign(arg, this.getParentData());
        }
        var keys = '';
        selectedDatas.forEach(function (record) {
            var key = record.srfkey;
            if (keys != '')
                keys += ';';
            keys += key;
        });
        arg.srfkeys = keys;
        _this.getGrid().addBatch(arg);
    };
    /*编辑操作*/
    IBizGridViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        //获取要编辑的数据集合
        if (params && params.srfkey) {
            if (typeof _this.getGrid().findItem === 'function') {
                params = _this.getGrid().findItem('srfkey', params.srfkey);
            }
            var arg = { data: params };
            _this.onEditData(arg);
            return;
        }
        var selectedData = _this.getGrid().getSelection();
        if (selectedData == null || selectedData.length == 0)
            return;
        var arg = { data: selectedData[0] };
        _this.onEditData(arg);
    };
    IBizGridViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        if (uiaction.actiontarget == 'SINGLEKEY' || uiaction.actiontarget == 'MULTIKEY') {
            if (params.hasOwnProperty('srfkey')) {
                return { srfkey: params.srfkey };
            }
            var selectedData = _this.getGrid().getSelection();
            if (selectedData == null || selectedData.length == 0)
                return null;
            var vlaueitem = null;
            var paramkey = "srfkeys";
            var paramitems = '';
            var paramjo = null;
            var infoitem = 'srfmajortext';
            if (uiaction.actionparams) {
                vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
                paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
                infoitem = uiaction.actionparams.textitem ? uiaction.actionparams.textitem.toLowerCase() : infoitem;
                paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
            }
            var keys = '';
            var dataInfo = '';
            var firstOnly = (uiaction.actiontarget == 'SINGLEKEY');
            selectedData.some(function (record, index) {
                var srfmajortext = record[infoitem];
                var key = record.srfkey;
                if (keys != '')
                    keys += ';';
                keys += key;
                if (vlaueitem) {
                    var temp = record[vlaueitem];
                    if (paramitems != '')
                        paramitems += ';';
                    paramitems += temp ? temp : '';
                }
                if (index < 5) {
                    if (dataInfo != '')
                        dataInfo += '、';
                    dataInfo += srfmajortext;
                }
                if (firstOnly) {
                    return true;
                }
            });
            var data = { srfkey: keys, dataInfo: dataInfo };
            data[paramkey] = vlaueitem ? paramitems : keys;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            return data;
        }
        return {};
    };
    /*导出操作（Excel）*/
    IBizGridViewController.prototype.doExportExcel = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.getGrid().exportData(params);
    };
    return IBizGridViewController;
}(IBizMDViewController));
