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
 * 视图控制器入口
 *
 * @class IBizMianViewController
 * @extends {IBizViewController}
 */
var IBizMianViewController = /** @class */ (function (_super) {
    __extends(IBizMianViewController, _super);
    /**
     * Creates an instance of IBizMianViewController.
     * 创建 IBizMianViewController 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizMianViewController
     */
    function IBizMianViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    IBizMianViewController.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        _super.prototype.init.call(this, params);
        this.caption = null;
        this.calcToolbarItemState(false);
    };
    IBizMianViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        var _this = this;
        //初始化工具栏
        var toolbar = _this.getToolbar();
        if (toolbar) {
            toolbar.on(IBizToolbar.ITEMCLICK).subscribe(function (params) {
                _this.onClickTBItem(params);
            });
        }
    };
    IBizMianViewController.prototype.createToolbar = function () {
        // return IBiz.createToolbar(config);
    };
    /**
   * 点击按钮
   * @param tag 事件源
   */
    IBizMianViewController.prototype.onClickTBItem = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var uiaction = _this.getUIAction(params.tag);
        _this.doUIAction(uiaction, params);
    };
    IBizMianViewController.prototype.doUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
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
    };
    /**
     * 获取前台行为参数
     *
     * @param uiaction
     *            行为
     */
    IBizMianViewController.prototype.getFrontUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = {};
        if (uiaction.refreshview) {
            arg.callback = function (win) {
                _this.refresh();
            };
        }
        return arg;
    };
    /**
     * 获取后台行为参数
     *
     * @param uiaction
     *            行为
     */
    IBizMianViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        return {};
    };
    /**
     * 打开界面行为视图
     * @param uiaction 行为
     */
    IBizMianViewController.prototype.openUIActionView = function (frontview, viewparam) {
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
        if (frontview === void 0) { frontview = {}; }
        if (viewparam === void 0) { viewparam = {}; }
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
    };
    /**
     * 执行实体行为
     * @param uiaction 行为
     */
    IBizMianViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
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
            var param_1 = _this.getBackendUIActionParam(uiaction, params);
            if (param_1 == null)
                return;
            param_1.srfuiactionid = uiaction.tag;
            if (uiaction.confirmmsg) {
                // IBiz.confirm(uiaction.confirmmsg, function(result) {
                // 	if (result) {
                // 		_this.doBackendUIAction(param);
                // 	}
                // });
            }
            else {
                _this.doBackendUIAction(param_1);
            }
            return;
        }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.ERROR','错误'),$IGM('MAINVIEWCONTROLLER.DODEUIACTION.INFO2','未处理的实体行为['+uiaction.tag+']',[uiaction.tag]), 2);
    };
    /**
     * 执行工作流行为
     * @param uiaction 行为
     */
    IBizMianViewController.prototype.doWFUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
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
    };
    IBizMianViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
    };
    /**
     * 执行后台行为
     *
     * @param uiaction
     *            行为
     */
    IBizMianViewController.prototype.doBackendUIAction = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.ERROR','错误'),$IGM('MAINVIEWCONTROLLER.DOBACKENDUIACTION.INFO','未处理的后台界面行为['+uiaction.tag+']',[uiaction.tag]), 2);
    };
    /**
     * 关闭窗口
     */
    IBizMianViewController.prototype.closeWindow = function () {
        var _this = this;
        var win = _this.getWindow();
        if (win) {
            win.close(window);
        }
        else {
            window.close();
        }
    };
    IBizMianViewController.prototype.getWindow = function () {
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
    };
    /**
     * 获取标题
     */
    IBizMianViewController.prototype.getCaption = function () {
        return this.caption;
    };
    /**
     * 设置标题
     *
     * @param caption
     *            标题
     */
    IBizMianViewController.prototype.setCaption = function (caption) {
        if (this.caption != caption) {
            this.caption = caption;
            this.fire(IBizMianViewController.CAPTIONCHANGED, this.caption);
        }
    };
    /**
     * 获取工具栏
     */
    IBizMianViewController.prototype.getToolbar = function () {
        return this.getControl('toolbar');
    };
    /**
     * 计算工具栏项状态-<例如 根据是否有选中数据,设置 工具栏按钮是否可点击>
     *
     * @param hasdata
     *            是否有数据
     */
    IBizMianViewController.prototype.calcToolbarItemState = function (hasdata, dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        var _this = this;
        var toolbar = _this.getToolbar();
        if (!toolbar) {
            return;
        }
        if (Object.keys(toolbar.getItems()).length > 0) {
            var name_arr = Object.keys(toolbar.getItems());
            var btn_items_1 = toolbar.getItems();
            name_arr.forEach(function (name) {
                // const uiaction: any = this.$uiactions[name];
                var btn_item = btn_items_1[name];
                if (btn_item.target && (Object.is(btn_item.target, 'SINGLEKEY') || Object.is(btn_item.target, 'MULTIKEY'))) {
                    toolbar.setItemDisabled(name, !hasdata);
                }
            });
            toolbar.updateAccAction(dataaccaction);
            // toolbar.updateAccAction(Object.assign({}, this.$dataaccaction, dataaccaction));
        }
    };
    /**
     * 获取引用视图
     */
    IBizMianViewController.prototype.getReferView = function () {
        var _this = this;
        // if (_this.pageparams && _this.pageparams.openerid) {
        // 	return $.getIBizApp().getSRFView(_this.pageparams.openerid);
        // }
        return null;
    };
    /**
     * 获取uiactions
     */
    IBizMianViewController.prototype.getMoreActions = function () {
        return this.uiactions;
    };
    /*****************事件声明************************/
    /**
     * 选中值变化
     */
    IBizMianViewController.CAPTIONCHANGED = 'CAPTIONCHANGED';
    return IBizMianViewController;
}(IBizViewController));
