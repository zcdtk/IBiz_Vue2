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
 *
 *
 * @class IBizMainViewController
 * @extends {IBizViewController}
 */
var IBizMainViewController = /** @class */ (function (_super) {
    __extends(IBizMainViewController, _super);
    /**
     * Creates an instance of IBizMainViewController.
     * 创建 IBizMainViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizMainViewController
     */
    function IBizMainViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 是否显示工具栏，默认显示
         *
         * @type {boolean}
         * @memberof IBizMainViewController
         */
        _this.isShowToolBar = true;
        /**
         * 视图控制器标题
         *
         * @type {string}
         * @memberof IBizMainViewController
         */
        _this.caption = '';
        /**
         * 实体数据权限
         *
         * @type {*}
         * @memberof IBizMainViewController
         */
        _this.dataaccaction = {};
        return _this;
    }
    /**
     * 视图处初始化部件
     *
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var toolbar = this.getToolBar();
        if (toolbar) {
            // 工具栏点击
            toolbar.on(IBizToolbar.ITEMCLICK).subscribe(function (params) {
                _this.onClickTBItem(params);
            });
        }
    };
    /**
     * 视图加载
     *
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.loadModel();
    };
    /**
     * 加载视图模型之前
     *
     * @param {*} [params={}]
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.beforeLoadMode = function (params) { };
    /**
     * 视图模型加载完毕
     *
     * @protected
     * @param {*} data
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.afterLoadMode = function (data) { };
    /**
     * 加载视图模型
     *
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.loadModel = function () {
        var _this = this;
        var params = { srfaction: 'loadmodel' };
        this.beforeLoadMode(params);
        var url = this.isDynamicView() ? this.addOptionsForUrl(this.getBackendUrl(), this.getViewParam()) : this.getBackendUrl();
        this.iBizHttp.post(url, params).subscribe(function (data) {
            if (data.ret !== 0) {
                console.log(data.info);
                return;
            }
            if (data.dataaccaction && Object.keys(data.dataaccaction).length > 0) {
                Object.assign(_this.dataaccaction, data.dataaccaction);
                _this.onDataAccActionChange(data.dataaccaction);
            }
            _this.afterLoadMode(data);
        }, function (error) {
            console.log(error.info);
        });
    };
    /**
     * 添加参数到指定的url中
     *
     * @private
     * @param {string} url
     * @param {*} [opt={}]
     * @returns {string}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.addOptionsForUrl = function (url, opt) {
        if (opt === void 0) { opt = {}; }
        var keys = Object.keys(opt);
        var isOpt = url.indexOf('?');
        keys.forEach(function (key, index) {
            if (index === 0 && isOpt === -1) {
                url += "?{key}={opt[key]}";
            }
            else {
                url += "&{key}={opt[key]}";
            }
        });
        return url;
    };
    /**
     * 是否是动态视图
     *
     * @returns {boolean}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.isDynamicView = function () {
        return false;
    };
    /**
     * 点击按钮
     *
     * @param {*} [params={}]  tag 事件源
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.onClickTBItem = function (params) {
        if (params === void 0) { params = {}; }
        var uiaction = this.getUIAction(params.tag);
        this.doUIAction(uiaction, params);
    };
    /**
     * 处理实体界面行为
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.doUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (uiaction && (typeof uiaction === 'string')) {
            uiaction = this.getUIAction(uiaction);
        }
        if (uiaction) {
            if (Object.is(uiaction.type, 'DEUIACTION')) {
                this.doDEUIAction(uiaction, params);
                return;
            }
            if (Object.is(uiaction.type, 'WFUIACTION')) {
                this.doWFUIAction(uiaction, params);
                return;
            }
        }
    };
    /**
     * 获取前台行为参数
     *
     * @param {*} [uiaction={}] 行为
     * @param {*} [params={}]
     * @returns {*}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.getFrontUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var arg = {};
        if (uiaction.refreshview) {
            arg.callback = function (win) {
                this.refresh();
            };
        }
        return arg;
    };
    /**
     * 获取后台行为参数
     *
     * @param {*} [uiaction={}] 行为
     * @param {*} [params={}]
     * @returns {*}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var arg = {};
        return arg;
    };
    /**
     * 打开界面行为视图，前端实体界面行为
     *
     * @param {*} [uiaction={}] 行为
     * @param {*} [viewparam={}]  视图参数
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.openUIActionView = function (uiaction, viewparam) {
        var _this = this;
        if (uiaction === void 0) { uiaction = {}; }
        if (viewparam === void 0) { viewparam = {}; }
        var frontview = uiaction.frontview;
        frontview.viewParam = viewparam;
        // 视图顶级打开
        if (Object.is(uiaction.fronttype, 'TOP')) {
            var href = '';
            if (!Object.is(frontview.openMode, 'INDEXVIEWTAB') && !Object.is(frontview.openMode, 'POPUPAPP')) {
                this.iBizNotification.warning('警告', '该视图打开方式，请选择顶级容器分页或独立程序弹出！');
                return;
            }
            // 视图非模式弹出
            href = window.location.href.substring(0, window.location.href.indexOf(window.location.hash) + 1);
            href = "{href}/data-v";
            var _names = Object.keys(viewparam);
            var urlparams_1 = '';
            _names.forEach(function (name) {
                urlparams_1 += ";{name}={viewparam[name]}";
            });
            var url = "{href}/{frontview.className}{urlparams}";
            window.open(url, '_blank');
            return;
        }
        // 视图模式打开
        var modal = false;
        if (Object.is(frontview.openMode, 'POPUPMODAL')) {
            modal = true;
        }
        if (modal) {
            this.openModal(frontview).subscribe(function (result) {
                if (result && Object.is(result.ret, 'OK')) {
                    if (uiaction.reload) {
                        _this.onRefresh();
                    }
                }
            });
        }
    };
    /**
     * 执行实体行为
     *
     * @param {*} [uiaction={}] 行为
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.doDEUIAction = function (uiaction, params) {
        var _this = this;
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.actionmode, 'FRONT')) {
            if ((Object.is(uiaction.fronttype, 'WIZARD')) || (Object.is(uiaction.fronttype, 'SHOWPAGE')) || (Object.is(uiaction.fronttype, 'TOP'))) {
                var viewparam = this.getFrontUIActionParam(uiaction, params);
                if (!viewparam) {
                    viewparam = {};
                }
                var frontview = uiaction.frontview;
                if (frontview.redirectview) {
                    this.redirectOpenView({ redirectUrl: frontview.backendurl, viewParam: viewparam });
                    return;
                }
                // 携带所有的实体界面行为参数
                this.openUIActionView(uiaction, viewparam);
                return;
            }
            if (Object.is(uiaction.fronttype, 'OPENHTMLPAGE')) {
                var viewparam = this.getFrontUIActionParam(uiaction, params);
                var urlparams_2 = '';
                var _names = Object.keys(viewparam);
                _names.forEach(function (name) {
                    urlparams_2 += "&{name}={viewparam[name]}";
                });
                var url = "{uiaction.htmlpageurl}?{urlparams}";
                window.open(url, '_blank');
                return;
            }
        }
        if (Object.is(uiaction.actionmode, 'BACKEND')) {
            var param_1 = this.getBackendUIActionParam(uiaction, params);
            if (!param_1) {
                return;
            }
            param_1.srfuiactionid = uiaction.tag;
            if (uiaction.confirmmsg) {
                this.iBizNotification.confirm('提示', uiaction.confirmmsg).subscribe(function (result) {
                    if (result && Object.is(result, 'OK')) {
                        _this.doBackendUIAction(param_1);
                    }
                });
            }
            else {
                this.doBackendUIAction(param_1);
            }
            return;
        }
        this.iBizNotification.error('错误', '未处理的实体行为[' + uiaction.tag + ']');
    };
    /**
     * 执行工作流行为
     *
     * @param {*} [uiaction={}] 行为
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.doWFUIAction = function (uiaction, params) {
        var _this = this;
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.actionmode, 'WFFRONT')) {
            if (Object.is(uiaction.fronttype, 'WIZARD') || Object.is(uiaction.fronttype, 'SHOWPAGE')) {
                // let className: string;
                // if (uiaction.frontview.className) {
                //     className = uiaction.frontview.className;
                // } else {
                //     className = uiaction.frontview.classname;
                // }
                var opt = { viewparam: {} };
                var data = this.getFrontUIActionParam(uiaction, params);
                // opt.modalZIndex = this.modalZIndex;
                // opt.viewparam = {};
                if (data) {
                    Object.assign(opt.viewparam, data);
                }
                if (uiaction.frontview.viewParam) {
                    Object.assign(opt.viewparam, uiaction.frontview.viewParam);
                }
                else {
                    Object.assign(opt.viewparam, uiaction.frontview.viewparam);
                }
                Object.assign(opt, { modalviewname: uiaction.frontview.modalviewname, title: uiaction.frontview.title });
                // 打开模态框
                var modal = this.openModal(opt);
                modal.subscribe(function (result) {
                    if (result && Object.is(result.ret, 'OK')) {
                        _this.onWFUIFrontWindowClosed(result);
                    }
                });
                return;
            }
        }
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.ERROR','错误'),IGM('MAINVIEWCONTROLLER.DOWFUIACTION.INFO','未处理的实体工作流行为['+uiaction.tag+']',[uiaction.tag]), 2);
        this.iBizNotification.warning('错误', '未处理的实体工作流行为[' + uiaction.tag + ']');
    };
    /**
     * 关系工作流窗口对象
     *
     * @param {*} win
     * @param {*} [data={}]
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
        if (data === void 0) { data = {}; }
    };
    /**
     * 执行后台行为
     *
     * @param {*} [uiaction={}] 行为
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.doBackendUIAction = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.ERROR','错误'),IGM('MAINVIEWCONTROLLER.DOBACKENDUIACTION.INFO','未处理的后台界面行为['+uiaction.tag+']',[uiaction.tag]), 2);
        this.iBizNotification.error('错误', '未处理的后台界面行为[' + uiaction.tag + ']');
    };
    /**
     * 是否-模式框显示
     *
     * @returns {boolean}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.isShowModal = function () {
        return false;
    };
    /**
     * 关闭窗口
     *
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.closeWindow = function () {
        // if (this.isModal()) {
        //     this.nzModalSubject.destroy('onOk');
        // } else if (this.ibizAppService.getFullScreen()) {
        //     let win = this.getWindow();
        //     win.close();
        // } else {
        //     this.goBack();
        // }
    };
    /**
     * 获取窗口对象
     *
     * @returns {Window}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.getWindow = function () {
        return window;
    };
    /**
     * 获取标题
     *
     * @returns {string} 标题
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.getCaption = function () {
        return this.caption;
    };
    /**
     * 设置标题
     *
     * @param {string} caption 标题
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.setCaption = function (caption) {
        if (!Object.is(this.caption, caption)) {
            this.caption = caption;
            this.fire(IBizMainViewController.CAPTIONCHANGED, this);
        }
    };
    /**
     * 获取工具栏服务对象
     *
     * @returns {*}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.getToolBar = function () {
        return this.getControl('toolbar');
    };
    /**
     * 计算工具栏项状态-<例如 根据是否有选中数据,设置 工具栏按钮是否可点击>
     *
     * @param {boolean} hasdata 是否有数据
     * @param {*} dataaccaction
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.calcToolbarItemState = function (hasdata, dataaccaction) {
        var _this = this;
        var toolbar = this.getToolBar();
        if (!toolbar) {
            return;
        }
        if (Object.keys(toolbar.getItems()).length > 0) {
            var name_arr = Object.keys(toolbar.getItems());
            var btn_items_1 = toolbar.getItems();
            name_arr.forEach(function (name) {
                var uiaction = _this.uiactions[name];
                var btn_item = btn_items_1[name];
                if (btn_item.target && (Object.is(btn_item.target, 'SINGLEKEY') || Object.is(btn_item.target, 'MULTIKEY'))) {
                    toolbar.setItemDisabled(name, !hasdata);
                }
            });
            toolbar.updateAccAction(Object.assign({}, this.dataaccaction, dataaccaction));
        }
    };
    /**
     * 获取引用视图
     *
     * @returns {*}
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.getReferView = function () {
        return undefined;
    };
    /**
     * 打开重定向视图
     *
     * @param {*} view 打开视图的参数
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.redirectOpenView = function (view) {
        var _this = this;
        var viewParam = {};
        viewParam.srfviewparam = JSON.stringify(view.viewParam);
        Object.assign(viewParam, { 'srfaction': 'GETRDVIEW' });
        this.iBizHttp.post(view.redirectUrl, viewParam).subscribe(function (response) {
            if (!response.rdview || response.ret !== 0) {
                if (response.errorMessage) {
                    _this.iBizNotification.info('错误', response.errorMessage);
                }
                return;
            }
            if (response.rdview && response.rdview.viewurl && response.ret === 0) {
                if (response.rdview.srfkey || Object.is(response.rdview.srfkey, '')) {
                    view.viewParam.srfkey = response.rdview.srfkey;
                    view.viewParam.srfkeys = response.rdview.srfkey;
                }
                if (response.rdview.srfviewparam) {
                    Object.assign(view.viewParam, response.rdview.srfviewparam);
                }
                var routeLink = response.rdview.viewurl;
                if (routeLink.lastIndexOf('.jsp') !== -1) {
                    _this.iBizNotification.error('错误', "\u89C6\u56FE\u7C7B\u578Bjsp\u4E0D\u652F\u6301\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E");
                    return;
                }
                // let routeActiveItem: ActivatedRoute = this.routeActive;
                // while (true) {
                //     if (this.isRoutePathItem(routeActiveItem, routeLink)) {
                //         let queryParams: any = {};
                //         if (view.viewParam.srfdeid && !Object.is(view.viewParam.srfdeid, '')) {
                //             queryParams['srfdeid'] = view.viewParam.srfdeid;
                //         }
                //         this.openView(routeLink, view.viewParam, queryParams);
                //         return;
                //     } else {
                //         if (routeActiveItem.parent) {
                //             routeActiveItem = routeActiveItem.parent;
                //         } else {
                //             this.iBizNotification.error('错误', `视图信息不存在请检查[{routeLink}]`);
                //             return;
                //         }
                //     }
                // }
            }
            else {
                _this.iBizNotification.info('错误', '重定向视图信息获取错误,无法打开!');
            }
        }, function (error) {
            _this.iBizNotification.info('错误', error.info);
        });
    };
    /**
     * 实体数据发生变化
     *
     * @param {*} [dataaccaction={}]
     * @memberof IBizMainViewController
     */
    IBizMainViewController.prototype.onDataAccActionChange = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
    };
    IBizMainViewController.CAPTIONCHANGED = 'CAPTIONCHANGED';
    return IBizMainViewController;
}(IBizViewController));
