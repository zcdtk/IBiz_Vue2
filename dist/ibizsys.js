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
 * IBizSys控制器借口对象
 *
 * @abstract
 * @class IBizObject
 */
var IBizObject = /** @class */ (function () {
    /**
     * Creates an instance of IBizObject.
     * 创建 IBizObject 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizObject
     */
    function IBizObject(opts) {
        if (opts === void 0) { opts = {}; }
        /**
         * 对象事件集合
         *
         * @private
         * @type {Map<string, any>}
         * @memberof IBizObject
         */
        this.events = new Map();
        /**
         * IBizHttp 服务对象
         *
         * @type {IBizHttp}
         * @memberof IBizObject
         */
        this.iBizHttp = new IBizHttp();
        /**
         * IBiz 通知对象
         *
         * @type {IBizNotification}
         * @memberof IBizObject
         */
        this.IBizNotification = new IBizNotification();
    }
    /**
     * 注册Rx订阅事件
     *
     * @param {string} eventName
     * @returns {Observable<any>}
     * @memberof IBizObject
     */
    IBizObject.prototype.on = function (eventName) {
        var subject;
        if (eventName && !Object.is(eventName, '')) {
            if (!this.events.get(eventName)) {
                subject = new rxjs.Subject();
                this.events.set(eventName, subject);
            }
            else {
                subject = this.events.get(eventName);
            }
            return subject;
        }
    };
    /**
     * Rx事件流触发
     *
     * @param {string} eventName
     * @param {*} data
     * @memberof IBizObject
     */
    IBizObject.prototype.fire = function (eventName, data) {
        var subject = this.events.get(eventName);
        if (subject) {
            subject.next(data);
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 代码表ID
         *
         * @private
         * @type {string}
         * @memberof IBizCodeList
         */
        _this_1.id = '';
        /**
         * 静态代码表数据
         *
         * @type {Array<any>}
         * @memberof IBizCodeList
         */
        _this_1.data = [];
        var _this = _this_1;
        _this.data = opts.datas.slice();
        _this.id = opts.id;
        return _this_1;
    }
    /**
     * 获取代码表ID
     *
     * @returns {string}
     * @memberof IBizCodeList
     */
    IBizCodeList.prototype.getId = function () {
        return this.id;
    };
    /**
     * 获取代码表数据
     *
     * @returns {Array<any>}
     * @memberof IBizCodeList
     */
    IBizCodeList.prototype.getData = function () {
        return this.data;
    };
    /**
     * 获取数据项的值
     *
     * @param {string} value
     * @param {*} cascade
     * @returns {*}
     * @memberof IBizCodeList
     */
    IBizCodeList.prototype.getItemByValue = function (value, cascade) {
        var result = {};
        var arr = this.data.filter(function (item) { return Object.is(item.value, value); });
        if (arr.length !== 1) {
            return undefined;
        }
        result = __assign({}, arr[0]);
        return result;
    };
    /**
     * 获取代码表文本值
     *
     * @param {*} [item={}]
     * @returns {string}
     * @memberof IBizCodeList
     */
    IBizCodeList.prototype.getCodeItemText = function (item) {
        if (item === void 0) { item = {}; }
        var color = item.color;
        var textCls = item.textcls;
        var iconCls = item.iconcls;
        var realText = item.text;
        var ret = '';
        if (iconCls) {
            ret = ('<i class=\'' + iconCls + '\'></i>');
        }
        if (textCls || color) {
            ret += '<span';
            if (textCls) {
                ret += (' class=\'' + textCls + '\'');
            }
            if (color) {
                ret += (' style=\'color:' + color + '\'');
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
        /**
         * 编辑器参数
         *
         * @type {*}
         * @memberof IBizFormField
         */
        _this_1.editorParams = {};
        var _this = _this_1;
        _this.labelWidth = opts.labelWidth;
        if (opts.editorParams) {
            Object.assign(_this_1.editorParams, opts.editorParams);
        }
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
