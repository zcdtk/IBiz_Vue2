"use strict";
/**
 * IBizHttp net 对象
 *
 * @class IBizHttp
 */
var IBizHttp = /** @class */ (function () {
    function IBizHttp() {
    }
    /**
     * post请求
     *
     * @param {string} url 请求路径
     * @param {*} [params={}] 请求参数
     * @returns {Observable<any>} 可订阅请求对象
     * @memberof IBizHttp
     */
    IBizHttp.prototype.post = function (url, params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var subject = new rxjs.Subject();
        var params_keys = Object.keys(params);
        var form_arr = [];
        params_keys.forEach(function (key) {
            form_arr.push(key + "=" + params[key]);
        });
        axios({
            method: 'post',
            url: url,
            data: form_arr.join('&'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Accept': 'application/json' },
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.ret === 2 && response.data.notlogin) {
                    _this.httpDefaultInterceptor(response.data);
                }
                subject.next(response.data);
            }
            else {
                subject.error(response);
            }
        }).catch(function (response) {
            subject.error(response);
        });
        return subject.asObservable();
    };
    /**
     * get请求
     *
     * @param {string} url 请求路径
     * @param {*} [params={}] 请求参数
     * @returns {Observable<any>} 可订阅请求对象
     * @memberof IBizHttp
     */
    IBizHttp.prototype.get = function (url, params) {
        if (params === void 0) { params = {}; }
        var subject = new rxjs.Subject();
        if (Object.keys(params).length > 0) {
            var params_keys = Object.keys(params);
            var params_arr_1 = [];
            params_keys.forEach(function (key) {
                if (params[key]) {
                    params_arr_1.push(key + "=" + params[key]);
                }
            });
            url = url.indexOf('?') ? url + "&" + params_arr_1.join('&') : url + "?&" + params_arr_1.join('&');
        }
        axios.get(url).
            then(function (response) {
            // handle success
            console.log(response);
            subject.next(response);
        }).catch(function (error) {
            // handle error
            console.log(error);
            subject.error(error);
        });
        return subject.asObservable();
    };
    /**
     * 模拟http拦截器 重定向登陆处理
     *
     * @param {*} [data={}]
     * @memberof IBizHttp
     */
    IBizHttp.prototype.httpDefaultInterceptor = function (data) {
        if (data === void 0) { data = {}; }
        var curUrl = decodeURIComponent(window.location.href);
        if (window.location.href.indexOf('/ibizutil/login.html') === -1) {
            window.location.href = "/" + IBizEnvironment.SysName + IBizEnvironment.LoginRedirect + "?RU=" + curUrl;
        }
    };
    return IBizHttp;
}());

"use strict";
/**
 * 抽象接口对象
 *
 * @class IBizObject
 */
var IBizObject = /** @class */ (function () {
    /**
     * Creates an instance of IBizObject.
     * 创建 IBizObject 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizObject
     */
    function IBizObject(opts) {
        if (opts === void 0) { opts = {}; }
        /**
         * 事件对象集合
         *
         * @private
         * @type {Map<string, Subject<any>>}
         * @memberof IBizObject
         */
        this.events = new Map();
        /**
         * http 服务
         *
         * @memberof IBizObject
         */
        this.iBizHttp = new IBizHttp();
        this.id = opts.id;
        this.name = opts.name;
        this.refname = opts.refname;
    }
    /**
     * 对象初始化
     *
     * @param {*} [params={}]
     * @memberof IBizObject
     */
    IBizObject.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        this.onInit();
    };
    /**
     * 执行初始化
     *
     * @memberof IBizObject
     */
    IBizObject.prototype.onInit = function () {
    };
    /**
     * 设置对象id
     *
     * @param {string} id
     * @memberof IBizObject
     */
    IBizObject.prototype.setId = function (id) {
        this.id = id;
    };
    /**
     * 获取对象id
     *
     * @returns {string}
     * @memberof IBizObject
     */
    IBizObject.prototype.getId = function () {
        return this.id;
    };
    /**
     * 设置对象名称
     *
     * @param {string} name
     * @memberof IBizObject
     */
    IBizObject.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     * 获取对象名
     *
     * @returns {string}
     * @memberof IBizObject
     */
    IBizObject.prototype.getName = function () {
        return this.name;
    };
    /**
     * 获取对象关联名称
     *
     * @returns {string}
     * @memberof IBizObject
     */
    IBizObject.prototype.getRefName = function () {
        return this.refname;
    };
    /**
     * 注册事件
     *
     * @param {string} name 事件名称
     * @returns {Observable<any>} 事件订阅对象
     * @memberof IBizObject
     */
    IBizObject.prototype.on = function (name) {
        var subject;
        if (this.events.get(name)) {
            subject = this.events.get(name);
        }
        else {
            subject = new rxjs.Subject();
            this.events.set(name, subject);
        }
        return subject.asObservable();
    };
    /**
     * 呼出事件<参数会封装成JSON对象进行传递>
     * @param event 事件名称
     * @param sender 源
     * @param args 参数
     */
    IBizObject.prototype.fire = function (name, data) {
        if (this.events.get(name)) {
            this.events.get(name).next(data);
        }
    };
    return IBizObject;
}());

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
 * 代码表对象
 *
 * @class IBizCodeList
 * @extends {IBizObject}
 */
var IBizCodeList = /** @class */ (function (_super) {
    __extends(IBizCodeList, _super);
    /**
     * Creates an instance of IBizCodeList.
     * 创建 IBizCodeList 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizCodeList
     */
    function IBizCodeList(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 静态代码表数据项
         *
         * @private
         * @type {Array<any>}
         * @memberof IBizCodeList
         */
        _this.items = [];
        _this.items = opts.datas.slice();
        return _this;
    }
    /**
     * 获取静态代码表数据项
     *
     * @returns {Array<any>}
     * @memberof IBizCodeList
     */
    IBizCodeList.prototype.getDatas = function () {
        return this.items;
    };
    /**
     * 根据值获文本
     *
     * @param {*} value
     * @param {*} cascade
     * @returns {*}
     * @memberof IBizCodeList
     */
    IBizCodeList.prototype.getItemByValue = function (value, cascade) {
        var result;
        this.items.some(function (item) {
            if (Object.is(item.value, value)) {
                result = item;
                return true;
            }
        });
        return result;
    };
    return IBizCodeList;
}(IBizObject));

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
 * 控制器对象基类
 *
 * @class IBizControl
 * @extends {IBizObject}
 */
var IBizControl = /** @class */ (function (_super) {
    __extends(IBizControl, _super);
    /**
     * Creates an instance of IBizControl.
     * 创建 IBizControl 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizControl
     */
    function IBizControl(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.backendurl = '';
        var _this = _this_1;
        _this.backendurl = opts.backendurl;
        _this.viewController = opts.viewController;
        return _this_1;
    }
    IBizControl.prototype.load = function (params) {
    };
    /**
     * 销毁<暂时无效>
     */
    IBizControl.prototype.destroy = function () {
    };
    IBizControl.prototype.setSize = function (width, height) {
    };
    IBizControl.prototype.setWidth = function (width) {
    };
    IBizControl.prototype.setHeight = function (height) {
    };
    IBizControl.prototype.isVisible = function () {
        return true;
    };
    IBizControl.prototype.invoke = function (command, arg) {
        var me = this;
        me.onInvoke(command, arg);
    };
    IBizControl.prototype.onInvoke = function (command, arg) {
    };
    IBizControl.prototype.getViewController = function () {
        return this.viewController;
    };
    IBizControl.prototype.getBackendUrl = function () {
        var url;
        if (this.backendurl && !Object.is(this.backendurl, '')) {
            url = this.backendurl;
        }
        else if (this.getViewController()) {
            var viewController = this.getViewController();
            url = viewController.getBackendUrl();
        }
        return url;
    };
    return IBizControl;
}(IBizObject));

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
 * 计数器部件对象
 *
 * @class IBizCounter
 * @extends {IBizControl}
 */
var IBizCounter = /** @class */ (function (_super) {
    __extends(IBizCounter, _super);
    /**
     * Creates an instance of IBizCounter.
     * 创建 IBizCounter 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizCounter
     */
    function IBizCounter(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.counterparam = {};
        _this_1.lastReloadArg = {};
        _this_1.data = {};
        var _this = _this_1;
        _this.counterid = opts.counterId;
        // this.tag = opts.tag;
        _this.counterparam = JSON.stringify(opts.counterParam);
        _this.timer = opts.timer;
        // this.url = me.getController().getBackendUrl();
        if (_this.timer > 1000) {
            _this.tag = setInterval(function () { _this.reload(); }, _this.timer);
        }
        _this.reload();
        return _this_1;
    }
    IBizCounter.prototype.reload = function () {
        var _this = this;
        var params = { srfcounterid: _this.counterid, srfaction: 'FETCH', srfcounterparam: _this.counterparam };
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret == 0) {
                _this.setData(data);
            }
            else {
                console.log('加载计数数据异常.' + data.info);
            }
        }, function (error) {
            console.log(error);
        });
    };
    IBizCounter.prototype.setData = function (data) {
        var _this = this;
        _this.result = data;
        _this.data = data.data;
        _this.fire(IBizCounter.COUNTERCHANGED, _this.data);
    };
    IBizCounter.prototype.getResult = function () {
        var _this = this;
        return _this.result;
    };
    IBizCounter.prototype.getData = function () {
        var _this = this;
        return _this.data;
    };
    IBizCounter.prototype.close = function () {
        if (this.tag !== undefined) {
            clearInterval(this.tag);
            delete this.timer;
        }
    };
    /*****************事件声明************************/
    /**
     * 计数发生变化
     */
    IBizCounter.COUNTERCHANGED = "COUNTERCHANGED";
    return IBizCounter;
}(IBizControl));

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
 * 应用菜单
 *
 * @class IBizAppMenu
 * @extends {IBizControl}
 */
var IBizAppMenu = /** @class */ (function (_super) {
    __extends(IBizAppMenu, _super);
    /**
     * Creates an instance of IBizAppMenu.
     * 创建 IBizAppMenu 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizAppMenu
     */
    function IBizAppMenu(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 应用菜单数据
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this.items = [];
        /**
         * 应用功能集合
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this.appFuncs = [];
        return _this;
    }
    /**
     * 获取菜单数据
     *
     * @returns {Array<any>}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getItems = function () {
        return this.items;
    };
    /**
     * 获取应用功能数据
     *
     * @returns {Array<any>}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getAppFuncs = function () {
        return this.appFuncs;
    };
    IBizAppMenu.prototype.load = function (opt) {
        var _this = this;
        var params = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        if (opt) {
            Object.assign(params, opt);
        }
        var http = new IBizHttp();
        http.post(this.getBackendUrl(), params).subscribe(function (success) {
            console.log(success);
            if (success.ret === 0) {
                _this.items = success.items;
                // const data = this.doMenus(success.items);
                // this.fire(IBizEvent.IBizAppMenu_LOADED, data);
            }
        }, function (error) {
            console.log(error);
        });
    };
    IBizAppMenu.prototype.onSelectChange = function (select) {
    };
    /*****************事件声明************************/
    /**
     * 部件加载之前
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.BEFORELOAD = 'BEFORELOAD';
    /**
     * 部件加载完成
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.LOAD = 'LOAD';
    /**
     * 部件选中
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.SELECTION = 'SELECTION';
    return IBizAppMenu;
}(IBizControl));

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
 * 工具栏控件
 *
 * @class IBizToolbar
 * @extends {IBizControl}
 */
var IBizToolbar = /** @class */ (function (_super) {
    __extends(IBizToolbar, _super);
    /**
     * Creates an instance of IBizToolbar.
     * 创建 IBizToolbar 实例对象
     *
     * @param {*} [opts={}]
     * @memberof IBizToolbar
     */
    function IBizToolbar(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 工具栏项按钮集合
         *
         * @private
         * @type {Map<string, any>}
         * @memberof IBizToolbar
         */
        _this_1.items = new Map();
        _this_1.regToolBarItems();
        return _this_1;
    }
    /**
     * 注册所有工具栏按钮
     *
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.regToolBarItems = function () {
    };
    /**
     * 注册工具栏按钮
     *
     * @param {*} [item={}]
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.regToolBarItem = function (item) {
        var _this_1 = this;
        if (item === void 0) { item = {}; }
        if (Object.keys(item).length > 0 && !Object.is(item.name, '')) {
            item.dataaccaction = true;
            this.items.set(item.name, item);
        }
        if (item.menu && item.menu.length > 0) {
            var _menus = item.menu.slice();
            _menus.forEach(function (menu) {
                _this_1.regToolBarItem(menu);
            });
        }
    };
    /**
     * 获取所有工具栏按钮
     *
     * @returns {Map<string, any>}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.getItems = function () {
        return this.items;
    };
    /**
     * 设置工具栏按钮是否启用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.setItemDisabled = function (name, disabled) {
        if (this.items.get(name)) {
            this.items.get(name).disabled = disabled;
        }
    };
    /**
     * 更新工具栏按钮状态
     *
     * @param {*} [action={}]
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.updateAccAction = function (action) {
        if (action === void 0) { action = {}; }
        var _this = this;
        _this.items.forEach(function (value) {
            var priv = value.priv;
            if ((priv && !Object.is(priv, '')) && (action && Object.keys(action).length > 0 && action[priv] !== 1)) {
                value.dataaccaction = false;
            }
            else {
                value.dataaccaction = true;
            }
        });
    };
    /**
     * 点击按钮
     *
     * @param {string} name
     * @param {string} type
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.itemclick = function (name, type) {
        var _this = this;
        _this.fire(IBizToolbar.ITEMCLICK, { tag: type });
    };
    /** ***************事件声明*********************** */
    /**
     * 点击按钮事件
     *
     * @static
     * @memberof IBizToolbar
     */
    IBizToolbar.ITEMCLICK = 'ITEMCLICK';
    return IBizToolbar;
}(IBizControl));

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
        return _this_1;
    }
    IBizViewController.prototype.isClosed = function () {
        var _this = this;
        return true;
    };
    IBizViewController.prototype.quit = function () {
    };
    IBizViewController.prototype.isAutoLayout = function () {
        // var me=this;
        // return me.autoLayout;
    };
    IBizViewController.prototype.doLayout = function () {
    };
    /**
     * 执行初始化
     */
    IBizViewController.prototype.onInit = function () {
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
    IBizViewController.prototype.mounted = function (vue) {
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
        if (!_this.getPController() && _this.isAutoLayout()) {
            _this.doLayout();
        }
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
     * 获取父控件
     */
    IBizViewController.prototype.getPController = function () {
        return null;
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
     * 是否-模式框显示
     */
    IBizMianViewController.prototype.isShowModal = function () {
        return false;
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
        if (toolbar && toolbar.getItems()) {
            toolbar.getItems().forEach(function (item) {
                if (item.target && (Object.is(item.target, 'SINGLEKEY') || Object.is(item.target, 'MULTIKEY'))) {
                    toolbar.setItemDisabled(name, !hasdata);
                }
            });
            toolbar.updateAccAction(dataaccaction);
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
 * 首页视图控制器基类
 *
 * @class IBizIndexViewController
 * @extends {IBizMianViewController}
 */
var IBizIndexViewController = /** @class */ (function (_super) {
    __extends(IBizIndexViewController, _super);
    function IBizIndexViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    IBizIndexViewController.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        _super.prototype.init.call(this, params);
        var appmenu = this.getAppMenu();
        if (appmenu) {
            appmenu.on(IBizAppMenu.BEFORELOAD).subscribe(function (params) {
            });
            appmenu.on(IBizAppMenu.LOAD).subscribe(function (items) {
            });
            appmenu.on(IBizAppMenu.SELECTION).subscribe(function (item) {
            });
            appmenu.load(this.getViewParam());
        }
    };
    IBizIndexViewController.prototype.getAppMenu = function () {
        return this.getControl('appmenu');
    };
    IBizIndexViewController.prototype.appMenuBeforeLoad = function (params) {
        if (params === void 0) { params = {}; }
    };
    IBizIndexViewController.prototype.appMenuLoad = function (items) {
    };
    IBizIndexViewController.prototype.appMenuSelection = function (item) {
        if (item === void 0) { item = {}; }
    };
    return IBizIndexViewController;
}(IBizMianViewController));
