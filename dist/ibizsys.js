"use strict";
/**
 * IBizApp 应用
 *
 * @class IBizApp
 */
var IBizApp = /** @class */ (function () {
    /**
     * Creates an instance of IBizApp.
     * 创建 IBizApp 实例
     *
     * @memberof IBizApp
     */
    function IBizApp() {
        /**
         * 当前窗口所有视图控制器
         *
         * @type {*}
         * @memberof IBizApp
         */
        this.viewControllers = {};
        /**
         * 父窗口window对象
         *
         * @type {*}
         * @memberof IBizApp
         */
        this.parentWindow = null;
        /**
         * rxjs 流观察对象
         *
         * @private
         * @type {Subject<any>}
         * @memberof IBizApp
         */
        this.subject = new rxjs.Subject();
    }
    ;
    /**
     * 注册视图控制
     *
     * @param {*} ctrler
     * @memberof IBizApp
     */
    IBizApp.prototype.regSRFController = function (ctrler) {
        this.viewControllers[ctrler.getId()] = ctrler;
    };
    /**
     * 注销视图控制器
     *
     * @param {*} ctrler
     * @memberof IBizApp
     */
    IBizApp.prototype.unRegSRFController = function (ctrler) {
        var id = ctrler.getId();
        // ctrler.quit();
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    };
    /**
     * 注销视图控制器
     *
     * @param {string} id
     * @memberof IBizApp
     */
    IBizApp.prototype.unRegSRFController2 = function (id) {
        this.viewControllers[id] = null;
        delete this.viewControllers[id];
    };
    /**
     * 获取视图控制器
     *
     * @param {string} id
     * @returns {*}
     * @memberof IBizApp
     */
    IBizApp.prototype.getSRFController = function (id) {
        return this.viewControllers[id];
    };
    /**
     * 获取父视图控制器
     *
     * @param {string} id 视图控制器id
     * @returns {*}
     * @memberof IBizApp
     */
    IBizApp.prototype.getParentController = function (id) {
        var ctrl_ids = Object.keys(this.viewControllers);
        var index = ctrl_ids.findIndex(function (ctrl_id) { return Object.is(id, ctrl_id); });
        if (index > 0) {
            return this.viewControllers[ctrl_ids[index - 1]];
        }
        return null;
    };
    /**
     * 注册父窗口window 对象
     *
     * @param {Window} win
     * @memberof IBizApp
     */
    IBizApp.prototype.regParentWindow = function (win) {
        this.parentWindow = win;
    };
    /**
     * 获取父窗口window 对象
     *
     * @returns {Window}
     * @memberof IBizApp
     */
    IBizApp.prototype.getParentWindow = function () {
        return this.parentWindow;
    };
    /**
     * 订阅刷新视图事件
     *
     * @returns {Subject<any>}
     * @memberof IBizApp
     */
    IBizApp.prototype.onRefreshView = function () {
        return this.subject;
    };
    /**
     * 通知视图刷新事件
     *
     * @param {*} data
     * @memberof IBizApp
     */
    IBizApp.prototype.fireRefreshView = function (data) {
        if (data === void 0) { data = {}; }
        this.subject.next(data);
    };
    return IBizApp;
}());
// 初始化IBizApp 对象， 挂载在window对象下
(function (window) {
    var win = window;
    if (!win.iBizApp) {
        win.iBizApp = new IBizApp();
    }
    win.getIBizApp = function () {
        if (win.iBizApp) {
            return win.iBizApp;
        }
        else {
            win.iBizApp = new IBizApp();
        }
    };
    if (window.opener && window.opener.window) {
        win.iBizApp.regParentWindow(window.opener.window);
    }
})(window);

"use strict";
/**
 * IBizSys平台工具类
 *
 * @class IBizUtil
 */
var IBizUtil = /** @class */ (function () {
    function IBizUtil() {
    }
    /**
     * 创建 UUID
     *
     * @static
     * @returns {string}
     * @memberof IBizUtil
     */
    IBizUtil.createUUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    /**
     * 判断条件是否成立
     *
     * @static
     * @param {*} value
     * @param {*} op
     * @param {*} value2
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.testCond = function (value, op, value2) {
        // 等于操作
        if (Object.is(op, 'EQ')) {
            return value === value2;
        }
        // 大于操作
        if (Object.is(op, 'GT')) {
            var result = this.compare(value, value2);
            if (result !== undefined && result > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        // 大于等于操作
        if (Object.is(op, 'GTANDEQ')) {
            var result = this.compare(value, value2);
            if (result !== undefined && result >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
        // 值包含在给定的范围中
        if (Object.is(op, 'IN')) {
            return this.contains(value, value2);
        }
        // 不为空判断操作
        if (Object.is(op, 'ISNOTNULL')) {
            return (value != null && value !== '');
        }
        // 为空判断操作
        if (Object.is(op, 'ISNULL')) {
            return (value == null || value === '');
        }
        // 文本左包含
        if (Object.is(op, 'LEFTLIKE')) {
            return (value && value2 && (value.toUpperCase().indexOf(value2.toUpperCase()) === 0));
        }
        // 文本包含
        if (Object.is(op, 'LIKE')) {
            return (value && value2 && (value.toUpperCase().indexOf(value2.toUpperCase()) !== -1));
        }
        // 小于操作
        if (Object.is(op, 'LT')) {
            var result = this.compare(value, value2);
            if (result !== undefined && result < 0) {
                return true;
            }
            else {
                return false;
            }
        }
        // 小于等于操作
        if (Object.is(op, 'LTANDEQ')) {
            var result = this.compare(value, value2);
            if (result !== undefined && result <= 0) {
                return true;
            }
            else {
                return false;
            }
        }
        // 不等于操作
        if (Object.is(op, 'NOTEQ')) {
            return value !== value2;
        }
        // 值不包含在给定的范围中
        if (Object.is(op, 'NOTIN')) {
            return !this.contains(value, value2);
        }
        // 文本右包含
        if (Object.is(op, 'RIGHTLIKE')) {
            if (!(value && value2)) {
                return false;
            }
            var nPos = value.toUpperCase().indexOf(value2.toUpperCase());
            if (nPos === -1) {
                return false;
            }
            return nPos + value2.length === value.length;
        }
        // 空判断
        if (Object.is(op, 'TESTNULL')) {
        }
        // 自定义包含
        if (Object.is(op, 'USERLIKE')) {
        }
        return false;
    };
    /**
     * 文本包含
     *
     * @static
     * @param {any} value
     * @param {any} value2
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.contains = function (value, value2) {
        if (value && value2) {
            // 定义一数组
            var arr = new Array();
            arr = value2.split(',');
            // 定义正则表达式的连接符
            var S = String.fromCharCode(2);
            var reg = new RegExp(S + value + S);
            return (reg.test(S + arr.join(S) + S));
        }
        return false;
    };
    /**
     * 值比较
     *
     * @static
     * @param {*} value
     * @param {*} value2
     * @returns {number}
     * @memberof IBizUtil
     */
    IBizUtil.compare = function (value, value2) {
        var result;
        if (!Object.is(value, '') && !Object.is(value2, '') && !isNaN(value) && !isNaN(value2)) {
            result = this.compareNumber(parseFloat(value), parseFloat(value2));
        }
        else if (this.isParseDate(value) && this.isParseDate(value2)) {
            result = this.compareDate((new Date(value)).getTime(), (new Date(value2)).getTime());
        }
        else if (value && (typeof (value) === 'boolean' || value instanceof Boolean)) {
            result = this.compareBoolean(value, value2);
        }
        else if (value && (typeof (value) === 'string' || value instanceof String)) {
            result = this.compareString(value, value2);
        }
        return result;
    };
    /**
     * 是否是时间
     *
     * @static
     * @param {string} value
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.isParseDate = function (value) {
        var time = new Date(value);
        if (isNaN(time.getTime())) {
            return false;
        }
        return true;
    };
    /**
     * 时间值比较（毫秒数）
     *
     * @static
     * @param {number} value
     * @param {number} value2
     * @returns {number}
     * @memberof IBizUtil
     */
    IBizUtil.compareDate = function (value, value2) {
        if (value > value2) {
            return 1;
        }
        else if (value < value2) {
            return -1;
        }
        else {
            return 0;
        }
    };
    /**
     * 数值比较
     *
     * @static
     * @param {number} value
     * @param {number} value2
     * @returns {number}
     * @memberof IBizUtil
     */
    IBizUtil.compareNumber = function (value, value2) {
        if (value > value2) {
            return 1;
        }
        else if (value < value2) {
            return -1;
        }
        else {
            return 0;
        }
    };
    /**
     * 字符串比较
     *
     * @static
     * @param {*} value
     * @param {*} value2
     * @returns {number}
     * @memberof IBizUtil
     */
    IBizUtil.compareString = function (value, value2) {
        return value.localeCompare(value2);
    };
    /**
     * boolean 值比较
     *
     * @static
     * @param {*} value
     * @param {*} value2
     * @returns {number}
     * @memberof IBizUtil
     */
    IBizUtil.compareBoolean = function (value, value2) {
        if (value === value2) {
            return 0;
        }
        else {
            return -1;
        }
    };
    IBizUtil.processResultBefore = function (o) {
        if (o.bcode != undefined && o.bcode != null && o.bcode != '')
            eval(o.bcode);
    };
    /**
    *
    *
    * @param {*} [o={}]
    * @memberof IBizUtil
    */
    IBizUtil.processResult = function (o) {
        if (o === void 0) { o = {}; }
        if (o.url != null && o.url !== '') {
            window.location.href = o.url;
        }
        if (o.code != null && o.code !== '') {
            eval(o.code);
        }
        if (o.downloadurl != null && o.downloadurl !== '') {
            var downloadurl = this.parseURL2('', o.downloadurl, '');
            this.download(downloadurl);
        }
    };
    /**
     * 下载文件
     *
     * @static
     * @param {string} url
     * @memberof IBizUtil
     */
    IBizUtil.download = function (url) {
        window.open(url, '_blank');
    };
    /**
     *
     *
     * @static
     * @param {any} subapp
     * @param {any} url
     * @param {any} params
     * @returns {string}
     * @memberof IBizUtil
     */
    IBizUtil.parseURL2 = function (subapp, url, params) {
        var tmpURL;
        // let root;
        // if (subapp) {
        //     root = WEBROOTURL;
        // } else {
        //     root = BASEURL;
        // }
        // if (url.toLowerCase().indexOf('http') !== -1) {
        //     tmpURL = url;
        // } else {
        //     tmpURL = root + '/jsp' + url;
        // }
        if (url.indexOf('../../') !== -1) {
            tmpURL = url.substring(url.indexOf('../../') + 6, url.length);
        }
        else if (url.indexOf('/') === 0) {
            tmpURL = url.substring(url.indexOf('/') + 1, url.length);
        }
        else {
            tmpURL = url;
        }
        if (params) {
            return tmpURL + (url.indexOf('?') === -1 ? '?' : '&'); // + $.param(params);
        }
        else {
            return tmpURL;
        }
    };
    /**
     * 是否是数字
     *
     * @param {*} num
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.isNumberNaN = function (num) {
        return Number.isNaN(num) || num !== num;
    };
    /**
     * 是否未定义
     *
     * @static
     * @param {*} value
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.isUndefined = function (value) {
        return typeof value === 'undefined';
    };
    /**
     * 是否为空
     *
     * @static
     * @param {*} value
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.isEmpty = function (value) {
        return this.isUndefined(value) || value === '' || value === null || value !== value;
    };
    /**
     * 检查属性常规条件
     *
     * @static
     * @param {*} value 属性值
     * @param {string} op 检测条件
     * @param {*} value2 预定义值
     * @param {string} errorInfo 错误信息
     * @param {string} paramType 参数类型
     * @param {*} form 表单对象
     * @param {boolean} primaryModel 是否必须条件
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.checkFieldSimpleRule = function (value, op, value2, errorInfo, paramType, form, primaryModel) {
        if (Object.is(paramType, 'CURTIME')) {
            value2 = "" + new Date();
        }
        if (Object.is(paramType, 'ENTITYFIELD')) {
            value2 = value2 ? value2.toLowerCase() : '';
            var _value2Field = form.findField(value2);
            if (!_value2Field) {
                this.errorInfo = "\u8868\u5355\u9879" + value2 + "\u672A\u914D\u7F6E";
                return true;
            }
            value2 = _value2Field.getValue();
        }
        if (this.isEmpty(errorInfo)) {
            errorInfo = '内容必须符合值规则';
        }
        this.errorInfo = errorInfo;
        var reault = this.testCond(value, op, value2);
        if (!reault) {
            if (primaryModel) {
                throw new Error(this.errorInfo);
            }
        }
        return !reault;
    };
    /**
     * 检查属性字符长度规则
     *
     * @static
     * @param {*} viewValue
     * @param {number} minLength
     * @param {boolean} indexOfMin
     * @param {number} maxLength
     * @param {boolean} indexOfMax
     * @param {string} errorInfo
     * @param {boolean} primaryModel
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.checkFieldStringLengthRule = function (viewValue, minLength, indexOfMin, maxLength, indexOfMax, errorInfo, primaryModel) {
        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '内容长度必须符合范围规则';
        }
        else {
            this.errorInfo = errorInfo;
        }
        var isEmpty = IBizUtil.isEmpty(viewValue);
        if (isEmpty) {
            if (primaryModel) {
                throw new Error('值为空');
            }
            this.errorInfo = '值为空';
            return true;
        }
        var viewValueLength = viewValue.length;
        // 小于等于
        if (minLength !== null) {
            if (indexOfMin) {
                if (viewValueLength < minLength) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
            else {
                if (viewValueLength <= minLength) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
        }
        //  大于等于
        if (maxLength !== null) {
            if (indexOfMax) {
                if (viewValueLength > maxLength) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
            else {
                if (viewValueLength >= maxLength) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
        }
        this.errorInfo = '';
        return false;
    };
    /**
     * 检查属性值正则式规则
     *
     * @static
     * @param {string} viewValue 属性值
     * @param {*} strReg 验证正则
     * @param {string} errorInfo 错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.checkFieldRegExRule = function (viewValue, strReg, errorInfo, primaryModel) {
        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '值必须符合正则规则';
        }
        else {
            this.errorInfo = errorInfo;
        }
        var isEmpty = IBizUtil.isEmpty(viewValue);
        if (isEmpty) {
            if (primaryModel) {
                throw new Error('值为空');
            }
            this.errorInfo = '值为空';
            return true;
        }
        var regExp = new RegExp(strReg);
        if (!regExp.test(viewValue)) {
            if (primaryModel) {
                throw new Error(this.errorInfo);
            }
            return true;
        }
        this.errorInfo = '';
        return false;
    };
    /**
     * 检查属性值范围规则
     *
     * @static
     * @param {string} viewValue 属性值
     * @param {*} minNumber 最小数值
     * @param {boolean} indexOfMin 是否包含最小数值
     * @param {*} maxNumber 最大数值
     * @param {boolean} indexOfMax 是否包含最大数值
     * @param {string} errorInfo 错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.checkFieldValueRangeRule = function (viewValue, minNumber, indexOfMin, maxNumber, indexOfMax, errorInfo, primaryModel) {
        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '值必须符合值范围规则';
        }
        else {
            this.errorInfo = errorInfo;
        }
        var isEmpty = IBizUtil.isEmpty(viewValue);
        if (isEmpty) {
            if (primaryModel) {
                throw new Error('值为空');
            }
            this.errorInfo = '值为空';
            return true;
        }
        var valueFormat = this.checkFieldRegExRule(viewValue, /^-?\d*\.?\d+$/, null, primaryModel);
        if (valueFormat) {
            return true;
        }
        else {
            this.errorInfo = errorInfo;
        }
        var data = Number.parseFloat(viewValue);
        // 小于等于
        if (minNumber !== null) {
            if (indexOfMin) {
                if (data < minNumber) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
            else {
                if (data <= minNumber) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
        }
        // //大于等于
        if (maxNumber != null) {
            if (indexOfMax) {
                if (data > maxNumber) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
            else {
                if (data >= maxNumber) {
                    if (primaryModel) {
                        throw new Error(this.errorInfo);
                    }
                    return true;
                }
            }
        }
        this.errorInfo = '';
        return false;
    };
    /**
     * 检查属性值系统值范围规则  暂时支持正则表达式
     *
     * @static
     * @param {string} viewValue 属性值
     * @param {*} strReg 正则
     * @param {string} errorInfo  错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean}
     * @memberof IBizUtil
     */
    IBizUtil.checkFieldSysValueRule = function (viewValue, strReg, errorInfo, primaryModel) {
        return this.checkFieldRegExRule(viewValue, strReg, errorInfo, primaryModel);
    };
    /**
     * 将文本格式的xml转换为dom模式
     *
     * @static
     * @param {string} strXml
     * @memberof IBizUtil
     */
    IBizUtil.parseXML = function (strXml) {
        if (strXml) {
            return new DOMParser().parseFromString(strXml, 'text/xml');
        }
    };
    /**
     * 将xml转换为object对象
     *
     * @static
     * @param {*} node
     * @param {*} [obj={}]
     * @memberof IBizUtil
     */
    IBizUtil.loadXMLNode = function (node, obj) {
        if (obj === void 0) { obj = {}; }
        if (node && node.attributes) {
            var arr = node.attributes;
            for (var i = 0; i < arr.length; i++) {
                var A = arr.item(i).name;
                var B = arr.item(i).value;
                A = A.toLowerCase();
                obj[A] = B;
            }
        }
    };
    /**
     * 将object转换为xml对象
     *
     * @static
     * @param {any} XML
     * @param {any} obj
     * @memberof IBizUtil
     */
    IBizUtil.saveXMLNode = function (XML, obj) {
        var proName = '';
        for (proName in obj) {
            var value = obj[proName];
            if (!value || value instanceof Object || typeof (value) === 'function') {
                continue;
            }
            var proValue = obj[proName].toString();
            if (proValue !== '') {
                XML.attrib(proName, proValue);
            }
        }
    };
    IBizUtil.encodeString = function (_1) {
        var _2 = "";
        if (typeof _1 == "string" && _1.length > 0) {
            _2 = _1.replace(/&/g, "&amp;");
            _2 = _2.replace(/</g, "&lt;");
            _2 = _2.replace(/>/g, "&gt;");
            _2 = _2.replace(/ /g, "&nbsp;");
            _2 = _2.replace(/\'/g, "&#39;");
            _2 = _2.replace(/\"/g, "&quot;");
        }
        return _2;
    };
    /**
     * 错误提示信息
     *
     * @static
     * @type {string}
     * @memberof IBizUtil
     */
    IBizUtil.errorInfo = '';
    return IBizUtil;
}());

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
     * @returns {Subject<any>} 可订阅请求对象
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
        return subject;
    };
    /**
     * get请求
     *
     * @param {string} url 请求路径
     * @param {*} [params={}] 请求参数
     * @returns {Subject<any>} 可订阅请求对象
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
            subject.next(response);
        }).catch(function (error) {
            subject.error(error);
        });
        return subject;
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
 * UI信息提示与交互确认类
 *
 * @class IBizNotification
 */
var IBizNotification = /** @class */ (function () {
    /**
     * Creates an instance of IBizNotification.
     * 创建 IBizNotification 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizNotification
     */
    function IBizNotification(opts) {
        if (opts === void 0) { opts = {}; }
    }
    /**
     * 信息
     *
     * @param {string} title 标题
     * @param {string} desc 内容
     * @param {number} [duration] 关闭时间，默认4.5秒 （可选）
     * @memberof IBizNotification
     */
    IBizNotification.prototype.info = function (title, desc, duration) {
        iview.Notice.info({ title: title, desc: desc, duration: duration ? duration : 4.5 });
    };
    /**
     * 成功
     *
     * @param {string} title 标题
     * @param {string} desc 内容
     * @param {number} [duration] 关闭时间，默认4.5秒 （可选）
     * @memberof IBizNotification
     */
    IBizNotification.prototype.success = function (title, desc, duration) {
        iview.Notice.success({ title: title, desc: desc, duration: duration ? duration : 4.5 });
    };
    /**
     * 警告
     *
     * @param {string} title 标题
     * @param {string} desc 内容
     * @param {number} [duration] 关闭时间，默认4.5秒 （可选）
     * @memberof IBizNotification
     */
    IBizNotification.prototype.warning = function (title, desc, duration) {
        iview.Notice.warning({ title: title, desc: desc, duration: duration ? duration : 4.5 });
    };
    /**
     * 错误
     *
     * @param {string} title 标题
     * @param {string} desc 内容
     * @param {number} [duration] 关闭时间，默认4.5秒 （可选）
     * @memberof IBizNotification
     */
    IBizNotification.prototype.error = function (title, desc, duration) {
        iview.Notice.error({ title: title, desc: desc, duration: duration ? duration : 4.5 });
    };
    /**
     * 确认对话框
     *
     * @param {string} title 标题
     * @param {string} contant 内容
     * @returns {Subject<any>} 可订阅对象
     * @memberof IBizNotification
     */
    IBizNotification.prototype.confirm = function (title, contant) {
        var subject = new rxjs.Subject();
        iview.Modal.confirm({
            title: title,
            content: contant,
            onOk: function () {
                subject.next('OK');
            }
        });
        return subject;
    };
    return IBizNotification;
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
        /**
         * 信息提示与交互设置
         *
         * @memberof IBizObject
         */
        this.iBizNotification = new IBizNotification();
        /**
         * 对象id
         *
         * @private
         * @type {string}
         * @memberof IBizObject
         */
        this.id = '';
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
     * 销毁控制器
     *
     * @memberof IBizObject
     */
    IBizObject.prototype.destroy = function () {
        this.events.forEach(function (subject) {
            subject.unsubscribe();
        });
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
     * 事件订阅
     *
     * @param {string} name
     * @returns {Subject<any>}
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
        return subject;
    };
    /**
     * 呼出事件<参数会封装成JSON对象进行传递>
     * @param event 事件名称
     * @param sender 源
     * @param args 参数
     */
    IBizObject.prototype.fire = function (name, data) {
        if (this.events.get(name)) {
            var event_1 = this.events.get(name);
            event_1.next(data);
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
 * 表单属性对象<主要管理属性及其标签的值、可用、显示、必填等操作>
 *
 * @class IBizFormItem
 * @extends {IBizObject}
 */
var IBizFormItem = /** @class */ (function (_super) {
    __extends(IBizFormItem, _super);
    /**
     * Creates an instance of IBizFormItem.
     * 创建 IBizFormItem 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormItem
     */
    function IBizFormItem(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 属性动态配置值<代码表>
         *
         * @type {Array<any>}
         * @memberof IBizFormItem
         */
        _this_1.config = [];
        /**
         * 属性动态配置值<用户字典>
         *
         * @type {Array<any>}
         * @memberof IBizFormItem
         */
        _this_1.dictitems = [];
        /**
         * 表达校验错误信息
         *
         * @type {string}
         * @memberof IBizFormItem
         */
        _this_1.errorInfo = '';
        /**
         * 是否有错误信息
         *
         * @type {boolean}
         * @memberof IBizFormItem
         */
        _this_1.hasError = false;
        /**
         * 表单项校验状态
         *
         * @type {string}
         * @memberof IBizFormItem
         */
        _this_1.validateStatus = 'success';
        var _this = _this_1;
        _this.allowEmpty = opts.allowEmpty ? true : false;
        _this.caption = opts.caption;
        _this.disabled = opts.disabled ? true : false;
        _this.emptyCaption = opts.emptyCaption ? true : false;
        _this.fieldType = opts.fieldType;
        _this.form = opts.form;
        _this.hidden = opts.hidden ? true : false;
        _this.name = opts.name;
        _this.showCaption = opts.showCaption ? true : false;
        _this.visible = opts.visible ? true : false;
        return _this_1;
    }
    Object.defineProperty(IBizFormItem.prototype, "value", {
        /**
         * 获取值
         *
         * @type {string}
         * @memberof IBizFormItem
         */
        get: function () {
            return this.$value ? this.$value : '';
        },
        /**
         * 设置值
         *
         * @memberof IBizFormItem
         */
        set: function (val) {
            var oldVal = this.$value;
            this.$value = val;
            if (oldVal !== this.$value) {
                this.onValueChanged(oldVal);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取表单项类型
     *
     * @returns {string}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.getFieldType = function () {
        return this.fieldType;
    };
    /**
     * 设置表单对象
     *
     * @param {*} form
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setForm = function (form) {
        this.form = form;
    };
    /**
     * 获取表单对象
     *
     * @returns {*}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.getForm = function () {
        return this.form;
    };
    /**
     * 获取值
     *
     * @returns {*}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.getValue = function () {
        return this.value;
    };
    /**
     * 设置值
     *
     * @param {string} value
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setValue = function (value) {
        this.value = value;
    };
    /**
     * 获取属性名
     *
     * @returns {string}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.getName = function () {
        return this.name;
    };
    /**
     * 是否启用
     *
     * @returns {boolean}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.isDisabled = function () {
        return this.disabled;
    };
    /**
     * 设置是否启用
     *
     * @param {boolean} disabled
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setDisabled = function (disabled) {
        this.disabled = disabled;
    };
    /**
     * 隐藏控件
     *
     * @param {boolean} hidden
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setHidden = function (hidden) {
        this.hidden = hidden;
    };
    /**
     * 设置可见性
     *
     * @param {boolean} visible
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    /**
     * 设置属性动态配置
     *
     * @param {Array<any>} config 代码表
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setAsyncConfig = function (config) {
        if (Array.isArray(config)) {
            this.config = config.slice();
        }
    };
    /**
     * 设置用户字典
     *
     * @param {Array<any>} item
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setDictItems = function (item) {
        if (Array.isArray(item)) {
            this.dictitems = item.slice();
        }
    };
    /**
     * 设置只读<Ext版本方法禁止使用>
     *
     * @param {boolean} readonly
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setReadOnly = function (readonly) {
        this.setDisabled(readonly);
    };
    /**
     * 编辑是否必须输入
     *
     * @param {boolean} allowblank
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setAllowBlank = function (allowblank) {
    };
    /**
     * 标记表单项值无效提示
     *
     * @param {*} info
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.markInvalid = function (info) {
    };
    /**
     * 设置表单项错误
     *
     * @param {*} info
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setActiveError = function (info) {
        this.markInvalid(info);
    };
    /**
     * 表单项是否有错误
     *
     * @returns {boolean}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.hasActiveError = function () {
        return this.hasError;
    };
    /**
     * 重置表单项错误
     *
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.unsetActiveError = function () {
        this.hasError = false;
    };
    /**
     * 值变化
     *
     * @param {string} oldValue
     * @param {string} newValue
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.onValueChanged = function (oldValue) {
        this.fire(IBizFormItem.VALUECHANGED, { name: this.getName(), value: oldValue, field: this });
    };
    /**
     * 输入框失去焦点触发
     *
     * @param {*} $event
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.onBlur = function ($event) {
        if (!$event) {
            return;
        }
        if (Object.is($event.target.value, this.value)) {
            return;
        }
        this.value = $event.target.value;
    };
    /**
     * 键盘事件
     *
     * @param {*} $event
     * @returns {void}
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.onKeydown = function ($event) {
        if (!$event) {
            return;
        }
        if ($event.keyCode !== 13) {
            return;
        }
        if (Object.is($event.target.value, this.value)) {
            return;
        }
        this.value = $event.target.value;
    };
    /**
     * 设置表单项错误信息
     *
     * @param {*} [info={}]
     * @memberof IBizFormItem
     */
    IBizFormItem.prototype.setErrorInfo = function (info) {
        if (info === void 0) { info = {}; }
        this.validateStatus = info.validateStatus;
        this.hasError = info.hasError;
        this.errorInfo = info.errorInfo;
    };
    IBizFormItem.VALUECHANGED = 'VALUECHANGED';
    return IBizFormItem;
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
 * 表单属性项
 *
 * @class IBizFormField
 * @extends {IBizFormItem}
 */
var IBizFormField = /** @class */ (function (_super) {
    __extends(IBizFormField, _super);
    /**
     * Creates an instance of IBizFormField.
     * 创建 IBizFormField 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormField
     */
    function IBizFormField(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * label 宽度
         *
         * @type {number}
         * @memberof IBizFormField
         */
        _this_1.labelWidth = 130;
        /**
         * 实体属性输入旧值
         *
         * @private
         * @type {string}
         * @memberof IBizFormField
         */
        _this_1.oldVal = '';
        /**
         * 数据流观察对象
         *
         * @private
         * @type {Subject<any>}
         * @memberof IBizFormField
         */
        _this_1.subject = new rxjs.Subject();
        var _this = _this_1;
        _this.labelWidth = opts.labelWidth;
        // 停止输入值间隔500 毫秒，进行值绑定
        _this.subject.pipe(rxjs.operators.debounceTime(500), rxjs.operators.distinctUntilChanged(function (o, n) {
            if (o === void 0) { o = {}; }
            if (n === void 0) { n = {}; }
            return !Object.is(o.oldVal, o.newVal) && !Object.is(n.oldVal, n.newVal)
                && Object.is(o.oldVal, n.oldVal) && Object.is(o.newVal, n.newVal);
        })).subscribe(function (data) {
            if (data === void 0) { data = {}; }
            _this.setOldValue(data.oldVal);
            _this.setValue(data.newVal);
        });
        return _this_1;
    }
    /**
     * 设置旧值
     *
     * @param {string} val
     * @memberof IBizFormField
     */
    IBizFormField.prototype.setOldValue = function (val) {
        var _this = this;
        _this.oldVal = val;
    };
    /**
     * 获取旧值
     *
     * @returns {string}
     * @memberof IBizFormField
     */
    IBizFormField.prototype.getOldValue = function () {
        var _this = this;
        return _this.oldVal;
    };
    /**
     * 属性值变化
     *
     * @param {*} event
     * @memberof IBizFormField
     */
    IBizFormField.prototype.valueChange = function (event) {
        var _this = this;
        if (!event || !event.target) {
            return;
        }
        var target = event.target;
        var oldVal = target._value;
        var newVal = target.value;
        if ((typeof newVal !== 'string')) {
            oldVal = JSON.stringify(oldVal);
        }
        if ((typeof newVal !== 'string')) {
            newVal = JSON.stringify(newVal);
        }
        _this.subject.next({ oldVal: oldVal, newVal: newVal });
    };
    return IBizFormField;
}(IBizFormItem));

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
 * 表单关系部件
 *
 * @class IBizFormDRPanel
 * @extends {IBizFormItem}
 */
var IBizFormDRPanel = /** @class */ (function (_super) {
    __extends(IBizFormDRPanel, _super);
    /**
     * Creates an instance of IBizFormDRPanel.
     * 创建 IBizFormDRPanel 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormDRPanel
     */
    function IBizFormDRPanel(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizFormDRPanel;
}(IBizFormItem));

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
 * 表单分组
 *
 * @class IBizFormGroup
 * @extends {IBizFormItem}
 */
var IBizFormGroup = /** @class */ (function (_super) {
    __extends(IBizFormGroup, _super);
    /**
     * Creates an instance of IBizFormGroup.
     * 创建 IBizFormGroup 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormGroup
     */
    function IBizFormGroup(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 部件集合
         *
         * @type {*}
         * @memberof IBizFormGroup
         */
        _this_1.$editor = {};
        var _this = _this_1;
        _this.titleBarCloseMode = opts.titleBarCloseMode;
        return _this_1;
    }
    /**
     * 注册部件
     *
     * @param {string} name
     * @param {*} editor
     * @memberof IBizFormGroup
     */
    IBizFormGroup.prototype.regEditor = function (name, editor) {
        if (name) {
            this.$editor[name] = editor;
        }
    };
    /**
     * 获取指定部件
     *
     * @param {string} name
     * @memberof IBizFormGroup
     */
    IBizFormGroup.prototype.getEditor = function (name) {
        if (name) {
            return this.$editor[name];
        }
        return null;
    };
    /**
     * 设置是否启用
     *
     * @param {boolean} disabled
     * @memberof IBizFormGroup
     */
    IBizFormGroup.prototype.setDisabled = function (disabled) {
        this.disabled = disabled;
    };
    /**
     * 隐藏控件
     *
     * @param {boolean} hidden
     * @memberof IBizFormGroup
     */
    IBizFormGroup.prototype.setHidden = function (hidden) {
        this.hidden = hidden;
    };
    /**
     * 设置可见性
     *
     * @param {boolean} visible
     * @memberof IBizFormGroup
     */
    IBizFormGroup.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    return IBizFormGroup;
}(IBizFormItem));

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
 *  表单IFrame部件
 *
 * @class IBizFormIFrame
 * @extends {IBizFormItem}
 */
var IBizFormIFrame = /** @class */ (function (_super) {
    __extends(IBizFormIFrame, _super);
    /**
     * Creates an instance of IBizFormIFrame.
     * 创建 IBizFormIFrame 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormIFrame
     */
    function IBizFormIFrame(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizFormIFrame;
}(IBizFormItem));

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
 * 表单直接内容
 *
 * @class IBizFormRawItem
 * @extends {IBizFormItem}
 */
var IBizFormRawItem = /** @class */ (function (_super) {
    __extends(IBizFormRawItem, _super);
    /**
     * Creates an instance of IBizFormRawItem.
     * 创建 IBizFormRawItem 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormRawItem
     */
    function IBizFormRawItem(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizFormRawItem;
}(IBizFormItem));

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
 * 表单分页部件
 *
 * @class IBizFormTabPage
 * @extends {IBizFormItem}
 */
var IBizFormTabPage = /** @class */ (function (_super) {
    __extends(IBizFormTabPage, _super);
    /**
     * Creates an instance of IBizFormTabPage.
     * 创建 IBizFormTabPage 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormTabPage
     */
    function IBizFormTabPage(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizFormTabPage;
}(IBizFormItem));

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
 * 表单分页面板
 *
 * @class IBizFormTabPanel
 * @extends {IBizFormItem}
 */
var IBizFormTabPanel = /** @class */ (function (_super) {
    __extends(IBizFormTabPanel, _super);
    /**
     * Creates an instance of IBizFormTabPanel.
     * 创建 IBizFormTabPanel 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizFormTabPanel
     */
    function IBizFormTabPanel(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizFormTabPanel;
}(IBizFormItem));

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
        _this_1.loading = false;
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
    IBizControl.prototype.beginLoading = function () {
        var _this = this;
        _this.loading = true;
    };
    IBizControl.prototype.endLoading = function () {
        var _this = this;
        _this.loading = false;
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
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 应用菜单数据
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this_1.items = [];
        /**
         * 应用功能集合
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this_1.appFuncs = [];
        return _this_1;
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
     * 获取菜单数据项
     *
     * @param {string} id
     * @param {Array<any>} items
     * @returns {*}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getItem = function (id, items) {
        var _this = this;
        var _item = {};
        items.some(function (item) {
            if (Object.is(item.id, id)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items && item.items.length > 0 && Array.isArray(item.items)) {
                var _subItem = _this.getItem(id, item.items);
                if (_subItem && Object.keys(_subItem).length > 0) {
                    Object.assign(_item, _subItem);
                    return true;
                }
            }
        });
        return _item;
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
        var _this_1 = this;
        var _this = this;
        var params = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        if (opt) {
            Object.assign(params, opt);
        }
        _this.fire(IBizAppMenu.BEFORELOAD, params);
        _this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (success) {
            if (success.ret === 0) {
                _this_1.items = success.items;
                // const data = this.doMenus(success.items);
                _this_1.fire(IBizAppMenu.LOAD, _this_1.items);
            }
        }, function (error) {
            console.log(error);
        });
    };
    IBizAppMenu.prototype.onSelectChange = function (select) {
        var _this = this;
        var hasView = false;
        var appFuncs = this.getAppFuncs();
        appFuncs.some(function (fun) {
            if (Object.is(fun.appfuncid, select.appfuncid)) {
                Object.assign(select, fun);
                hasView = true;
                return true;
            }
        });
        if (hasView) {
            _this.fire(IBizAppMenu.SELECTION, select);
        }
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
         * 所有工具栏按钮
         *
         * @type {*}
         * @memberof IBizToolbar
         */
        _this_1.items = {};
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
        if (!this.items) {
            this.items = {};
        }
        if (Object.keys(item).length > 0 && !Object.is(item.name, '')) {
            item.dataaccaction = true;
            this.items[item.name] = item;
        }
        if (item.items && item.items.length > 0) {
            var _menus = item.items.slice();
            _menus.forEach(function (menu) {
                _this_1.regToolBarItem(menu);
            });
        }
    };
    /**
     * 获取所有工具栏按钮
     *
     * @returns {Array<any>}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.getItems = function () {
        return this.items;
    };
    /**
     * 获取工具栏按钮
     *
     * @param {string} [name] 名称（可选）
     * @param {string} [tag] 标识（可选）
     * @returns {*}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.getItem = function (name, tag) {
        var _this_1 = this;
        var _item = {};
        var btn_names = Object.keys(this.items);
        btn_names.some(function (_name) {
            if (Object.is(_name, name) || Object.is(tag, _this_1.items[_name].tag)) {
                Object.assign(_item, _this_1.items[_name]);
                return true;
            }
        });
        return _item;
    };
    /**
     * 设置工具栏按钮是否启用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.setItemDisabled = function (name, disabled) {
        if (this.items[name]) {
            this.items[name].disabled = disabled;
        }
    };
    /**
     * 更新工具栏按钮状态
     *
     * @param {*} [action={}]
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.updateAccAction = function (action) {
        var _this_1 = this;
        if (action === void 0) { action = {}; }
        var _itemsName = Object.keys(this.items);
        _itemsName.forEach(function (name) {
            var priv = _this_1.items[name].priv;
            if ((priv && !Object.is(priv, '')) && (action && Object.keys(action).length > 0 && action[priv] !== 1)) {
                _this_1.items[name].dataaccaction = false;
            }
            else {
                _this_1.items[name].dataaccaction = true;
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
    IBizToolbar.prototype.itemExportExcel = function (type, itemTag) {
        // tslint:disable-next-line:prefer-const
        var params = { tag: type };
        if (itemTag && Object.is(itemTag, 'all')) {
            Object.assign(params, { itemTag: 'all' });
        }
        else if (itemTag && Object.is(itemTag, 'custom')) {
            if (!this.exportStartPage || !this.exportEndPage) {
                this.iBizNotification.warning('警告', '请输入起始页');
                return;
            }
            var startPage = Number.parseInt(this.exportStartPage, 10);
            var endPage = Number.parseInt(this.exportEndPage, 10);
            if (Number.isNaN(startPage) || Number.isNaN(endPage)) {
                this.iBizNotification.warning('警告', '请输入有效的起始页');
                return;
            }
            if (startPage < 1 || endPage < 1 || startPage > endPage) {
                this.iBizNotification.warning('警告', '请输入有效的起始页');
                return;
            }
            Object.assign(params, { exportPageStart: startPage, exportPageEnd: endPage, itemTag: 'custom' });
        }
        this.fire(IBizToolbar.ITEMCLICK, params);
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
 * 多数据部件基类
 *
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
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 表格列头
         *
         * @type {Array<any>}
         * @memberof IBizMDControl
         */
        _this_1.columns = [];
        /**
         * 多数据数据项
         *
         * @type {Array<any>}
         * @memberof IBizMDControl
         */
        _this_1.items = [];
        /**
         * 加载状态
         *
         * @type {boolean}
         * @memberof IBizMDControl
         */
        _this_1.loading = false;
        /**
         * 选中行数据
         *
         * @type {Array<any>}
         * @memberof IBizMDControl
         */
        _this_1.selections = [];
        var _this = _this_1;
        _this.regColumns();
        return _this_1;
    }
    /**
     * 加载数据
     *
     * @param {*} [arg={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.load = function (arg) {
        if (arg === void 0) { arg = {}; }
    };
    /**
     * 刷新数据
     *
     * @param {*} [arg={}]
     * @memberof IBizMDControl
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
        this.selections = selection;
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
    };
    /**
     * 选中行数据
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.clickItem = function (item) {
        if (item === void 0) { item = {}; }
        if (this.loading) {
            return;
        }
        this.setSelection([item]);
    };
    /**
     * 激活行数据
     *
     * @param {*} [item={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.activeItem = function (item) {
        if (item === void 0) { item = {}; }
    };
    /**
     * 是否正在加载
     *
     * @returns {boolean}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.isloading = function () {
        return this.loading;
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
     * 获取选中行
     *
     * @returns {Array<any>}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.getSelection = function () {
        return this.selections;
    };
    /**
     * 工作流提交
     *
     * @param {*} [params={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.wfsubmit = function (params) {
        var _this_1 = this;
        if (params === void 0) { params = {}; }
        if (!params) {
            params = {};
        }
        Object.assign(params, { srfaction: 'wfsubmit', srfctrlid: this.getName() });
        this.iBizHttp.post(params, this.getBackendUrl()).subscribe(function (data) {
            if (data.ret === 0) {
                _this_1.refresh();
            }
            else {
                // this.showToast(this.$showErrorToast, '', '执行工作流操作失败,' + data.info);
            }
        }, function (error) {
            // this.showToast(this.$showErrorToast, '', '执行工作流操作失败,' + error.info);
        });
    };
    /**
     * 实体界面行为
     *
     * @param {*} [params={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.doUIAction = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        if (arg) {
            Object.assign(params, arg);
        }
        Object.assign(params, { srfaction: 'uiaction', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret === 0) {
                if (data.reloadData) {
                    _this_1.refresh();
                }
                if (data.info && !Object.is(data.info, '')) {
                    // this.showToast(this.$showInfoToast, '', data.info);
                }
                IBizUtil.processResult(data);
            }
            else {
                // this.showToast(this.$showErrorToast, '操作失败', '操作失败,执行操作发生错误,' + data.info);
            }
        }, function (error) {
            // this.showToast(this.$showErrorToast, '操作失败', '操作失败,执行操作发生错误,' + error.info);
        });
    };
    /**
     * 批量添加
     *
     * @param {*} [arg={}]
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.addBatch = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        if (arg) {
            Object.assign(params, arg);
        }
        Object.assign(params, { srfaction: 'addbatch', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret === 0) {
                _this_1.refresh();
                _this_1.fire(IBizMDControl.ADDBATCHED, data);
            }
            else {
                // this.showToast(this.$showErrorToast, '添加失败', '执行批量添加失败,' + data.info);
            }
        }, function (error) {
            // this.showToast(this.$showErrorToast, '添加失败', '执行批量添加失败,' + error.info);
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
        this.columns.push(column);
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/**
 * 表格部件控制器
 *
 * @class IBizDataGrid
 * @extends {IBizMDControl}
 */
var IBizDataGrid = /** @class */ (function (_super) {
    __extends(IBizDataGrid, _super);
    /**
     * Creates an instance of IBizDataGrid.
     * 创建 IBizDataGrid 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizDataGrid
     */
    function IBizDataGrid(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 是否全部选中
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.allChecked = false;
        /**
         * 备份数据（行编辑使用）
         *
         * @type {Array<any>}
         * @memberof IBizDataGrid
         */
        _this_1.backupData = [];
        /**
         * 当前显示页码
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.curPage = 1;
        /**
         * 表格编辑项集合
         *
         * @type {*}
         * @memberof IBizDataGrid
         */
        _this_1.editItems = {};
        /**
         * 表格全部排序字段
         *
         * @type {Array<any>}
         * @memberof IBizDataGrid
         */
        _this_1.gridSortField = [];
        /**
         * 表格行选中动画
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.indeterminate = false;
        /**
         * 是否启用行编辑
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.isEnableRowEdit = false;
        /**
         * 每次加载条数
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.limit = 20;
        /**
         * 是否支持多项
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.multiSelect = true;
        /**
         * 最大导出行数
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.maxExportRow = 1000;
        /**
         * 打开行编辑
         *
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.openRowEdit = false;
        /**
         * 行多项选中设置，用于阻塞多次触发选中效果
         *
         * @private
         * @type {boolean}
         * @memberof IBizDataGrid
         */
        _this_1.rowsSelection = false;
        /**
         * 查询开始条数
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.start = 0;
        /**
         * 编辑行数据处理
         *
         * @type {*}
         * @memberof IBizDataGrid
         */
        _this_1.state = {};
        /**
         * 总条数
         *
         * @type {number}
         * @memberof IBizDataGrid
         */
        _this_1.totalrow = 0;
        var _this = _this_1;
        _this.regEditItems();
        return _this_1;
    }
    /**
     * 加载数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.load = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var opt = {};
        Object.assign(opt, arg);
        if (this.loading) {
            return;
        }
        Object.assign(opt, { srfctrlid: this.getName(), srfaction: 'fetch' });
        if (!opt.start) {
            Object.assign(opt, { start: (this.curPage - 1) * this.limit });
        }
        if (!opt.limit) {
            Object.assign(opt, { limit: this.limit });
        }
        Object.assign(opt, { sort: JSON.stringify(this.gridSortField) });
        // 设置为正在加载，使load方法在加载中时不可用。
        this.loading = true;
        // 发送加载数据前事件
        this.fire(IBizMDControl.BEFORELOAD, opt);
        this.allChecked = false;
        this.indeterminate = false;
        this.selections = [];
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (response) {
            if (!response.items || response.ret !== 0) {
                if (response.errorMessage) {
                    // this.showToast(this.$showErrorToast, '', response.errorMessage);
                }
                _this_1.loading = false;
                return;
            }
            _this_1.items = _this_1.rendererDatas(response.items);
            _this_1.totalrow = response.totalrow;
            _this_1.fire(IBizMDControl.LOADED, response.items);
            _this_1.loading = false;
        }, function (error) {
            _this_1.loading = false;
            console.log(error.info);
        });
    };
    /**
     * 刷新数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.refresh = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var opt = {};
        Object.assign(opt, arg);
        if (this.loading) {
            return;
        }
        Object.assign(opt, { srfctrlid: this.getName(), srfaction: 'fetch' });
        if (!opt.start) {
            Object.assign(opt, { start: (this.curPage - 1) * this.limit });
        }
        if (!opt.limit) {
            Object.assign(opt, { limit: this.limit });
        }
        Object.assign(opt, { sort: JSON.stringify(this.gridSortField) });
        // 设置为正在加载，使load方法在加载中时不可用。
        this.loading = true;
        // 发送加载数据前事件
        this.fire(IBizMDControl.BEFORELOAD, opt);
        this.allChecked = false;
        this.indeterminate = false;
        this.selections = [];
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (response) {
            if (!response.items || response.ret !== 0) {
                if (response.errorMessage) {
                    // this.showToast(this.$showErrorToast, '', response.errorMessage);
                }
                _this_1.loading = false;
                return;
            }
            _this_1.fire(IBizMDControl.LOADED, response.items);
            _this_1.items = _this_1.rendererDatas(response.items);
            _this_1.totalrow = response.totalrow;
            _this_1.loading = false;
        }, function (error) {
            _this_1.loading = false;
            console.log(error.info);
        });
    };
    /**
     * 删除数据
     *
     * @param {*} [arg={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.remove = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        Object.assign(params, arg);
        Object.assign(params, { srfaction: 'remove', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (response) {
            if (response.ret === 0) {
                if (_this_1.allChecked) {
                    var rows = _this_1.curPage * _this_1.limit;
                    if (_this_1.totalrow <= rows) {
                        _this_1.curPage = _this_1.curPage - 1;
                        if (_this_1.curPage === 0) {
                            _this_1.curPage = 1;
                        }
                    }
                }
                _this_1.load({});
                _this_1.fire(IBizDataGrid.REMOVED, {});
                if (response.info && response.info !== '') {
                    // this.showToast(this.$showSuccessToast, '', '删除成功!');
                }
                _this_1.selections = [];
                IBizUtil.processResult(response);
            }
            else {
                // this.showToast(this.$showErrorToast, '', '删除数据失败,' + response.info);
            }
        }, function (error) {
            // this.showToast(this.$showErrorToast, '', '删除数据失败');
        });
    };
    /**
     * 行数据复选框单选
     *
     * @param {boolean} value
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.onItemSelect = function (value, item) {
        if (item === void 0) { item = {}; }
        if (item.disabled) {
            return;
        }
        if (this.isEnableRowEdit && this.openRowEdit) {
            return;
        }
        var index = this.selections.findIndex(function (data) { return Object.is(data.srfkey, item.srfkey); });
        if (index === -1) {
            this.selections.push(item);
        }
        else {
            this.selections.splice(index, 1);
        }
        if (!this.multiSelect) {
            this.selections.forEach(function (data) {
                data.checked = false;
            });
            this.selections = [];
            if (index === -1) {
                this.selections.push(item);
            }
        }
        this.rowsSelection = true;
        this.allChecked = this.selections.length === this.items.length ? true : false;
        this.indeterminate = (!this.allChecked) && (this.selections.length > 0);
        item.checked = value;
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
    };
    /**
     * 行数据复选框全选
     *
     * @param {boolean} value
     * @memberof IBizMDService
     */
    IBizDataGrid.prototype.selectAll = function (value) {
        var _this_1 = this;
        if (this.isEnableRowEdit && this.openRowEdit) {
            return;
        }
        if (!this.multiSelect) {
            setTimeout(function () {
                _this_1.allChecked = false;
            });
            return;
        }
        this.items.forEach(function (item) {
            if (!item.disabled) {
                item.checked = value;
            }
        });
        this.selections = [];
        if (value) {
            this.selections = this.items.slice();
        }
        this.indeterminate = (!value) && (this.selections.length > 0);
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
    };
    /**
     * 导出数据
     *
     * @param {any} params
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.exportData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var params = {};
        this.fire(IBizMDControl.BEFORELOAD, params);
        if (params.search) {
            Object.assign(params, { query: params.search });
        }
        Object.assign(params, { srfaction: 'exportdata', srfctrlid: this.getName() });
        if (Object.is(arg.itemTag, 'all')) {
            Object.assign(params, { start: 0, limit: this.maxExportRow });
        }
        else if (Object.is(arg.itemTag, 'custom')) {
            var nStart = arg.exportPageStart;
            var nEnd = arg.exportPageEnd;
            if (nStart < 1 || nEnd < 1 || nStart > nEnd) {
                // this.showToast('INFO', '警告', '请输入有效的起始页');
                return;
            }
            Object.assign(params, { start: (nStart - 1) * this.limit, limit: nEnd * this.limit });
        }
        else {
            Object.assign(params, { start: (this.curPage * this.limit) - this.limit, limit: this.curPage * this.limit });
        }
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (res) {
            if (res.ret === 0) {
                if (res.downloadurl) {
                    var downloadurl = res.downloadurl;
                    if (downloadurl.indexOf('/') === 0) {
                        downloadurl = downloadurl.substring(downloadurl.indexOf('/') + 1, downloadurl.length);
                    }
                    else {
                        downloadurl = downloadurl;
                    }
                    IBizUtil.download(downloadurl);
                }
            }
            else {
                // this.showToast('ERROR', '警告', res.info);
            }
        }, function (error) {
            console.log(error.info);
        });
    };
    /**
     * 重置分页
     *
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.resetStart = function () {
        this.start = 0;
    };
    /**
     * 第几页跳转
     *
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.clickPageIndex = function () {
        var _this = this;
        _this.pageChangeFlag = true;
    };
    /**
     * 分页页数改变
     *
     * @param {number} page 页码
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.changePageIndex = function (page) {
        var _this = this;
        _this.curPage = page;
        _this.refresh();
    };
    /**
     * 每页显示条数
     *
     * @param {number} size 条数
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.changePageSize = function (size) {
        var _this = this;
        _this.curPage = 1;
        _this.limit = size;
        _this.refresh();
    };
    /**
     * 单击行选中
     *
     * @param {*} [data={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.clickRowSelect = function (data) {
        if (data === void 0) { data = {}; }
        if (data.disabled) {
            return;
        }
        if (this.doRowDataSelect(data)) {
            return;
        }
        this.fire(IBizDataGrid.ROWCLICK, this.selections);
    };
    /**
     * 双击行选中
     *
     * @param {*} [data={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.dblClickRowSelection = function (data) {
        if (data === void 0) { data = {}; }
        if (data.disabled) {
            return;
        }
        if (this.doRowDataSelect(data)) {
            return;
        }
        this.fire(IBizDataGrid.ROWDBLCLICK, this.selections);
    };
    /**
     * 表格排序
     *
     * @param {string} name 字段明显
     * @param {string} type 排序类型
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.sort = function (name, type) {
        var item = this.gridSortField.find(function (item) { return Object.is(item.property, name); });
        if (item === undefined) {
            if (Object.is('ascend', type)) {
                this.gridSortField.push({ property: name, direction: 'asc' });
            }
            else if (Object.is('descend', type)) {
                this.gridSortField.push({ property: name, direction: 'desc' });
            }
            else {
                return;
            }
        }
        var index = this.gridSortField.findIndex(function (item) {
            return Object.is(item.property, name);
        });
        if (Object.is('ascend', type)) {
            this.gridSortField[index].direction = 'asc';
        }
        else if (Object.is('descend', type)) {
            this.gridSortField[index].direction = 'desc';
        }
        else {
            this.gridSortField.splice(index, 1);
        }
        this.refresh({});
    };
    /**
     * 设置表格数据当前页
     *
     * @param {number} page 分页数量
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.setCurPage = function (page) {
        this.curPage = page;
    };
    /**
     * 设置是否支持多选
     *
     * @param {boolean} state 是否支持多选
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.setMultiSelect = function (state) {
        this.multiSelect = state;
    };
    /**
     * 界面行为
     *
     * @param {string} tag
     * @param {*} [data={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.uiAction = function (tag, data) {
        if (data === void 0) { data = {}; }
        if (data.disabled) {
            return;
        }
        if (this.doRowDataSelect(data)) {
            return;
        }
        this.fire(IBizMDControl.UIACTION, { tag: tag, data: data });
    };
    /**
     * 处理非复选框行数据选中,并处理是否激活数据
     *
     * @private
     * @param {*} [data={}]
     * @returns {boolean} 是否激活
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.doRowDataSelect = function (data) {
        if (data === void 0) { data = {}; }
        if (this.isEnableRowEdit && this.openRowEdit) {
            return;
        }
        if (this.rowsSelection) {
            this.rowsSelection = false;
            return true;
        }
        this.selections.forEach(function (data) {
            data.checked = false;
        });
        this.selections = [];
        data.checked = true;
        this.selections.push(data);
        this.indeterminate = (!this.allChecked) && (this.selections.length > 0);
        return false;
    };
    /**
     * 渲染绘制多项数据
     *
     * @param {Array<any>} items
     * @returns {Array<any>}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.rendererDatas = function (items) {
        var _this_1 = this;
        _super.prototype.rendererDatas.call(this, items);
        items.forEach(function (item) {
            var names = Object.keys(item);
            names.forEach(function (name) { item[name] = item[name] ? item[name] : ''; });
        });
        if (this.isEnableRowEdit) {
            items.forEach(function (item) { item.openeditrow = (_this_1.isEnableRowEdit) ? true : false; });
        }
        return items;
    };
    /**
     * 注册表格所有编辑项
     *
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.regEditItems = function () {
    };
    /**
     * 注册表格编辑项
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.regEditItem = function (item) {
        if (item === void 0) { item = {}; }
        if (Object.keys(item).length === 0) {
            return;
        }
        this.editItems[item.name] = item;
    };
    /**
     * 设置编辑项状态
     *
     * @param {string} srfkey
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.setEditItemState = function (srfkey) {
        var _this_1 = this;
        if (!this.state) {
            return;
        }
        if (!srfkey) {
            // this.$notification.warning('警告', '数据异常');
        }
        var editItems = {};
        var itemsName = Object.keys(this.editItems);
        itemsName.forEach(function (name) {
            var item = {};
            var _editor = JSON.stringify(_this_1.editItems[name]);
            Object.assign(item, JSON.parse(_editor));
            editItems[name] = item;
        });
        this.state[srfkey] = editItems;
    };
    /**
     * 删除信息编辑项状态
     *
     * @param {string} srfkey
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.deleteEditItemState = function (srfkey) {
        if (srfkey && this.state.hasOwnProperty(srfkey)) {
            delete this.state.srfkey;
        }
    };
    /**
     * 设置编辑项是否启用
     *
     * @param {string} srfkey
     * @param {number} type
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.setEditItemDisabled = function (srfkey, type) {
        if (this.state && this.state.hasOwnProperty(srfkey)) {
            var item_1 = this.state[srfkey];
            var itemsName = Object.keys(item_1);
            itemsName.forEach(function (name) {
                var disabled = (item_1[name].enabledcond === 3 || item_1[name].enabledcond === type);
                item_1[name].disabled = !disabled;
            });
            Object.assign(this.state[srfkey], item_1);
        }
    };
    /**
     * 获取行编辑状态
     *
     * @returns {boolean}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.getOpenEdit = function () {
        return this.openRowEdit;
    };
    /**
     * 保存表格所有编辑行 <在插件模板中提供重写>
     *
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.saveAllEditRow = function () {
    };
    /**
     * 是否启用行编辑
     *
     * @param {string} tag
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.isOpenEdit = function (tag) {
        var _this_1 = this;
        if (!this.isEnableRowEdit) {
            // this.$notification.info('提示', '未启用行编辑');
            return;
        }
        this.openRowEdit = !this.openRowEdit;
        if (this.openRowEdit) {
            this.items.forEach(function (item) { item.openeditrow = true; });
            this.selections.forEach(function (data) {
                data.checked = false;
            });
            this.selections = [];
            this.indeterminate = false;
            this.fire(IBizMDControl.SELECTIONCHANGE, this.selections);
            this.items.forEach(function (item) {
                var data = __rest(item, []);
                _this_1.backupData.push(data);
                _this_1.setEditItemState(item.srfkey);
            });
        }
        else {
            this.items = [];
            this.backupData.forEach(function (data) {
                _this_1.items.push(data);
            });
            this.backupData = [];
            this.state = {};
        }
    };
    /**
     * 编辑行数据
     *
     * @param {*} [data={}]
     * @param {number} rowindex
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.editRow = function (data, rowindex) {
        if (data === void 0) { data = {}; }
        data.openeditrow = !data.openeditrow;
        this.setEditItemState(data.srfkey);
        if (data.openeditrow) {
            var index = this.backupData.findIndex(function (item) { return Object.is(item.srfkey, data.srfkey); });
            if (index !== -1) {
                Object.assign(data, this.backupData[index]);
            }
            if (Object.is(data.srfkey, '')) {
                this.items.splice(rowindex, 1);
            }
        }
        else {
            this.setEditItemDisabled(data.srfkey, 2);
        }
    };
    /**
     * 保存编辑行数据
     *
     * @param {*} [data={}]
     * @param {number} rowindex
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.editRowSave = function (data, rowindex) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var _index = this.backupData.findIndex(function (item) { return Object.is(item.srfkey, data.srfkey); });
        var srfaction = (_index !== -1) ? 'update' : 'create';
        // if (Object.is(srfaction, 'create')) {
        //     delete data.srfkey;
        // }
        var params = { srfaction: srfaction, srfctrlid: 'grid' };
        var viewController = this.getViewController();
        if (viewController && viewController.getViewParam() && Object.keys(viewController.getViewParam()).length > 0) {
            Object.assign(params, viewController.getViewParam());
        }
        var _names = Object.keys(data);
        _names.forEach(function (name) {
            data[name] = data[name] ? data[name] : '';
        });
        Object.assign(params, data);
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (responce) {
            if (responce.ret === 0) {
                data.openeditrow = !data.openeditrow;
                var index = _this_1.backupData.findIndex(function (item) { return Object.is(data.srfkey, item.srfkey); });
                if (index !== -1) {
                    Object.assign(_this_1.backupData[index], responce.data);
                }
                else {
                    _this_1.deleteEditItemState(data.srfkey);
                    _this_1.setEditItemState(responce.data.srfkey);
                    _this_1.backupData.push(data);
                }
                Object.assign(data, responce.data);
                // this.showToast(this.$showSuccessToast, '提示', '保存成功');
                _this_1.fire(IBizMDControl.LOADED, data);
            }
            else {
                var info_1 = '';
                if (responce.error && (responce.error.items && Array.isArray(responce.error.items))) {
                    var items = responce.error.items;
                    items.forEach(function (item, index) {
                        if (index > 0) {
                            info_1 += '\n';
                        }
                        info_1 += item.info;
                        Object.assign(_this_1.state[data.srfkey][item.id].styleCss, { 'border': '1px solid #f04134', 'border-radius': '4px' });
                    });
                }
                // this.$notification.error('错误', !Object.is(info, '') ? info : '行编辑保存失败');
            }
        }, function (error) {
            var info = '';
            if (error.error && (error.error.items && Array.isArray(error.error.items))) {
                var items = error.error.items;
                items.forEach(function (item, index) {
                    if (index > 0) {
                        info += '\n';
                    }
                    info += item.info;
                    Object.assign(_this_1.state[data.srfkey][item.id].styleCss, { 'border': '1px solid #f04134', 'border-radius': '4px' });
                });
            }
            // this.$notification.error('错误', !Object.is(info, '') ? info : '行编辑保存失败');
        });
    };
    /**
     * 行编辑文本框光标移出事件
     *
     * @param {*} $event
     * @param {string} name
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.onBlur = function ($event, name, data) {
        if (data === void 0) { data = {}; }
        if ((!$event) || Object.keys(data).length === 0) {
            return;
        }
        if (Object.is($event.target.value, data[name])) {
            return;
        }
        this.colValueChange(name, $event.target.value, data);
    };
    /**
     * 行编辑文本框键盘事件
     *
     * @param {*} $event
     * @param {string} name
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.onKeydown = function ($event, name, data) {
        if (data === void 0) { data = {}; }
        if ((!$event) || Object.keys(data).length === 0) {
            return;
        }
        if ($event.keyCode !== 13) {
            return;
        }
        if (Object.is($event.target.value, data[name])) {
            return;
        }
        this.colValueChange(name, $event.target.value, data);
    };
    /**
     * 行编辑单元格值变化
     *
     * @param {string} name
     * @param {*} data
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.colValueChange = function (name, value, data) {
        var srfkey = data.srfkey;
        var _data = this.backupData.find(function (back) { return Object.is(back.srfkey, srfkey); });
        if (_data && !Object.is(_data[name], value)) {
            Object.assign(this.state[srfkey][name].styleCss, { 'border': '1px solid #49a9ee', 'border-radius': '4px' });
        }
        else {
            Object.assign(this.state[srfkey][name].styleCss, { 'border': '0px', 'border-radius': '0px' });
        }
        data[name] = value;
        this.fire(IBizDataGrid.UPDATEGRIDITEMCHANGE, { name: name, data: data });
    };
    /**
     * 更新表格编辑列值
     *
     * @param {string} srfufimode
     * @param {*} [data={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.updateGridEditItems = function (srfufimode, data) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var opt = { srfaction: 'updategridedititem', srfufimode: srfufimode, srfctrlid: 'grid' };
        var viewController = this.getViewController();
        if (viewController && viewController.getViewParam() && Object.keys(viewController.getViewParam()).length > 0) {
            Object.assign(opt, viewController.getViewParam());
        }
        var _names = Object.keys(data);
        _names.forEach(function (name) {
            data[name] = data[name] ? data[name] : '';
        });
        Object.assign(opt, { srfactivedata: JSON.stringify(data) });
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (success) {
            if (success.ret === 0) {
                var index = _this_1.items.findIndex(function (item) { return Object.is(item.srfkey, data.srfkey); });
                if (index !== -1) {
                    Object.assign(_this_1.items[index], success.data);
                }
            }
            else {
                // this.$notification.error('错误', success.info);
            }
        }, function (error) {
            // this.$notification.error('错误', error.info);
        });
    };
    /**
     * 新建编辑行
     *
     * @param {*} [param={}]
     * @memberof IBizDataGrid
     */
    IBizDataGrid.prototype.newRowAjax = function (param) {
        var _this_1 = this;
        if (param === void 0) { param = {}; }
        var opt = {};
        Object.assign(opt, param);
        var viewController = this.getViewController();
        if (viewController && viewController.getViewParam() && Object.keys(viewController.getViewParam()).length > 0) {
            Object.assign(opt, viewController.getViewParam());
        }
        this.fire(IBizMDControl.BEFORELOAD, opt);
        Object.assign(opt, { srfaction: 'loaddraft', srfctrlid: 'grid' });
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (success) {
            if (success.ret === 0) {
                var srfkey = (Object.is(success.data.srfkey, '')) ? IBizUtil.createUUID() : success.data.srfkey;
                success.data.srfkey = srfkey;
                _this_1.setEditItemState(srfkey);
                _this_1.setEditItemDisabled(srfkey, 1);
                _this_1.items.push(Object.assign(success.data, { openeditrow: false }));
            }
            else {
                // this.$notification.error('错误', `获取默认数据失败, ${success.info}`);
            }
        }, function (error) {
            // this.$notification.error('错误', `获取默认数据失败, ${error.info}`);
        });
    };
    /*****************事件声明************************/
    /**
     * 改变启用行编辑按钮信息
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.CHANGEEDITSTATE = 'CHANGEEDITSTATE';
    /**
     * 表格行数据变化
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.UPDATEGRIDITEMCHANGE = 'UPDATEGRIDITEMCHANGE';
    /**
     * 数据删除完成
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.REMOVED = 'REMOVED';
    /**
     * 行单击选中
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.ROWCLICK = 'ROWCLICK';
    /**
     * 行数据双击选中
     *
     * @static
     * @memberof IBizDataGrid
     */
    IBizDataGrid.ROWDBLCLICK = 'ROWDBLCLICK';
    return IBizDataGrid;
}(IBizMDControl));

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
 * 表单对象
 *
 * @class IBizForm
 * @extends {IBizControl}
 */
var IBizForm = /** @class */ (function (_super) {
    __extends(IBizForm, _super);
    /**
     * Creates an instance of IBizForm.
     * 创建 IBizForm 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizForm
     */
    function IBizForm(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.dataaccaction = {};
        _this_1.formDirty = false;
        _this_1.fieldMap = {};
        _this_1.fieldIdMap = {};
        _this_1.ignoreUFI = false;
        _this_1.ignoreformfieldchange = false;
        _this_1.readonly = false;
        var _this = _this_1;
        _this.regFormItems();
        return _this_1;
    }
    IBizForm.prototype.init = function () {
        var _this = this;
        // $.each(_this.fieldMap,function(key,item){
        // 	//计算表单是否允许为空
        // 	item.setAllowBlank(item.allowBlank);
        // 	//计算表单是否显示
        // 	item.setVisible(item.visible);
        // 	//计算表单是否隐藏
        // 	item.setHidden(item.hidden);
        // });
    };
    /**
     * 加载
     * @param arg 参数
     */
    IBizForm.prototype.autoLoad = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        if (arg.srfkey != undefined && arg.srfkey != '') {
            return _this.load2(arg);
        }
        if (arg.srfkeys != undefined && arg.srfkeys != '') {
            arg.srfkey = arg.srfkeys;
            //_this.viewparam['srfkey'] = arg.srfkey;
            return _this.load2(arg);
        }
        return _this.loadDraft(arg);
    };
    IBizForm.prototype.load2 = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        // $.extend(arg, { srfaction: 'load' });
        Object.assign(arg, { srfaction: 'load' });
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;
        var subject = new rxjs.Subject();
        _this.load(arg).subscribe(function (action) {
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            _this.fire(IBizForm.FORMLOADED, _this);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
            _this.onLoaded();
            // if (successcb) {
            //     successcb(form, action);
            // }
            subject.next(action);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert($IGM('IBIZFORM.LOAD.TITLE', '加载失败'), $IGM('IBIZFORM.LOAD2.INFO', "加载数据发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
            _this_1.iBizNotification.error('加载失败', "\u52A0\u8F7D\u6570\u636E\u53D1\u751F\u9519\u8BEF," + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // if (errorcb) {
            //     errorcb(form, action);
            // }
            subject.error(action);
        });
        return subject;
    };
    IBizForm.prototype.loadDraft = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        if (!arg.srfsourcekey || arg.srfsourcekey == '') {
            // $.extend(arg, { srfaction: 'loaddraft' });
            Object.assign(arg, { srfaction: 'loaddraft' });
        }
        else {
            // $.extend(arg, { srfaction: 'loaddraftfrom' });
            Object.assign(arg, { srfaction: 'loaddraftfrom' });
        }
        var subject = new rxjs.Subject();
        _this.load(arg).subscribe(function (action) {
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            _this.fire(IBizForm.FORMLOADED, _this);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
            _this.onDraftLoaded();
            // if (successcb) {
            //     successcb(form, action);
            // } 
            subject.next(action);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert($IGM('IBIZFORM.LOAD.TITLE', '加载失败'), $IGM('IBIZFORM.LOADDRAFT.INFO', "加载草稿发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
            _this_1.iBizNotification.error('加载失败', "\u52A0\u8F7D\u8349\u7A3F\u53D1\u751F\u9519\u8BEF," + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // if (errorcb) {
            //     errorcb(form, action);
            // }
            subject.error(action);
        });
        return subject;
    };
    IBizForm.prototype.onDraftLoaded = function () {
        var _this = this;
    };
    IBizForm.prototype.onLoaded = function () {
        var _this = this;
    };
    /**
     * 设置表单动态配置
     */
    IBizForm.prototype.setFieldAsyncConfig = function (config) {
        if (config === void 0) { config = {}; }
        if (config == undefined || config == null)
            return;
        var _this = this;
        var fieldNames = Object.keys(config);
        fieldNames.forEach(function (name) {
            var field = _this.findField(name);
            if (field) {
                field.setAsyncConfig(config[name].items);
            }
        });
    };
    /**
     * 设置当前表单权限信息
     */
    IBizForm.prototype.setDataAccAction = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        var _this = this;
        _this.dataaccaction = dataaccaction;
        _this.fire(IBizForm.DATAACCACTIONCHANGE, dataaccaction);
    };
    /**
     * 获取当前表单权限信息
     */
    IBizForm.prototype.getDataAccAction = function () {
        var _this = this;
        return _this.dataaccaction;
    };
    /**
     * 设置属性状态
     */
    IBizForm.prototype.setFieldState = function (state) {
        if (state === void 0) { state = {}; }
        if (state == undefined || state == null)
            return;
        var _this = this;
        var filedNames = Object.keys(state);
        filedNames.forEach(function (name) {
            var field = _this.findField(name);
            if (field) {
                var disabled = ((state[name] & 1) == 0);
                if (field.isDisabled() != disabled)
                    field.setDisabled(disabled);
            }
        });
    };
    IBizForm.prototype.isDirty = function () {
        var _this = this;
        return _this.formDirty;
    };
    IBizForm.prototype.regFormItems = function () {
    };
    /**
     * 注册表单属性
     * @param field 属性
     */
    IBizForm.prototype.regFormItem = function (field) {
        var _this = this;
        if (Array.isArray(field)) {
            field.forEach(function (_field) {
                _this.fieldIdMap[_field.getName()] = _field;
                _this.fieldMap[_field.getName()] = _field;
                _field.setForm(_this);
                // 注册事件
                _field.on(IBizFormItem.VALUECHANGED).subscribe(function (args) {
                    if (_this.ignoreformfieldchange)
                        return;
                    _this.formDirty = true;
                    _this.fire(IBizForm.FORMFIELDCHANGED, args);
                });
            });
        }
        else {
            _this.fieldIdMap[field.getName()] = field;
            _this.fieldMap[field.getName()] = field;
            field.setForm(_this);
            // 注册事件
            field.on(IBizFormItem.VALUECHANGED).subscribe(function (args) {
                if (_this.ignoreformfieldchange)
                    return;
                _this.formDirty = true;
                _this.fire(IBizForm.FORMFIELDCHANGED, args);
            });
        }
    };
    /**
     * 注销表单属性
     * @param field 属性
     */
    IBizForm.prototype.unRegister = function (field) {
        this.fieldMap[field.getName()] = null;
        this.fieldIdMap[field.getUniqueId()] = null;
    };
    /**
     * 获取控件标识
     */
    // public getSRFCtrlId():string{
    // 	return this.srfctrlid;
    // }
    /**
     * 获取后台服务地址
     */
    // public getBackendUrl(): string {
    //     return this.backendurl;
    // }
    /**
     * 根据名称获取属性
     */
    IBizForm.prototype.findField = function (name) {
        return this.fieldMap[name];
    };
    /**
     * 根据唯一标识获取属性
     */
    IBizForm.prototype.getFieldById = function (id) {
        return this.fieldIdMap[id];
    };
    /**
     * 加载数据
     */
    IBizForm.prototype.load = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        Object.assign(arg, { srfctrlid: this.getName() });
        _this.beginLoading();
        var subject = new rxjs.Subject();
        _this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (data) {
            _this_1.endLoading();
            if (data && data.ret === 0) {
                subject.next(data);
            }
            else {
                subject.error(data);
            }
        }, function (data) {
            _this_1.endLoading();
            subject.error(data);
        });
        return subject;
    };
    IBizForm.prototype.submit = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        Object.assign(arg, { srfctrlid: this.getName() });
        _this.beginLoading();
        var subject = new rxjs.Subject();
        _this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (data) {
            _this_1.endLoading();
            if (data && data.ret === 0) {
                subject.next(data);
            }
            else {
                subject.error(data);
            }
        }, function (data) {
            _this_1.endLoading();
            subject.error(data);
        });
        return subject;
    };
    IBizForm.prototype.getActionErrorInfo = function (action) {
        if (action === void 0) { action = {}; }
        if (action.failureType === 'CONNECT_FAILURE') {
            return 'Status:' + action.response.status + ': ' + action.response.statusText;
        }
        if (action.failureType === 'SERVER_INVALID') {
            var msg = action.errorMessage;
            if (action.error && action.error.items) {
                action.error.items.some(function (item, index) {
                    if (index >= 5) {
                        msg += ("<BR>...... ");
                        return true;
                    }
                    if (item.info && item.info != '' && msg.indexOf(item.info) < 0) {
                        msg += ("<BR>" + item.info);
                    }
                });
            }
            return msg;
        }
        if (action.failureType === 'CLIENT_INVALID') {
            return "";
        }
        if (action.failureType === 'LOAD_FAILURE') {
            return "";
        }
    };
    /**
     * 填充表单
     */
    IBizForm.prototype.fillForm = function (data) {
        if (data === void 0) { data = {}; }
        if (!data)
            return;
        var _this = this;
        var names = Object.keys(data);
        names.forEach(function (name) {
            var val = data[name] ? data[name] : '';
            if (!(typeof val === 'string')) {
                val = JSON.stringify(val);
            }
            _this.setFieldValue(name, val);
        });
    };
    /**
     * 设置表单项值
     */
    IBizForm.prototype.setFieldValue = function (name, value) {
        var field = this.findField(name);
        if (field)
            field.setValue(value);
    };
    /**
     * 获取表单项值
     */
    IBizForm.prototype.getFieldValue = function (name) {
        var _this = this;
        var field = _this.findField(name);
        if (!field) {
            // IBiz.alert($IGM('IBIZFORM.GETFIELDVALUE.TITLE','获取失败'), $IGM('IBIZFORM.GETFIELDVALUE.INFO','无法获取表单项['+name+']',[name]),2);
            this.iBizNotification.error('获取失败', "\u65E0\u6CD5\u83B7\u53D6\u8868\u5355\u9879[" + name + "]");
            return '';
        }
        return field.getValue();
    };
    /**
     * 设置表单项允许为空
     */
    IBizForm.prototype.setFieldAllowBlank = function (name, allowblank) {
        var _this = this;
        var field = _this.findField(name);
        if (field) {
            field.setAllowBlank(allowblank);
        }
    };
    /**
     * 设置表单是否禁用
     */
    IBizForm.prototype.setReadonly = function (disabled) {
        var _this_1 = this;
        this.readonly = disabled;
        var fieldNames = Object.keys(this.fieldMap);
        fieldNames.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                field.setDisabled(disabled);
            }
        });
    };
    /**
     * 设置表单项属性是否禁用
     */
    IBizForm.prototype.setFieldDisabled = function (name, disabled) {
        var _this = this;
        if (_this.readonly) {
            return;
        }
        var field = _this.findField(name);
        if (field) {
            field.setDisabled(disabled);
        }
    };
    /**
     * 设置表单错误
     */
    IBizForm.prototype.setFormError = function (formerror) {
        var _this = this;
        _this.resetFormError();
        if (formerror && formerror.items) {
            // $.each(formerror.items, function (index, item) {
            //     var field = _this.findField(item.id);
            //     if (field) {
            //         //  field.markInvalid($IGM('IBIZFORM.SETFORMERROR.ERROR','输入有误'));
            //         //  field.setActiveError($IGM('IBIZFORM.SETFORMERROR.ERROR','输入有误'));
            //     }
            // });
        }
    };
    IBizForm.prototype.resetFormError = function () {
        var _this_1 = this;
        var _this = this;
        var fieldNames = Object.keys(this.fieldMap);
        fieldNames.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field.hasActiveError()) {
                field.unsetActiveError();
            }
        });
    };
    /**
     * 设置面板<分组、分页面板>隐藏
     */
    IBizForm.prototype.setPanelVisible = function (name, visible) {
        var _this = this;
        var field = _this.findField(name);
        if (field) {
            field.setVisible(visible);
        }
    };
    /**
     * 获取当前表单项值
     */
    IBizForm.prototype.getActiveData = function () {
        var _this_1 = this;
        var _this = this;
        var values = {};
        var fieldNames = Object.keys(this.fieldMap);
        fieldNames.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                if (values[field.getName()] == undefined) {
                    var value = field.getValue();
                    if (value) {
                        if (value.toString().length < 8000)
                            values[field.getName()] = field.getValue();
                    }
                }
            }
        });
        return values;
    };
    /**
     * 获取全部表单项值
     */
    IBizForm.prototype.getValues = function () {
        var _this_1 = this;
        var _this = this;
        var values = {};
        var fieldNames = Object.keys(this.fieldMap);
        fieldNames.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                var value = field.getValue();
                values[name] = value;
            }
        });
        return values;
    };
    IBizForm.prototype.testFieldEnableReadonly = function (value) {
        return false;
    };
    /**
     * 更新表单项
     */
    IBizForm.prototype.updateFormItems = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (_this.ignoreUFI)
            return new Promise(null);
        var activeData = _this.getActiveData();
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        // $.extend(arg, { srfaction: 'updateformitem',srfactivedata:JSON.stringify(activeData)});
        Object.assign(arg, { srfaction: 'updateformitem', srfactivedata: JSON.stringify(activeData) });
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;
        return new Promise(function (resolve, reject) {
            _this.load(arg).subscribe(function (action) {
                _this.setFieldAsyncConfig(action.config);
                _this.setFieldState(action.state);
                if (action.dataaccaction)
                    _this.setDataAccAction(action.dataaccaction);
                _this.fillForm(action.data);
                _this.fire(IBizForm.UPDATEFORMITEMS, { ufimode: arg.srfufimode, data: action.data });
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                _this.fire(IBizForm.FORMFIELDCHANGED, null);
                // if(successcb){
                // 	successcb(form, action);
                // }
                resolve(action);
            }, function (action) {
                action.failureType = 'SERVER_INVALID';
                // IBiz.alert($IGM('IBIZFORM.UPDATEFORMITEMS.TITLE','更新失败'), $IGM('IBIZFORM.UPDATEFORMITEMS.INFO',"更新表单项发生错误,"+action.info,[action.info]),2);
                _this.iBizNotification.error('更新失败', "\u66F4\u65B0\u8868\u5355\u9879\u53D1\u751F\u9519\u8BEF," + action.info);
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                //   if(errorcb){
                //           errorcb(form, action);	
                //     }
                reject(action);
            });
        });
    };
    /**
     * 重置表单
     */
    IBizForm.prototype.reset = function () {
        var _this = this;
        _this.autoLoad();
    };
    IBizForm.prototype.getFormType = function () {
        return '';
    };
    /*****************事件声明************************/
    /**
     * 表单加载完成事件
     */
    IBizForm.FORMLOADED = 'FORMLOADED';
    /**
     * 表单属性值变化事件
     */
    IBizForm.FORMFIELDCHANGED = 'FORMFIELDCHANGED';
    /**
     * 表单保存完成
     */
    IBizForm.FORMSAVED = 'FORMSAVED';
    /**
     * 表单删除完成
     */
    IBizForm.FORMREMOVED = 'FORMREMOVED';
    /**
     * 表单工作流启动完成
     */
    IBizForm.FORMWFSTARTED = 'FORMWFSTARTED';
    /**
     * 表单工作流提交完成
     */
    IBizForm.FORMWFSUBMITTED = 'FORMWFSUBMITTED';
    /**
     * 表单权限发生变化
     */
    IBizForm.DATAACCACTIONCHANGE = 'DATAACCACTIONCHANGE';
    /**
     * 表单项更新
     */
    IBizForm.UPDATEFORMITEMS = 'UPDATEFORMITEMS';
    return IBizForm;
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
 * 编辑表单对象
 *
 * @class IBizEditForm
 * @extends {IBizForm}
 */
var IBizEditForm = /** @class */ (function (_super) {
    __extends(IBizEditForm, _super);
    /**
     * Creates an instance of IBizEditForm.
     * 创建 IBizEditForm 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizEditForm
     */
    function IBizEditForm(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        var _this = _this_1;
        return _this_1;
    }
    IBizEditForm.prototype.save2 = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        var data = this.getValues();
        // $.extend(arg, data);
        Object.assign(arg, data);
        if (data.srfuf == "1") {
            // $.extend(arg, { srfaction: 'update' });
            Object.assign(arg, { srfaction: 'update' });
        }
        else {
            // $.extend(arg, { srfaction: 'create' });
            Object.assign(arg, { srfaction: 'create' });
        }
        //获取所有Disabled数据
        // var disablevalues = {};
        // $.each(this.fieldMap,function (name,item) {
        //     if (item.isDisabled()) {
        //         if (disablevalues[item.name] == undefined) {
        //         	disablevalues[item.name] = item.getValue();
        //         }
        //     }
        // });
        // $.extend(arg, disablevalues);
        arg.srfcancel = false;
        _this.fire(IBizEditForm.FORMBEFORESAVE, arg);
        if (arg.srfcancel == true) {
            return;
        }
        delete arg.srfcancel;
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;
        var subject = new rxjs.Subject();
        _this.submit(arg).subscribe(function (action) {
            _this.resetFormError();
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            //判断是否有提示
            if (action.info && action.info != '') {
                // IBiz.alert('',action.info,1);
                _this.iBizNotification.info('', action.info);
            }
            _this.fire(IBizForm.FORMSAVED, action);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
            _this.onSaved();
            // if (successcb) {
            //     successcb(form, action);
            // }
            subject.next(action);
        }, function (action) {
            if (action.error) {
                _this.setFormError(action.error);
            }
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            _this.fire(IBizEditForm.FORMSAVEERROR, null);
            // if (errorcb) {
            //     errorcb(form, action);
            // }
            subject.error(action);
            action.failureType = 'SERVER_INVALID';
            if (action.ret == 10) {
                // IBiz.confirm2($IGM('IBIZEDITFORM.SAVE2FAILED.TITLE', "保存错误信息"), $IGM('IBIZEDITFORM.SAVE2FAILED2.INFO', "保存数据发生错误," + _this.getActionErrorInfo(action) + ',是否要重新加载数据？', [_this.getActionErrorInfo(action)]), 2, function (ret) {
                //     if (ret)
                //         _this.reload();
                // });
                _this.iBizNotification.confirm('保存错误信息', "\u4FDD\u5B58\u6570\u636E\u53D1\u751F\u9519\u8BEF," + _this.getActionErrorInfo(action) + ",\u662F\u5426\u8981\u91CD\u65B0\u52A0\u8F7D\u6570\u636E\uFF1F").subscribe(function (ret) {
                    _this.reload();
                });
            }
            else {
                // IBiz.alert($IGM('IBIZEDITFORM.SAVE2FAILED.TITLE', "保存错误信息"), $IGM('IBIZEDITFORM.SAVE2FAILED.INFO', "保存数据发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
                _this.iBizNotification.error('保存错误信息', "\u4FDD\u5B58\u6570\u636E\u53D1\u751F\u9519\u8BEF," + _this.getActionErrorInfo(action));
            }
        });
        return subject;
    };
    IBizEditForm.prototype.onSaved = function () {
        var _this = this;
    };
    IBizEditForm.prototype.reload = function () {
        var _this = this;
        var field = _this.findField('srfkey');
        var loadarg = {};
        if (field) {
            loadarg.srfkey = field.getValue();
            if (loadarg.srfkey.indexOf('SRFTEMPKEY:') == 0) {
                field = _this.findField('srforikey');
                if (field) {
                    loadarg.srfkey = field.getValue();
                }
            }
        }
        return _this.autoLoad(loadarg);
    };
    IBizEditForm.prototype.remove = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        if (!arg.srfkey) {
            var field = _this.findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
        }
        if (arg.srfkey == undefined || arg.srfkey == null || arg.srfkey == '') {
            // IBiz.alert($IGM('IBIZEDITFORM.REMOVEFAILED.TITLE',"删除错误信息"), $IGM('IBIZEDITFORM.UNLOADDATA','当前表单未加载数据！'),2);
            _this.iBizNotification.warning('删除错误信息', '当前表单未加载数据！');
            return new rxjs.Subject();
        }
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        // $.extend(arg, { srfaction: 'remove' });
        Object.assign(arg, { srfaction: 'remove' });
        _this.ignoreUFI = true;
        var subject = new rxjs.Subject();
        _this.load(arg).subscribe(function (action) {
            if (action.ret == 0) {
                _this.setFieldAsyncConfig(action.config);
                _this.setFieldState(action.state);
                _this.fire(IBizForm.FORMREMOVED, null);
                // if (successcb) {
                //     successcb(form, action);
                // }
                subject.next(action);
            }
            else {
                // if (errorcb) {
                //     errorcb(form, action);
                // }
                subject.error(action);
            }
            _this.ignoreUFI = false;
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert($IGM('IBIZEDITFORM.REMOVEFAILED.TITLE', "删除错误信息"), $IGM('IBIZEDITFORM.REMOVEFAILED.INFO', "删除数据发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
            _this.iBizNotification.error('删除错误信息', "\"\u5220\u9664\u6570\u636E\u53D1\u751F\u9519\u8BEF," + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
            // if (errorcb) {
            //     errorcb(form, action);
            // }
            subject.error(action);
        });
        return subject;
    };
    IBizEditForm.prototype.wfstart = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        if (!arg.srfkey) {
            var field = _this.findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
            field = _this.findField('srforikey');
            if (field) {
                var v = field.getValue();
                if (v && v != '') {
                    arg.srfkey = v;
                }
            }
        }
        if (arg.srfkey == undefined || arg.srfkey == null || arg.srfkey == '') {
            // IBiz.alert($IGM('IBIZEDITFORM.WFSTARTFAILED.TITLE',"启动流程错误信息"), $IGM('IBIZEDITFORM.UNLOADDATA','当前表单未加载数据！'),2);
            _this.iBizNotification.error('启动流程错误信息', '当前表单未加载数据！');
            return new rxjs.Subject();
        }
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        // $.extend(arg, { srfaction: 'wfstart' });
        Object.assign(arg, { srfaction: 'wfstart' });
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;
        var subject = new rxjs.Subject();
        _this.load(arg).subscribe(function (action) {
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            //	_this.fire(IBizForm.FORMLOADED);
            _this.fire(IBizForm.FORMWFSTARTED, action);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
            // if (successcb) {
            //     successcb(form, action);
            // }
            subject.next(action);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert($IGM('IBIZEDITFORM.WFSTARTFAILED.TITLE', "启动流程错误信息"), $IGM('IBIZEDITFORM.WFSTARTFAILED.INFO', "启动流程发生错误," + _this.getActionErrorInfo(action), [_this.getActionErrorInfo(action)]), 2);
            _this.iBizNotification.error('启动流程错误信息', "\u542F\u52A8\u6D41\u7A0B\u53D1\u751F\u9519\u8BEF," + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // if (errorcb) {
            //     errorcb(form, action);
            // }
            subject.error(action);
        });
        return subject;
    };
    IBizEditForm.prototype.wfsubmit = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        // if(IBizApp_Data)
        // 	arg.srfappdata=IBizApp_Data;
        var data = _this.getValues();
        // $.extend(arg, data);
        // $.extend(arg, { srfaction: 'wfsubmit' });
        Object.assign(arg, data, { srfaction: 'wfsubmit' });
        //        if (!arg.srfkey) {
        //            var field = _this.findField('srfkey');
        //            if (field) {
        //                arg.srfkey = field.getValue();
        //            }
        //        }
        if (arg.srfkey == undefined || arg.srfkey == null || arg.srfkey == '') {
            // IBiz.alert($IGM('IBIZEDITFORM.WFSUBMITFAILED.TITLE',"提交流程错误信息"),$IGM('IBIZEDITFORM.UNLOADDATA','当前表单未加载数据！'),2);
            _this.iBizNotification.error('提交流程错误信息', '当前表单未加载数据！');
            return new rxjs.Subject();
        }
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        _this.ignoreUFI = true;
        _this.ignoreformfieldchange = true;
        var subject = new rxjs.Subject();
        _this.load(arg).subscribe(function (action) {
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            //		_this.fire(IBizForm.FORMLOADED);
            _this.fire(IBizForm.FORMWFSUBMITTED, action);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
            // if (successcb) {
            //     successcb(form, action);
            // }
            subject.next(action);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert($IGM('IBIZEDITFORM.WFSUBMITFAILED.TITLE',"提交流程错误信息"),$IGM('IBIZEDITFORM.WFSUBMITFAILED.INFO',"工作流提交发生错误,"+_this.getActionErrorInfo(action),[_this.getActionErrorInfo(action)]),2);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // if (errorcb) {
            //     errorcb(form, action);
            // }
            subject.error(action);
        });
        return subject;
    };
    IBizEditForm.prototype.doUIAction = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        if (!arg)
            arg = {};
        // $.extend(arg, { srfaction: 'uiaction' });
        Object.assign(arg, { srfaction: 'uiaction' });
        // if (IBizApp_Data) {
        //     arg.srfappdata = IBizApp_Data;
        // }
        var successcb = arg.successcb;
        var errorcb = arg.errorcb;
        if (arg.successcb) {
            delete arg.successcb;
        }
        if (arg.errorcb) {
            delete arg.errorcb;
        }
        _this.beginLoading();
        var subject = new rxjs.Subject();
        _this.iBizHttp.post(_this.getBackendUrl(), arg).subscribe(function (data) {
            _this.endLoading();
            if (data.ret == 0) {
                IBizUtil.processResultBefore(data);
                _this.fire(IBizEditForm.UIACTIONFINISHED, data);
                if (data.reloadData) {
                    _this.reload();
                }
                if (data.info && data.info != '') {
                    // IBiz.alert('', data.info, 1);
                    _this.iBizNotification.info('', data.info);
                }
                IBizUtil.processResult(data);
                if (successcb) {
                    successcb(data);
                }
                subject.next(data);
            }
            else {
                // if (errorcb) {
                //     errorcb(data);
                // }
                subject.error(data);
                // IBiz.alert($IGM('IBIZEDITFORM.DOUIACTIONFAILED.TITLE', "界面操作错误信息"), $IGM('IBIZEDITFORM.DOUIACTIONFAILED.INFO', "操作失败," + data.errorMessage, [data.errorMessage]), 2);
                _this.iBizNotification.error('界面操作错误信息', "\u64CD\u4F5C\u5931\u8D25," + data.errorMessage);
            }
        }, function (data) {
            _this.endLoading();
            // IBiz.alert($IGM('IBIZEDITFORM.DOUIACTIONFAILED.TITLE', "界面操作错误信息"), $IGM('IBIZEDITFORM.DOUIACTIONFAILED2.INFO', "执行请求异常！"), 2);
            _this.iBizNotification.error('界面操作错误信息', '执行请求异常！');
            // if (errorcb) {
            //     errorcb(e);
            // }
            subject.error(data);
        });
        return subject;
    };
    IBizEditForm.prototype.getFormType = function () {
        return 'EDITFORM';
    };
    /*****************事件声明************************/
    /**
     * 表单权限发生变化
     */
    IBizEditForm.UIACTIONFINISHED = 'UIACTIONFINISHED';
    /**
     * 表单保存之前触发
     */
    IBizEditForm.FORMBEFORESAVE = 'FORMBEFORESAVE';
    /**
     * 表单保存错误触发
     */
    IBizEditForm.FORMSAVEERROR = 'FORMSAVEERROR';
    return IBizEditForm;
}(IBizForm));

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
 * 分页控件
 *
 * @class IBizTab
 * @extends {IBizControl}
 */
var IBizTab = /** @class */ (function (_super) {
    __extends(IBizTab, _super);
    /**
     * Creates an instance of IBizTab.
     * 创建 IBizTab 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTab
     */
    function IBizTab(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        var _this = _this_1;
        return _this_1;
    }
    IBizTab.prototype.setActiveItem = function (index) {
        // if ($.isNumeric(index)) {
        //     $('#' + this.config.id + ' li:eq(' + index.toString() + ') a').tab('show');
        // }
        // else {
        //     $('#' + this.config.id + ' a[href="#' + index + '"]').tab('show');
        // }
    };
    IBizTab.prototype.setSize = function (width, height) {
        // var me = this;
        // $('#' + me.id).width(width);
        // $('#' + me.id).height(height);
        /*if(me.activeSubController != null){
            me.activeSubController.setSize(width,height);
        }*/
    };
    IBizTab.prototype.getHeight = function () {
        // var me = this;
        // return $('#' + me.id).height();
    };
    IBizTab.prototype.getWidth = function () {
        // var me = this;
        // return $('#' + me.id).width();
    };
    /*****************事件声明************************/
    /**
     * 选择变化
     *
     * @static
     * @memberof IBizTab
     */
    IBizTab.SELECTIONCHANGE = "SELECTIONCHANGE";
    return IBizTab;
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
 * 导航分页
 *
 * @class IBizExpTab
 * @extends {IBizTab}
 */
var IBizExpTab = /** @class */ (function (_super) {
    __extends(IBizExpTab, _super);
    /**
     * Creates an instance of IBizExpTab.
     * 创建 IBizExpTab 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizExpTab
     */
    function IBizExpTab(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        var _this = _this_1;
        return _this_1;
    }
    return IBizExpTab;
}(IBizTab));

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
 * 树部件
 *
 * @class IBizTree
 * @extends {IBizControl}
 */
var IBizTree = /** @class */ (function (_super) {
    __extends(IBizTree, _super);
    /**
     * Creates an instance of IBizTree.
     * 创建 IBizTree 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTree
     */
    function IBizTree(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 树数据
         *
         * @type {Array<any>}
         * @memberof IBizTree
         */
        _this_1.items = [];
        _this_1.tableselection = null;
        _this_1.tableselections = {};
        /**
         *  默认节点
         *
         * @private
         * @type {*}
         * @memberof IBizTree
         */
        _this_1.node = {};
        var _this = _this_1;
        return _this_1;
    }
    IBizTree.prototype.setSize = function (width, height) {
    };
    IBizTree.prototype.setCatalog = function (catalog) {
    };
    /**
     * 加载
     *
     * @param {*} [opt]
     * @memberof IBizTree
     */
    IBizTree.prototype.load = function (opt) {
        var _this = this;
        var param = {
            srfnodeid: _this.node.id ? _this.node.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(_this.getViewController().getViewParam()),
            srfctrlid: _this.getName()
        };
        if (opt) {
            Object.assign(param, opt);
        }
        _this.fire(IBizMDControl.BEFORELOAD, param);
        _this.iBizHttp.post(_this.getBackendUrl(), param).subscribe(function (result) {
            if (result.ret !== 0) {
                _this.iBizNotification.error('错误', result.info);
                return;
            }
            _this.items = _this.formatDatas(result.items).slice();
            _this.fire(IBizTree.CONTEXTMENU, _this.items);
            console.log(result);
        }, function (error) {
            _this.iBizNotification.error('错误', error.info);
        });
    };
    /**
     * 获取选择节点数据
     *
     * bFull，true：返回的数据包含节点全部数据，false：返回的数组仅包含节点ID
     */
    IBizTree.prototype.getSelected = function (bFull) {
        return null;
    };
    /**
     * 重新加载
     *
     * @param {*} [node={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.reload = function (node) {
        if (node === void 0) { node = {}; }
    };
    /**
     * 格式化树数据
     *
     * @private
     * @param {Array<any>} datas
     * @returns {Array<any>}
     * @memberof IBizTree
     */
    IBizTree.prototype.formatDatas = function (datas) {
        datas.forEach(function (data) {
            data.label = data.text;
        });
        return datas;
    };
    /**
     * 删除
     *
     * @param {*} [node={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.remove = function (node) {
        if (node === void 0) { node = {}; }
        var _this = this;
        var arg = { srfnodeid: node.id };
        Object.assign(arg, { srfaction: 'remove' });
        _this.beginLoading();
        _this.iBizHttp.post(_this.getBackendUrl(), arg).subscribe(function (data) {
            _this.endLoading();
            if (data.ret === 0) {
                _this.tableselection = null;
                _this.tableselections = {};
                _this.reload(node.parent);
                if (data.info && data.info != '') {
                    // IBiz.alert($IGM('IBIZTREE.REMOVE.TITLE', '删除成功'), $IGM('IBIZTREE.REMOVE.INFO', '删除数据成功,' + data.info, [data.info]), 1);
                    _this.iBizNotification.success('删除成功', "\u5220\u9664\u6570\u636E\u6210\u529F" + data.info);
                }
                IBizUtil.processResult(data);
            }
            else {
                // IBiz.alert($IGM('IBIZTREE.REMOVE.TITLE2', '删除失败'), $IGM('IBIZTREE.REMOVE.INFO2', '删除数据失败,' + data.info, [data.info]), 2);
                _this.iBizNotification.error('删除失败', "\u5220\u9664\u6570\u636E\u5931\u8D25" + data.info);
            }
        }, function (error) {
            _this.endLoading();
            // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), $IGM('IBIZTREE.AJAX.INFO', '执行请求发生异常'), 2);
            _this.iBizNotification.warning('警告', '执行请求发生异常');
        });
        ;
    };
    /**
     * 操作界面行为
     *
     * @param {*} [params={}]
     * @returns {Subject<any>}
     * @memberof IBizTree
     */
    IBizTree.prototype.doUIAction = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var subject = new rxjs.Subject();
        if (params) {
            params = {};
        }
        Object.assign(params, { srfaction: 'uiaction' });
        _this.beginLoading();
        _this.iBizHttp.post(_this.getBackendUrl(), params).subscribe(function (data) {
            _this.endLoading();
            if (data.ret === 0) {
                if (data.reloadData) {
                    // _this.refresh();
                }
                if (data.info && data.info != '') {
                    // IBiz.alert($IGM('IBIZTREE.DOUIACTION.TITLE', '操作成功'), $IGM('IBIZTREE.DOUIACTION.INFO', '操作成功,' + data.info, [data.info]), 1);
                    _this.iBizNotification.success('操作成功', "\u64CD\u4F5C\u6210\u529F" + data.info);
                }
                IBizUtil.processResult(data);
                subject.next(data);
            }
            else {
                // IBiz.alert($IGM('IBIZTREE.DOUIACTION.TITLE2', '操作失败'), $IGM('IBIZTREE.DOUIACTION.INFO2', '操作失败,执行操作发生错误,' + data.info, [data.info]), 2);
                _this.iBizNotification.error('操作失败', "\u64CD\u4F5C\u5931\u8D25,\u6267\u884C\u64CD\u4F5C\u53D1\u751F\u9519\u8BEF," + data.info);
                subject.error(data);
            }
        }, function (error) {
            _this.endLoading();
            // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), $IGM('IBIZTREE.AJAX.INFO', '执行请求发生异常'), 2);
            _this.iBizNotification.warning('警告', '执行请求发生异常');
            subject.error(error);
        });
        return subject;
    };
    /**
     * 节点选中
     *
     * @param {*} [data={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.nodeSelect = function (data) {
        if (data === void 0) { data = {}; }
        console.log(data);
        this.fire(IBizTree.SELECTIONCHANGE, [data]);
    };
    /*****************事件声明************************/
    /**
     * 选择变化
     *
     * @static
     * @memberof IBizTree
     */
    IBizTree.SELECTIONCHANGE = "SELECTIONCHANGE";
    /**
     * 上下文菜单
     *
     * @static
     * @memberof IBizTree
     */
    IBizTree.CONTEXTMENU = "CONTEXTMENU";
    return IBizTree;
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
 * 树导航栏
 *
 * @class IBizTreeExpBar
 * @extends {IBizControl}
 */
var IBizTreeExpBar = /** @class */ (function (_super) {
    __extends(IBizTreeExpBar, _super);
    /**
     * Creates an instance of IBizTreeExpBar.
     * 创建 IBizTreeExpBar 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeExpBar
     */
    function IBizTreeExpBar(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.tree = null;
        _this_1.tabctrl = null;
        _this_1.treeCfg = {};
        _this_1.expframe = null;
        _this_1.pvpanel = null;
        var viewController = _this_1.getViewController();
        if (viewController) {
            viewController.on(IBizViewController.INITED).subscribe(function () {
                var tree = viewController.controls.get(_this_1.getName() + '_tree');
                _this_1.tree = tree;
                if (_this_1.tree) {
                    _this_1.tree.on(IBizTree.SELECTIONCHANGE).subscribe(function (args) {
                        _this_1.onTreeSelectionChange(args);
                    });
                    _this_1.tree.on(IBizTree.CONTEXTMENU).subscribe(function (args) {
                        _this_1.onTreeContextMenu(args);
                    });
                    _this_1.tree.load({});
                }
            });
        }
        return _this_1;
    }
    ;
    ;
    ;
    IBizTreeExpBar.prototype.setSize = function (width, height) {
    };
    /**
     * 获取树部件
     *
     * @returns {IBizTree}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getTree = function () {
        return this.tree;
    };
    /**
     * 设置分页部件
     *
     * @param {*} tabctrl
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.setExpTab = function (tabctrl) {
        this.tabctrl = tabctrl;
    };
    /**
     * 获取分页部件
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getExpTab = function () {
        return this.tabctrl;
    };
    IBizTreeExpBar.prototype.getTreeCfg = function () {
        return this.treeCfg || {};
    };
    IBizTreeExpBar.prototype.getExpFrame = function () {
        return this.expframe;
    };
    IBizTreeExpBar.prototype.getPVPanel = function () {
        return this.pvpanel;
    };
    IBizTreeExpBar.prototype.onTreeSelectionChange = function (records) {
        var _this = this;
        if (records == null || records.length == 0)
            return;
        var record = records[0];
        // if (!record.original)
        //     return;
        // var tag = record.original.tag;
        // if (!tag || !(tag.srfnodetype))
        //     return;
        var tag = record;
        //替换键值
        var nodeids = record.id.split(';');
        var nodetext = record.text;
        var controller = _this.getViewController();
        if (_this.getExpTab()) {
            var viewarg = { viewid: tag.srfnodetype };
            var viewItem = controller.getExpItemView(viewarg);
            if (viewItem == null)
                return;
            var layoutcard = _this.getExpTab();
            var itemid = layoutcard.id + '_' + tag.srfnodetype;
            layoutcard.setActiveItem(itemid);
            var viewParam = {};
            if (viewItem.viewparam) {
                // $.extend(viewParam, viewItem.viewparam);
                Object.assign(viewParam, viewItem.viewparam);
            }
            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }
            // var subController = controller.getController(controller.getCId2() + viewItem.embedviewid);
            // layoutcard.setActiveSubController(subController);
            // if (!subController.isInited()) {
            //     subController.asyncInit({ parentData: viewParam, renderTo: itemid, subApp: viewItem.subapp });
            //     return;
            // }
            // subController.setParentData(viewParam);
            // subController.refresh();
            this.fire(IBizTreeExpBar.SELECTIONCHANGE, { viewid: record.srfnodetype, viewParam: viewParam });
            return;
        }
        if (_this.getPVPanel()) {
            // var viewarg = { nodetype: tag.srfnodetype };
            Object.assign(viewarg, { nodetype: tag.srfnodetype });
            // var viewParam = controller.getNavViewParam(viewarg);
            Object.assign(viewParam, controller.getNavViewParam(viewarg));
            if (viewParam == null)
                return;
            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }
            _this.getPVPanel().setParentData(viewParam);
            return;
        }
        if (_this.getExpFrame()) {
            var viewarg = { viewid: tag.srfnodetype };
            var viewItem = controller.getExpItemView(viewarg);
            if (viewItem == null)
                return;
            var viewParam = {};
            if (viewItem.viewparam) {
                // $.extend(viewParam, viewItem.viewparam);
                Object.assign(viewParam, viewItem.viewparam);
            }
            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }
            // var url = $.getIBizApp().parseURL(BASEURL, viewItem.viewurl, {});
            // url += "&" + $.param({ 'srfifchild': true, 'srfparentdata': JSON.stringify(viewParam) });
            // _this.getExpFrame().attr("src", url);
            return;
        }
    };
    IBizTreeExpBar.prototype.onTreeContextMenu = function (params) {
        var _this = this;
        var node = params.node;
    };
    IBizTreeExpBar.prototype.fetchCat = function (backendurl, arg) {
    };
    /*****************事件声明************************/
    /**
     * 树导航部件选中
     *
     * @static
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.SELECTIONCHANGE = 'SELECTIONCHANGE';
    return IBizTreeExpBar;
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
        var _this_1 = this;
        if (params === void 0) { params = {}; }
        _super.prototype.init.call(this, params);
        var appmenu = this.getAppMenu();
        if (appmenu) {
            // 部件加载之前
            appmenu.on(IBizAppMenu.BEFORELOAD).subscribe(function (params) {
            });
            // 部件加载完成
            appmenu.on(IBizAppMenu.LOAD).subscribe(function (items) {
            });
            // 部件选中
            appmenu.on(IBizAppMenu.SELECTION).subscribe(function (item) {
                _this_1.appMenuSelection(item);
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
    /**
     * 菜单项选中
     *
     * @param {*} [item={}]
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.appMenuSelection = function (item) {
        if (item === void 0) { item = {}; }
        var _this = this;
        _this.$router.push({ name: item.viewname, query: item.openviewparam });
    };
    return IBizIndexViewController;
}(IBizMianViewController));

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
 * 表格视图控制器对象
 *
 * @class IBizMDViewController
 * @extends {IBizMianViewController}
 */
var IBizMDViewController = /** @class */ (function (_super) {
    __extends(IBizMDViewController, _super);
    /**
     * Creates an instance of IBizMDViewController.
     * 创建 IBizMDViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizMDViewController
     */
    function IBizMDViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.bQuickSearch = true;
        _this_1.currentDataKey = null;
        _this_1.parentDataChanged = false;
        _this_1.multiSelect = false;
        _this_1.quickSearch = null;
        _this_1.quickSearchEntityDEFields = [];
        var _this = _this_1;
        return _this_1;
    }
    IBizMDViewController.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        _super.prototype.init.call(this, params);
        var _this = this;
        _this.parentDataChanged = false;
        var mdctrl = this.getMDCtrl();
        if (mdctrl) {
            // 多数据部件选中变化
            mdctrl.on(IBizMDControl.SELECTIONCHANGE).subscribe(function (args) {
                _this.onSelectionChange(args);
                if (_this.getGridRowActiveMode() === 1) {
                    _this.onDataActivated(args[0]);
                }
            });
            //  多数据部件加载之前
            mdctrl.on(IBizMDControl.BEFORELOAD).subscribe(function (args) {
                _this.onStoreBeforeLoad(args);
            });
            // 多数据部件加载完成
            mdctrl.on(IBizMDControl.LOADED).subscribe(function (args) {
                _this.onStoreLoad(args);
            });
            // 多数据部件编辑状态改变
            mdctrl.on(IBizDataGrid.CHANGEEDITSTATE).subscribe(function (args) {
                _this.onGridRowEditState(args);
            });
            // 多数据部件删除完成
            mdctrl.on(IBizDataGrid.REMOVED).subscribe(function (args) {
                _this.onStoreRemove(args);
            });
        }
        if (_this.getParentMode()) {
            _this.doHideParentColumns(_this.getParentMode());
        }
        var searchform = this.getSearchForm();
        if (searchform) {
            // searchform.on(IBizSearchForm.FORMSEARCHED, function (sender, args, e) {
            //     _this.onSearchFormSearched();
            // } _this);
            // searchform.on(IBizForm.FORMLOADED, function (sender, args, e) {
            //     if (_this.config.loaddefault != undefined && _this.config.loaddefault)
            //         _this.onSearchFormReseted();
            // } _this);
            // searchform.on(IBizSearchForm.FORMRESETED, function (sender, args, e) {
            //     _this.onSearchFormReseted();
            // } _this);
            // searchform.on(IBizSearchForm.FORMCONTRACT, function (sender, args, e) {
            //     _this.onSearchFormOpen(args);
            // } _this);
            // searchform.on(IBizForm.FORMFIELDCHANGED, function (sender, args, e) {
            //     var fieldname = '';
            //     if (sender != null) fieldname = sender.getName();
            //     if (!args) args = {};
            //     _this.onSearchFormFieldChanged(fieldname, sender, args.newvalue, args.oldvalue);
            // } _this);
        }
        // var searchform = this.getSearchForm();
        // if (searchform) {
        //     searchform.init();
        //     searchform.autoLoad(_this.viewparam);
        //     if (_this.hasQuickSearch() == true) {
        //         searchform.close();
        //     }
        //     else {
        //         searchform.open();
        //     }
        // }
        // _this.doLayout();
    };
    IBizMDViewController.prototype.onInit = function () {
        var _this_1 = this;
        _super.prototype.onInit.call(this);
        var _this = this;
        var searchform = this.getSearchForm();
        if (searchform) {
            searchform.init();
            searchform.autoLoad(_this.viewparam);
            if (_this.hasQuickSearch() == true) {
                searchform.close();
            }
            else {
                searchform.open();
            }
        }
        var _window = window;
        ;
        var iBizApp = _window.getIBizApp();
        _this.refreshViewEvent = iBizApp.onRefreshView();
        _this.refreshViewEvent.subscribe(function (data) {
            if (data && Object.is(data.openerid, _this_1.getId())) {
                _this.refresh();
            }
        });
        // //初始化快速搜索
        // if(_this.hasHtmlElement('searchcond'))
        // {
        // 	_this.bQuickSearch = true;
        // 	_this.quickSearch = $('#'+this.getCId2()+'searchcond');
        // }
        // if(_this.quickSearch){
        // 	_this.quickSearch.keyup(function() {
        //         if (event.keyCode == "13") {
        //         	_this.onSearchFormSearched();
        //         }
        //     });
        // }
        // _this.quickSearchBtn = $('#'+this.getCId2()+'searchbutton');
        // if(_this.quickSearchBtn){
        // 	_this.quickSearchBtn.click(function(e){
        // 		_this.onSearchFormSearched();
        // 	});
        // }
        // _this.moreSearchBtn = $('#'+this.getCId2()+'moresearchbutton');
        // if(_this.moreSearchBtn){
        // 	_this.moreSearchBtn.click(function(e){
        // 		if(_this.searchform){
        // 			if(_this.searchform.isOpen() == true){
        // 				_this.searchform.close();
        // 			}else{
        // 				_this.searchform.open();
        // 			}
        // 			_this.doLayout();
        // 		}
        // 	});
        // }
        // //初始化搜索面板
        // if(_this.hasHtmlElement('searchform')){
        // 	var dataurl = _this.getBackendUrl()+'srfctrlid=searchform&SRFSUBAPP='+_this.subapp+'&';
        // 	var sfCfg = $.extend({id:this.getCId2()+'searchform',url:dataurl,ctrler: _this}_this.config.ctrls.searchForm);
        // 	_this.searchform = _this.createSearchForm(sfCfg);
        // 	_this.registerItem('searchform',_this.searchform);
        // 	_this.searchform.on(IBizSearchForm.FORMSEARCHED, function(sender, args, e) {
        // 		_this.onSearchFormSearched();
        // 	} _this);
        // 	_this.searchform.on(IBizForm.FORMLOADED, function(sender, args, e) {
        // 		if(_this.config.loaddefault != undefined && _this.config.loaddefault)
        // 			_this.onSearchFormReseted();
        // 	} _this);
        // 	_this.searchform.on(IBizSearchForm.FORMRESETED, function(sender, args, e) {
        // 			_this.onSearchFormReseted();
        // 	} _this);
        // 	_this.searchform.on(IBizSearchForm.FORMCONTRACT, function(sender, args, e) {
        // 		_this.onSearchFormOpen(args);
        // 	} _this);
        // 	_this.searchform.on(IBizForm.FORMFIELDCHANGED, function(sender, args, e) {
        // 		var fieldname = '';
        // 		if (sender != null) fieldname = sender.getName();
        // 		if (!args) args = {};
        // 		_this.onSearchFormFieldChanged(fieldname, sender, args.newvalue, args.oldvalue);
        // 	} _this);
        // }
    };
    /**
     * 视图销毁 已订阅的视图刷新设置
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        var _this = this;
        // _this.refreshViewEvent.unsubscribe();
    };
    IBizMDViewController.prototype.hasQuickSearch = function () {
        var _this = this;
        return _this.bQuickSearch;
    };
    IBizMDViewController.prototype.onStoreRemove = function (args) {
    };
    /**
     * 搜索表单展开
     */
    IBizMDViewController.prototype.onSearchFormOpen = function (args) {
        if (args === void 0) { args = {}; }
    };
    /**
     * 获取搜索表单对象
     */
    IBizMDViewController.prototype.getSearchForm = function () {
        return this.controls.get('searchform');
    };
    IBizMDViewController.prototype.getAllData = function () {
        var _this = this;
        if (_this.getMDCtrl()) {
            return _this.getMDCtrl().getAllData();
        }
        return [];
    };
    /**
     * 搜索表单属性值发生变化
     */
    IBizMDViewController.prototype.onSearchFormFieldChanged = function (fieldname, field, value) {
        var _this = this;
    };
    /**
     * 数据加载之前
     */
    IBizMDViewController.prototype.onStoreBeforeLoad = function (args) {
        if (args === void 0) { args = {}; }
        var _this = this;
        var fetchParam = {};
        if (_this.viewparam) {
            // $.extend(fetchParam,_this.viewparam);
            Object.assign(fetchParam, _this.viewparam);
        }
        if (_this.getParentMode()) {
            // $.extend(fetchParam, _this.getParentMode());
            Object.assign(fetchParam, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(fetchParam, _this.getParentData());
            Object.assign(fetchParam, _this.getParentData());
        }
        if ((_this.getSearchCond() && _this.getSearchForm().isOpen()) || !_this.hasQuickSearch()) {
            // $.extend(fetchParam, _this.getSearchCond());
            Object.assign(fetchParam, _this.getSearchCond());
        }
        //是否有自定义查询
        if (_this.getSearchForm() && _this.getSearchForm().isCustomSearch()) {
            // $.extend(fetchParam, _this.searchform.getCustomSearchVal());
            Object.assign(fetchParam, _this.getSearchForm().getCustomSearchVal());
        }
        //获取快速搜索里的搜索参数
        if (_this.hasQuickSearch() && _this.quickSearch) {
            // args['search'] = _this.quickSearch.val();
            Object.assign(args, { search: _this.quickSearch });
        }
        // $.extend(args, fetchParam,{ srfaction: 'fetch',SRFSUBAPP:_this.subapp });
        Object.assign(args, fetchParam, { srfaction: 'fetch' });
    };
    /**
     * 数据加载之前
     */
    IBizMDViewController.prototype.onStoreLoad = function (args) {
        var _this = this;
        var lastActive = null;
        if (_this.currentDataKey != null && _this.currentDataKey != '' && args && args.items) {
            args.items.some(function (record) {
                if (record.srfkey == _this.currentDataKey) {
                    lastActive = record;
                    return true;
                }
            });
        }
        if (lastActive) {
            _this.getMDCtrl().setSelection(lastActive);
            _this.calcToolbarItemState(true, lastActive.srfdataaccaction);
        }
        else {
            _this.currentDataKey = null;
            _this.fire(IBizMDViewController.SELECTIONCHANGE, []);
            _this.calcToolbarItemState(false);
        }
        _this.fire(IBizMDViewController.DATALOADED, _this);
        _this.parentDataChanged = false;
        _this.reloadUICounters();
    };
    /**
     * 数据被激活<最典型的情况就是行双击>
     * @param record 记录
     * @param e 事件
     */
    IBizMDViewController.prototype.onDataActivated = function (record) {
        if (record === void 0) { record = {}; }
        var _this = this;
        if (!record || !record.srfkey) {
            return;
        }
        _this.fire(IBizMDViewController.DATAACTIVATED, [record]);
        _this.currentDataKey = record.srfkey;
        _this.calcToolbarItemState(true, record.srfdataaccaction);
        _this.onEditData({ data: record });
    };
    /**
     * 行选择变化
     * @param sender 来源
     * @param selected 选中数据
     */
    IBizMDViewController.prototype.onSelectionChange = function (selected) {
        var _this = this;
        if (selected == null || selected.length == 0) {
            _this.currentDataKey = null;
        }
        else {
            _this.currentDataKey = selected[0].srfkey;
        }
        _this.fire(IBizMDViewController.SELECTIONCHANGE, selected);
        _this.calcToolbarItemState(_this.currentDataKey != null, (_this.currentDataKey != null) ? selected[0].srfdataaccaction : null);
    };
    /**
     * 改变工具栏启用编辑按钮信息
     */
    IBizMDViewController.prototype.onGridRowEditState = function (args) {
        // var _this = this;
        // var editButton = null;
        // var submitButton = null;
        // if (this.toolbar && this.toolbar.items) {
        // 	$.each(this.toolbar.items, function(index, ele) {
        // 		if(ele.attr("data-ibiz-tag")=="NewRow")
        // 			submitButton = ele;
        // 		if(ele.attr("data-ibiz-tag")=="ToggleRowEdit")
        // 			editButton = ele;
        // 		if(ele.attr("data-ibiz-tag")=="Edit") {
        // 			if(args.state) {
        // 				ele.addClass("hidden");
        // 			} else {
        // 				ele.removeClass("hidden");
        // 			}
        // 		}
        // 	});
        // }
        // _this.isInGridRowEdit=args.state;
        // if(editButton){
        // 	if(!args.state){
        // 		editButton.find("span").html($IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE','启用编辑'));
        // 	}else{
        // 		editButton.find("span").html($IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE2','关闭编辑'));
        // 	}
        // }
        // if(submitButton)
        // 	submitButton[0].disabled = !args.state;
        if (args === void 0) { args = {}; }
        // _this.doLayout();
    };
    /**
     * 表单权限发生变化
     */
    IBizMDViewController.prototype.onDataAccActionChange = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        var _this = this;
        if (_this.getToolbar()) {
            _this.getToolbar().updateAccAction(dataaccaction);
        }
        // if(_this.mintoolbar)
        // 	_this.mintoolbar.updateAccAction(dataaccaction);
        // if(_this.floattoolbar)
        // 	_this.floattoolbar.updateAccAction(dataaccaction);
    };
    /**
     * 新建数据
     */
    IBizMDViewController.prototype.onNewData = function () {
        var _this = this;
        var loadParam = {};
        if (_this.getViewParam()) {
            // $.extend(loadParam, _this.getViewParam());
            Object.assign(loadParam, _this.getViewParam());
        }
        if (_this.getParentMode()) {
            // $.extend(loadParam, _this.getParentMode());
            Object.assign(loadParam, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(loadParam, _this.getParentData());
            Object.assign(loadParam, _this.getParentData());
        }
        // if(_this.isInGridRowEdit){
        // 	_this.doNewRow(loadParam);
        // 	return;
        // }
        if (_this.isEnableBatchAdd()) {
            _this.doNewDataBatch(loadParam);
            return;
        }
        if (_this.doNewDataWizard(loadParam)) {
            return;
        }
        _this.doNewDataNormal(loadParam);
    };
    /**
     * 批量新建
     */
    IBizMDViewController.prototype.doNewDataBatch = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var mpickupview = _this.getMPickupView(arg);
        // if (mpickupview){
        // 	var win = $.getIBizApp().createWindow({});
        // 	var viewparam = {};
        // 	$.extend(viewparam, mpickupview.viewparam);
        // 	if(!viewparam.srfreferdata){
        // 		if(viewparam.srfparentdata)
        // 		{
        // 			viewparam.srfreferdata = viewparam.srfparentdata;
        // 			delete viewparam.srfparentdata;
        // 		}
        // 	}
        // 	viewparam['windowid'] = win.getId();
        // 	viewparam['openerid'] = _this.getId();
        // 	win.title = mpickupview.title;
        // 	win.scope = _this;
        // 	win.height = mpickupview.height?mpickupview.height:0;
        // 	win.width = mpickupview.width?mpickupview.width:0;
        // 	win.url = $.getIBizApp().parseURL2(mpickupview.subapp,mpickupview.viewurl,{windowid:win.getId(),openerid:_this.getId()});
        // 	win.viewparam = viewparam;
        // 	win.callback =  _this.onMPickupWindowClose;
        // 	if(mpickupview.modal){
        // 		 win.openModal(window);
        // 	}else{
        // 		 win.openInNewWindow(window);
        // 	}
        //     return true;
        // }
        return false;
    };
    /**
     * 批量新建关闭
     */
    IBizMDViewController.prototype.onMPickupWindowClose = function (win) {
        var _this = win.scope;
        var loadParam = win.userData;
        var dialogResult = win.dialogResult;
        if (!dialogResult)
            return;
        if (dialogResult == 'ok') {
            var selectedDatas = win.selectedDatas;
            if (!selectedDatas) {
                return;
            }
            _this.addDataBatch(selectedDatas);
        }
        return;
    };
    /**
     * 批量添加数据
     */
    IBizMDViewController.prototype.addDataBatch = function (selectedDatas) {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.ADDDATABATCH.INFO','[addDataBatch]方法必须重写！'),2);
        this.iBizNotification.warning('警告', '[addDataBatch]方法必须重写！');
    };
    /**
     * 向导新建数据
     */
    IBizMDViewController.prototype.doNewDataWizard = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var wizardview = _this.getNewDataWizardView(arg);
        // if (wizardview != null) {
        // 	var win = $.getIBizApp().createWindow({});
        // 	var viewparam = {};
        // 	viewparam['windowid'] = win.getId();
        // 	viewparam['openerid'] = _this.getId();
        // 	win.title = wizardview.title;
        // 	win.scope = _this;
        // 	win.height = wizardview.height?wizardview.height:0;
        // 	win.width = wizardview.width?wizardview.width:0;
        // 	win.url = $.getIBizApp().parseURL2(wizardview.subapp,wizardview.viewurl,{windowid:win.getId(),openerid:_this.getId()});
        // 	win.viewparam = viewparam;
        // 	win.callback =  _this.onNewDataWizardWindowClose;
        //     if(wizardview.modal){
        // 	 	win.openModal(window);
        // 	}else{
        // 		win.openInNewWindow(window);
        // 	}
        //     return true;
        // }
        return false;
    };
    /**
     * 向导新建数据窗口关闭
     */
    IBizMDViewController.prototype.onNewDataWizardWindowClose = function (win, eOpts) {
        var _this = win.scope;
        var loadParam = {}; //win.userData;
        var dialogResult = win.dialogResult;
        if (!dialogResult)
            return;
        if (dialogResult == 'ok') {
            var selectedData = win.selectedData;
            if (selectedData) {
                var newMode = selectedData.srfkey;
                loadParam.srfnewmode = newMode;
                var view = _this.getNewDataView(loadParam);
                if (view == null) {
                    return;
                }
                _this.openDataView(view);
            }
        }
        return;
    };
    /**
     * 常规新建数据
     */
    IBizMDViewController.prototype.doNewDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var view = _this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        return _this.openDataView(view);
    };
    /**
     * 编辑数据
     */
    IBizMDViewController.prototype.onEditData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var loadParam = {};
        if (_this.getViewParam()) {
            // $.extend(loadParam, _this.getViewParam());
            Object.assign(loadParam, _this.getViewParam());
        }
        if (this.getParentMode()) {
            // $.extend(loadParam, _this.getParentMode());
            Object.assign(loadParam, _this.getParentMode());
        }
        if (this.getParentData()) {
            // $.extend(loadParam, _this.getParentData());
            Object.assign(loadParam, _this.getParentData());
        }
        if (arg.srfcopymode) {
            // $.extend(loadParam, { srfsourcekey: arg.data.srfkey });
            Object.assign(loadParam, { srfsourcekey: arg.data.srfkey });
        }
        else {
            // $.extend(loadParam, {srfkey: arg.data.srfkey});
            Object.assign(loadParam, { srfkey: arg.data.srfkey });
        }
        var editMode = _this.getEditMode(arg.data);
        if (editMode) {
            // loadParam.srfeditmode = editMode;
            Object.assign(loadParam, { srfeditmode: editMode });
        }
        if (arg.data.srfmstag) {
            // loadParam.srfeditmode2 = arg.data.srfmstag;
            Object.assign(loadParam, { srfeditmode2: arg.data.srfmstag });
        }
        // loadParam.openerid = _this.getId();
        Object.assign(loadParam, { openerid: _this.getId() });
        _this.doEditDataNormal(loadParam);
    };
    /**
     * 执行常规编辑数据
     */
    IBizMDViewController.prototype.doEditDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var view = _this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        return _this.openDataView(view);
    };
    /**
     * 打开数据视图
     */
    IBizMDViewController.prototype.openDataView = function (view) {
        if (view === void 0) { view = {}; }
        var _this = this;
        var openMode = view.openMode;
        if (openMode != undefined) {
            if (openMode == 'POPUPMODAL') {
                view.modal = true;
            }
            else if (openMode == 'POPUP') {
                view.modal = true;
            }
            else if (openMode == '' || openMode == 'INDEXVIEWTAB') {
                view.modal = false;
            }
        }
        if (_this.isShowModal()) {
            view.modal = true;
        }
        var url_datas = [];
        var params_names = Object.keys(view.viewparam);
        params_names.forEach(function (name) {
            if (name && view.viewparam[name] && !Object.is(view.viewparam[name], '')) {
                url_datas.push(name + "=" + view.viewparam[name]);
            }
        });
        var url = "/" + IBizEnvironment.SysName + "/" + IBizEnvironment.BaseUrl.toLowerCase() + view.viewurl;
        if (url_datas.length > 0) {
            url = url + "?" + url_datas.join('&');
        }
        var _window = window;
        ;
        _window.open(url, '_blank');
        // let iBizApp:IBizApp = _window.getIBizApp();
        // iBizApp.refreshView().subscribe(data => {
        //     _this.refresh();
        // });
        // let opener = win.opener;
        // if (opener.getIBizApp()) {
        //     opener.getIBizApp().regPWindow(window);
        // }
        // var win = $.getIBizApp().createWindow({});
        // var viewparam = view.viewparam;
        // if(!viewparam){
        // 	viewparam = {};
        // }
        // viewparam['windowid'] = win.getId();
        // viewparam['openerid'] = _this.getId();
        // win.title = view.title;
        // win.scope = _this;
        // win.height = view.height?view.height:0;
        // win.width = view.width?view.width:0;
        // win.url = $.getIBizApp().parseURL2(view.subapp,view.viewurl,{windowid:win.getId(),openerid:_this.getId()});
        // win.viewparam = viewparam;
        // if(view.modal){
        // 	 win.openModal(window);
        // }else{
        // 	 win.openInNewWindow(window);
        // }
        return true;
    };
    /**
     * 获取编辑模式
     */
    IBizMDViewController.prototype.getEditMode = function (data) {
        if (data === void 0) { data = {}; }
        return data.srfdatatype;
    };
    /**
     * 获取编辑视图
     */
    IBizMDViewController.prototype.getEditDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    /**
     * 获取新建视图
     */
    IBizMDViewController.prototype.getNewDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    /**
     * 获取新建向导视图
     */
    IBizMDViewController.prototype.getNewDataWizardView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    /**
     * 获取多选视图
     */
    IBizMDViewController.prototype.getMPickupView = function (arg) {
        return null;
    };
    /**
     * 获取多数据对象
     */
    IBizMDViewController.prototype.getMDCtrl = function () {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.GETMDCTRL.INFO','[getMDCtrl]方法必须重写！'),2);
        this.iBizNotification.warning('警告', '[getMDCtrl]方法必须重写！');
        return null;
    };
    IBizMDViewController.prototype.isLoadDefault = function () {
        return true;
    };
    IBizMDViewController.prototype.isEnableBatchAdd = function () {
        return false;
    };
    IBizMDViewController.prototype.isBatchAddOnly = function () {
        return false;
    };
    IBizMDViewController.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        var _this = this;
        if (_this.getMDCtrl()) {
            _this.getMDCtrl().load();
        }
    };
    IBizMDViewController.prototype.onSetParentData = function () {
        _super.prototype.onSetParentData.call(this);
        var _this = this;
        _this.parentDataChanged = true;
    };
    IBizMDViewController.prototype.getSearchCond = function () {
        if (this.getSearchForm()) {
            return this.getSearchForm().getValues();
        }
        return null;
    };
    IBizMDViewController.prototype.onSearchFormSearched = function () {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    };
    IBizMDViewController.prototype.onSearchFormReseted = function () {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    };
    IBizMDViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        if (uiaction.tag == 'Help') {
            _this.doHelp(params);
            return;
        }
        if (uiaction.tag == 'Edit') {
            _this.doEdit(params);
            return;
        }
        if (uiaction.tag == 'View') {
            _this.doView(params);
            return;
        }
        if (uiaction.tag == 'Print') {
            _this.doPrint(params);
            return;
        }
        if (uiaction.tag == 'ExportExcel') {
            _this.doExportExcel(params);
            return;
        }
        if (uiaction.tag == 'ExportModel') {
            _this.doExportModel(params);
            return;
        }
        if (uiaction.tag == 'Copy') {
            _this.doCopy(params);
            return;
        }
        if (uiaction.tag == 'Remove') {
            _this.doRemove(params);
            return;
        }
        if (uiaction.tag == 'Import') {
            _this.doImport(params);
            return;
        }
        if (uiaction.tag == 'Refresh') {
            _this.doRefresh(params);
            return;
        }
        if (uiaction.tag == 'NewRow') {
            _this.doCheck(params);
            return;
        }
        if (uiaction.tag == 'New') {
            _this.doNew(params);
            return;
        }
        if (uiaction.tag == 'ToggleRowEdit') {
            _this.doToggleRowEdit(params);
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    IBizMDViewController.prototype.doToggleRowEdit = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().isOpenEdit) == 'function')
            _this.getMDCtrl().isOpenEdit(params);
    };
    IBizMDViewController.prototype.doNewRow = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().newRowAjax) == 'function')
            _this.getMDCtrl().newRowAjax(params);
    };
    IBizMDViewController.prototype.doCheck = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        if (_this.getMDCtrl() && typeof (_this.getMDCtrl().quitEdit) == 'function')
            _this.getMDCtrl().quitEdit();
    };
    IBizMDViewController.prototype.doHelp = function (params) {
        if (params === void 0) { params = {}; }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOHELP.INFO','帮助操作'),0);
        this.iBizNotification.warning('警告', '帮助操作');
    };
    /*编辑操作*/
    IBizMDViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        //获取要编辑的数据集合
        if (params && params.srfkey) {
            if (typeof _this.getMDCtrl().findItem === 'function') {
                params = _this.getMDCtrl().findItem('srfkey', params.srfkey);
            }
            var arg = { data: params };
            _this.onEditData(arg);
            return;
        }
        var selectedData = _this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length == 0)
            return;
        var arg = {
            data: selectedData[0]
        };
        _this.onEditData(arg);
    };
    /*查看操作*/
    IBizMDViewController.prototype.doView = function (params) {
        if (params === void 0) { params = {}; }
        this.doEdit(params);
    };
    /*打印操作*/
    IBizMDViewController.prototype.doPrint = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = {};
        var bSingle = true;
        var selectedData = _this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length == 0)) {
            var keys = '';
            if (bSingle) {
                keys = selectedData[0].srfkey;
            }
            else {
                selectedData.forEach(function (item) {
                    var key = item.srfkey;
                    if (keys != '')
                        keys += ';';
                    keys += key;
                });
            }
            arg.srfkeys = keys;
        }
        else
            return;
        _this.onPrintData(arg);
    };
    /*导出操作（Excel）*/
    IBizMDViewController.prototype.doExportExcel = function (params) {
        if (params === void 0) { params = {}; }
        if (params.itemtag == '') {
        }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOEXPORTEXCEL.INFO','导出操作（Excel）'),0);
        this.iBizNotification.warning('警告', '导出操作（Excel）');
    };
    /*导出数据模型*/
    IBizMDViewController.prototype.doExportModel = function (params) {
        if (params === void 0) { params = {}; }
        //IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOEXPORTMODEL.INFO','导出数据模型'),0);
        var _this = this;
        _this.iBizNotification.warning('警告', '导出数据模型');
        if (!params)
            params = {};
        params.srfaction = 'exportmodel';
        if (!params.srfkeys) {
            //获取要导出的数据集合
            var selectedData = _this.getMDCtrl().getSelection();
            if (selectedData == null || selectedData.length == 0)
                return;
            var keys = '';
            selectedData.forEach(function (record) {
                var key = record.srfkey;
                if (keys != '')
                    keys += ';';
                keys += key;
            });
            params.srfkeys = keys;
        }
        _this.getMDCtrl().customCall(params);
    };
    /*拷贝操作*/
    IBizMDViewController.prototype.doCopy = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        //获取要拷贝的数据集合
        var selectedData = _this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length == 0)
            return;
        var arg = {
            data: selectedData[0],
            srfcopymode: true
        };
        _this.onEditData(arg);
    };
    /*删除操作*/
    IBizMDViewController.prototype.doRemove = function (params) {
        if (params === void 0) { params = {}; }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOREMOVE.INFO','删除操作'),0);
        this.iBizNotification.warning('警告', '删除操作');
    };
    /*数据导入栏*/
    IBizMDViewController.prototype.doImport = function (params) {
        if (params === void 0) { params = {}; }
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN','警告'),$IGM('MDVIEWCONTROLLER.DOIMPORT.INFO','数据导入栏'),0);
        this.iBizNotification.warning('警告', '数据导入栏');
    };
    /*刷新操作*/
    IBizMDViewController.prototype.doRefresh = function (params) {
        if (params === void 0) { params = {}; }
        this.refresh();
    };
    /*新建操作*/
    IBizMDViewController.prototype.doNew = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.onNewData();
    };
    IBizMDViewController.prototype.doWFUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        if (uiaction.actionmode == 'WFBACKEND') {
            var selectedData = _this.getMDCtrl().getSelection();
            if (selectedData == null || selectedData.length == 0) {
                return;
            }
            var keys = '';
            selectedData.forEach(function (item) {
                var key = item.srfkey;
                if (keys != '')
                    keys += ';';
                keys += key;
            });
            _this.getMDCtrl().wfsubmit({ srfwfiatag: uiaction.tag, srfkeys: keys });
            return;
        }
        _super.prototype.doWFUIAction.call(this, uiaction, params);
    };
    IBizMDViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
        var _this = this;
        // _this.load();
    };
    /**
     * 获取UI操作参数
     */
    IBizMDViewController.prototype.getFrontUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = _super.prototype.getFrontUIActionParam.call(this, uiaction, params);
        if (_this.getParentMode()) {
            // $.extend(arg, _this.getParentMode());
            Object.assign(arg, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(arg, this.getParentData());
            Object.assign(arg, _this.getParentData());
        }
        var target = 'NONE';
        if (uiaction.actiontarget) {
            target = uiaction.actiontarget;
        }
        if (target != 'NONE') {
            if (params.hasOwnProperty('srfkey')) {
                // $.extend(arg,{srfkey:params.srfkey});
                Object.assign(arg, { srfkey: params.srfkey });
                return arg;
            }
            var selectedData = _this.getMDCtrl().getSelection();
            if (!(selectedData == null || selectedData.length == 0)) {
                var vlaueitem = "srfkey";
                var paramkey = "srfkeys";
                var paramjo = null;
                if (uiaction.actionparams) {
                    vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
                    paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
                    paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
                }
                if (target == 'SINGLEKEY') {
                    arg[paramkey] = selectedData[0][vlaueitem];
                }
                else if (target == 'SINGLEDATA') {
                    // $.extend(arg, selectedData[0]);
                    Object.assign(arg, selectedData[0]);
                }
                else if (target == 'MULTIKEY') {
                    var keys = '';
                    selectedData.forEach(function (item) {
                        var key = item[vlaueitem];
                        if (keys != '')
                            keys += ';';
                        keys += key;
                    });
                    arg[paramkey] = keys;
                }
                if (paramjo) {
                    Object.assign(arg, paramjo);
                }
            }
        }
        return arg;
    };
    IBizMDViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = {};
        if (_this.getParentMode()) {
            // $.extend(arg, _this.getParentMode());
            Object.assign(arg, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(arg, this.getParentData());
            Object.assign(arg, _this.getParentData());
        }
        var bSingle = false;
        if (uiaction.actiontarget == 'SINGLEKEY') {
            bSingle = true;
        }
        var selectedData = _this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length == 0)) {
            var keys = '';
            if (bSingle) {
                keys = selectedData[0].srfkey;
            }
            else {
                selectedData.forEach(function (item) {
                    var key = item.srfkey;
                    if (keys != '')
                        keys += ';';
                    keys += key;
                });
            }
            arg.srfkeys = keys;
        }
        return arg;
    };
    /*移动记录*/
    IBizMDViewController.prototype.moveRecord = function (target) {
        var _this = this;
        var store = _this.getMDCtrl().getStore();
        if (!store.isLoaded())
            return null;
        var nCount = store.getCount();
        var nIndex = 0;
        var nLastIndex = -1;
        var selectedData = _this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length == 0)) {
            nIndex = store.indexOf(selectedData[0]);
            nLastIndex = nIndex;
        }
        if (typeof target == 'string') {
            if (target == 'first')
                nIndex = 0;
            else if (target == 'prev')
                nIndex -= 1;
            else if (target == 'next')
                nIndex += 1;
            else if (target == 'last')
                nIndex = nCount - 1;
        }
        if (nIndex < 0 || nIndex >= nCount)
            return null;
        if (nIndex == nLastIndex)
            return null;
        var record = store.getAt(nIndex);
        _this.getMDCtrl().setSelection(record);
        return record;
    };
    IBizMDViewController.prototype.doBackendUIAction = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        _this.getMDCtrl().doUIAction(arg);
    };
    /*隐藏关系列*/
    IBizMDViewController.prototype.doHideParentColumns = function (parentMode) {
    };
    IBizMDViewController.prototype.onPrintData = function (arg) {
        var _this = this;
        _this.doPrintDataNormal(arg);
    };
    /**
     * 常规新建数据
     */
    IBizMDViewController.prototype.doPrintDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var view = _this.getPrintDataView(arg);
        // if (view == null){
        // 	return false;
        // }
        // var viewurl=view.viewurl;
        // if(!viewurl||viewurl==''){
        // 	viewurl = BASEURL+'/ibizutil/print.pdf';
        // }
        // else
        // {
        // 	viewurl = BASEURL+viewurl;
        // }
        // viewurl = viewurl + (viewurl.indexOf('?')==-1?'?':'&') + $.param(view.viewparam);
        // window.open(viewurl, '_blank');
        return true;
    };
    IBizMDViewController.prototype.getPrintDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    IBizMDViewController.prototype.isEnableMultiSelect = function () {
        return this.multiSelect;
    };
    IBizMDViewController.prototype.setEnableMultiSelect = function (multiSelect) {
        this.multiSelect = multiSelect;
    };
    /**
     * 获取表格行激活类型（默认双击）
     * @returns
     */
    IBizMDViewController.prototype.getGridRowActiveMode = function () {
        return 2;
    };
    /*****************事件声明************************/
    /**
     * 数据激活<例如：表格行双击>
     */
    IBizMDViewController.DATAACTIVATED = 'DATAACTIVATED';
    /**
     * 数据选择变化
     */
    IBizMDViewController.SELECTIONCHANGE = 'SELECTIONCHANGE';
    /**
     * 数据刷新完成
     */
    IBizMDViewController.DATALOADED = 'DATALOADED';
    return IBizMDViewController;
}(IBizMianViewController));

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
 * 表格视图控制器对象
 *
 * @class IBizGridViewController
 * @extends {IBizMDViewController}
 */
var IBizGridViewController = /** @class */ (function (_super) {
    __extends(IBizGridViewController, _super);
    /**
     * Creates an instance of IBizGridViewController.
     * 创建 IBizGridViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizGridViewController
     */
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
        var grid = this.getGrid();
        if (grid) {
            //  表格行双击
            grid.on(IBizDataGrid.ROWDBLCLICK).subscribe(function (args) {
                if (_this.getGridRowActiveMode() === 0) {
                    return;
                }
                _this.onDataActivated(args[0]);
            });
            // 表哥行单击
            grid.on(IBizDataGrid.ROWCLICK).subscribe(function (args) {
                _this.onSelectionChange(args);
                if (_this.getGridRowActiveMode() === 1) {
                    _this.onDataActivated(args[0]);
                }
            });
            // 表格行编辑行数据变化
            grid.on(IBizDataGrid.UPDATEGRIDITEMCHANGE).subscribe(function (args) {
                // _this.onGridRowChanged(args.dataIndx, args, args.newVal, args.oldVal);
            });
            // 表格批量添加
            grid.on(IBizDataGrid.ADDBATCHED).subscribe(function (args) {
                _this.onAddBatched(args);
            });
        }
    };
    /**
     * 执行初始化
     */
    IBizGridViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
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
    IBizGridViewController.prototype.onGridRowChanged = function () {
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
 * 编辑视图控制器对象
 *
 * @class IBizEditViewController
 * @extends {IBizMianViewController}
 */
var IBizEditViewController = /** @class */ (function (_super) {
    __extends(IBizEditViewController, _super);
    /**
     * Creates an instance of IBizEditViewController.
     * 创建 IBizEditViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizEditViewController
     */
    function IBizEditViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.afterformsaveaction = '';
        _this_1.lastwfuaparam = {};
        _this_1.lastwfuiaction = {};
        var _this = _this_1;
        return _this_1;
    }
    IBizEditViewController.prototype.init = function (params) {
        if (params === void 0) { params = {}; }
        _super.prototype.init.call(this, params);
        var _this = this;
        var form = this.getForm();
        if (form) {
            form.on(IBizForm.FORMSAVED).subscribe(function (args) {
                _this.onFormSaved(args);
            });
            form.on(IBizForm.FORMLOADED).subscribe(function (args) {
                _this.onFormLoaded();
            });
            form.on(IBizForm.FORMREMOVED).subscribe(function (args) {
                _this.onFormRemoved();
            });
            form.on(IBizForm.FORMWFSTARTED).subscribe(function (args) {
                _this.onFormWFStarted();
            });
            form.on(IBizForm.FORMWFSUBMITTED).subscribe(function (args) {
                _this.onFormWFSubmitted();
            });
            form.on(IBizEditForm.UIACTIONFINISHED).subscribe(function (args) {
                if (args.reloadData)
                    _this.refreshReferView();
                if (args.closeEditview)
                    _this.closeWindow();
            });
            form.on(IBizForm.FORMFIELDCHANGED).subscribe(function (args) {
                if (args) {
                    var fieldname = args.name;
                    // if (sender != null) fieldname = sender.getName();
                    if (!args)
                        args = {};
                    _this.onFormFieldChanged(fieldname, args.newvalue, args.oldvalue);
                }
                else {
                    _this.onFormFieldChanged(null, '', '');
                }
            });
            form.on(IBizForm.DATAACCACTIONCHANGE).subscribe(function (args) {
                _this.onDataAccActionChange(args);
            });
        }
        //是否弹出
    };
    IBizEditViewController.prototype.unloaded = function () {
        //判断表单是否修改了
        var _this = this;
        if (_this.getForm().isDirty()) {
            // return $IGM('EDITVIEWCONTROLLER.UNLOADED.INFO', "表单已经被修改是否关闭");
            return '表单已经被修改是否关闭';
        }
        return null;
    };
    IBizEditViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        var _this = this;
        var form = this.getForm();
        if (form) {
            form.init();
            form.autoLoad(Object.assign(_this.viewparam, _this.parentData));
        }
        this.initFloatToolbar();
    };
    // public createEditForm():void{
    // 	return IBiz.createEditForm(config);
    // }
    // public createDataInfoBar():void{
    // 	return IBiz.createDataInfoBar(config);
    // }
    /**
     * 表单权限发生变化
     */
    IBizEditViewController.prototype.onDataAccActionChange = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        var _this = this;
        if (_this.getToolbar())
            _this.getToolbar().updateAccAction(dataaccaction);
        // if (_this.mintoolbar)
        // 	_this.mintoolbar.updateAccAction(dataaccaction);
        // if (_this.floattoolbar)
        // 	_this.floattoolbar.updateAccAction(dataaccaction);
    };
    IBizEditViewController.prototype.onSetParentData = function () {
        var _this = this;
        if (_this.isInited() == true) {
            if (_this.parentData && this.getForm()) {
                var params = {};
                // var params = $.extend(_this.viewparam, _this.parentData);
                _this.getForm().autoLoad(Object.assign(_this.viewparam, _this.parentData));
            }
        }
    };
    /**
     * 获取表单对象
     */
    IBizEditViewController.prototype.getForm = function () {
        var _this = this;
        return _this.controls.get('form');
    };
    /**
     * 获取数据信息区对象
     */
    IBizEditViewController.prototype.getDataInfoBar = function () {
        var _this = this;
        return _this.controls.get('datainfobar');
    };
    /**
     * 表单保存完成
     */
    IBizEditViewController.prototype.onFormSaved = function (result) {
        if (result === void 0) { result = {}; }
        var _this = this;
        _this.refreshReferView();
        if (_this.afterformsaveaction == 'exit') {
            var window = _this.getWindow();
            if (window) {
                window.dialogResult = 'ok';
                window.activeData = _this.getForm().getValues();
            }
            _this.closeWindow();
            return;
        }
        if (_this.afterformsaveaction == 'new') {
            var arg = _this.getViewParam();
            if (arg == null || arg == undefined)
                arg = {};
            _this.getForm().loadDraft(arg);
            return;
        }
        if (_this.afterformsaveaction == 'dowfuiaction') {
            _this.afterformsaveaction = 'dowfuiactionok';
            _this.doWFUIAction(_this.lastwfuiaction, _this.lastwfuaparam);
            return;
        }
        if (_this.afterformsaveaction == 'startwf') {
            if (_this.srfwfstartmsgtag == 1 || _this.srfwfstartmsgtag == 3) {
                // IBiz.confirm(_this.srfwfstartmsg ? _this.srfwfstartmsg : "是否启动流程？", function (result) {
                // 	if (result) {
                // 		_this.startWF();
                // 	}
                // });
                _this.iBizNotification.confirm('', _this.srfwfstartmsg ? _this.srfwfstartmsg : "是否启动流程？").subscribe(function (result) {
                    if (result && Object.is(result, 'OK')) {
                        _this.startWF();
                    }
                });
            }
            else {
                _this.startWF();
            }
        }
        else {
            //判断是否已经出现过提示
            if (!result || !result.info) {
                // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), $IGM('EDITVIEWCONTROLLER.ONFORMSAVED.INFO', '数据保存成功！'), 1);
                _this.iBizNotification.success('信息', '数据保存成功！');
            }
        }
        _this.updateViewInfo();
    };
    IBizEditViewController.prototype.onFormLoaded = function () {
        var _this = this;
        _this.updateViewInfo();
    };
    IBizEditViewController.prototype.onFormWFStarted = function () {
        var _this = this;
        _this.refreshReferView();
        _this.closeWindow();
    };
    IBizEditViewController.prototype.onFormWFSubmitted = function () {
        var _this = this;
        _this.refreshReferView();
        _this.closeWindow();
    };
    IBizEditViewController.prototype.updateViewInfo = function () {
        var _this = this;
        var newdata = false;
        var field = _this.getForm().findField('srfuf');
        if (field != null) {
            newdata = field.getValue() != '1';
        }
        var dataAccAction = _this.getForm().getDataAccAction();
        _this.calcToolbarItemState(!newdata, dataAccAction);
        if (newdata) {
            // _this.setCaption('&lt;' + $IGM('EDITVIEWCONTROLLER.UPDATEVIEWINFO.CONTENT', '新建') + '&gt;');
            _this.setCaption('&lt;新建&gt;');
            if (_this.getDataInfoBar()) {
                // _this.getDataInfoBar().setCurrentData({
                // 	srfkey: '',
                // 	srfmajortext: '&lt;' + $IGM('EDITVIEWCONTROLLER.UPDATEVIEWINFO.CONTENT', '新建') + '&gt;'
                // });
                _this.getDataInfoBar().setCurrentData({
                    srfkey: '',
                    srfmajortext: '&lt;新建&gt;'
                });
            }
        }
        else {
            field = _this.getForm().findField('srfmajortext');
            if (field != null) {
                var value = field.getValue();
                value = IBizUtil.encodeString(value);
                _this.setCaption(value);
                if (_this.getDataInfoBar()) {
                    field = _this.getForm().findField('srfkey');
                    var keyvalue = field.getValue();
                    _this.getDataInfoBar().setCurrentData({
                        srfkey: keyvalue,
                        srfmajortext: value
                    });
                }
            }
        }
    };
    IBizEditViewController.prototype.onFormRemoved = function () {
        var _this = this;
        _this.refreshReferView();
        _this.closeWindow();
    };
    IBizEditViewController.prototype.onFormFieldChanged = function (fieldname, field, value) {
        var _this = this;
    };
    IBizEditViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        if (uiaction.tag == 'Help') {
            _this.doHelp();
            return;
        }
        if (uiaction.tag == 'SaveAndStart') {
            _this.doSaveAndStart();
            return;
        }
        if (uiaction.tag == 'SaveAndExit') {
            _this.doSaveAndExit();
            return;
        }
        if (uiaction.tag == 'SaveAndNew') {
            _this.doSaveAndNew();
            return;
        }
        if (uiaction.tag == 'Save') {
            _this.doSave();
            return;
        }
        if (uiaction.tag == 'Print') {
            _this.doPrint();
            return;
        }
        if (uiaction.tag == 'Copy') {
            _this.doCopy();
            return;
        }
        if (uiaction.tag == 'RemoveAndExit') {
            _this.doRemoveAndExit();
            return;
        }
        if (uiaction.tag == 'Refresh') {
            _this.doRefresh();
            return;
        }
        if (uiaction.tag == 'New') {
            _this.doNew();
            return;
        }
        if (uiaction.tag == 'FirstRecord') {
            _this.doMoveToRecord('first');
            return;
        }
        if (uiaction.tag == 'PrevRecord') {
            _this.doMoveToRecord('prev');
            return;
        }
        if (uiaction.tag == 'NextRecord') {
            _this.doMoveToRecord('next');
            return;
        }
        if (uiaction.tag == 'LastRecord') {
            _this.doMoveToRecord('last');
            return;
        }
        if (uiaction.tag == 'Exit' || uiaction.tag == 'Close') {
            _this.doExit();
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    IBizEditViewController.prototype.doHelp = function () {
        // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), $IGM('EDITVIEWCONTROLLER.DOHELP.INFO', '编辑界面_帮助操作！'), 5);
        var _this = this;
        _this.iBizNotification.info('信息', '编辑界面_帮助操作！');
    };
    IBizEditViewController.prototype.doSaveAndStart = function () {
        var _this = this;
        _this.afterformsaveaction = 'startwf';
        if (_this.getForm().findField("srfwfstartmsg"))
            _this.srfwfstartmsg = _this.getForm().findField("srfwfstartmsg").getValue();
        if (_this.getForm().findField("srfwfstartmsgtag") && !isNaN(parseInt(_this.getForm().findField("srfwfstartmsgtag").getValue())))
            _this.srfwfstartmsgtag = _this.getForm().findField("srfwfstartmsgtag").getValue();
        _this.saveData({});
    };
    IBizEditViewController.prototype.doSaveAndExit = function () {
        var _this = this;
        _this.afterformsaveaction = 'exit';
        var window = _this.getWindow();
        if (window) {
            window.dialogResult = 'cancel';
        }
        _this.saveData({});
    };
    IBizEditViewController.prototype.doSaveAndNew = function () {
        var _this = this;
        _this.afterformsaveaction = 'new';
        _this.saveData({});
    };
    IBizEditViewController.prototype.doSave = function () {
        var _this = this;
        _this.afterformsaveaction = '';
        _this.saveData({});
    };
    IBizEditViewController.prototype.doPrint = function () {
        var _this = this;
        var arg = {};
        arg.srfkey = '';
        var field = _this.getForm().findField('srforikey');
        if (field) {
            arg.srfkey = field.getValue();
        }
        if (arg.srfkey == undefined || arg.srfkey == '') {
            field = _this.getForm().findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
        }
        if (arg.srfkey == '')
            return;
        _this.onPrintData(arg);
    };
    IBizEditViewController.prototype.doCopy = function () {
        var _this = this;
        var arg = {};
        // $.extend(arg, _this.getViewParam());
        Object.assign(arg, _this.getViewParam());
        arg.srfkey = '';
        var field = _this.getForm().findField('srforikey');
        if (field) {
            arg.srfsourcekey = field.getValue();
        }
        if (arg.srfsourcekey == undefined || arg.srfsourcekey == '') {
            field = _this.getForm().findField('srfkey');
            if (field) {
                arg.srfsourcekey = field.getValue();
            }
        }
        if (arg.srfsourcekey == undefined || arg.srfsourcekey == '') {
            // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), $IGM('EDITVIEWCONTROLLER.DOCOPY.INFO', '当前表单未加载数据，不能拷贝'), 0);
            _this.iBizNotification.error('信息', '当前表单未加载数据，不能拷贝');
            return;
        }
        _this.getForm().autoLoad(arg);
    };
    IBizEditViewController.prototype.doRemoveAndExit = function () {
        var _this = this;
        // IBiz.confirm($IGM('EDITVIEW9CONTROLLERBASE.DOREMOVEANDEXIT.INFO', '确认要删除当前数据，删除操作将不可恢复？'), function (result) {
        // 	if (result) {
        // 		_this.removeData();
        // 	}
        // });
        _this.iBizNotification.confirm('', '确认要删除当前数据，删除操作将不可恢复？').subscribe(function (result) {
            if (result && Object.is(result, 'OK')) {
                _this.removeData();
            }
        });
    };
    IBizEditViewController.prototype.doRefresh = function () {
        // IBiz.alert('', $IGM('EDITVIEWCONTROLLER.DOREFRESH.INFO', '编辑界面_刷新操作！'), 0);
        var _this = this;
        _this.iBizNotification.info('', '编辑界面_刷新操作！');
    };
    IBizEditViewController.prototype.doNew = function () {
        // IBiz.alert('', $IGM('EDITVIEWCONTROLLER.DONEW.INFO', '编辑界面_新建操作！'), 0);
        var _this = this;
        _this.iBizNotification.info('', '编辑界面_新建操作！');
    };
    IBizEditViewController.prototype.doExit = function () {
        var _this = this;
        _this.closeWindow();
    };
    IBizEditViewController.prototype.saveData = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg)
            arg = {};
        this.getForm().save2(arg);
    };
    IBizEditViewController.prototype.removeData = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg)
            arg = {};
        this.getForm().remove(arg);
    };
    IBizEditViewController.prototype.refreshReferView = function () {
        var _this = this;
        var _window = window;
        var iBizApp = _window.getIBizApp();
        if (!iBizApp) {
            return;
        }
        var parentWindow = iBizApp.getParentWindow();
        if (parentWindow) {
            var pWinIBizApp = parentWindow.getIBizApp();
            var viewparam = this.getViewParam();
            pWinIBizApp.fireRefreshView({ openerid: viewparam.openerid });
        }
        try {
            // if (_this.pagecontext) {
            // 	var openerid = _this.pagecontext.getParamValue('openerid');
            // 	var refreshitem = _this.pagecontext.getParamValue('srfrefreshitem');
            // 	var view = $.getIBizApp().getSRFController(openerid);
            // 	if (!view) {
            // 		if (window.opener && window.opener.window) {
            // 			if ($.isFunction(window.opener.window.getController)) {
            // 				view = window.opener.window.getController();
            // 			}
            // 		}
            // 	}
            // 	if (view) {
            // 		if (refreshitem && refreshitem != '') {
            // 			if ($.isFunction(view.refreshItem)) {
            // 				view.refreshItem(refreshitem);
            // 			}
            // 		}
            // 		else {
            // 			if ($.isFunction(view.refresh)) {
            // 				view.refresh();
            // 			}
            // 		}
            // 		return;
            // 	}
            // }
        }
        catch (e) {
        }
    };
    IBizEditViewController.prototype.updateFormItems = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        this.getForm().updateFormItems(arg);
    };
    IBizEditViewController.prototype.showCommandBar = function (bShow) {
        var _this = this;
        var toolbar = _this.getToolbar();
        if (toolbar && (toolbar.isHidden() == bShow)) {
            if (bShow) {
                toolbar.show();
            }
            else
                toolbar.hide();
        }
    };
    IBizEditViewController.prototype.doWFUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        if (_this.isEnableEditData()) {
            if (_this.afterformsaveaction != 'dowfuiactionok') {
                _this.afterformsaveaction = 'dowfuiaction';
                _this.lastwfuiaction = uiaction;
                _this.lastwfuaparam = params;
                _this.saveData({});
                return;
            }
            _this.afterformsaveaction = '';
            _this.lastwfuiaction = null;
            _this.lastwfuaparam = null;
        }
        if (uiaction.actionmode == 'WFBACKEND') {
            var arg = {
                srfwfiatag: uiaction.tag
            };
            _this.getForm().wfsubmit(arg);
            return;
        }
        _super.prototype.doWFUIAction.call(this, uiaction, params);
    };
    IBizEditViewController.prototype.startWF = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var startuiaction = _this.getUIAction('WFStartWizard');
        if ((startuiaction && _this.srfwfstartmsgtag == undefined) || (startuiaction && _this.srfwfstartmsgtag > 1)) {
            _this.doUIAction(startuiaction, {});
        }
        else {
            _this.getForm().wfstart(arg);
        }
    };
    IBizEditViewController.prototype.doMoveToRecord = function (target) {
        var _this = this;
        var referView = _this.getReferView();
        if (referView && referView.moveRecord) {
            var record = referView.moveRecord(target);
            if (record) {
                var loadParam = {};
                // $.extend(loadParam, {
                // 	srfkey: record.get('srfkey')
                // });
                Object.assign(loadParam, { srfkey: record.get('srfkey') });
                _this.getForm().autoLoad(loadParam);
            }
        }
    };
    IBizEditViewController.prototype.doBackendUIAction = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        _this.getForm().doUIAction(arg);
    };
    /**
     * 获取前台行为参数
     * @param uiaction 行为
     */
    IBizEditViewController.prototype.getFrontUIActionParam = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        var _this = this;
        var arg = _super.prototype.getFrontUIActionParam.call(this, uiaction);
        if (uiaction.actiontarget == 'SINGLEKEY' || uiaction.actiontarget == 'MULTIKEY') {
            var vlaueitem = "srfkey";
            var paramkey = "srfkeys";
            var paramjo = null;
            var paramitems = null;
            if (uiaction.actionparams) {
                vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
                paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
                paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
            }
            var dataInfo = '';
            var keys = '';
            var field = _this.getForm().findField('srforikey');
            if (field) {
                keys = field.getValue();
            }
            if (keys == undefined || keys == '') {
                field = _this.getForm().findField('srfkey');
                if (field) {
                    keys = field.getValue();
                }
                field = _this.getForm().findField(vlaueitem);
                if (field) {
                    paramitems = field.getValue();
                }
            }
            var data = { srfkeys: keys, srfkey: keys };
            data[paramkey] = (paramitems != null) ? paramitems : keys;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            return Object.assign(arg, data);
        }
        return arg;
    };
    IBizEditViewController.prototype.getBackendUIActionParam = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        var _this = this;
        if (uiaction.actiontarget == 'SINGLEKEY' || uiaction.actiontarget == 'MULTIKEY') {
            var vlaueitem = "srfkey";
            var paramkey = "srfkeys";
            var paramjo = null;
            var infoitem = 'srfmajortext';
            if (uiaction.actionparams) {
                vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
                paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
                infoitem = uiaction.actionparams.textitem ? uiaction.actionparams.textitem.toLowerCase() : infoitem;
                paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
            }
            var dataInfo = '';
            var keys = '';
            var field = _this.getForm().findField(vlaueitem);
            if (field) {
                keys = field.getValue();
            }
            field = _this.getForm().findField(infoitem);
            if (field) {
                dataInfo = field.getValue();
            }
            var data = { dataInfo: dataInfo };
            data[paramkey] = keys;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            return Object.assign(data, _this.getForm().getValues());
            //return {srfkeys: keys,dataInfo: dataInfo};
        }
        return {};
    };
    /**
     * 初始化浮动工具栏
     */
    IBizEditViewController.prototype.initFloatToolbar = function () {
        // var offset = 60;
        // var duration = 300;
        // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
        // 	$(window).bind("touchend touchcancel touchleave", function (e) {
        // 		if ($(this).scrollTop() > offset) {
        // 			$('.scroll-to-top').fadeIn(duration);
        // 		} else {
        // 			$('.scroll-to-top').fadeOut(duration);
        // 		}
        // 	});
        // } else {
        // 	$(window).scroll(function () {
        // 		if ($(this).scrollTop() > offset) {
        // 			$('.scroll-to-top').fadeIn(duration);
        // 		} else {
        // 			$('.scroll-to-top').fadeOut(duration);
        // 		}
        // 	});
        // }
        // $('.scroll-to-top').click(function (e) {
        // 	e.preventDefault();
        // 	return false;
        // });
    };
    IBizEditViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
        var _this = this;
        if (win.dialogResult == 'ok') {
            var window = _this.getWindow();
            if (window) {
                window.dialogResult = 'ok';
                window.activeData = _this.getForm().getValues();
            }
            _this.refreshReferView();
            _this.closeWindow();
            return;
        }
    };
    IBizEditViewController.prototype.isEnableNewData = function () {
        return true;
    };
    IBizEditViewController.prototype.isEnableEditData = function () {
        return true;
    };
    IBizEditViewController.prototype.isEnableRemoveData = function () {
        return true;
    };
    IBizEditViewController.prototype.onPrintData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        _this.doPrintDataNormal(arg);
    };
    /**
     * 常规新建数据
     */
    IBizEditViewController.prototype.doPrintDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var view = _this.getPrintDataView(arg);
        if (view == null) {
            return false;
        }
        // var viewurl = view.viewurl;
        // if (!viewurl || viewurl == '') {
        // 	viewurl = BASEURL + '/ibizutil/print.pdf';
        // }
        // else {
        // 	viewurl = BASEURL + viewurl;
        // }
        // viewurl = viewurl + (viewurl.indexOf('?') == -1 ? '?' : '&') + $.param(view.viewparam);
        // window.open(viewurl, '_blank');
        return true;
    };
    IBizEditViewController.prototype.getPrintDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    return IBizEditViewController;
}(IBizMianViewController));

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
 * 树导航界面
 *
 * @class IBizTreeExpViewController
 * @extends {IBizMianViewController}
 */
var IBizTreeExpViewController = /** @class */ (function (_super) {
    __extends(IBizTreeExpViewController, _super);
    /**
     * Creates an instance of IBizTreeExpViewController.
     * 创建 IBizTreeExpViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeExpViewController
     */
    function IBizTreeExpViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        _this_1.treeReloadMode = '';
        var _this = _this_1;
        return _this_1;
    }
    /**
     * 初始化
     *
     * @param {*} [opts={}]
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.init = function (opts) {
        var _this_1 = this;
        if (opts === void 0) { opts = {}; }
        _super.prototype.init.call(this, opts);
        var _this = this;
        // 创建分页部件
        var exptab = new IBizExpTab({
            name: 'exptab',
            url: opts.backendurl,
            viewController: _this,
        });
        _this.controls.set('exptab', exptab);
        var treeexpbar = _this.getTreeExpBar();
        if (treeexpbar) {
            treeexpbar.setExpTab(exptab);
            treeexpbar.on(IBizTreeExpBar.SELECTIONCHANGE).subscribe(function (args) {
                _this_1.treeExpBarSelectionChange(args);
            });
        }
    };
    IBizTreeExpViewController.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        var _this = this;
        //初始化分页
        // _this.exptab = new IBizExpTab({ ctrler: this, id: this.getCId2() + 'exptab', showheader: false });
        // _this.registerItem('exptab', this.exptab);
        // var treeExpBarCfg = _this.getTreeExpBarCfg();
        // treeExpBarCfg = $.extend(treeExpBarCfg, { id: this.getCId2() + 'treeexpbar', ctrler: this, tabctrl: _this.exptab });
        // _this.treeexpbar = new IBizTreeExpBar(treeExpBarCfg);
        // _this.registerItem('treeexpbar', _this.treeexpbar);
    };
    IBizTreeExpViewController.prototype.getTreeExpBar = function () {
        return this.controls.get('treeexpbar');
    };
    IBizTreeExpViewController.prototype.getExpTab = function () {
        return this.controls.get('exptab');
    };
    IBizTreeExpViewController.prototype.getTreeExpBarCfg = function () {
        // return this.config.ctrls.treeexpbar || {};
        return {};
    };
    IBizTreeExpViewController.prototype.getExpTabCfg = function () {
        // return this.config.ctrls.exptab || {};
        return {};
    };
    IBizTreeExpViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.treeReloadMode = '';
        if (uiaction.tag == 'Remove') {
            _this.doRemove(params);
            return;
        }
        if (uiaction.tag == 'Refresh') {
            _this.doTreeRefresh(params);
            return;
        }
        if (uiaction.tag == 'New') {
            _this.doNew(params);
            return;
        }
        if (uiaction.tag == 'EDIT') {
            _this.doEdit(params);
            return;
        }
        if (uiaction.tag == 'Copy') {
            _this.doCopy(params);
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    /*新建操作*/
    IBizTreeExpViewController.prototype.doNew = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.onNewData(params);
    };
    /*拷贝操作*/
    IBizTreeExpViewController.prototype.doCopy = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var arg = {
            data: params,
            srfcopymode: true
        };
        _this.onEditData(arg);
    };
    /*编辑操作*/
    IBizTreeExpViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        //获取要编辑的数据集合
        if (params && params.srfkey) {
            var arg = { data: params };
            _this.onEditData(arg);
            return;
        }
    };
    /*查看操作*/
    IBizTreeExpViewController.prototype.doView = function (params) {
        if (params === void 0) { params = {}; }
        this.doEdit(params);
    };
    /*删除操作*/
    IBizTreeExpViewController.prototype.doRemove = function (params) {
        if (params === void 0) { params = {}; }
        this.onRemove(params);
        ;
    };
    /*刷新操作*/
    IBizTreeExpViewController.prototype.doTreeRefresh = function (params) {
        if (params === void 0) { params = {}; }
        this.onTreeRefresh(params);
    };
    /**
     * 新建数据
     */
    IBizTreeExpViewController.prototype.onNewData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        _this.treeReloadMode = IBizTreeExpViewController.REFRESHMODE_CURRENTNODE;
        var loadParam = {};
        if (_this.getViewParam()) {
            // $.extend(loadParam, _this.getViewParam());
            Object.assign(loadParam, _this.getViewParam());
        }
        if (_this.getParentMode()) {
            // $.extend(loadParam, _this.getParentMode());
            Object.assign(loadParam, _this.getParentMode());
        }
        if (_this.getParentData()) {
            // $.extend(loadParam, _this.getParentData());
            Object.assign(loadParam, _this.getParentData());
        }
        if (_this.isEnableBatchAdd()) {
            _this.doNewDataBatch(loadParam);
            return;
        }
        if (_this.doNewDataWizard(loadParam)) {
            return;
        }
        var newMode = _this.getNewMode(arg);
        if (newMode) {
            // loadParam.srfnewmode = newMode;
            Object.assign(loadParam, { srfnewmode: newMode });
        }
        _this.doNewDataNormal(loadParam, arg);
    };
    /**
     * 批量新建
     */
    IBizTreeExpViewController.prototype.doNewDataBatch = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var mpickupview = _this.getMPickupView(arg);
        if (mpickupview) {
            // var win = $.getIBizApp().createWindow({});
            // var viewparam = {};
            // $.extend(viewparam, mpickupview.viewparam);
            // if(!viewparam.srfreferdata){
            // 	if(viewparam.srfparentdata)
            // 	{
            // 		viewparam.srfreferdata = viewparam.srfparentdata;
            // 		delete viewparam.srfparentdata;
            // 	}
            // }
            // viewparam['windowid'] = win.getId();
            // viewparam['openerid'] = _this.getId();
            // win.title = mpickupview.title;
            // win.scope = _this;
            // win.height = mpickupview.height?mpickupview.height:0;
            // win.width = mpickupview.width?mpickupview.width:0;
            // win.url = $.getIBizApp().parseURL2(mpickupview.subapp,mpickupview.viewurl,{windowid:win.getId(),openerid:_this.getId()});
            // win.viewparam = viewparam;
            // win.callback =  _this.onMPickupWindowClose;
            // if(mpickupview.modal){
            // 	 win.openModal(window);
            // }else{
            // 	 win.openInNewWindow(window);
            // }
            return true;
        }
        return false;
    };
    /**
     * 批量新建关闭
     */
    IBizTreeExpViewController.prototype.onMPickupWindowClose = function (win) {
        var _this = win.scope;
        var loadParam = win.userData;
        var dialogResult = win.dialogResult;
        if (!dialogResult)
            return;
        if (dialogResult == 'ok') {
            var selectedDatas = win.selectedDatas;
            if (!selectedDatas) {
                return;
            }
            _this.addDataBatch(selectedDatas);
        }
        return;
    };
    /**
     * 批量添加数据
     */
    IBizTreeExpViewController.prototype.addDataBatch = function (selectedDatas) {
        return "";
    };
    /**
     * 向导新建数据
     */
    IBizTreeExpViewController.prototype.doNewDataWizard = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var wizardview = _this.getNewDataWizardView(arg);
        if (wizardview != null) {
            // var win = $.getIBizApp().createWindow({});
            // var viewparam = {};
            // viewparam['windowid'] = win.getId();
            // viewparam['openerid'] = _this.getId();
            // win.title = wizardview.title;
            // win.scope = _this;
            // win.height = wizardview.height?wizardview.height:0;
            // win.width = wizardview.width?wizardview.width:0;
            // win.url = $.getIBizApp().parseURL2(wizardview.subapp,wizardview.viewurl,{windowid:win.getId(),openerid:_this.getId()});
            // win.viewparam = viewparam;
            // win.callback =  _this.onNewDataWizardWindowClose;
            // if(wizardview.modal){
            //  	win.openModal(window);
            // }else{
            // 	win.openInNewWindow(window);
            // }
            return true;
        }
        return false;
    };
    /**
     * 向导新建数据窗口关闭
     */
    IBizTreeExpViewController.prototype.onNewDataWizardWindowClose = function (win, eOpts) {
        if (eOpts === void 0) { eOpts = {}; }
        var _this = win.scope;
        var loadParam = {}; //win.userData;
        var dialogResult = win.dialogResult;
        if (!dialogResult)
            return;
        if (dialogResult == 'ok') {
            var selectedData = win.selectedData;
            if (selectedData) {
                var newMode = selectedData.srfkey;
                loadParam.srfnewmode = newMode;
                var view = _this.getNewDataView(loadParam);
                if (view == null) {
                    return;
                }
                _this.openDataView(view);
            }
        }
        return;
    };
    /**
     * 常规新建数据
     */
    IBizTreeExpViewController.prototype.doNewDataNormal = function (arg, params) {
        if (arg === void 0) { arg = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        var view = _this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        if (params && view.viewparam && view.viewparam.srfparenttype) {
            var parentType = view.viewparam.srfparenttype;
            if (parentType == 'DER1N') {
                view.viewparam.srfparentkey = params.srfkey;
            }
        }
        return _this.openDataView(view);
    };
    /**
     * 编辑数据
     */
    IBizTreeExpViewController.prototype.onEditData = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        _this.treeReloadMode = IBizTreeExpViewController.REFRESHMODE_PARENTNODE;
        var loadParam = {};
        if (_this.getViewParam()) {
            // $.extend(loadParam, _this.getViewParam());
            Object.assign(loadParam, _this.getViewParam());
        }
        if (this.getParentMode()) {
            // $.extend(loadParam, _this.getParentMode());
            Object.assign(loadParam, _this.getParentMode());
        }
        if (this.getParentData()) {
            // $.extend(loadParam, _this.getParentData());
            Object.assign(loadParam, _this.getParentData());
        }
        if (arg.srfcopymode) {
            // $.extend(loadParam, { srfsourcekey: arg.data.srfkey });
            Object.assign(loadParam, { srfsourcekey: arg.data.srfkey });
        }
        else {
            // $.extend(loadParam, { srfkey: arg.data.srfkey });
            Object.assign(loadParam, { srfkey: arg.data.srfkey });
        }
        var editMode = _this.getEditMode(arg.data);
        if (editMode) {
            // loadParam.srfeditmode = editMode;
            Object.assign(loadParam, { srfeditmode: editMode });
        }
        if (arg.data.srfmstag) {
            // loadParam.srfeditmode2 = arg.data.srfmstag;
            Object.assign(loadParam, { srfeditmode2: arg.data.srfmstag });
        }
        // loadParam.openerid = _this.getId();
        Object.assign(loadParam, { openerid: _this.getId() });
        _this.doEditDataNormal(loadParam);
    };
    /**
     * 执行常规编辑数据
     */
    IBizTreeExpViewController.prototype.doEditDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        var view = _this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        return _this.openDataView(view);
    };
    /**
     * 打开数据视图
     */
    IBizTreeExpViewController.prototype.openDataView = function (view) {
        if (view === void 0) { view = {}; }
        var _this = this;
        var openMode = view.openMode;
        if (openMode != undefined) {
            if (openMode == 'POPUPMODAL') {
                view.modal = true;
            }
            else if (openMode == 'POPUP') {
                view.modal = true;
            }
            else if (openMode == '' || openMode == 'INDEXVIEWTAB') {
                view.modal = false;
            }
        }
        if (_this.isShowModal()) {
            view.modal = true;
        }
        // var win = $.getIBizApp().createWindow({});
        // var viewparam = view.viewparam;
        // if(!viewparam){
        // 	viewparam = {};
        // }
        // viewparam['windowid'] = win.getId();
        // viewparam['openerid'] = _this.getId();
        // win.title = view.title;
        // win.scope = _this;
        // win.height = view.height?view.height:0;
        // win.width = view.width?view.width:0;
        // win.url = $.getIBizApp().parseURL2(view.subapp,view.viewurl,{windowid:win.getId(),openerid:_this.getId()});
        // win.viewparam = viewparam;
        // if(view.modal){
        // 	 win.openModal(window);
        // }else{
        // 	 win.openInNewWindow(window);
        // }
        return true;
    };
    IBizTreeExpViewController.prototype.onRemove = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var node;
        if (params && params.node) {
            node = params.node;
        }
        if (node == null || node.length == 0)
            return;
        var dataInfo = params.srfmajortext;
        //询问框
        // IBiz.confirm($IGM('TREEEXPVIEWCONTROLLER.ONREMOVE.INFO', '确认要删除 【' + dataInfo + '】 ，删除操作将不可恢复？'), function (result) {
        //     if (result) {
        //         _this.getTreeExpBar().getTree().remove(node);
        //     }
        // });
        _this.iBizNotification.confirm('', '').subscribe(function (result) {
            if (result && Object.is(result, 'OK')) {
                _this.getTreeExpBar().getTree().remove(node);
            }
        });
    };
    /**
     * 界面操作树节点刷新
     */
    IBizTreeExpViewController.prototype.onTreeRefresh = function (params) {
        if (params === void 0) { params = {}; }
        var _this = this;
        var node;
        if (params && params.node) {
            node = params.node;
        }
        if (node == null || node.length == 0) {
            var nodes = _this.getSelected(true);
            if (nodes && nodes.length > 0)
                node = nodes[0];
        }
        //刷新树节点
        _this.getTreeExpBar().getTree().reload(node);
    };
    /**
     * 视图刷新操作
     */
    IBizTreeExpViewController.prototype.onRefresh = function () {
        var _this = this;
        var node;
        if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_NONE) {
            return;
        }
        else if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_CURRENTNODE) {
            var nodes = _this.getSelected(true);
            if (nodes && nodes.length > 0)
                node = nodes[0];
        }
        else if (_this.treeReloadMode == IBizTreeExpViewController.REFRESHMODE_PARENTNODE) {
            var nodes = _this.getSelected(true);
            if (nodes && nodes.length > 0)
                node = nodes[0].parent;
        }
        //刷新树节点
        _this.getTreeExpBar().getTree().reload(node);
    };
    IBizTreeExpViewController.prototype.getSelected = function (bFull) {
        var _this = this;
        var nodes = _this.getTreeExpBar().getTree().getSelected(bFull);
        return nodes;
    };
    /**
     * 获取新建模式
     */
    IBizTreeExpViewController.prototype.getNewMode = function (data) {
        if (data === void 0) { data = {}; }
        return 'NEWDATA@' + data.srfnodetype.toUpperCase();
    };
    /**
     * 获取编辑模式
     */
    IBizTreeExpViewController.prototype.getEditMode = function (data) {
        if (data === void 0) { data = {}; }
        return 'EDITDATA@' + data.srfnodetype.toUpperCase();
    };
    /**
     * 获取编辑视图
     */
    IBizTreeExpViewController.prototype.getEditDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        return _this.getEditDataView(arg);
    };
    /**
     * 获取新建视图
     */
    IBizTreeExpViewController.prototype.getNewDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        var _this = this;
        return _this.getNewDataView(arg);
    };
    /**
     * 获取新建向导视图
     */
    IBizTreeExpViewController.prototype.getNewDataWizardView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    /**
     * 获取多选视图
     */
    IBizTreeExpViewController.prototype.getMPickupView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return null;
    };
    IBizTreeExpViewController.prototype.doBackendUIAction = function (arg, params) {
        if (arg === void 0) { arg = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        _this.getTreeExpBar().getTree().doUIAction(arg, params);
    };
    IBizTreeExpViewController.prototype.isEnableBatchAdd = function () {
        return false;
    };
    IBizTreeExpViewController.prototype.isBatchAddOnly = function () {
        return false;
    };
    IBizTreeExpViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var _this = this;
        if (uiaction.actiontarget == 'SINGLEKEY' || uiaction.actiontarget == 'MULTIKEY') {
            var node = null;
            var vlaueitem = "srfkey";
            var paramkey = "srfkeys";
            var infoitem = 'srfmajortext';
            var paramjo = null;
            if (uiaction.actionparams) {
                vlaueitem = uiaction.actionparams.vlaueitem ? uiaction.actionparams.vlaueitem.toLowerCase() : vlaueitem;
                paramkey = uiaction.actionparams.paramitem ? uiaction.actionparams.paramitem.toLowerCase() : paramkey;
                infoitem = uiaction.actionparams.textitem ? uiaction.actionparams.textitem.toLowerCase() : infoitem;
                paramjo = uiaction.actionparams.paramjo ? uiaction.actionparams.paramjo : paramjo;
            }
            var keys = params.srfkey;
            var dataInfo = params[infoitem];
            var nodeType = params.srfnodetype;
            var data = { dataInfo: dataInfo, srfnodetype: nodeType };
            data[paramkey] = params[vlaueitem];
            return data;
        }
        return {};
    };
    /**
     * 导航树节点选中
     *
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.treeExpBarSelectionChange = function (data) {
        if (data === void 0) { data = {}; }
        console.log(data);
        if (!data || Object.keys(data).length === 0 || !data.viewid) {
            return;
        }
        var routeString = data.viewid;
        // if (!this.hasChildRoute(routeString.toLocaleLowerCase())) {
        //     return;
        // }
        var viewParam = data.viewParam;
        Object.assign(viewParam, { refreshView: true });
        // this.openView(routeString.toLocaleLowerCase(), viewParam);
        var _this = this;
        _this.$router.push({ name: routeString.toLocaleLowerCase(), query: viewParam });
    };
    IBizTreeExpViewController.REFRESHMODE_CURRENTNODE = 'CURRENTNODE';
    IBizTreeExpViewController.REFRESHMODE_PARENTNODE = 'PARENTNODE';
    IBizTreeExpViewController.REFRESHMODE_ALLNODE = 'ALLNODE';
    IBizTreeExpViewController.REFRESHMODE_NONE = 'NONE';
    return IBizTreeExpViewController;
}(IBizMianViewController));

"use strict";
Vue.component('ibiz-app-menu', {
    template: "\n    <Menu theme=\"dark\" width=\"auto\" class=\"ibiz-app-menu\"  @on-select=\"onSelect($event)\">\n        <template v-for=\"(item0, index0) in ctrl.items\">\n            <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n            <template v-if=\"item0.items && item0.items.length > 0\">\n                <Submenu v-bind:name=\"item0.id\">\n                    <template slot=\"title\">\n                        <span><i v-bind:class=\"[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]\" aria-hidden=\"true\"></i> {{ item0.text }}</span>\n                    </template>\n                    <template v-for=\"(item1, index1) in item0.items\">\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                        <template v-if=\"item1.items && item1.items.length > 0\">\n                            <Submenu v-bind:name=\"item1.id\">\n                                <template slot=\"title\">\n                                    <span>{{ item1.text }}</span>\n                                </template>\n                                <!---  \u4E09\u7EA7\u83DC\u5355 begin  --->\n                                <template v-for=\"(item2, index2) in item1.items\">\n                                    <MenuItem v-bind:name=\"item2.id\">\n                                        <span>{{ item2.text }}</span>\n                                    </MenuItem>\n                                </template>\n                                <!---  \u4E09\u7EA7\u83DC\u5355\u6709 begin  --->\n                            </Submenu>\n                        </template>\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                        <template v-else>\n                            <MenuItem v-bind:name=\"item1.id\">\n                                <span>{{ item1.text }}</span>\n                            </MenuItem>\n                        </template>\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n                    </template>\n                </Submenu>\n            </template>\n            <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n            <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n            <template v-else>\n                <MenuItem v-bind:name=\"item0.id\">\n                    <span><i v-bind:class=\"[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]\" aria-hidden=\"true\" style=\"margin-right:8px;\"></i>{{ item0.text }}</span>\n                </MenuItem>\n            </template>\n            <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n        </template>\n    </Menu>\n    ",
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
    },
    methods: {
        onSelect: function (name) {
            if (this.ctrl && !Object.is(name, '')) {
                var item = this.ctrl.getItem(name, this.ctrl.getItems());
                this.ctrl.onSelectChange(item);
            }
        }
    }
});

"use strict";
Vue.component('ibiz-form', {
    template: "\n        <div>\n            <i-form :model=\"form\">\n                <row :gutter=\"10\">\n                    <slot :scope=\"fields\"></slot>\n                </row>\n            </i-form>\n        </div>\n    ",
    props: ['form'],
    data: function () {
        var data = {};
        Object.assign(data, { fields: this.form.fieldMap });
        return data;
    }
});

"use strict";
Vue.component('ibiz-form-group', {
    template: "\n        <div>\n            <template v-if=\"group.showCaption\">\n                <card :bordered=\"false\" :dis-hover=\"true\">\n                    <p class=\"\" slot=\"title\"> {{ group.caption }}</p>\n                    <row :gutter=\"10\">\n                        <slot></slot>\n                    </row>\n                </card>\n            </template>\n            <template v-else>\n                <row :gutter=\"10\">\n                    <slot></slot>\n                </row>\n            </template>\n        </div>\n    ",
    props: ['form', 'group', 'name'],
    data: function () {
        var data = {};
        return data;
    }
});

"use strict";
Vue.component('ibiz-form-item', {
    template: "\n        <div>\n            <form-item class=\"ivu-form-label-left\" :label-width=\"item.labelWidth\" :required=\"!item.allowEmpty\">\n                <span slot=\"label\" class=\"\">{{ item.caption }}</span>\n                <slot></slot>\n            </form-item>\n        </div>\n    ",
    props: ['form', 'item', 'name'],
    data: function () {
        var data = {};
        return data;
    }
});
