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
 * 视图控制器基类
 *
 * @class IBizViewController
 * @extends {IBizObject}
 */
var IBizViewController = /** @class */ (function (_super) {
    __extends(IBizViewController, _super);
    /**
     * Creates an instance of IBizViewController.
     * 创建 IBizViewController 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizViewController
     */
    function IBizViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.itemMap = new Map();
        _this_1.parentMode = {};
        _this_1.parentData = {};
        _this_1.bInited = false;
        _this_1.ctrlers = new Map();
        _this_1.codelists = new Map();
        _this_1.uiactions = new Map();
        _this_1.uicounters = new Map();
        _this_1.referData = {};
        _this_1.viewparam = {};
        _this_1.updatepanels = new Map();
        _this_1.controls = new Map();
        _this_1.containerid = opts.containerid;
        _this_1.appctx = opts.appctx;
        _this_1.backendurl = opts.backendurl;
        _this_1.setId(opts.id);
        return _this_1;
    }
    /**
     * 组件绘制完成 Vue生命周期
     *
     * @param {*} vue
     * @memberof IBizViewController
     */
    IBizViewController.prototype.mounted = function (vue) {
        var _this = this;
        _this.$route = vue.$route;
        _this.$router = vue.$router;
        _this.$vue = vue;
        _this.setViewParam(vue.$route.query);
        _this.init(_this.getViewParam());
    };
    IBizViewController.prototype.isClosed = function () {
        var _this = this;
        return true;
    };
    IBizViewController.prototype.quit = function () {
    };
    // public isAutoLayout(): void {
    //     // var me=this;
    //     // return me.autoLayout;
    // }
    // public doLayout(): void {
    // }
    /**
     * 执行初始化
     */
    IBizViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        var _this = this;
        var win = window;
        var iBizApp = win.getIBizApp();
        if (iBizApp) {
            iBizApp.regSRFController(_this);
        }
    };
    IBizViewController.prototype.setSize = function (width, height) {
    };
    IBizViewController.prototype.getItem = function (itemId) {
        var _this = this;
        return _this.itemMap.get(itemId);
    };
    IBizViewController.prototype.setControl = function (name, control) {
        this.controls.set(name, control);
    };
    IBizViewController.prototype.getControl = function (name) {
        return this.controls.get(name);
    };
    IBizViewController.prototype.regUIActions = function (opts) {
        if (opts === void 0) { opts = {}; }
    };
    IBizViewController.prototype.regCodeLists = function (opts) {
        if (opts === void 0) { opts = {}; }
    };
    IBizViewController.prototype.regUICounters = function (opts) {
        if (opts === void 0) { opts = {}; }
    };
    IBizViewController.prototype.registerItem = function (itemId, item) {
        var _this = this;
        _this.itemMap.set(itemId, item);
    };
    IBizViewController.prototype.unloaded = function () {
        return null;
    };
    /**
     * 初始化
     */
    IBizViewController.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (params) {
            _this.parentMode = params.parentMode;
            _this.setParentData(params.parentData);
        }
        _this.bInited = true;
        _this.onInit();
        _this.initViewLogic();
        // if (!_this.getPController() && _this.isAutoLayout()) {
        //     _this.doLayout();
        // }
        _this.reloadUpdatePanels();
        _this.fire(IBizViewController.INITED, {});
    };
    /**
     * 异步初始化<加载HTML内容动态绘制到界面>
     */
    IBizViewController.prototype.asyncInit = function (params) {
        if (params === void 0) { params = {}; }
    };
    /**
     * 绘制内容布局
     */
    IBizViewController.prototype.renderHTML = function (data) {
    };
    /**
     * 是否初始化完毕
     */
    IBizViewController.prototype.isInited = function () {
        var _this = this;
        return _this.bInited;
    };
    /**
     * 获取当前容器标识
     */
    IBizViewController.prototype.getCId = function () {
        var _this = this;
        return _this.containerid;
    };
    /**
     * 获取当前容器标识2<自动附加_>
     */
    IBizViewController.prototype.getCId2 = function () {
        var _this = this;
        var cid = _this.getCId();
        if (cid != '') {
            return cid + '_';
        }
        return cid;
    };
    IBizViewController.prototype.getAppCtx = function () {
        var _this = this;
        return _this.appctx;
    };
    /**
     * 注册子控制器对象
     */
    IBizViewController.prototype.regController = function (ctrler) {
        var _this = this;
        _this.ctrlers.set(ctrler.getCId(), ctrler);
    };
    /**
     *获取子控制器对象
     */
    IBizViewController.prototype.getController = function (id) {
        var _this = this;
        return _this.ctrlers.get(id);
    };
    /**
     * 获取父视图控制器
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getPController = function () {
        var _this = this;
        var win = window;
        var iBizApp = win.getIBizApp();
        if (iBizApp) {
            return iBizApp.getParentController(this.getId());
        }
        return undefined;
    };
    /**
     * 注销子控制器对象
     */
    IBizViewController.prototype.unRegController = function (ctrler) {
        var _this = this;
        this.ctrlers.delete(ctrler.getCId());
    };
    /**
     * 注册代码表
     */
    IBizViewController.prototype.regCodeList = function (codelist) {
        var _this = this;
        _this.codelists.set(codelist.getId(), codelist);
    };
    /**
     * 获取代码表
     */
    IBizViewController.prototype.getCodeList = function (codelistId) {
        var _this = this;
        if (_this.codelists) {
            return this.codelists.get(codelistId);
        }
        return null;
    };
    /**
     * 注册界面行为
     */
    IBizViewController.prototype.regUIAction = function (uiaction) {
        var _this = this;
        _this.uiactions.set(uiaction.tag, uiaction);
    };
    /**
     * 获取界面行为
     */
    IBizViewController.prototype.getUIAction = function (uiactionId) {
        var _this = this;
        if (_this.uiactions) {
            return _this.uiactions.get(uiactionId);
        }
        return null;
    };
    /**
     * 注册界面计数器
     */
    IBizViewController.prototype.regUICounter = function (uicounter) {
        var _this = this;
        _this.uicounters.set(uicounter.tag, uicounter);
    };
    /**
     * 获取界面计数器
     */
    IBizViewController.prototype.getUICounter = function (uicounterId) {
        var _this = this;
        if (_this.uicounters) {
            return _this.uicounters.get(uicounterId);
        }
        return null;
    };
    /**
     * 刷新全部界面计数器
     */
    IBizViewController.prototype.reloadUICounters = function () {
        var _this = this;
        _this.uicounters.forEach(function (uicounter) {
            if (uicounter) {
                uicounter.reload();
            }
        });
        var pController = _this.getPController();
        if (pController) {
            pController.reloadUICounters();
        }
    };
    IBizViewController.prototype.getWindow = function () {
        var _this = this;
        // return _this.window;
    };
    /**
     * 是否支持视图模型
     */
    IBizViewController.prototype.isEnableViewModel = function () {
        return false;
    };
    /**
     * 获取后台地址
     */
    IBizViewController.prototype.getBackendUrl = function () {
        var _this = this;
        if (_this.backendurl) {
            return _this.backendurl;
        }
        return null;
    };
    /**
     * 销毁
     */
    IBizViewController.prototype.destroy = function () {
        // var _this = this;
        // $.getIBizApp().unRegSRFView(_this);
        // _this.config = null;
        // arguments.callee.$.destroy.call(this);
        _super.prototype.destroy.call(this);
        var _this = this;
        var win = window;
        var iBizApp = win.getIBizApp();
        if (iBizApp) {
            iBizApp.unRegSRFController(_this);
        }
    };
    /**
     * 刷新
     */
    IBizViewController.prototype.refresh = function () {
        var _this = this;
        _this.onRefresh();
    };
    IBizViewController.prototype.onRefresh = function () {
    };
    /**
     * 刷新子项
     */
    IBizViewController.prototype.refreshItem = function (name) {
        var _this = this;
        var item = _this.getItem(name);
        if (item) {
            if (typeof item.refresh === 'function') {
                item.refresh();
                return;
            }
            if (typeof item.reload === 'function') {
                item.reload();
                return;
            }
        }
    };
    /**
     * 设置父数据
     */
    IBizViewController.prototype.setParentData = function (data) {
        if (data === void 0) { data = {}; }
        var _this = this;
        _this.parentData = data;
        _this.onSetParentData();
        _this.reloadUpdatePanels();
    };
    IBizViewController.prototype.onSetParentData = function () {
    };
    /**
     * 获取父数据
     */
    IBizViewController.prototype.getParentData = function () {
        var _this = this;
        return _this.parentData;
    };
    /**
     * 获取父模式
     */
    IBizViewController.prototype.getParentMode = function () {
        var _this = this;
        return _this.parentMode;
    };
    /**
     * 获取引用数据
     */
    IBizViewController.prototype.getReferData = function () {
        var _this = this;
        return _this.referData;
    };
    /**
     * 获取引用数据
     */
    IBizViewController.prototype.getViewParam = function () {
        var _this = this;
        return _this.viewparam;
    };
    IBizViewController.prototype.setViewParam = function (viewparam) {
        if (viewparam === void 0) { viewparam = {}; }
        var _this = this;
        Object.assign(_this.viewparam, viewparam);
    };
    IBizViewController.prototype.renderCodeList_Normal = function (codeListId, value, emtpytext) {
        var codelist = this.getCodeList(codeListId);
        var item = codelist.getItemByValue(value);
        if (item == null) {
            return emtpytext;
        }
        return this.getCodeItemText(item);
    };
    IBizViewController.prototype.renderCodeList_NumOr = function (codeListId, value, emtpytext, textSeparator) {
        if (!textSeparator || textSeparator == '')
            textSeparator = '、';
        var codelist = this.getCodeList(codeListId);
        if (value == null) {
            return emtpytext;
        }
        var nValue = parseInt(value);
        var strTextOr = '';
        for (var i = 0; i < codelist.datas.length; i++) {
            var item = codelist.datas[i];
            var codevalue = item.value;
            if ((parseInt(codevalue) & nValue) > 0) {
                if (strTextOr.length > 0)
                    strTextOr += (textSeparator);
                strTextOr += this.getCodeItemText(item);
            }
        }
        return strTextOr;
    };
    IBizViewController.prototype.renderCodeList_StrOr = function (codeListId, value, emtpytext, textSeparator, valueSeparator) {
        if (!textSeparator || textSeparator == '')
            textSeparator = '、';
        if (value == null) {
            return emtpytext;
        }
        var strTextOr = '';
        var codelist = this.getCodeList(codeListId);
        var arrayValue = new Array();
        arrayValue = value.split(valueSeparator);
        for (var i = 0; i < arrayValue.length; i++) {
            var strText = '';
            strText = this.renderCodeList_Normal(codeListId, arrayValue[i], emtpytext);
            if (strTextOr.length > 0)
                strTextOr += (textSeparator);
            strTextOr += strText;
        }
        return strTextOr;
    };
    IBizViewController.prototype.getCodeItemText = function (item) {
        if (item === void 0) { item = {}; }
        var color = item.color;
        var textCls = item.textcls;
        var iconCls = item.iconcls;
        // var realText = IBiz.encodeString(item.text);
        var realText = item.text;
        var ret = '';
        if (iconCls) {
            ret = ('<i class="' + iconCls + '"></i>');
        }
        if (textCls || color) {
            ret += '<span';
            if (textCls) {
                ret += (' class="' + textCls + '"');
            }
            if (color) {
                ret += (' style="color:' + color + '"');
            }
            ret += '>';
            ret += realText;
            ret += '</span>';
        }
        else {
            ret += realText;
        }
        return ret;
    };
    IBizViewController.prototype.hasHtmlElement = function (id) {
        return false;
    };
    IBizViewController.prototype.initViewLogic = function () {
        var _this = this;
        _this.onPrepareViewLogics();
        // for (var A in _this.viewLogics) {
        //     var logic = _this.viewLogics[A];
        //     logic.init();
        // }
    };
    IBizViewController.prototype.onPrepareViewLogics = function () {
    };
    IBizViewController.prototype.regViewLogic = function (logic) {
    };
    IBizViewController.prototype.getViewLogic = function (tag) {
        var _this = this;
        return null;
    };
    IBizViewController.prototype.invokeCtrl = function (ctrlid, command, arg) {
        var _this = this;
    };
    /**
     * 注册界面更新面板
     */
    IBizViewController.prototype.regUpdatePanel = function (updatepanel) {
        var _this = this;
        this.updatepanels.set(updatepanel.name, updatepanel);
        _this.registerItem(updatepanel.name, updatepanel);
    };
    /**
     * 获取界面更新面板
     */
    IBizViewController.prototype.getUpdatePanel = function (updatepanelId) {
        var _this = this;
        if (_this.updatepanels) {
            return _this.updatepanels.get(updatepanelId);
        }
        return null;
    };
    /**
     * 刷新全部界面更新面板
     */
    IBizViewController.prototype.reloadUpdatePanels = function () {
        var _this = this;
        if (!_this.isInited())
            return;
        if (_this.updatepanels) {
            var params = {};
            _this.onFillUpdatePanelParam(params);
            _this.updatepanels.forEach(function (panel) {
                if (panel) {
                    panel.reload(params);
                }
            });
        }
        var pController = _this.getPController();
        if (pController) {
            pController.reloadUpdatePanels();
        }
    };
    IBizViewController.prototype.createUpdatePanel = function () {
        // return IBiz.createUpdatePanel(config);
    };
    /**
     * 填充更新面板调用参数
     */
    IBizViewController.prototype.onFillUpdatePanelParam = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (_this.viewparam) {
            // $.extend(params, _this.viewparam);
            Object.assign(params, _this.viewparam);
        }
        if (_this.getParentMode()) {
            // $.extend(params, _this.getParentMode());
            Object.assign(params, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(params, _this.getParentData());
            Object.assign(params, _this.getParentData());
        }
    };
    /**
     * 打开视图--路由模式
     *
     * @param {string} name 路由名称
     * @param {*} [query={}] 路由参数
     * @param {*} [params] 其他参数 可选
     * @memberof IBizViewController
     */
    IBizViewController.prototype.openView = function (name, query, params) {
        if (query === void 0) { query = {}; }
        var _this = this;
        _this.$router.push({ name: name, query: query });
    };
    /**
     * 打开模态框对象
     *
     * @param {*} [params={}] 参数
     * @returns {Subject<any>} 流观察对象
     * @memberof IBizViewController
     */
    IBizViewController.prototype.openModal = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var subejct = new rxjs.Subject();
        Object.assign(params, { subejct: subejct });
        _this.$vue.$root.addModal(params);
        return subejct;
    };
    /*****************事件声明************************/
    /**
     * 控制器初始化完成
     *
     * @static
     * @memberof IBizViewController
     */
    IBizViewController.INITED = 'INITED';
    return IBizViewController;
}(IBizObject));
