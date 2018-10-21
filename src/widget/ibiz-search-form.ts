/**
 * 搜索表单
 *
 * @class IBizSearchForm
 * @extends {IBizForm}
 */
class IBizSearchForm extends IBizForm {

    public bResetting: boolean = false;

    public opened: boolean = false;

    /**
     * Creates an instance of IBizSearchForm.
     * 创建 IBizSearchForm 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizSearchForm
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
    }


    public isCustomSearch(): boolean {
        // var _this = this;
        // if(_this.config &&_this.config.enableAdvanceSearch)
        // 	return true;
        // else
        return false;
    }
    //初始化自定义搜索面板
    public initCustomSearchPanel(): void {
        var _this = this;
        // var cid = '';
        // _this.customSearchView = $('#'+_this.config.id+'_addsearchbutton');
        // if(_this.customSearchView){
        // 	_this.customSearchView.on("click","",function(){
        // 		_this.openPickView();
        // 	});
        // }
    }
    //设置自定义查询值
    public setCustomSearchVal(value: string, text: string): void {
        var _this = this;

        // _this.customSearchVal = value;

        // var searchText = $("#"+_this.config.id+"_searchtext");
        // if(searchText)
        // 	searchText.text(text);
    }
    public getCustomSearchVal(): any {
        var _this = this;
        var cmsVal = {};
        // if(_this.customSearchVal && _this.customSearchVal != '')
        // 	cmsVal.customsearchval = JSON.stringify(_this.customSearchVal);
        return cmsVal;
    }
    //打开搜索条件面板视图
    public openPickView(): void {
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
    }
    //点击确定按钮关闭窗口对象
    public pickerWindowClose(): void {
        var _this = this;
        // if(win.dialogResult == "ok"){
        // 	var tmp = win.tmp;
        // 	_this.setCustomSearchVal(win.param, win.tmp);
        // }
    }
    public isOpen(): boolean {
        var _this = this;
        return _this.opened;
    }
    public open(): void {
        var _this = this;
        _this.opened = true;
        // if(_this.container){
        // 	_this.container.removeClass('hidden');
        // 	_this.fire(IBizSearchForm.FORMCONTRACT, _this, {state:"show",height:_this.container.height()});
        // }
    }
    public close(): void {
        var _this = this;
        _this.opened = false;
        // if(_this.container){
        // 	_this.container.addClass('hidden');
        // }
    }
	/**
	 * 注册表单属性
	 * @param field 属性
	 */
    public register(field: any): void {
        var _this = this;
    }
	/**
	 * 搜索
	 */
    public onSearch(): void {
        var _this = this;
        _this.fire(IBizSearchForm.FORMSEARCHED, {});
    }
	/**
	 * 重置
	 */
    public onReset(): void {
        var _this = this;
        _this.bResetting = true;
        _this.setCustomSearchVal('', '');
        _this.reset();
    }
    public onDraftLoaded(): void {
        var _this = this;
        if (_this.bResetting) {
            _this.fire(IBizSearchForm.FORMRESETED, {});
        }
    }
    public onLoaded(): void {
        var _this = this;
        if (_this.bResetting) {
            _this.fire(IBizSearchForm.FORMRESETED, {});
        }
    }
    public getFormType(): string {
        return 'SEARCHFORM';
    }

    /*****************事件声明************************/
    /**
     * 搜索表单重置事件
     */
    public static FORMRESETED = 'FORMRESETED';
    /**
     * 搜索表单搜索事件
     */
    public static FORMSEARCHED = 'FORMSEARCHED';
    /**
     * 搜索表单收缩事件
     */
    public static FORMCONTRACT = 'FORMCONTRACT';

}