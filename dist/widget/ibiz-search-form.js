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
 * 搜索表单
 *
 * @class IBizSearchForm
 * @extends {IBizForm}
 */
var IBizSearchForm = /** @class */ (function (_super) {
    __extends(IBizSearchForm, _super);
    /**
     * Creates an instance of IBizSearchForm.
     * 创建 IBizSearchForm 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizSearchForm
     */
    function IBizSearchForm(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.bResetting = false;
        _this_1.opened = false;
        var _this = _this_1;
        return _this_1;
    }
    IBizSearchForm.prototype.isCustomSearch = function () {
        // var _this = this;
        // if(_this.config &&_this.config.enableAdvanceSearch)
        // 	return true;
        // else
        return false;
    };
    //初始化自定义搜索面板
    IBizSearchForm.prototype.initCustomSearchPanel = function () {
        var _this = this;
        // var cid = '';
        // _this.customSearchView = $('#'+_this.config.id+'_addsearchbutton');
        // if(_this.customSearchView){
        // 	_this.customSearchView.on("click","",function(){
        // 		_this.openPickView();
        // 	});
        // }
    };
    //设置自定义查询值
    IBizSearchForm.prototype.setCustomSearchVal = function (value, text) {
        var _this = this;
        // _this.customSearchVal = value;
        // var searchText = $("#"+_this.config.id+"_searchtext");
        // if(searchText)
        // 	searchText.text(text);
    };
    IBizSearchForm.prototype.getCustomSearchVal = function () {
        var _this = this;
        var cmsVal = {};
        // if(_this.customSearchVal && _this.customSearchVal != '')
        // 	cmsVal.customsearchval = JSON.stringify(_this.customSearchVal);
        return cmsVal;
    };
    //打开搜索条件面板视图
    IBizSearchForm.prototype.openPickView = function () {
        var _this = this;
        // var win = $.getIBizApp().createWindow({});
        // var viewparam = {};
        // if(_this.config.dename){
        // 	viewparam['dename'] = _this.config.dename;
        // }
        // if(_this.config.ctrler.getId()){
        // 	viewparam['ctrid'] = _this.config.ctrler.getId();
        // 	viewparam['openerid'] = _this.config.ctrler.getId();
        // }
        // viewparam['windowid'] = win.getId();
        // win.scope = _this;
        // win.title = $IGM('IBIZSEARCHFORM.OPENPICKVIEW.INFO','自定义搜索');
        // win.height = 500;
        // win.width = 900;
        // win.url = BASEURL + '/ibizutil/customsearchview.jsp?' + $.param({windowid:win.getId()});
        // win.viewparam = viewparam;
        // win.callback = function(win){
        // 	_this.pickerWindowClose(win);
        // };	
        // win.openModal(window);
    };
    //点击确定按钮关闭窗口对象
    IBizSearchForm.prototype.pickerWindowClose = function () {
        var _this = this;
        // if(win.dialogResult == "ok"){
        // 	var tmp = win.tmp;
        // 	_this.setCustomSearchVal(win.param, win.tmp);
        // }
    };
    IBizSearchForm.prototype.isOpen = function () {
        var _this = this;
        return _this.opened;
    };
    IBizSearchForm.prototype.open = function () {
        var _this = this;
        _this.opened = !_this.opened;
        // if(_this.container){
        // 	_this.container.removeClass('hidden');
        // 	_this.fire(IBizSearchForm.FORMCONTRACT, _this, {state:"show",height:_this.container.height()});
        // }
    };
    IBizSearchForm.prototype.close = function () {
        var _this = this;
        _this.opened = false;
        // if(_this.container){
        // 	_this.container.addClass('hidden');
        // }
    };
    /**
     * 注册表单属性
     * @param field 属性
     */
    IBizSearchForm.prototype.register = function (field) {
        var _this = this;
    };
    /**
     * 搜索
     */
    IBizSearchForm.prototype.onSearch = function () {
        var _this = this;
        _this.fire(IBizSearchForm.FORMSEARCHED, {});
    };
    /**
     * 重置
     */
    IBizSearchForm.prototype.onReset = function () {
        var _this = this;
        _this.bResetting = true;
        _this.setCustomSearchVal('', '');
        _this.reset();
    };
    IBizSearchForm.prototype.onDraftLoaded = function () {
        var _this = this;
        if (_this.bResetting) {
            _this.fire(IBizSearchForm.FORMRESETED, {});
        }
    };
    IBizSearchForm.prototype.onLoaded = function () {
        var _this = this;
        if (_this.bResetting) {
            _this.fire(IBizSearchForm.FORMRESETED, {});
        }
    };
    IBizSearchForm.prototype.getFormType = function () {
        return 'SEARCHFORM';
    };
    /*****************事件声明************************/
    /**
     * 搜索表单重置事件
     */
    IBizSearchForm.FORMRESETED = 'FORMRESETED';
    /**
     * 搜索表单搜索事件
     */
    IBizSearchForm.FORMSEARCHED = 'FORMSEARCHED';
    /**
     * 搜索表单收缩事件
     */
    IBizSearchForm.FORMCONTRACT = 'FORMCONTRACT';
    return IBizSearchForm;
}(IBizForm));
