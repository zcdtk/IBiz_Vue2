/**
 * 视图控制器入口
 *
 * @class IBizMianViewController
 * @extends {IBizViewController}
 */
class IBizMianViewController extends IBizViewController {

	private caption: string;

    /**
     * Creates an instance of IBizMianViewController.
     * 创建 IBizMianViewController 实例对象
     * 
     * @param {*} [opts={}]
     * @memberof IBizMianViewController
     */
	constructor(opts: any = {}) {
		super(opts);
	}

	public init(params: any = {}): void {
		super.init(params);
		this.caption = null;
		this.calcToolbarItemState(false);
	}
	public onInit(): void {
		super.onInit();
		var _this = this;
		//初始化工具栏
		const toolbar = _this.getToolbar();
		if (toolbar) {
			toolbar.on(IBizToolbar.ITEMCLICK).subscribe((params) => {
				_this.onClickTBItem(params);
			});
		}
	}
	public createToolbar(): void {
		// return IBiz.createToolbar(config);
	}

	/**
   * 点击按钮
   * @param tag 事件源
   */
	public onClickTBItem(params: any = {}): void {
		var _this = this;
		var uiaction = _this.getUIAction(params.tag);
		_this.doUIAction(uiaction, params);
	}
	public doUIAction(uiaction: any = {}, params: any = {}): void {
		var _this = this;
		if (uiaction && (typeof uiaction == 'string')) {
			uiaction = _this.getUIAction(uiaction);
		}
		if (uiaction) {
			if (uiaction.type == 'DEUIACTION') {
				_this.doDEUIAction(uiaction, params);
				return;
			}
			if (uiaction.type == 'WFUIACTION') {
				_this.doWFUIAction(uiaction, params);
				return;
			}
		}
	}
	/**
	 * 获取前台行为参数
	 * 
	 * @param uiaction
	 *            行为
	 */
	public getFrontUIActionParam(uiaction: any = {}, params: any = {}): any {
		var _this = this;
		let arg: any = {};
		if (uiaction.refreshview) {
			arg.callback = function (win) {
				_this.refresh();
			}
		}
		return arg;
	}

	/**
	 * 获取后台行为参数
	 * 
	 * @param uiaction
	 *            行为
	 */
	public getBackendUIActionParam(uiaction: any = {}, params: any = {}): any {
		return {};
	}
	/**
	 * 打开界面行为视图
	 * @param uiaction 行为
	 */
	public openUIActionView(frontview: any = {}, viewparam: any = {}): void {
		// var _this = this;
		// var callback;
		// if(viewparam && viewparam.callback){
		// 	callback = viewparam.callback;
		// 	delete viewparam.callback;
		// }
		// var win = $.getIBizApp().createWindow({});
		// win.scope = _this;
		// win.title = frontview.title;
		// win.height = frontview.height ? frontview.height: 0;
		// win.width = frontview.width ? frontview.width: 0;
		// win.url = $.getIBizApp().parseURL2(	frontview.subapp,frontview.viewurl, {windowid : win.getId(),openerid : _this.getId()});
		// win.viewparam = viewparam;
		// win.callback = function(win) {
		// 	if(callback && typeof(callback) == 'function'){
		// 		callback({win:win});
		// 	}
		// }

		// var modal=false;
		// if(frontview.openMode=='POPUPMODAL')
		// {
		// 	modal = true;
		// }
		// if(modal){
		// 	win.openModal(window);
		// } else {
		// 	win.openInNewWindow(window);
		// }
	}
	/**
	 * 执行实体行为
	 * @param uiaction 行为
	 */
	public doDEUIAction(uiaction: any = {}, params: any = {}): void {
		var _this = this;
		if (uiaction.actionmode == 'FRONT') {
			if ((uiaction.fronttype == 'WIZARD') || (uiaction.fronttype == 'SHOWPAGE')) {
				var viewparam = _this.getFrontUIActionParam(uiaction, params);
				if (!viewparam) {
					viewparam = {};
				}
				var frontview = uiaction.frontview;
				if (frontview.redirectview) {
					var param = {};
					param['srfviewparam'] = JSON.stringify(viewparam);
					param['srfaction'] = 'GETRDVIEW';
					//远程请求
					// IBiz.ajax({
					// 	url: _this.getAppCtx()+frontview.backendurl,
					// 	params: param,
					// 	method: 'POST',
					// 	dataType: 'json',
					// 	success: function(data) {
					// 		if (data.ret == 0) {
					// 			if(data.rdview)
					// 				_this.openUIActionView(data.rdview,viewparam);
					// 			else
					// 			{
					// 				IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MAINVIEWCONTROLLER.DODEUIACTION.INFO','无法打开视图,'+data.info,[data.info]),1);
					// 			}
					// 		} else {
					// 			IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MAINVIEWCONTROLLER.DODEUIACTION.INFO','无法打开视图,'+data.info,[data.info]),2);
					// 		}
					// 	}
					// 	failure: function(e) {
					// 		IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MAINVIEWCONTROLLER.AJAX.INFO','获取打开视图失败,请求异常'),2);
					// 	}
					// });
					return;
				}
				_this.openUIActionView(frontview, viewparam);
				return;
			}

			if (uiaction.fronttype == 'OPENHTMLPAGE') {
				// var url = $.getIBizApp().parseURL2(null,uiaction.htmlpageurl, _this.getFrontUIActionParam(uiaction,params));
				// window.open(url, '_blank');
				return;
			}
		}

		if (uiaction.actionmode == 'BACKEND') {
			let param: any = _this.getBackendUIActionParam(uiaction, params);
			if (param == null)
				return;
			param.srfuiactionid = uiaction.tag;
			if (uiaction.confirmmsg) {
				// IBiz.confirm(uiaction.confirmmsg, function(result) {
				// 	if (result) {
				// 		_this.doBackendUIAction(param);
				// 	}
				// });
			} else {
				_this.doBackendUIAction(param);
			}
			return;
		}
		// IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.ERROR','错误'),$IGM('MAINVIEWCONTROLLER.DODEUIACTION.INFO2','未处理的实体行为['+uiaction.tag+']',[uiaction.tag]), 2);
	}
	/**
	 * 执行工作流行为
	 * @param uiaction 行为
	 */
	public doWFUIAction(uiaction: any = {}, params: any = {}): void {
		var _this = this;
		if (uiaction.actionmode == 'WFFRONT') {
			if ((uiaction.fronttype == 'WIZARD') || (uiaction.fronttype == 'SHOWPAGE')) {
				// var win = $.getIBizApp().createWindow({});

				// var viewparam = _this.getFrontUIActionParam(uiaction,params);

				// if (!viewparam) {
				// 	viewparam = {};
				// }
				// viewparam['windowid'] = win.getId();
				// viewparam['openerid'] = _this.getId();

				// $.extend(viewparam, uiaction.frontview.viewparam);
				// win.scope = _this;
				// win.title = uiaction.frontview.title;
				// win.height = uiaction.frontview.height ? uiaction.frontview.height
				// 		: 0;
				// win.width = uiaction.frontview.width ? uiaction.frontview.width
				// 		: 0;
				// win.url = $.getIBizApp().parseURL2(
				// 		uiaction.frontview.subapp,
				// 		uiaction.frontview.viewurl, {
				// 			windowid : win.getId(),
				// 			openerid : _this.getId()
				// 		});
				// win.viewparam = viewparam;
				// win.callback  = function(win){
				// 	_this.onWFUIFrontWindowClosed(win);
				// };

				// if (true) {// uiaction.frontview.modal){
				// 	win.openModal(window);
				// } else {
				// 	win.openInNewWindow(window);
				// }
				// return;
			}
		}
		// IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.ERROR','错误'),$IGM('MAINVIEWCONTROLLER.DOWFUIACTION.INFO','未处理的实体工作流行为['+uiaction.tag+']',[uiaction.tag]), 2);
	}
	public onWFUIFrontWindowClosed(win, data): void {

	}
	/**
	 * 执行后台行为
	 * 
	 * @param uiaction
	 *            行为
	 */
	public doBackendUIAction(uiaction: any = {}): void {
		// IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.ERROR','错误'),$IGM('MAINVIEWCONTROLLER.DOBACKENDUIACTION.INFO','未处理的后台界面行为['+uiaction.tag+']',[uiaction.tag]), 2);
	}

	/**
	 * 关闭窗口
	 */
	public closeWindow(): void {
		var _this = this;
		var win = _this.getWindow();
		if (win) {
			win.close(window);
		}
		else {
			window.close();
		}
	}

	public getWindow(): any {
		var _this = this;
		// try
		// {
		// 	if(_this.window)
		// 	{
		// 		var curwindow = $.getIBizApp().findWindow(_this.window.getId());
		// 		if(curwindow!=_this.window)
		// 		{
		// 			 _this.window = null;
		// 		}
		// 	}
		// }
		// catch(e)
		// {
		// 	 _this.window = null;
		// }
		return window;
	}
	/**
	 * 获取标题
	 */
	public getCaption(): string {
		return this.caption;
	}

	/**
	 * 设置标题
	 * 
	 * @param caption
	 *            标题
	 */
	public setCaption(caption: string): void {
		if (this.caption != caption) {
			this.caption = caption;
			this.fire(IBizMianViewController.CAPTIONCHANGED, this.caption);
		}
	}

	/**
	 * 获取工具栏
	 */
	public getToolbar(): any {
		return this.getControl('toolbar');
	}

	/**
	 * 计算工具栏项状态-<例如 根据是否有选中数据,设置 工具栏按钮是否可点击>
	 * 
	 * @param hasdata
	 *            是否有数据
	 */
	public calcToolbarItemState(hasdata: boolean, dataaccaction: any = {}): void {
		var _this = this;
		const toolbar = _this.getToolbar();
        if (!toolbar) {
            return;
        }
        if (Object.keys(toolbar.getItems()).length > 0) {
            const name_arr: Array<any> = Object.keys(toolbar.getItems());
            const btn_items = toolbar.getItems();
            name_arr.forEach((name) => {
                // const uiaction: any = this.$uiactions[name];
                const btn_item = btn_items[name];
                if (btn_item.target && (Object.is(btn_item.target, 'SINGLEKEY') || Object.is(btn_item.target, 'MULTIKEY'))) {
                    toolbar.setItemDisabled(name, !hasdata);
                }
            });
			toolbar.updateAccAction(dataaccaction);
            // toolbar.updateAccAction(Object.assign({}, this.$dataaccaction, dataaccaction));
        }
	}
	/**
	 * 获取引用视图	
	 */
	public getReferView(): any {
		var _this = this;
		// if (_this.pageparams && _this.pageparams.openerid) {
		// 	return $.getIBizApp().getSRFView(_this.pageparams.openerid);
		// }
		return null;
	}
	/**
	 * 获取uiactions	
	 */
	public getMoreActions(): Map<string, any> {
		return this.uiactions;
	}

	/*****************事件声明************************/
	/**
	 * 选中值变化
	 */
	public static CAPTIONCHANGED = 'CAPTIONCHANGED';
}