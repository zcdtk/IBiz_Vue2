/**
 * 表格视图控制器对象
 *
 * @class IBizGridViewController
 * @extends {IBizMDViewController}
 */
class IBizGridViewController extends IBizMDViewController {

    /**
     * Creates an instance of IBizGridViewController.
     * 创建 IBizGridViewController 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizGridViewController
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
    }

    /**
	 * 初始化
	 */
    public init(params: any = {}): void {
        super.init(params);
        var _this = this;
        const grid = this.getGrid();
        if (grid) {
            //  表格行双击
            grid.on(IBizDataGrid.ROWDBLCLICK).subscribe((args) => {
                if (_this.getGridRowActiveMode() === 0) {
                    return;
                }
                _this.onDataActivated(args);
            });
            // 表格行编辑行数据变化
            grid.on(IBizDataGrid.UPDATEGRIDITEMCHANGE).subscribe((args) => {
                // _this.onGridRowChanged(args.dataIndx, args, args.newVal, args.oldVal);
            });
            // 表格批量添加
            grid.on(IBizDataGrid.ADDBATCHED).subscribe((args) => {
                _this.onAddBatched(args);
            });
        }
    }
	/**
	 * 执行初始化
	 */
    public onInit(): void {
        super.onInit();
        var _this = this;

        if (!_this.getSearchForm() && this.getGrid()) {
            _this.getGrid().load({});
        }

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
    }
	/**
	 * 搜索表单展开
	 */
    public onSearchFormOpen(args: any): void {
        var _this = this;
        // if(_this.gridHeight &&　_this.getMDCtrl()){
        // 	_this.getMDCtrl().redHeight(args.height);
        // }
    }
    public onAddBatched(args: Array<any>): void {

    }
    // public createGrid:function(config){
    // 	return IBiz.createGrid(config);
    // }
    // public setSize:function(width,height){
    // 	arguments.callee.$.setSize.call(this,width,height);
    // }
	/**
	 * 获取多项数据控件对象
	 */
    public getMDCtrl(): any {
        return this.getGrid();
    }
    public getGrid(): any {
        return this.controls.get('grid');
    }
    public onGridRowChanged(): void {

    }
    /*隐藏关系列*/
    public doHideParentColumns(parentMode: any): void {
    }
    /*隐藏列*/
    public hideGridColumn(columnname: string): void {

    }
    /*删除操作*/
    public doRemove(params: any = {}): void {
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
            _this.iBizNotification.confirm('警告', '确认要删除数据，删除操作将不可恢复？').subscribe((result) => {
                if (result && Object.is(result, 'OK')) {
                    _this.removeData({ srfkeys: params.srfkey });
                }
            });
        } else {
            var selectedData = _this.getGrid().getSelection();
            if (selectedData == null || selectedData.length == 0)
                return;

            var dataInfo = '';

            selectedData.some((record, index) => {
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
                dataInfo = `${dataInfo}共${selectedData.length}条数据`;
            }
            else {
                // dataInfo = dataInfo+'...'+$IGM('GRIDVIEWCONTROLLER.DOREMOVE.DATAINFO','共')+selectedData.length+$IGM('GRIDVIEWCONTROLLER.DOREMOVE.DATAINFO2','条数据');
                dataInfo = `${dataInfo}...共${selectedData.length}条数据`;
            }
            //询问框
            if (_this.getMDCtrl() && _this.getMDCtrl().getEditState && _this.getMDCtrl().getEditState()) {
                // IBiz.confirm($IGM('GRIDVIEWCONTROLLER.DOREMOVE.INFO3','确定要删除选中的数据吗？',[dataInfo]), function(result) {
                // 	if(result)
                // 	{
                // 		_this.removeData(null);
                // 	}
                // });
                _this.iBizNotification.confirm('警告', '确定要删除选中的数据吗？').subscribe(result => {
                    if (result && Object.is(result, 'OK')) {
                        _this.removeData(null);
                    }
                });
            } else {
                // IBiz.confirm($IGM('GRIDVIEWCONTROLLER.DOREMOVE.INFO2','确认要删除 '+dataInfo+'，删除操作将不可恢复？',[dataInfo]), function(result) {
                // 	if(result)
                // 	{
                // 		_this.removeData(null);
                // 	}
                // });
                _this.iBizNotification.confirm('警告', `确认要删除 ${dataInfo}，删除操作将不可恢复？`).subscribe(result => {
                    if (result && Object.is(result, 'OK')) {
                        _this.removeData(null);
                    }
                });
            }
        }

    }
    public removeAllData(arg: any = {}): void {
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
            allData.forEach(record => {
                var key = record.srfkey;
                if (keys != '')
                    keys += ';';
                keys += key;
            });
            arg.srfkeys = keys;
        }

        _this.getGrid().remove(arg);
    }
    public removeData(arg: any = {}): void {
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
            selectedData.forEach(record => {
                var key = record.srfkey;
                if (keys != '') {
                    keys += ';';
                }
                keys += key;
            });
            arg.srfkeys = keys;
        }

        _this.getGrid().remove(arg);
    }
    /**
     * 批量添加数据
     */
    public addDataBatch(selectedDatas: Array<any>): void {
        var _this = this;
        var arg: any = {};

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
        selectedDatas.forEach(record => {
            var key = record.srfkey;
            if (keys != '')
                keys += ';';
            keys += key;
        });
        arg.srfkeys = keys;
        _this.getGrid().addBatch(arg);
    }

    /*编辑操作*/
    public doEdit(params: any = {}): void {
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
    }
    public getBackendUIActionParam(uiaction: any = {}, params: any = {}): any {
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
            selectedData.some((record, index) => {
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
    }
    /*导出操作（Excel）*/
    public doExportExcel(params: any = {}): void {
        var _this = this;
        _this.getGrid().exportData(params);
    }
}
