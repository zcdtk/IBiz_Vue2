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
        this.iBizNotification = new IBizNotification();
    }
    /**
     * 注册Rx订阅事件
     *
     * @param {string} eventName
     * @returns {Subject<any>}
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
 * 计数器
 *
 * @class IBizUICounter
 * @extends {IBizControl}
 */
var IBizUICounter = /** @class */ (function (_super) {
    __extends(IBizUICounter, _super);
    /**
     * Creates an instance of IBizUICounter.
     * 创建 IBizUICounter 服务对象
     *
     * @param {*} [config={}]
     * @memberof IBizUICounter
     */
    function IBizUICounter(config) {
        if (config === void 0) { config = {}; }
        var _this_1 = _super.call(this, config) || this;
        /**
         * 定时器时间
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.timer = null;
        /**
         * 定时器
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.timerTag = null;
        /**
         * 计数器id
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.counterId = '';
        /**
         * 计数器参数
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.counterParam = {};
        /**
         * 最后加载数据
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.lastReloadArg = {};
        /**
         * 计数器结果
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.result = {};
        /**
         * 计数器交互数据
         *
         * @private
         * @type {*}
         * @memberof IBizUICounter
         */
        _this_1.data = {};
        var _this = _this_1;
        _this_1.counterId = config.counterId;
        Object.assign(_this_1.counterParam, config.counterParam);
        _this_1.timer = config.timer;
        _this_1.load();
        return _this_1;
    }
    /**
     * 加载定时器
     *
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.load = function () {
        var _this_1 = this;
        if (this.timer > 1000) {
            this.timerTag = setInterval(function () {
                _this_1.reload();
            }, this.timer);
        }
        this.reload();
    };
    /**
     * 刷新计数器
     *
     * @private
     * @param {*} [arg={}]
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.reload = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        Object.assign(this.lastReloadArg, arg);
        Object.assign(params, this.lastReloadArg);
        Object.assign(params, { srfcounterid: this.counterId, srfaction: 'FETCH', srfcounterparam: JSON.stringify(this.counterParam) });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (res) {
            if (res.ret === 0) {
                _this_1.setData(res);
            }
        }, function (error) {
            console.log('加载计数器异常');
        });
    };
    /**
     * 处理数据
     *
     * @private
     * @param {*} result
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.setData = function (result) {
        this.result = result;
        this.data = result.data;
        this.fire(IBizUICounter.COUNTERCHANGED, this.data);
    };
    /**
     * 获取结果
     *
     * @returns {*}
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.getResult = function () {
        return this.result;
    };
    /**
     * 获取数据
     *
     * @returns {*}
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.getData = function () {
        return this.data;
    };
    /**
     * 关闭计数器
     *
     * @memberof IBizUICounter
     */
    IBizUICounter.prototype.close = function () {
        if (this.timerTag !== undefined) {
            clearInterval(this.timerTag);
            delete this.timer;
        }
    };
    /**
     * 计数发生变化
     *
     * @static
     * @memberof IBizUICounter
     */
    IBizUICounter.COUNTERCHANGED = "COUNTERCHANGED";
    return IBizUICounter;
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
 * 部件对象
 *
 * @class IBizControl
 * @extends {IBizObject}
 */
var IBizControl = /** @class */ (function (_super) {
    __extends(IBizControl, _super);
    /**
     * Creates an instance of IBizControl.
     * 创建 IBizControl 实例。
     *
     * @param {*} [opts={}]
     * @memberof IBizControl
     */
    function IBizControl(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 部件名称
         *
         * @private
         * @type {string}
         * @memberof IBizControl
         */
        _this_1.name = '';
        /**
         * 后台交互URL
         *
         * @private
         * @type {string}
         * @memberof IBizControl
         */
        _this_1.url = '';
        /**
         * 视图控制器对象
         *
         * @private
         * @type {*}
         * @memberof IBizControl
         */
        _this_1.viewController = null;
        /**
         * 部件http请求状态
         *
         * @type {boolean}
         * @memberof IBizControl
         */
        _this_1.isLoading = false;
        var _this = _this_1;
        _this.name = opts.name;
        _this.url = opts.url;
        _this.viewController = opts.viewController;
        return _this_1;
    }
    ;
    /**
     * 获取部件名称
     *
     * @returns {String}
     * @memberof IBizControl
     */
    IBizControl.prototype.getName = function () {
        return this.name;
    };
    /**
     * 获取后台路径
     *
     * @returns {*}
     * @memberof IBizControl
     */
    IBizControl.prototype.getBackendUrl = function () {
        var url = '';
        if (this.url) {
            url = this.url;
        }
        if (this.getViewController()) {
            if (!url) {
                url = this.getViewController().getBackendUrl();
            }
        }
        return url;
    };
    /**
     * 获取视图控制器
     *
     * @returns {*}
     * @memberof IBizControl
     */
    IBizControl.prototype.getViewController = function () {
        if (this.viewController) {
            return this.viewController;
        }
        return undefined;
    };
    /**
     * 部件http请求
     *
     * @private
     * @memberof IBizControl
     */
    IBizControl.prototype.beginLoading = function () {
        this.isLoading = true;
    };
    /**
     * 部件结束http请求
     *
     * @private
     * @memberof IBizControl
     */
    IBizControl.prototype.endLoading = function () {
        this.isLoading = false;
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
         * 应用功能数据
         *
         * @type {Array<any>}
         * @memberof IBizAppMenu
         */
        _this_1.appFunctions = [];
        /**
         * 菜单数据项
         *
         * @type {any[]}
         * @memberof IBizAppMenu
         */
        _this_1.items = [];
        /**
         * 选中项
         *
         * @type {*}
         * @memberof IBizAppMenu
         */
        _this_1.selectItem = {};
        var _this = _this_1;
        _this.setAppFunctions();
        return _this_1;
    }
    /**
     * 设置应用功能参数
     *
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.setAppFunctions = function () {
    };
    /**
     * 部件加载
     *
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.load = function () {
        var _this_1 = this;
        var _this = this;
        var params = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        _this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (success) {
            if (success.ret === 0) {
                _this_1.items = success.items;
                _this_1.fire(IBizAppMenu.LOADED, _this_1.items);
            }
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * 菜单选中
     *
     * @param {*} [item={}]
     * @returns {*}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.onSelectChange = function (item) {
        if (item === void 0) { item = {}; }
        // tslint:disable-next-line:prefer-const
        var _item = {};
        Object.assign(_item, item);
        var _appFunction = this.appFunctions.find(function (appfunction) { return Object.is(appfunction.appfuncid, item.appfuncid); });
        if (!_appFunction) {
            return;
        }
        Object.assign(_item, _appFunction);
        this.fire(IBizAppMenu.MENUSELECTION, _item);
    };
    /**
     * 设置选中菜单
     *
     * @param {*} [item={}]
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.setAppMenuSelected = function (item) {
        if (item === void 0) { item = {}; }
        if (!item) {
            return;
        }
        this.selectItem = {};
        var appfunction = this.appFunctions.find(function (_appfunction) { return Object.is(_appfunction.routerlink, item.routerlink); });
        if (!appfunction) {
            return;
        }
        var _selectItem = this.getSelectMenuItem(this.items, appfunction);
        if (_selectItem && Object.keys(_selectItem).length > 0) {
            Object.assign(this.selectItem, _selectItem);
        }
    };
    /**
     * 获取选中菜单项
     *
     * @private
     * @param {Array<any>} items
     * @param {*} [appfunction={}]
     * @returns {*}
     * @memberof IBizAppMenu
     */
    IBizAppMenu.prototype.getSelectMenuItem = function (items, appfunction) {
        var _this_1 = this;
        if (appfunction === void 0) { appfunction = {}; }
        // tslint:disable-next-line:prefer-const
        var item = {};
        items.some(function (_item) {
            if (Object.is(_item.appfuncid, appfunction.appfuncid)) {
                Object.assign(item, _item);
                return true;
            }
            if (_item.items) {
                var subItem = _this_1.getSelectMenuItem(_item.items, appfunction);
                if (subItem && Object.keys(subItem).length > 0) {
                    Object.assign(item, subItem);
                    return true;
                }
            }
        });
        return item;
    };
    /**
     * 菜单加载
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.LOADED = 'LOADED';
    /**
     * 菜单选中
     *
     * @static
     * @memberof IBizAppMenu
     */
    IBizAppMenu.MENUSELECTION = 'MENUSELECTION';
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
 * 多项数据部件服务对象
 *
 * @export
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
         * 多数据列头
         *
         * @type {*}
         * @memberof IBizMDControl
         */
        _this_1.columns = {};
        /**
         * 所有数据项
         *
         * @type {Array<any>}
         * @memberof IBizMDControl
         */
        _this_1.items = [];
        /**
         * 选中数据项
         *
         * @type {Array<any>}
         * @memberof IBizMDControl
         */
        _this_1.selection = [];
        var _this = _this_1;
        _this.regColumns();
        return _this_1;
    }
    /**
     * 加载数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.load = function (arg) {
        if (arg === void 0) { arg = {}; }
    };
    /**
     * 刷新数据
     * @param arg
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
        this.selection = selection;
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selection);
    };
    /**
     * 选中对象
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.clickItem = function (item) {
        if (item === void 0) { item = {}; }
        if (this.isLoading) {
            return;
        }
        this.setSelection([item]);
    };
    /**
     *
     *
     * @param {any} item
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.activeItem = function (item) {
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
     * 单选
     *
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.onItemSelect = function (value, item) {
    };
    /**
     * 全选
     *
     * @param {boolean} value
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.selectAll = function (value) {
    };
    /**
     * 获取选中行
     *
     * @returns {Array<any>}
     * @memberof IBizMDControl
     */
    IBizMDControl.prototype.getSelection = function () {
        return this.selection;
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
        var _this = this;
        if (!params) {
            params = {};
        }
        Object.assign(params, { srfaction: 'wfsubmit', srfctrlid: this.getName() });
        _this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret === 0) {
                _this_1.refresh();
            }
            else {
                _this_1.iBizNotification.error('', '执行工作流操作失败,' + data.info);
            }
        }, function (error) {
            _this_1.iBizNotification.error('', '执行工作流操作失败,' + error.info);
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
        var _this = this;
        var params = {};
        if (arg) {
            Object.assign(params, arg);
        }
        Object.assign(params, { srfaction: 'uiaction', srfctrlid: this.getName() });
        _this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret === 0) {
                if (data.reloadData) {
                    _this_1.refresh();
                }
                if (data.info && !Object.is(data.info, '')) {
                    _this_1.iBizNotification.success('', '操作成功');
                }
                IBizUtil.processResult(data);
            }
            else {
                _this_1.iBizNotification.error('操作失败', '操作失败,执行操作发生错误,' + data.info);
            }
        }, function (error) {
            _this_1.iBizNotification.error('操作失败', '操作失败,执行操作发生错误,' + error.info);
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
        var _this = this;
        var params = {};
        if (arg) {
            Object.assign(params, arg);
        }
        Object.assign(params, { srfaction: 'addbatch', srfctrlid: this.getName() });
        _this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (data) {
            if (data.ret === 0) {
                _this_1.refresh();
                _this_1.fire(IBizMDControl.ADDBATCHED, data);
            }
            else {
                _this_1.iBizNotification.error('添加失败', '执行批量添加失败,' + data.info);
            }
        }, function (error) {
            _this_1.iBizNotification.error('添加失败', '执行批量添加失败,' + error.info);
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
        if (!this.columns) {
            this.columns = {};
        }
        this.columns[column.name] = column;
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
 * 表格
 *
 * @class IBizDataGrid
 * @extends {IBizMDControl}
 */
var IBizDataGrid = /** @class */ (function (_super) {
    __extends(IBizDataGrid, _super);
    /**
     * Creates an instance of IBizGrid.
     * 创建 IBizGrid 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizGrid
     */
    function IBizDataGrid(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 查询开始条数
         *
         * @memberof IBizGrid
         */
        _this_1.start = 0;
        /**
         * 每次加载条数
         *
         * @memberof IBizGrid
         */
        _this_1.limit = 20;
        /**
         * 总条数
         *
         * @memberof IBizGrid
         */
        _this_1.totalrow = 0;
        /**
         * 当前显示页码
         *
         * @memberof IBizGrid
         */
        _this_1.curPage = 1;
        /**
         * 是否全选
         *
         * @memberof IBizGrid
         */
        _this_1.allChecked = false;
        /**
         * 表格行选中动画
         *
         * @memberof IBizGrid
         */
        _this_1.indeterminate = false;
        /**
         * 表格全部排序字段
         *
         * @type {Array<any>}
         * @memberof IBizGrid
         */
        _this_1.gridSortField = [];
        /**
         * 行多项选中设置，用于阻塞多次触发选中效果
         *
         * @private
         * @type {boolean}
         * @memberof IBizGrid
         */
        _this_1.rowsSelection = false;
        /**
         * 是否支持多项
         *
         * @type {boolean}
         * @memberof IBizGrid
         */
        _this_1.multiSelect = true;
        /**
         * 是否启用行编辑
         *
         * @type {boolean}
         * @memberof IBizGrid
         */
        _this_1.isEnableRowEdit = false;
        /**
         * 打开行编辑
         *
         * @type {boolean}
         * @memberof IBizGrid
         */
        _this_1.openRowEdit = false;
        /**
         * 表格编辑项集合
         *
         * @type {*}
         * @memberof IBizGrid
         */
        _this_1.editItems = {};
        /**
         * 编辑行数据处理
         *
         * @type {*}
         * @memberof IBizGrid
         */
        _this_1.state = {};
        /**
         * 备份数据
         *
         * @type {Array<any>}
         * @memberof IBizGrid
         */
        _this_1.backupData = [];
        /**
         * 最大导出行数
         *
         * @type {number}
         * @memberof IBizGrid
         */
        _this_1.maxExportRow = 1000;
        var _this = _this_1;
        _this.regEditItems();
        return _this_1;
    }
    /**
     * 加载数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.load = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        // tslint:disable-next-line:prefer-const
        var opt = {};
        Object.assign(opt, arg);
        if (this.isLoading) {
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
        // 发送加载数据前事件
        this.fire(IBizMDControl.BEFORELOAD, opt);
        this.allChecked = false;
        this.indeterminate = false;
        this.selection = [];
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selection);
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (response) {
            if (!response.items || response.ret !== 0) {
                if (response.errorMessage) {
                    _this_1.iBizNotification.error('', response.errorMessage);
                }
                return;
            }
            _this_1.items = _this_1.rendererDatas(response.items);
            _this_1.totalrow = response.totalrow;
            _this_1.fire(IBizMDControl.LOADED, response.items);
        }, function (error) {
            console.log(error.info);
        });
    };
    /**
     * 刷新数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.refresh = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        // tslint:disable-next-line:prefer-const
        var opt = {};
        Object.assign(opt, arg);
        if (this.isLoading) {
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
        // 发送加载数据前事件
        this.fire(IBizMDControl.BEFORELOAD, opt);
        this.allChecked = false;
        this.indeterminate = false;
        this.selection = [];
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selection);
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (response) {
            if (!response.items || response.ret !== 0) {
                if (response.errorMessage) {
                    _this_1.iBizNotification.error('', response.errorMessage);
                }
                return;
            }
            _this_1.fire(IBizMDControl.LOADED, response.items);
            _this_1.items = _this_1.rendererDatas(response.items);
            _this_1.totalrow = response.totalrow;
        }, function (error) {
            console.log(error.info);
        });
    };
    /**
     * 删除数据
     *
     * @param {*} [arg={}]
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.remove = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        var params = {};
        Object.assign(params, arg);
        Object.assign(params, { srfaction: 'remove', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe(function (response) {
            if (response.ret !== 0) {
                _this_1.iBizNotification.error('', '删除数据失败,' + response.info);
                return;
            }
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
                _this_1.iBizNotification.success('', '删除成功!');
            }
            _this_1.selection = [];
            IBizUtil.processResult(response);
        }, function (error) {
            _this_1.iBizNotification.error('', '删除数据失败');
        });
    };
    /**
     * 行数据复选框单选
     *
     * @param {boolean} value
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.onItemSelect = function (value, item) {
        if (item === void 0) { item = {}; }
        if (item.disabled) {
            return;
        }
        if (this.isEnableRowEdit && this.openRowEdit) {
            return;
        }
        var index = this.selection.findIndex(function (data) { return Object.is(data.srfkey, item.srfkey); });
        if (index === -1) {
            this.selection.push(item);
        }
        else {
            this.selection.splice(index, 1);
        }
        if (!this.multiSelect) {
            this.selection.forEach(function (data) {
                data.checked = false;
            });
            this.selection = [];
            if (index === -1) {
                this.selection.push(item);
            }
        }
        this.rowsSelection = true;
        this.allChecked = this.selection.length === this.items.length ? true : false;
        this.indeterminate = (!this.allChecked) && (this.selection.length > 0);
        item.checked = value;
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selection);
    };
    /**
     * 行数据复选框全选
     *
     * @param {boolean} value
     * @memberof IBizMDControl
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
        this.selection = [];
        if (value) {
            this.selection = this.items.slice();
        }
        this.indeterminate = (!value) && (this.selection.length > 0);
        this.fire(IBizMDControl.SELECTIONCHANGE, this.selection);
    };
    /**
     * 导出数据
     *
     * @param {any} params
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.exportData = function (arg) {
        var _this_1 = this;
        if (arg === void 0) { arg = {}; }
        // tslint:disable-next-line:prefer-const
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
                this.iBizNotification.warning('警告', '请输入有效的起始页');
                return;
            }
            Object.assign(params, { start: (nStart - 1) * this.limit, limit: nEnd * this.limit });
        }
        else {
            Object.assign(params, { start: (this.curPage * this.limit) - this.limit, limit: this.curPage * this.limit });
        }
        this.iBizHttp.post(params).subscribe(function (res) {
            if (res.ret !== 0) {
                _this_1.iBizNotification.warning('警告', res.info);
                return;
            }
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
        }, function (error) {
            console.log(error.info);
        });
    };
    /**
     * 重置分页
     *
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.resetStart = function () {
        this.start = 0;
    };
    /**
     * 分页页数改变
     *
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.pageIndexChange = function () {
        this.refresh();
    };
    /**
     * 每页显示条数
     *
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.pageSizeChange = function () {
        this.curPage = 1;
        this.refresh();
    };
    /**
     * 单击行选中
     *
     * @param {*} [data={}]
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.clickRowSelect = function (data) {
        if (data === void 0) { data = {}; }
        if (data.disabled) {
            return;
        }
        if (this.doRowDataSelect(data)) {
            return;
        }
        this.fire(IBizDataGrid.ROWCLICK, this.selection);
    };
    /**
     * 双击行选中
     *
     * @param {*} [data={}]
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.dblClickRowSelection = function (data) {
        if (data === void 0) { data = {}; }
        if (data.disabled) {
            return;
        }
        if (this.doRowDataSelect(data)) {
            return;
        }
        this.fire(IBizDataGrid.ROWDBLCLICK, this.selection);
    };
    /**
     * 表格排序
     *
     * @param {string} name 字段明显
     * @param {string} type 排序类型
     * @returns {void}
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.sort = function (name, type) {
        // tslint:disable-next-line:prefer-const
        var item = this.gridSortField.find(function (_item) { return Object.is(_item.property, name); });
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
        var index = this.gridSortField.findIndex(function (field) {
            return Object.is(field.property, name);
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
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.setCurPage = function (page) {
        this.curPage = page;
    };
    /**
     * 设置是否支持多选
     *
     * @param {boolean} state 是否支持多选
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.setMultiSelect = function (state) {
        this.multiSelect = state;
    };
    /**
     * 界面行为
     *
     * @param {string} tag
     * @param {*} [data={}]
     * @memberof IBizGrid
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
     * @memberof IBizGrid
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
        this.selection.forEach(function (item) {
            item.checked = false;
        });
        this.selection = [];
        data.checked = true;
        this.selection.push(data);
        this.indeterminate = (!this.allChecked) && (this.selection.length > 0);
        return false;
    };
    /**
     * 渲染绘制多项数据
     *
     * @param {Array<any>} items
     * @returns {Array<any>}
     * @memberof IBizGrid
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
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.regEditItems = function () {
    };
    /**
     * 注册表格编辑项
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizGrid
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
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.setEditItemState = function (srfkey) {
        var _this_1 = this;
        if (!this.state) {
            return;
        }
        if (!srfkey) {
            this.iBizNotification.warning('警告', '数据异常');
        }
        // tslint:disable-next-line:prefer-const
        var editItems = {};
        var itemsName = Object.keys(this.editItems);
        itemsName.forEach(function (name) {
            // tslint:disable-next-line:prefer-const
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
     * @memberof IBizGrid
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
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.setEditItemDisabled = function (srfkey, type) {
        if (this.state && this.state.hasOwnProperty(srfkey)) {
            // tslint:disable-next-line:prefer-const
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
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.getOpenEdit = function () {
        return this.openRowEdit;
    };
    /**
     * 保存表格所有编辑行 <在插件模板中提供重写>
     *
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.saveAllEditRow = function () {
    };
    /**
     * 是否启用行编辑
     *
     * @param {string} tag
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.isOpenEdit = function (tag) {
        var _this_1 = this;
        if (!this.isEnableRowEdit) {
            this.iBizNotification.info('提示', '未启用行编辑');
            return;
        }
        this.openRowEdit = !this.openRowEdit;
        if (this.openRowEdit) {
            this.items.forEach(function (item) { item.openeditrow = true; });
            this.selection.forEach(function (data) {
                data.checked = false;
            });
            this.selection = [];
            this.indeterminate = false;
            this.fire(IBizMDControl.SELECTIONCHANGE, this.selection);
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
     * @memberof IBizGrid
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
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.editRowSave = function (data, rowindex) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var _index = this.backupData.findIndex(function (item) { return Object.is(item.srfkey, data.srfkey); });
        var srfaction = (_index !== -1) ? 'update' : 'create';
        // tslint:disable-next-line:prefer-const
        var params = { srfaction: srfaction, srfctrlid: 'grid' };
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
                _this_1.iBizNotification.info('提示', '保存成功');
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
            _this_1.iBizNotification.error('错误', !Object.is(info, '') ? info : '行编辑保存失败');
        });
    };
    /**
     * 行编辑文本框光标移出事件
     *
     * @param {*} event
     * @param {string} name
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.onBlur = function (event, name, data) {
        if (data === void 0) { data = {}; }
        if ((!event) || Object.keys(data).length === 0) {
            return;
        }
        if (Object.is(event.target.value, data[name])) {
            return;
        }
        this.colValueChange(name, event.target.value, data);
    };
    /**
     * 行编辑文本框键盘事件
     *
     * @param {*} event
     * @param {string} name
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.onKeydown = function (event, name, data) {
        if (data === void 0) { data = {}; }
        if ((!event) || Object.keys(data).length === 0) {
            return;
        }
        if (event.keyCode !== 13) {
            return;
        }
        if (Object.is(event.target.value, data[name])) {
            return;
        }
        this.colValueChange(name, event.target.value, data);
    };
    /**
     * 行编辑单元格值变化
     *
     * @param {string} name
     * @param {*} data
     * @memberof IBizGrid
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
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.updateGridEditItems = function (srfufimode, data) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        // tslint:disable-next-line:prefer-const
        var opt = { srfaction: 'updategridedititem', srfufimode: srfufimode, srfctrlid: 'grid' };
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
                _this_1.iBizNotification.error('错误', success.info);
            }
        }, function (error) {
            _this_1.iBizNotification.error('错误', error.info);
        });
    };
    /**
     * 新建编辑行
     *
     * @param {*} [param={}]
     * @memberof IBizGrid
     */
    IBizDataGrid.prototype.newRowAjax = function (param) {
        var _this_1 = this;
        if (param === void 0) { param = {}; }
        // tslint:disable-next-line:prefer-const
        var opt = {};
        Object.assign(opt, param);
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
                _this_1.iBizNotification.error('错误', "\u83B7\u53D6\u9ED8\u8BA4\u6570\u636E\u5931\u8D25, {success.info}");
            }
        }, function (error) {
            _this_1.iBizNotification.error('错误', "\u83B7\u53D6\u9ED8\u8BA4\u6570\u636E\u5931\u8D25, {error.info}");
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
 * 工具栏
 *
 * @class IBizToolbar
 * @extends {IBizControl}
 */
var IBizToolbar = /** @class */ (function (_super) {
    __extends(IBizToolbar, _super);
    /**
     * Creates an instance of IBizToolbar.
     * 创建IBizToolbar的一个实例。
     *
     * @param {*} [opts={}]
     * @memberof IBizToolbar
     */
    function IBizToolbar(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 工具栏按钮
         *
         * @type {Array<any>}
         * @memberof IBizToolbar
         */
        _this_1.items = {};
        var _this = _this_1;
        _this.regToolBarItems();
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
        if (item.menu && item.menu.length > 0) {
            var _menus = item.menu.slice();
            _menus.forEach(function (menu) {
                _this_1.regToolBarItem(menu);
            });
        }
    };
    /**
     * 获取工具栏按钮
     *
     * @returns {Array<any>}
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.getItems = function () {
        if (!this.items) {
            this.items = {};
        }
        return this.items;
    };
    /**
     * 设置工具栏按钮项是否启用
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
     * 更新权限
     *
     * @param {any} action
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
     * 工具栏导出功能设置
     *
     * @param {string} type
     * @param {string} [itemTag]
     * @memberof IBizToolbar
     */
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
    /**
     * 点击按钮
     *
     * @param {string} type  界面行为类型
     * @memberof IBizToolbar
     */
    IBizToolbar.prototype.itemclick = function (name, type) {
        if (Object.is(type, 'ToggleRowEdit')) {
            this.items[name].rowedit = !this.items[name].rowedit;
            this.items[name].caption = this.items[name].rowedit ? '启用行编辑' : '关闭行编辑';
        }
        this.fire(IBizToolbar.ITEMCLICK, { tag: type });
    };
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
 * 表单
 *
 * @export
 * @class IBizForm
 * @extends {IBizControl}
 */
var IBizForm = /** @class */ (function (_super) {
    __extends(IBizForm, _super);
    /**
     * Creates an instance of IBizForm.
     * 创建IBizForm的一个实例。
     *
     * @param {*} [opts={}]
     * @memberof IBizForm
     */
    function IBizForm(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 是否忽略表单变化
         *
         * @type {boolean}
         * @memberof IBizForm
         */
        _this_1.ignoreformfieldchange = false;
        /**
         * 是否忽略表单项更新
         *
         * @type {boolean}
         * @memberof IBizForm
         */
        _this_1.ignoreUFI = false;
        /**
         * 当前表单权限
         *
         * @type {*}
         * @memberof IBizForm
         */
        _this_1.dataaccaction = {};
        /**
         * 表单是否改变
         *
         * @type {boolean}
         * @memberof IBizForm
         */
        _this_1.formDirty = false;
        /**
         * 表单表单项
         *
         * @type {*}
         * @memberof IBizForm
         */
        _this_1.fields = {};
        var _this = _this_1;
        _this.regFields();
        return _this_1;
    }
    /**
     * 注册表单项
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.regFields = function () {
    };
    /**
     * 表单加载
     *
     * @param {*} [arg={}] 参数
     * @returns {void}
     * @memberof IBizForm
     */
    IBizForm.prototype.autoLoad = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg) {
            arg = {};
        }
        if (arg.srfkey && !Object.is(arg.srfkey, '')) {
            this.load2(arg);
            return;
        }
        if (arg.srfkeys && !Object.is(arg.srfkeys, '')) {
            Object.assign(arg, { srfkey: arg.srfkeys });
            this.load2(arg);
            return;
        }
        this.loadDraft(arg);
    };
    /**
     * 加载
     *
     * @param {*} [opt={}] 参数
     * @memberof IBizForm
     */
    IBizForm.prototype.load2 = function (opt) {
        var _this_1 = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        Object.assign(arg, opt);
        Object.assign(arg, { srfaction: 'load', srfctrlid: this.getName() });
        this.fire(IBizForm.BEFORELOAD, arg);
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        this.load(arg).subscribe(function (action) {
            _this_1.setFieldAsyncConfig(action.config);
            _this_1.setFieldState(action.state);
            _this_1.setDataAccAction(action.dataaccaction);
            _this_1.fillForm(action.data);
            _this_1.formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED, this);
            _this_1.fire(IBizForm.FORMLOADED, _this_1);
            _this_1.ignoreUFI = false;
            _this_1.ignoreformfieldchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            _this_1.fire(IBizForm.FORMFIELDCHANGED, null);
            _this_1.onLoaded();
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            _this_1.iBizNotification.error('加载失败', '加载数据发生错误, ' + _this_1.getActionErrorInfo(action));
            // IBiz.alert(IGM('IBIZFORM.LOAD.TITLE', '加载失败'), IGM('IBIZFORM.LOAD2.INFO', '加载数据发生错误,' + this.getActionErrorInfo(action), [this.getActionErrorInfo(action)]), 2);
            _this_1.ignoreUFI = false;
            _this_1.ignoreformfieldchange = false;
        });
    };
    /**
     * 加载草稿
     *
     * @param {*} [opt={}]
     * @memberof IBizForm
     */
    IBizForm.prototype.loadDraft = function (opt) {
        var _this_1 = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        Object.assign(arg, opt);
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        if (!arg.srfsourcekey || Object.is(arg.srfsourcekey, '')) {
            // .extend(arg, { srfaction: 'loaddraft' });
            Object.assign(arg, { srfaction: 'loaddraft', srfctrlid: this.getName() });
        }
        else {
            // .extend(arg, { srfaction: 'loaddraftfrom' });
            Object.assign(arg, { srfaction: 'loaddraftfrom', srfctrlid: this.getName() });
        }
        this.load(arg).subscribe(function (action) {
            _this_1.setFieldAsyncConfig(action.config);
            _this_1.setFieldState(action.state);
            _this_1.setDataAccAction(action.dataaccaction);
            _this_1.fillForm(action.data);
            _this_1.formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED, this);
            _this_1.fire(IBizForm.FORMLOADED, _this_1);
            _this_1.ignoreUFI = false;
            _this_1.ignoreformfieldchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            _this_1.fire(IBizForm.FORMFIELDCHANGED, null);
            _this_1.onDraftLoaded();
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert(IGM('IBIZFORM.LOAD.TITLE', '加载失败'), IGM('IBIZFORM.LOADDRAFT.INFO', '加载草稿发生错误,' + this.getActionErrorInfo(action), [this.getActionErrorInfo(action)]), 2);
            _this_1.iBizNotification.error('加载失败', '加载草稿发生错误, ' + _this_1.getActionErrorInfo(action));
            _this_1.ignoreUFI = false;
            _this_1.ignoreformfieldchange = false;
        });
    };
    /**
     *
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.onDraftLoaded = function () {
    };
    /**
     *
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.onLoaded = function () {
    };
    /**
     * 设置表单动态配置
     *
     * @param {*} [config={}]
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldAsyncConfig = function (config) {
        var _this_1 = this;
        if (config === void 0) { config = {}; }
        if (!config) {
            return;
        }
        var _names = Object.keys(config);
        _names.forEach(function (name) {
            var field = _this_1.findField(name);
            if (!field) {
                return;
            }
            if (config[name].hasOwnProperty('items') && Array.isArray(config[name].items)) {
                field.setAsyncConfig(config[name].items);
            }
            if (config[name].hasOwnProperty('dictitems') && Array.isArray(config[name].dictitems)) {
                field.setDictItems(config[name].dictitems);
            }
        });
    };
    /**
     * 设置当前表单权限信息
     *
     * @param {*} [dataaccaction={}] 权限数据
     * @memberof IBizForm
     */
    IBizForm.prototype.setDataAccAction = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        this.dataaccaction = dataaccaction;
        this.fire(IBizForm.DATAACCACTIONCHANGE, this.dataaccaction);
    };
    /**
     * 获取当前表单权限信息
     *
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getdataaccaction = function () {
        return this.dataaccaction;
    };
    /**
     * 设置属性状态
     *
     * @param {*} [state={}]
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldState = function (state) {
        var _this_1 = this;
        if (state === void 0) { state = {}; }
        if (!state) {
            return;
        }
        var stateDats = Object.keys(state);
        stateDats.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                // tslint:disable-next-line:no-bitwise
                var disabled = ((state[name] & 1) === 0);
                if (field.isDisabled() !== disabled) {
                    field.setDisabled(disabled);
                }
            }
        });
    };
    /**
     * 表单是否改变
     *
     * @returns {boolean}
     * @memberof IBizForm
     */
    IBizForm.prototype.isDirty = function () {
        return this.formDirty;
    };
    /**
     * 注册表单属性
     *
     * @param {*} field 表单项
     * @memberof IBizForm
     */
    IBizForm.prototype.regField = function (field) {
        var _this_1 = this;
        if (!this.fields) {
            this.fields = {};
        }
        if (field) {
            field.on(IBizFormItem.VALUECHANGED).subscribe(function (data) {
                if (data === void 0) { data = {}; }
                if (_this_1.ignoreformfieldchange) {
                    return;
                }
                _this_1.formDirty = true;
                _this_1.fire(IBizForm.FORMFIELDCHANGED, data);
            });
            this.fields[field.getName()] = field;
        }
    };
    /**
     * 注销表单属性
     *
     * @param {*} field 属性
     * @memberof IBizForm
     */
    IBizForm.prototype.unRegFiled = function (field) {
        delete this.fields[field.getName()];
    };
    /**
     * 获取控件标识
     *
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getSRFCtrlId = function () {
        // return this.srfctrlid;
    };
    /**
     * 根据名称获取属性
     *
     * @param {string} name 属性名称
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.findField = function (name) {
        if (this.fields[name]) {
            return this.fields[name];
        }
        return undefined;
    };
    /**
     * 根据唯一标识获取属性
     *
     * @param {string} id 表单项id
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getFieldById = function (id) {
        // return this.fieldIdMap[id];
    };
    /**
     * 加载数据
     *
     * @param {*} [opt={}] 参数
     * @returns {Observable<any>}  事件回调
     * @memberof IBizForm
     */
    IBizForm.prototype.load = function (opt) {
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        Object.assign(arg, opt);
        var subject = new rxjs.Subject();
        this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (data) {
            if (data.ret === 0) {
                subject.next(data);
            }
            else {
                subject.error(data);
            }
        }, function (data) {
            subject.error(data);
        });
        return subject;
    };
    /**
     * 数据提交
     *
     * @param {*} [opt={}] 参数
     * @returns {Observable<any>} 事件回调
     * @memberof IBizForm
     */
    IBizForm.prototype.submit = function (opt) {
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        Object.assign(arg, opt);
        var subject = new rxjs.Subject();
        this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (data) {
            if (data.ret === 0) {
                subject.next(data);
            }
            else {
                subject.error(data);
            }
        }, function (data) {
            subject.error(data);
        });
        return subject;
    };
    /**
     * 返回错误提示信息
     *
     * @param {*} [action={}]
     * @returns {string}
     * @memberof IBizForm
     */
    IBizForm.prototype.getActionErrorInfo = function (action) {
        if (action === void 0) { action = {}; }
        if (action.failureType === 'CONNECT_FAILURE') {
            return 'Status:' + action.response.status + ': ' + action.response.statusText;
        }
        if (action.failureType === 'SERVER_INVALID') {
            var msg_1;
            if (action.errorMessage) {
                msg_1 = action.errorMessage;
            }
            if (action.error && action.error.items) {
                var items = action.error.items;
                items.forEach(function (item, index) {
                    if (index >= 5) {
                        msg_1 += ('...... ');
                        return false;
                    }
                    if (item.info && !Object.is(item.info, '') && msg_1.indexOf(item.info) < 0) {
                        msg_1 += item.info;
                    }
                });
            }
            return msg_1;
        }
        if (action.failureType === 'CLIENT_INVALID') {
            return '';
        }
        if (action.failureType === 'LOAD_FAILURE') {
            return '';
        }
    };
    /**
     * 填充表单
     *
     * @param {*} [data={}]
     * @memberof IBizForm
     */
    IBizForm.prototype.fillForm = function (data) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var fillDatas = Object.keys(data);
        fillDatas.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field) {
                var _value = data[name];
                if (_value instanceof Array || _value instanceof Object) {
                    _value = JSON.stringify(_value);
                }
                field.setValue(_value);
            }
        });
    };
    /**
     * 设置表单项值
     *
     * @param {string} name
     * @param {*} value
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldValue = function (name, value) {
        var field = this.findField(name);
        if (field) {
            field.setValue(value);
        }
    };
    /**
     * 获取表单项值
     *
     * @param {string} name
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getFieldValue = function (name) {
        var field = this.findField(name);
        if (!field) {
            // IBiz.alert(IGM('IBIZFORM.GETFIELDVALUE.TITLE', '获取失败'), IGM('IBIZFORM.GETFIELDVALUE.INFO', '无法获取表单项[' + name + ']', [name]), 2);
            this.iBizNotification.error('获取失败', '无法获取表单项[' + name + ']');
            return '';
        }
        return field.getValue();
    };
    /**
     * 设置表单项允许为空
     *
     * @param {string} name
     * @param {boolean} allowblank
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldAllowBlank = function (name, allowblank) {
        var field = this.findField(name);
        if (field) {
            field.setAllowBlank(allowblank);
        }
    };
    /**
     * 设置表单项属性是否禁用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizForm
     */
    IBizForm.prototype.setFieldDisabled = function (name, disabled) {
        var field = this.findField(name);
        if (field) {
            field.setDisabled(disabled);
        }
    };
    /**
     * 设置表单错误
     *
     * @param {any} formerror
     * @memberof IBizForm
     */
    IBizForm.prototype.setFormError = function (formerror) {
        var _this_1 = this;
        this.resetFormError();
        if (formerror && formerror.items) {
            var errorItems = formerror.items;
            errorItems.forEach(function (item) {
                var name = item.id;
                if (name) {
                    var _item = _this_1.fields[name];
                    _item.setErrorInfo({ validateStatus: 'error', hasError: true, errorInfo: item.info });
                }
            });
        }
    };
    /**
     *
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.resetFormError = function () {
        var _this_1 = this;
        var itemsData = Object.keys(this.fields);
        itemsData.forEach(function (name) {
            var item = _this_1.fields[name];
            item.setErrorInfo({ validateStatus: 'success', hasError: false, errorInfo: '' });
        });
    };
    /**
     * 设置面板,表单项<分组、分页面板>隐藏
     *
     * @param {string} name
     * @param {boolean} visible
     * @memberof IBizForm
     */
    IBizForm.prototype.setPanelVisible = function (name, visible) {
        var field = this.findField(name);
        if (field) {
            field.setVisible(visible);
        }
    };
    /**
     * 获取当前表单项值
     *
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getActiveData = function () {
        var _this_1 = this;
        // tslint:disable-next-line:prefer-const
        var values = {};
        var items = Object.keys(this.fields);
        items.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field && (Object.is(field.fieldType, 'FORMITEM') || Object.is(field.fieldType, 'HIDDENFORMITEM'))) {
                var value = field.getValue();
                if (Object.keys(values).length <= 1000) {
                    values[name] = value;
                }
            }
        });
        return values;
    };
    /**
     * 获取全部表单项值
     *
     * @returns {*}
     * @memberof IBizForm
     */
    IBizForm.prototype.getValues = function () {
        var _this_1 = this;
        // tslint:disable-next-line:prefer-const
        var values = {};
        var items = Object.keys(this.fields);
        items.forEach(function (name) {
            var field = _this_1.findField(name);
            if (field && (Object.is(field.fieldType, 'FORMITEM') || Object.is(field.fieldType, 'HIDDENFORMITEM'))) {
                var value = field.getValue();
                values[name] = value;
            }
        });
        return values;
    };
    /**
     *
     *
     * @param {*} value
     * @returns {boolean}
     * @memberof IBizForm
     */
    IBizForm.prototype.testFieldEnableReadonly = function (value) {
        return false;
    };
    /**
     * 更新表单项
     *
     * @param {string} mode 更新模式
     * @returns {void}
     * @memberof IBizForm
     */
    IBizForm.prototype.updateFormItems = function (mode) {
        var _this_1 = this;
        if (this.ignoreUFI) {
            return;
        }
        var activeData = this.getActiveData();
        // tslint:disable-next-line:prefer-const
        var arg = {};
        this.fire(IBizForm.UPDATEFORMITEMBEFORE, activeData);
        Object.assign(arg, { srfaction: 'updateformitem', srfufimode: mode, srfactivedata: JSON.stringify(activeData), srfctrlid: this.getName() });
        this.ignoreUFI = true;
        // this.ignoreformfieldchange=true;
        this.load(arg).subscribe(function (action) {
            _this_1.fire(IBizForm.UPDATEFORMITEMED, action.data);
            _this_1.setFieldAsyncConfig(action.config);
            _this_1.setFieldState(action.state);
            if (action.dataaccaction) {
                _this_1.setDataAccAction(action.dataaccaction);
            }
            _this_1.fillForm(action.data);
            _this_1.ignoreUFI = false;
            // this.ignoreformfieldchange=false;
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            // IBiz.alert(IGM('IBIZFORM.UPDATEFORMITEMS.TITLE', '更新失败'), IGM('IBIZFORM.UPDATEFORMITEMS.INFO', '更新表单项发生错误,' + action.info, [action.info]), 2);
            _this_1.iBizNotification.error('更新失败', '更新表单项发生错误, ' + action.info);
            _this_1.ignoreUFI = false;
            // this.ignoreformfieldchange=false;
        });
    };
    /**
     * 重置表单
     *
     * @memberof IBizForm
     */
    IBizForm.prototype.reset = function () {
        this.autoLoad();
    };
    /**
     * 获取表单类型
     *
     * @returns {string}
     * @memberof IBizForm
     */
    IBizForm.prototype.getFormType = function () {
        return undefined;
    };
    /**
     *
     *
     * @param {string} fieldName
     * @param {boolean} state
     * @param {string} errorInfo
     * @memberof IBizForm
     */
    IBizForm.prototype.setFormFieldChecked = function (fieldName, state, errorInfo) {
        var field = this.findField(fieldName);
        if (field) {
            field.setErrorInfo({ validateStatus: state ? 'error' : 'success', hasError: state ? true : false, errorInfo: state ? errorInfo : '' });
        }
    };
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
    IBizForm.UPDATEFORMITEMBEFORE = 'UPDATEFORMITEMBEFORE';
    IBizForm.UPDATEFORMITEMED = 'UPDATEFORMITEMED';
    IBizForm.BEFORELOAD = 'BEFORELOAD';
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
 * 编辑表单
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
        return _super.call(this, opts) || this;
    }
    /**
     * 数据保存
     *
     * @param {*} [opt={}]
     * @returns {void}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.save2 = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        this.fire(IBizEditForm.FORMBEFORESAVE, arg);
        if (opt) {
            Object.assign(arg, opt);
        }
        var data = this.getValues();
        Object.assign(arg, data);
        if (Object.is(data.srfuf, '1')) {
            Object.assign(arg, { srfaction: 'update', srfctrlid: this.getName() });
        }
        else {
            Object.assign(arg, { srfaction: 'create', srfctrlid: this.getName() });
        }
        arg.srfcancel = false;
        // this.fireEvent(IBizEditForm.FORMBEFORESAVE, this, arg);
        if (arg.srfcancel) {
            return;
        }
        delete arg.srfcancel;
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        this.submit(arg).subscribe(function (action) {
            _this.resetFormError();
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            // 判断是否有提示
            if (action.info && !Object.is(action.info, '')) {
                // IBiz.alert('', action.info, 1);
                _this.iBizNotification.info('', action.info);
            }
            // this.fireEvent('formsaved', this, action);
            _this.fire(IBizForm.FORMSAVED, _this);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // this.fireEvent('formfieldchanged', null);
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
            _this.onSaved();
        }, function (action) {
            if (action.error) {
                _this.setFormError(action.error);
            }
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // this.fireEvent(IBizEditForm.FORMSAVEERROR, this);
            _this.fire(IBizEditForm.FORMSAVEERROR, _this);
            action.failureType = 'SERVER_INVALID';
            if (action.ret === 10) {
                _this.iBizNotification.confirm('保存错误信息', '保存数据发生错误, ' + _this.getActionErrorInfo(action) + ', 是否要重新加载数据？').subscribe(function (result) {
                    if (result && Object.is(result, 'OK')) {
                        _this.reload();
                    }
                });
            }
            else {
                _this.iBizNotification.error('保存错误信息', '保存数据发生错误,' + _this.getActionErrorInfo(action));
            }
        });
    };
    /**
     *
     *
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.onSaved = function () {
    };
    /**
     * 表单数据刷新
     *
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.reload = function () {
        var field = this.findField('srfkey');
        // tslint:disable-next-line:prefer-const
        var loadarg = {};
        if (field) {
            loadarg.srfkey = field.getValue();
            if (loadarg.srfkey.indexOf('SRFTEMPKEY:') === 0) {
                field = this.findField('srforikey');
                if (field) {
                    loadarg.srfkey = field.getValue();
                }
            }
            var viewController = this.getViewController();
            if (viewController) {
                var viewParmams = viewController.getViewParam();
                if (!Object.is(loadarg.srfkey, viewParmams.srfkey)) {
                    loadarg.srfkey = viewParmams.srfkey;
                }
            }
        }
        this.autoLoad(loadarg);
    };
    /**
     * 删除
     *
     * @param {*} [opt={}]
     * @returns {void}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.remove = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        if (opt) {
            Object.assign(arg, opt);
        }
        if (!arg.srfkey) {
            var field = this.findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
        }
        if (!arg.srfkey || Object.is(arg.srfkey, '')) {
            // IBiz.alert(IGM('IBIZEDITFORM.REMOVEFAILED.TITLE', '删除错误信息'), IGM('IBIZEDITFORM.UNLOADDATA', '当前表单未加载数据！'), 2);
            this.iBizNotification.error('删除错误信息', '当前表单未加载数据！');
            return;
        }
        Object.assign(arg, { srfaction: 'remove', srfctrlid: this.getName() });
        this.ignoreUFI = true;
        this.load(arg).subscribe(function (action) {
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            // this.fireEvent(IBizForm.FORMREMOVED);
            _this.fire(IBizForm.FORMREMOVED, _this);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            _this.iBizNotification.error('删除错误信息', '删除数据发生错误, ' + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
        });
    };
    /**
     * 工作流启动
     *
     * @param {*} [opt={}]
     * @returns {void}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.wfstart = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        if (opt) {
            Object.assign(arg, opt);
        }
        if (!arg.srfkey) {
            var field = this.findField('srfkey');
            if (field) {
                arg.srfkey = field.getValue();
            }
            field = this.findField('srforikey');
            if (field) {
                // tslint:disable-next-line:prefer-const
                var v = field.getValue();
                if (v && !Object.is(v, '')) {
                    arg.srfkey = v;
                }
            }
        }
        if (!arg.srfkey || Object.is(arg.srfkey, '')) {
            // IBiz.alert(IGM('IBIZEDITFORM.WFSTARTFAILED.TITLE', '启动流程错误信息'), IGM('IBIZEDITFORM.UNLOADDATA', '当前表单未加载数据！'), 2);
            this.iBizNotification.error('启动流程错误信息', '当前表单未加载数据！');
            return;
        }
        Object.assign(arg, { srfaction: 'wfstart', srfctrlid: this.getName() });
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        this.iBizHttp.post(this.getBackendUrl(), arg).subscribe(function (action) {
            if (action.ret !== 0) {
                action.failureType = 'SERVER_INVALID';
                _this.iBizNotification.error('启动流程错误信息', '启动流程发生错误,' + _this.getActionErrorInfo(action));
                _this.ignoreUFI = false;
                _this.ignoreformfieldchange = false;
                return;
            }
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED);
            // this.fireEvent(IBizForm.FORMWFSTARTED);
            _this.fire(IBizForm.FORMWFSTARTED, _this);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            _this.iBizNotification.error('启动流程错误信息', '启动流程发生错误,' + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
        });
    };
    /**
     * 工作流提交
     *
     * @param {*} [opt={}]
     * @returns {void}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.wfsubmit = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        // tslint:disable-next-line:prefer-const
        var arg = {};
        if (opt) {
            Object.assign(arg, opt);
        }
        var data = this.getValues();
        Object.assign(arg, data);
        Object.assign(arg, { srfaction: 'wfsubmit', srfctrlid: this.getName() });
        //        if (!arg.srfkey) {
        //            var field = this.findField('srfkey');
        //            if (field) {
        //                arg.srfkey = field.getValue();
        //            }
        //        }
        if (!arg.srfkey || Object.is(arg.srfkey, '')) {
            // IBiz.alert(IGM('IBIZEDITFORM.WFSUBMITFAILED.TITLE', '提交流程错误信息'), IGM('IBIZEDITFORM.UNLOADDATA', '当前表单未加载数据！'), 2);
            this.iBizNotification.error('提交流程错误信息', '当前表单未加载数据！');
            return;
        }
        this.ignoreUFI = true;
        this.ignoreformfieldchange = true;
        this.load(arg).subscribe(function (action) {
            _this.setFieldAsyncConfig(action.config);
            _this.setFieldState(action.state);
            _this.setDataAccAction(action.dataaccaction);
            _this.fillForm(action.data);
            _this.formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED);
            // this.fireEvent(IBizForm.FORMWFSUBMITTED);
            _this.fire(IBizForm.FORMWFSUBMITTED, _this);
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            _this.fire(IBizForm.FORMFIELDCHANGED, null);
        }, function (action) {
            action.failureType = 'SERVER_INVALID';
            _this.iBizNotification.error('提交流程错误信息', '工作流提交发生错误,' + _this.getActionErrorInfo(action));
            _this.ignoreUFI = false;
            _this.ignoreformfieldchange = false;
        });
    };
    /**
     * 界面行为
     *
     * @param {*} [arg={}]
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.doUIAction = function (arg) {
        var _this = this;
        if (arg === void 0) { arg = {}; }
        // tslint:disable-next-line:prefer-const
        var opt = {};
        if (arg) {
            Object.assign(opt, arg);
        }
        Object.assign(opt, { srfaction: 'uiaction', srfctrlid: this.getName() });
        this.iBizHttp.post(this.getBackendUrl(), opt).subscribe(function (data) {
            if (data.ret === 0) {
                // IBiz.processResultBefore(data);
                _this.fire(IBizEditForm.UIACTIONFINISHED, data);
                if (data.reloadData) {
                    _this.reload();
                }
                if (data.info && !Object.is(data.info, '')) {
                    _this.iBizNotification.info('', data.info);
                }
                // IBiz.processResult(data);
            }
            else {
                _this.iBizNotification.error('界面操作错误信息', '操作失败,' + data.errorMessage);
            }
        }, function (error) {
            _this.iBizNotification.error('界面操作错误信息', '操作失败,' + error.info);
        });
    };
    /**
     * 表单类型
     *
     * @returns {string}
     * @memberof IBizEditForm
     */
    IBizEditForm.prototype.getFormType = function () {
        return 'EDITFORM';
    };
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
     * @param {*} [opt={}]
     * @memberof IBizSearchForm
     */
    function IBizSearchForm(opt) {
        if (opt === void 0) { opt = {}; }
        var _this = _super.call(this, opt) || this;
        /**
         * 是搜重置搜索
         *
         * @type {boolean}
         * @memberof IBizSearchForm
         */
        _this.bResetting = false;
        /**
         * 是否有更多搜索
         *
         * @memberof IBizSearchForm
         */
        _this.searchMore = false;
        /**
         * 搜索表单是否打开
         *
         * @type {boolean}
         * @memberof IBizSearchForm
         */
        _this.opened = false;
        return _this;
    }
    /**
     * 表单类型
     *
     * @returns {string}
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.getFormType = function () {
        return 'SEARCHFORM';
    };
    /**
     * 更多搜索
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.toggleSearchMore = function () {
        this.searchMore = !this.searchMore;
    };
    /**
     * 执行搜索功能
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.onSearch = function () {
        this.fire(IBizSearchForm.FORMSEARCHED, null);
    };
    /**
     * 重置表单
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.onReset = function () {
        this.bResetting = true;
        this.reset();
    };
    /**
     * 搜索表单草稿加载完成
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.onDraftLoaded = function () {
        _super.prototype.onDraftLoaded.call(this);
        if (this.bResetting) {
            this.bResetting = false;
            this.fire(IBizSearchForm.FORMRESETED, null);
        }
    };
    /**
     * 搜索表单加载完成
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this.bResetting) {
            this.bResetting = false;
            this.fire(IBizSearchForm.FORMRESETED, null);
        }
    };
    /**
     * 搜索功能是否支持,全支持
     *
     * @returns {boolean}
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.isOpen = function () {
        // return this.opened;
        return true;
    };
    /**
     * 设置搜索表单是否展开
     *
     * @param {boolean} open
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.setOpen = function (open) {
        this.opened = open;
    };
    /**
     * 关闭搜索功能
     *
     * @memberof IBizSearchForm
     */
    IBizSearchForm.prototype.close = function () {
        this.opened = false;
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
 * 分页
 *
 * @class IBizTab
 * @extends {IBizControl}
 */
var IBizTab = /** @class */ (function (_super) {
    __extends(IBizTab, _super);
    /**
     * Creates an instance of IBizTab.
     * 创建 IBizTab 实例
     * @param {*} [opts={}]
     * @memberof IBizTab
     */
    function IBizTab(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 激活分页部件分页数
         *
         * @type {number}
         * @memberof IBizTab
         */
        _this_1.activeTabIndex = 0;
        /**
         * 分页部件对象
         *
         * @type {*}
         * @memberof IBizTab
         */
        _this_1.tabs = {};
        var _this = _this_1;
        _this.regTabs();
        return _this_1;
    }
    /**
     * 注册所有分页部件对象
     *
     * @memberof IBizTab
     */
    IBizTab.prototype.regTabs = function () {
    };
    /**
     * 注册分页部件对象
     *
     * @param {*} [tab={}]
     * @memberof IBizTab
     */
    IBizTab.prototype.regTab = function (tab) {
        if (tab === void 0) { tab = {}; }
        if (Object.keys(tab).length > 0 && tab.name) {
            this.tabs[tab.name] = tab;
        }
    };
    /**
     * 获取分页部件对象
     *
     * @param {string} name
     * @returns {*}
     * @memberof IBizTab
     */
    IBizTab.prototype.getTab = function (name) {
        if (this.tabs[name]) {
            return this.tabs[name];
        }
        return undefined;
    };
    /**
     * 设置激活分页数
     *
     * @param {number} index
     * @memberof IBizTab
     */
    IBizTab.prototype.setActiveTab = function (index) {
        var _this_1 = this;
        setTimeout(function () {
            _this_1.activeTabIndex = index;
        });
    };
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
        return _super.call(this, opts) || this;
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
 * 多视图面板
 *
 * @class IBizViewPanel
 * @extends {IBizTab}
 */
var IBizViewPanel = /** @class */ (function (_super) {
    __extends(IBizViewPanel, _super);
    /**
     * Creates an instance of IBizViewPanel.
     * 创建 IBizViewPanel 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizViewPanel
     */
    function IBizViewPanel(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return IBizViewPanel;
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
 * 拾取数据视图面板
 *
 * @class IBizPickupViewPanel
 * @extends {IBizViewPanel}
 */
var IBizPickupViewPanel = /** @class */ (function (_super) {
    __extends(IBizPickupViewPanel, _super);
    /**
     * Creates an instance of IBizPickupViewPanel.
     * 创建 IBizPickupViewPanel 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizPickupViewPanel
     */
    function IBizPickupViewPanel(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 父数据
         *
         * @type {*}
         * @memberof IBizPickupViewPanel
         */
        _this.parentData = {};
        /**
         * 选中数据
         *
         * @type {Array<any>}
         * @memberof IBizPickupViewPanel
         */
        _this.selections = [];
        /**
         * 所有数据
         *
         * @type {Array<any>}
         * @memberof IBizPickupViewPanel
         */
        _this.allData = [];
        return _this;
    }
    /**
     * 获取所有数据
     *
     * @returns {Array<any>}
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.getAllData = function () {
        return this.allData;
    };
    /**
     * 获取所有选中数据
     *
     * @returns {Array<any>}
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.getSelections = function () {
        return this.selections;
    };
    /**
     * 数据选中
     *
     * @param {Array<any>} event
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.onSelectionChange = function (event) {
        this.selections = event;
        this.fire(IBizPickupViewPanel.SELECTIONCHANGE, this.selections);
    };
    /**
     * 数据激活
     *
     * @param {Array<any>} event
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.onDataActivated = function (event) {
        this.selections = event;
        this.fire(IBizPickupViewPanel.DATAACTIVATED, this.selections);
    };
    /**
     * 全部数据
     *
     * @param {Array<any>} event
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.onAllData = function (event) {
        this.allData = event;
        this.fire(IBizPickupViewPanel.ALLDATA, this.allData);
    };
    /**
     * 设置父数据
     *
     * @param {*} [parentData={}]
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.setParentData = function (parentData) {
        if (parentData === void 0) { parentData = {}; }
        this.parentData = parentData;
    };
    /**
     * 刷新面板
     *
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.prototype.refreshViewPanel = function () {
    };
    /*****************事件声明************************/
    /**
     * 数据选中
     *
     * @static
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.SELECTIONCHANGE = 'SELECTIONCHANGE';
    /**
     * 数据激活
     *
     * @static
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.DATAACTIVATED = 'DATAACTIVATED';
    /**
     * 数据全选
     *
     * @static
     * @memberof IBizPickupViewPanel
     */
    IBizPickupViewPanel.ALLDATA = 'ALLDATA';
    return IBizPickupViewPanel;
}(IBizViewPanel));

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
        var _this = _super.call(this, opts) || this;
        /**
         * 数据项节点集合
         *
         * @type {Array<any>}
         * @memberof IBizTree
         */
        _this.items = [];
        /**
         * 树节点数据
         *
         * @type {Array<any>}
         * @memberof IBizTree
         */
        _this.nodes = [];
        /**
         * 默认节点
         *
         * @private
         * @type {*}
         * @memberof IBizTree
         */
        _this.node = {};
        /**
         * 选中数据项
         *
         * @type {Array<string>}
         * @memberof IBizTree
         */
        _this.selectedKeys = [];
        return _this;
    }
    /**
     * 加载节点数据
     *
     * @param {*} [treeCfg={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.load = function (treeCfg) {
        var _this = this;
        if (treeCfg === void 0) { treeCfg = {}; }
        // tslint:disable-next-line:prefer-const
        var param = {
            srfnodeid: this.node.id ? this.node.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(this.getViewController().getViewParam()),
            srfctrlid: this.getName()
        };
        this.iBizHttp.post(this.getBackendUrl(), param).subscribe(function (result) {
            if (result.ret !== 0) {
                _this.iBizNotification.error('错误', result.info);
                return;
            }
            _this.items = result.items.slice();
            _this.items.forEach(function (item) {
                // this.nodes.push(new NzTreeNode({ title: item.text, key: item.srfkey, children: [] }));
            });
            _this.fire(IBizTree.CONTEXTMENU, _this.items);
        }, function (error) {
            _this.iBizNotification.error('错误', error.info);
        });
    };
    /**
     * 获取选择节点数据
     *
     * @param {any} bFull true：返回的数据包含节点全部数据，false：返回的数据仅包含节点ID
     * @returns {*}
     * @memberof IBizTree
     */
    IBizTree.prototype.getSelected = function (bFull) {
    };
    /**
     * 获取所有节点数据
     *
     * @returns {Array<any>}
     * @memberof IBizTree
     */
    IBizTree.prototype.getNodes = function () {
        return this.items;
    };
    /**
     * 节点重新加载
     *
     * @param {*} [node={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.reload = function (node) {
        if (node === void 0) { node = {}; }
    };
    /**
     * 删除节点
     *
     * @param {any} node
     * @memberof IBizTree
     */
    IBizTree.prototype.remove = function (node) {
    };
    /**
     * 实体界面行为
     *
     * @param {any} params
     * @memberof IBizTree
     */
    IBizTree.prototype.doUIAction = function (params) {
    };
    IBizTree.prototype.mouseAction = function (name, e) {
        var _this = this;
        if (!Object.is(name, 'expand') || (!e || !e.node || !e.node.origin)) {
            return;
        }
        if (e.node.getChildren().length !== 0 || !e.node.isExpanded) {
            return;
        }
        var node = e.node.origin;
        var _treeitem = this.getTreeItem(this.items, node.key);
        if (Object.keys(_treeitem).length === 0) {
            return;
        }
        var param = {
            srfnodeid: _treeitem.id ? _treeitem.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(this.getViewController().getViewParam()),
            srfctrlid: this.getName()
        };
        this.iBizHttp.post(this.getBackendUrl(), param).subscribe(function (result) {
            if (result.ret !== 0) {
                return;
            }
            if (!result.items || !Array.isArray(result.items)) {
                return;
            }
            if (result.items.length === 0) {
                e.node.isLeaf = true;
            }
            else {
                // tslint:disable-next-line:prefer-const
                var data_1 = [];
                result.items.forEach(function (item) {
                    data_1.push({ title: item.text, key: item.srfkey, children: [] });
                });
                _this.addTreeChildItems(_this.items, node.key, result.items);
                e.node.addChildren(data_1);
            }
        }, function (error) {
            _this.iBizNotification.error('错误', error.info);
        });
    };
    /**
     * 获取数据数据节点
     *
     * @private
     * @param {Array<any>} items
     * @param {string} srfkey
     * @returns {*}
     * @memberof IBizTree
     */
    IBizTree.prototype.getTreeItem = function (items, srfkey) {
        var _this = this;
        // tslint:disable-next-line:prefer-const
        var _item = {};
        items.some(function (item) {
            if (Object.is(item.srfkey, srfkey)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items) {
                var subItem = _this.getTreeItem(item.items, srfkey);
                if (subItem && Object.keys(subItem).length > 0) {
                    Object.assign(_item, subItem);
                    return true;
                }
            }
        });
        return _item;
    };
    /**
     * 添加子节点数据值树数据中
     *
     * @private
     * @param {Array<any>} items
     * @param {string} srfkey
     * @param {Array<any>} childItems
     * @memberof IBizTree
     */
    IBizTree.prototype.addTreeChildItems = function (items, srfkey, childItems) {
        var _this = this;
        items.some(function (item) {
            if (Object.is(item.srfkey, srfkey)) {
                item.items = [];
                Object.assign(item, { items: childItems });
                return true;
            }
            if (item.items) {
                _this.addTreeChildItems(item.items, srfkey, childItems);
            }
        });
    };
    /**
     * 设置树选中数据节点
     *
     * @private
     * @param {*} [item={}]
     * @memberof IBizTree
     */
    IBizTree.prototype.setSelectTreeItem = function (item) {
        if (item === void 0) { item = {}; }
        this.selectedKeys = [];
        this.selectedKeys.push(item.srfkey);
    };
    /**
     * 树节点激活选中数据
     *
     * @param {*} event
     * @memberof IBizTree
     */
    IBizTree.prototype.onEvent = function (event) {
        if (event && Object.is(event.eventName, 'click')) {
            var record = event.node.origin;
            var _item = this.getTreeItem(this.items, record.key);
            this.fire(IBizTree.SELECTIONCHANGE, [_item]);
        }
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
 * 树导航
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
        var _this = _super.call(this, opts) || this;
        var viewController = _this.getViewController();
        if (viewController) {
            // viewController.on(IBizViewController.INITED).subscribe(() => {
            //     const tree = viewController.$controls.get(this.getName() + '_tree');
            //     this.tree = tree;
            //     if (this.tree) {
            //         this.tree.on(IBizTree.SELECTIONCHANGE).subscribe((args) => {
            //             this.onTreeSelectionChange(args);
            //         });
            //         this.tree.on(IBizTree.CONTEXTMENU).subscribe((args) => {
            //             this.onTreeContextMenu(args);
            //         });
            //         this.tree.load({});
            //     }
            // });
        }
        return _this;
    }
    /**
     * 获取树控件
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getTree = function () {
        var viewController = this.getViewController();
        if (viewController) {
            return viewController.$controls.get(this.getName() + '_tree');
        }
        return undefined;
    };
    /**
     * 获取导航分页部件服务对象
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getExpTab = function () {
        var viewController = this.getViewController();
        if (viewController) {
            return viewController.$controls.get('exptab');
        }
        return undefined;
    };
    /**
     * 获取树配置信息
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getTreeCfg = function () {
        return undefined || {};
    };
    /**
     * 获取到导航嵌入
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getExpFrame = function () {
        return undefined;
    };
    /**
     * 获取  PickupviewpanelService （选择视图面板部件服务对象）
     * 判断视图视图类型
     *
     * @returns {*}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getPVPanel = function () {
        var viewController = this.getViewController();
        if (viewController) {
            return viewController.$controls.get('pickupviewpanel');
        }
        return undefined;
    };
    /**
     * 节点选中变化
     *
     * @param {Array<any>} records
     * @returns {void}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.onTreeSelectionChange = function (records) {
        if (!records || records.length === 0) {
            return;
        }
        var record = records[0];
        this.setTreeSelect(record);
        // 替换键值
        var nodeids = record.id.split(';');
        var nodetext = record.text;
        var nodetag = record.nodetag;
        var nodetag2 = record.nodetag2;
        var nodetag3 = record.nodetag3;
        var nodetag4 = record.nodetag4;
        var controller = this.getViewController();
        if (this.getExpTab()) {
            var viewarg = { viewid: record.srfnodetype };
            var viewItem = controller.getExpItemView(viewarg);
            if (!viewItem) {
                this.fire(IBizTreeExpBar.SELECTIONCHANGE, { viewid: record.srfnodetype, viewParam: {} });
                return;
            }
            // tslint:disable-next-line:prefer-const
            var viewParam = {};
            if (viewItem.viewparam) {
                Object.assign(viewParam, viewItem.viewparam);
            }
            for (var key in viewParam) {
                if (viewParam.hasOwnProperty(key)) {
                    var value = viewParam[key];
                    if (value) {
                        value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                        if (nodetag && !Object.is(nodetag, '')) {
                            value = value.replace(new RegExp('%NODETAG%', 'g'), nodetag);
                        }
                        if (nodetag2 && !Object.is(nodetag2, '')) {
                            value = value.replace(new RegExp('%NODETAG2%', 'g'), nodetag2);
                        }
                        if (nodetag3 && !Object.is(nodetag3, '')) {
                            value = value.replace(new RegExp('%NODETAG3%', 'g'), nodetag3);
                        }
                        if (nodetag4 && !Object.is(nodetag4, '')) {
                            value = value.replace(new RegExp('%NODETAG4%', 'g'), nodetag4);
                        }
                        // 进行替换
                        for (var i = 1; i < nodeids.length; i++) {
                            value = value.replace(new RegExp('%NODEID' + ((i === 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                        }
                        viewParam[key] = value;
                    }
                }
            }
            this.fire(IBizTreeExpBar.SELECTIONCHANGE, { viewid: record.srfnodetype, viewParam: viewParam });
            return;
        }
        if (this.getPVPanel()) {
            // tslint:disable-next-line:prefer-const
            var viewarg = { nodetype: record.srfnodetype };
            // tslint:disable-next-line:prefer-const
            var viewParam = controller.getNavViewParam(viewarg);
            if (!viewParam) {
                return;
            }
            for (var key in viewParam) {
                if (viewParam.hasOwnProperty(key)) {
                    var value = viewParam[key];
                    if (value) {
                        value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                        if (nodetag && !Object.is(nodetag, '')) {
                            value = value.replace(new RegExp('%NODETAG%', 'g'), nodetag);
                        }
                        if (nodetag2 && !Object.is(nodetag2, '')) {
                            value = value.replace(new RegExp('%NODETAG2%', 'g'), nodetag2);
                        }
                        if (nodetag3 && !Object.is(nodetag3, '')) {
                            value = value.replace(new RegExp('%NODETAG3%', 'g'), nodetag3);
                        }
                        if (nodetag4 && !Object.is(nodetag4, '')) {
                            value = value.replace(new RegExp('%NODETAG4%', 'g'), nodetag4);
                        }
                        // 进行替换
                        for (var i = 1; i < nodeids.length; i++) {
                            value = value.replace(new RegExp('%NODEID' + ((i === 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                        }
                        viewParam[key] = value;
                    }
                }
            }
            this.getPVPanel().setParentData(viewParam);
            // this.fire(IBizEvent.IBizTreeExpBar_SELECTIONCHANGE, { viewid: record.srfnodetype, viewParam: viewParam });
            return;
        }
        if (this.getExpFrame()) {
            // var viewarg = { viewid: tag.srfnodetype };
            // var viewItem = controller.getExpItemView(viewarg);
            // if (viewItem == null)
            //     return;
            // var viewParam = {};
            // if (viewItem.viewparam) {
            //     $.extend(viewParam, viewItem.viewparam);
            // }
            // for (var key in viewParam) {
            //     var value = viewParam[key];
            //     if (value) {
            //         value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
            //         //进行替换
            //         for (var i = 1; i < nodeids.length; i++) {
            //             value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
            //         }
            //         viewParam[key] = value;
            //     }
            // }
            // var url = $.getIBizApp().parseURL(BASEURL, viewItem.viewurl, {});
            // url += '&' + $.param({ 'srfifchild': true, 'srfparentdata': JSON.stringify(viewParam) });
            // this.getExpFrame().attr('src', url);
            // return;
        }
    };
    /**
     * 树内容菜单
     *
     * @param {Array<any>} nodes
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.onTreeContextMenu = function (nodes) {
        this.node = {};
        if (nodes.length > 0) {
            Object.assign(this.node, nodes[0]);
            this.onTreeSelectionChange([this.node]);
        }
    };
    /**
     * 设置树选中数据
     *
     * @private
     * @param {*} [item={}]
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.setTreeSelect = function (item) {
        if (item === void 0) { item = {}; }
        var viewController = this.getViewController();
        if (viewController) {
            var tree = viewController.$controls.get(this.getName() + '_tree');
            this.tree = tree;
            if (this.tree) {
                this.tree.setSelectTreeItem(item);
            }
        }
    };
    /**
     * 获取计数器名称，在发布器中重写
     *
     * @returns {string}
     * @memberof IBizTreeExpBar
     */
    IBizTreeExpBar.prototype.getUICounterName = function () {
        return undefined;
    };
    IBizTreeExpBar.SELECTIONCHANGE = 'SELECTIONCHANGE';
    IBizTreeExpBar.LOADED = 'LOADED';
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
 * 工作流树导航部件
 *
 * @class IBizWFExpBar
 * @extends {IBizControl}
 */
var IBizWFExpBar = /** @class */ (function (_super) {
    __extends(IBizWFExpBar, _super);
    /**
     * Creates an instance of IBizWFExpBar.
     * 创建 IBizWFExpBar 实例
     *
     * @param {*} [otps={}]
     * @memberof IBizWFExpBar
     */
    function IBizWFExpBar(otps) {
        if (otps === void 0) { otps = {}; }
        var _this_1 = _super.call(this, otps) || this;
        /**
     * 导航树部件是否收缩，默认展开
     *
     * @type {boolean}
     * @memberof IBizWFExpBarService
     */
        _this_1.isCollapsed = true;
        /**
         * 导航菜单数据项
         *
         * @type {Array<any>}
         * @memberof IBizWFExpBarService
         */
        _this_1.items = [];
        /**
         * 选中菜单项
         *
         * @type {*}
         * @memberof IBizWFExpBarService
         */
        _this_1.selectItem = {};
        /**
         * 计数器
         *
         * @type {IBizUICounterService}
         * @memberof IBizWFExpBarService
         */
        _this_1.UICounter = null;
        var _this = _this_1;
        if (_this.getViewController()) {
            var viewController = _this.getViewController();
            // viewController.on(IBizViewController.INITED).subscribe(() => {
            //     _this.UICounter = viewController.uicounters.get(_this.getUICounterName());
            //     _this.onCounterChanged(_this.items);
            //     _this.UICounter.on(IBizUICounter.COUNTERCHANGED).subscribe((data) => {
            //         _this.onCounterChanged(_this.items);
            //     });
            // });
        }
        return _this_1;
    }
    /**
     * 加载导航树数据
     *
     * @param {*} _opt
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.load = function (_opt) {
        var _this_1 = this;
        var _this = this;
        var opts = {};
        Object.assign(opts, _opt);
        Object.assign(opts, { srfaction: 'fetch', srfctrlid: this.getName() });
        _this.iBizHttp.post(this.getBackendUrl(), opts).subscribe(function (result) {
            if (result.ret === 0) {
                // this.items = result.items;
                _this_1.onCounterChanged(result.items);
                _this_1.formarItems(_this_1.items);
                _this_1.items = result.items.slice();
                _this_1.fire(IBizWFExpBar.LOADED, _this_1.items[0]);
            }
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * 格式化数据项
     *
     * @private
     * @param {*} _items
     * @returns {*}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.formarItems = function (_items) {
        var _this = this;
        _items.forEach(function (item) {
            if (item.checked) {
                Object.assign(_this.selectItem, item);
            }
            item.bchecked = item.checked ? true : false;
            if (item.items) {
                var hasItemCheck = _this.formarItems(item.items);
                if (hasItemCheck) {
                    item.expanded = true;
                }
            }
            item.hassubmenu = item.items ? true : false;
        });
    };
    /**
     * 菜单项选中处理
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.selection = function (item) {
        if (item === void 0) { item = {}; }
        if (item.items && item.items.length > 0) {
            return;
        }
        if (Object.is(item.id, this.selectItem.id)) {
            return;
        }
        this.selectItem = {};
        Object.assign(this.selectItem, item);
        this.fire(IBizWFExpBar.SELECTIONCHANGE, this.selectItem);
    };
    /**
     * 菜单节点选中处理
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.expandedAndSelectSubMenu = function (item) {
        if (item === void 0) { item = {}; }
        if (Object.is(item.id, this.selectItem.id)) {
            return;
        }
        this.selectItem = {};
        Object.assign(this.selectItem, item);
        this.fire(IBizWFExpBar.SELECTIONCHANGE, this.selectItem);
    };
    /**
     * 获取计数器名称
     * 在发布器中重写
     *
     * @returns {string}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.getUICounterName = function () {
        return undefined;
    };
    /**
     * 设置选中项
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.setSelectItem = function (item) {
        if (item === void 0) { item = {}; }
        if (item && !Object.is(item.id, this.selectItem.id)) {
            this.selectItem = {};
            Object.assign(this.selectItem, item);
        }
    };
    /**
     * 计数器值变化
     *
     * @private
     * @returns {void}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.onCounterChanged = function (items) {
        if (!this.UICounter) {
            return;
        }
        var data = this.UICounter.getData();
        if (!data) {
            return;
        }
        var bNeedReSelect = this.itemSelect(items, data);
        if (bNeedReSelect) {
            this.selectItem = {};
            Object.assign(this.selectItem, this.items[0]);
            this.fire(IBizWFExpBar.SELECTIONCHANGE, this.selectItem);
        }
    };
    /**
     * 选中项
     *
     * @private
     * @param {Array<any>} items
     * @param {*} [data={}]
     * @returns {boolean}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.itemSelect = function (items, data) {
        var _this_1 = this;
        if (data === void 0) { data = {}; }
        var bNeedReSelect = false;
        items.forEach(function (item) {
            var counterid = item.counterid;
            var countermode = item.countermode;
            item.show = true;
            var count = data[counterid];
            if (!count) {
                count = 0;
            }
            if (count === 0 && countermode && countermode === 1) {
                item.show = false;
                // 判断是否选中列，如果是则重置选中
                if (_this_1.selectItem && Object.is(_this_1.selectItem.id, item.id)) {
                    bNeedReSelect = true;
                }
            }
            item.counterdata = count;
            if (item.items) {
                bNeedReSelect = _this_1.itemSelect(item.items, data);
            }
        });
        return bNeedReSelect;
    };
    /**
     * 获取数据项
     *
     * @returns {Array<any>}
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.prototype.getItems = function () {
        return this.items;
    };
    /*****************事件声明************************/
    /**
     * 选择变化
     *
     * @static
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.SELECTIONCHANGE = "SELECTIONCHANGE";
    /**
     * 加载完成
     *
     * @static
     * @memberof IBizWFExpBar
     */
    IBizWFExpBar.LOADED = 'LOADED';
    return IBizWFExpBar;
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
     *Creates an instance of IBizViewController.
     * 创建 IBizViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizViewController
     */
    function IBizViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this_1 = _super.call(this, opts) || this;
        /**
         * 模态框打开视图注入参数
         *
         * @type {*}
         * @memberof IBizViewController
         */
        _this_1.modalViewParam = {};
        /**
         * 模态框打开视图注入视图层级参数
         *
         * @memberof IBizViewController
         */
        _this_1.modalZIndex = 300;
        /**
         * 关系数据
         *
         * @type {*}
         * @memberof IBizViewController
         */
        _this_1.srfReferData = {};
        /**
         * 视图控制器父对象数据
         *
         * @type {*}implements OnInit, OnDestroy, OnChanges
         * @memberof IBizViewController
         */
        _this_1.srfParentData = {};
        /**
         * 视图控制器父对象模型
         *
         * @type {*}
         * @memberof IBizViewController
         */
        _this_1.srfParentMode = {};
        /**
         * 视图控制器是否初始化
         *
         * @type {boolean}
         * @memberof IBizViewController
         */
        _this_1.bInited = false;
        /**
         * 暂时废弃
         *
         * @type {*}
         * @memberof IBizViewController
         */
        _this_1.itemMap = {};
        /**
         * 视图控制器代码表
         *
         * @type {*}
         * @memberof IBizViewController
         */
        _this_1.codelists = {};
        /**
         * 部件控制器
         *
         * @type {Map<string, any>}
         * @memberof IBizViewController
         */
        _this_1.controls = new Map();
        /**
         * 实体界面行为
         *
         * @type {Map<string, any>}
         * @memberof IBizViewController
         */
        _this_1.uiactions = new Map();
        /**
         * 计数器
         *
         * @type {Map<string, any>}
         * @memberof IBizViewController
         */
        _this_1.uicounters = new Map();
        /**
         * 视图控制器url
         *
         * @private
         * @type {string}
         * @memberof IBizViewController
         */
        _this_1.url = '';
        /**
         * 视图控制器参数
         *
         * @type {*}
         * @memberof IBizViewController
         */
        _this_1.viewParam = {};
        var _this = _this_1;
        _this.url = opts.url;
        return _this_1;
    }
    /**
     * Angular生命周期
     * 在ngOnChanges钩子之后执行，如果组件的某些初始化依赖输入属性，那么依赖输入属性的初始化一定要放在ngOnInit中执行
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.ngOnInit = function () {
        this.parseViewParams();
        this.onInit();
        this.onInited();
    };
    /**
     * Angular生命周期
     * 在组件被销毁的时候调用。
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.ngOnDestroy = function () {
        this.onDestroy();
    };
    /**
     * 视图组件销毁时调用
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onDestroy = function () {
        // if (this.ibizAppService) {
        //     this.ibizAppService.deleteViewController(this.getUUID());
        // }
        this.unRegUICounters();
    };
    /**
     * Angular生命周期
     * @input 值变化时调用
     *
     * @param {*} change
     * @memberof IBizViewController
     */
    IBizViewController.prototype.ngOnChanges = function (change) {
    };
    /**
     * 视图参数变化，嵌入表单，手动刷新数据
     *
     * @param {*} change
     * @memberof IBizViewController
     */
    IBizViewController.prototype.viewParamChange = function (change) {
        if (change && change.srfparentkey && !Object.is(change.srfparentkey, '')) {
            this.addViewParam(change);
            this.refresh();
        }
    };
    /**
     * 视图初始化
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onInit = function () {
        var _this = this;
        _this.regUIActions();
        _this.regUICounters();
        _this.regCodeLists();
        _this.onInitComponents();
        _this.onLoad();
        _this.fire(IBizViewController.INITED, _this);
    };
    /**
     * 部件初始化
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onInitComponents = function () {
    };
    /**
     *
     * 数据加载
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onLoad = function () {
    };
    /**
     * 视图控制器初始化完成
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onInited = function () {
        this.bInited = true;
        // if (this.ibizAppService) {
        //     this.ibizAppService.setViewController(this);
        // }
    };
    /**
     * 开始触发界面行为
     *
     * @param {*} id
     * @memberof IBizViewController
     */
    IBizViewController.prototype.clickButton = function (id) {
        this.onClickTBItem({ tag: id });
    };
    /**
     *
     *
     * @param {any} params
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onClickTBItem = function (params) {
    };
    /**
     * 设置部件
     *
     * @param {string} name
     * @param {*} control
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regControl = function (name, control) {
        var _this = this;
        _this.controls.set(name, control);
    };
    /**
     * 获取部件
     *
     * @param {string} name
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getControl = function (name) {
        var _this = this;
        _this.controls.get(name);
    };
    /**
     * 关闭
     *
     * @returns {boolean}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.isClosed = function () {
        return true;
    };
    /**
     *
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.quit = function () {
    };
    /**
     *
     *
     * @param {string} itemId
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getItem = function (itemId) {
        if (this.itemMap[itemId]) {
            return this.itemMap[itemId];
        }
        return undefined;
    };
    /**
     *
     *
     * @param {string} itemId
     * @param {*} item
     * @memberof IBizViewController
     */
    IBizViewController.prototype.registerItem = function (itemId, item) {
        this.itemMap[itemId] = item;
    };
    /**
     *
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.unloaded = function () {
        return null;
    };
    /**
     * 是否初始化完毕
     *
     * @returns {boolean}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.isInited = function () {
        return this.bInited;
    };
    /**
     *
     *
     * @returns {string}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getAppCtx = function () {
        return '';
    };
    /**
     * 注册子控制器对象
     *
     * @param {*} ctrler
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regController = function (ctrler) {
    };
    /**
     * 获取子控制器对象
     *
     * @param {string} id
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getController = function (id) {
        return undefined;
    };
    /**
     * 获取父控件
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getPController = function () {
        // if (this.ibizAppService) {
        //     return this.ibizAppService.getParentViewController(this.getUUID());
        // }
        // return undefined;
    };
    /**
     * 注销子控制器对象
     *
     * @param {*} ctrler
     * @memberof IBizViewController
     */
    IBizViewController.prototype.unRegController = function (ctrler) {
    };
    /**
     * 注册代码表
     *
     * @param {*} codelist
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regCodeList = function (codelist) {
        if (!this.codelists) {
            this.codelists = {};
        }
        this.codelists[codelist.getId()] = codelist;
    };
    /**
     * 获取代码表
     *
     * @param {string} codelistId
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getCodeList = function (codelistId) {
        if (!this.codelists) {
            return undefined;
        }
        if (this.codelists[codelistId]) {
            return this.codelists[codelistId];
        }
        return undefined;
    };
    /**
     * 注册界面行为
     *
     * @param {*} [uiaction={}]
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regUIAction = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        if (uiaction) {
            this.uiactions.set(uiaction.tag, uiaction);
        }
    };
    /**
     * 获取界面行为
     *
     * @param {string} uiactionId
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getUIAction = function (uiactionId) {
        if (!this.uiactions) {
            return undefined;
        }
        if (this.uiactions[uiactionId]) {
            return this.uiactions[uiactionId];
        }
        return undefined;
    };
    /**
     * 注册界面计数器
     *
     * @param {string} name
     * @param {*} uicounter
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regUICounter = function (name, uicounter) {
        this.uicounters.set(name, uicounter);
    };
    /**
     * 获取界面计数器
     *
     * @param {string} name
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getUICounter = function (name) {
        if (this.uicounters.get(name)) {
            return this.uicounters.get(name);
        }
        return undefined;
    };
    /**
     * 刷新全部界面计数器
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.reloadUICounters = function () {
        if (this.uicounters) {
            for (var tag in this.uicounters) {
                var uicounter = this.uicounters.get(tag);
                if (uicounter) {
                    uicounter.reload();
                }
            }
        }
        var pController = this.getPController();
        if (pController) {
            pController.reloadUICounters();
        }
    };
    /**
     * 获取窗口对象
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getWindow = function () {
        return window;
    };
    /**
     * 是否支持视图模型
     *
     * @returns {boolean}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.isEnableViewModel = function () {
        return false;
    };
    /**
     * 获取后台地址
     *
     * @returns {string}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getBackendUrl = function () {
        if (this.url) {
            return this.url;
        }
        return undefined;
    };
    /**
     * 获取动态视图参数
     *
     * @returns {(any | undefined)}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getDynamicParams = function () {
        return {};
    };
    /**
     * 刷新
     *
     * @private
     * @memberof IBizViewController
     */
    IBizViewController.prototype.refresh = function () {
        this.onRefresh();
    };
    /**
     * 视图刷新方法，继承视图控制器重写
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onRefresh = function () {
    };
    /**
     * 刷新子项
     *
     * @param {string} name
     * @memberof IBizViewController
     */
    IBizViewController.prototype.refreshItem = function (name) {
    };
    /**
     * 设置父数据
     *
     * @param {*} [data={}]
     * @memberof IBizViewController
     */
    IBizViewController.prototype.setParentData = function (data) {
        if (data === void 0) { data = {}; }
        var _this = this;
        _this.srfParentData = {};
        Object.assign(_this.srfParentData, data);
        _this.onSetParentData();
        _this.reloadUpdatePanels();
    };
    /**
     * 设置父数据
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onSetParentData = function () {
    };
    /**
     * 获取父数据
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getParentData = function () {
        var _this = this;
        return _this.srfParentData;
    };
    /**
     * 获取父模式
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getParentMode = function () {
        var _this = this;
        return _this.srfParentMode;
    };
    /**
     * 获取引用数据
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getViewParam = function () {
        return this.viewParam;
    };
    /**
     * 设置关系数据
     *
     * @param {*} [data={}]
     * @memberof IBizViewController
     */
    IBizViewController.prototype.setReferData = function (data) {
        if (data === void 0) { data = {}; }
        var _this = this;
        Object.assign(_this.srfReferData, data);
    };
    /**
     * 获取关系数据
     *
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getReferData = function () {
        var _this = this;
        return _this.srfReferData;
    };
    /**
     * 正常代码表模式
     *
     * @param {string} codeListId 代码表ID
     * @param {string} value 数据值
     * @param {string} emtpytext 空值显示数据
     * @returns {string}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.renderCodeList_Normal = function (codeListId, value, emtpytext) {
        if (!value) {
            return emtpytext;
        }
        var codelist = this.getCodeList(codeListId);
        if (codelist) {
            var result_1 = '';
            var values = value.split(';');
            values.forEach(function (value) {
                var item = codelist.getItemByValue(value);
                if (item) {
                    result_1 += '、' + codelist.getCodeItemText(item);
                }
            });
            if (result_1.length > 1) {
                result_1 = result_1.substring(1);
            }
            return result_1;
        }
        return '';
    };
    /**
     * 代码表数字或处理
     *
     * @param {string} codeListId 代码表ID
     * @param {string} value 数据值
     * @param {string} emtpytext 空值显示信息
     * @param {string} textSeparator 文本拼接方式
     * @returns {string}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.renderCodeList_NumOr = function (codeListId, value, emtpytext, textSeparator) {
        if (!textSeparator || Object.is(textSeparator, '')) {
            textSeparator = '、';
        }
        var strTextOr = '';
        if (!value) {
            return emtpytext;
        }
        var nValue = parseInt(value, 10);
        var codelist = this.getCodeList(codeListId);
        if (codelist) {
            codelist.data.forEach(function (ele) {
                var codevalue = ele.value;
                if ((parseInt(codevalue, 10) & nValue) > 0) {
                    if (strTextOr.length > 0) {
                        strTextOr += (textSeparator);
                    }
                    strTextOr += codelist.getCodeItemText(ele);
                }
            });
        }
        return strTextOr;
    };
    /**
     * 代码表文本或处理
     *
     * @param {string} codeListId 代码表ID
     * @param {*} value 数据值
     * @param {*} emtpytext 空值显示信息
     * @param {*} textSeparator 文本凭借方式
     * @param {*} valueSeparator 数据值分割方式
     * @returns {string}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.renderCodeList_StrOr = function (codeListId, value, emtpytext, textSeparator, valueSeparator) {
        var _this_1 = this;
        if (!textSeparator || Object.is(textSeparator, '')) {
            textSeparator = '、';
        }
        if (!value) {
            return emtpytext;
        }
        var strTextOr = '';
        var codelist = this.getCodeList(codeListId);
        var arrayValue = value.split(valueSeparator);
        arrayValue.forEach(function (value) {
            var strText = '';
            strText = _this_1.renderCodeList_Normal(codeListId, value, emtpytext);
            if (strTextOr.length > 0) {
                strTextOr += (textSeparator);
            }
            strTextOr += strText;
        });
        return strTextOr;
    };
    /**
     *
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.initViewLogic = function () {
    };
    /**
     *
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onPrepareViewLogics = function () {
    };
    /**
     *
     *
     * @param {*} logic
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regViewLogic = function (logic) {
    };
    /**
     *
     *
     * @param {*} tag
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getViewLogic = function (tag) {
        return undefined;
    };
    /**
     *
     *
     * @param {any} ctrlid
     * @param {any} command
     * @param {any} arg
     * @memberof IBizViewController
     */
    IBizViewController.prototype.invokeCtrl = function (ctrlid, command, arg) {
    };
    /**
     * 注册界面更新面板
     *
     * @param {*} updatepanel
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regUpdatePanel = function (updatepanel) {
    };
    /**
     * 获取界面更新面板
     *
     * @param {string} updatepanelId
     * @returns {*}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getUpdatePanel = function (updatepanelId) {
        return undefined;
    };
    /**
     * 刷新全部界面更新面板
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.reloadUpdatePanels = function () {
    };
    /**
     * 填充更新面板调用参数
     *
     * @param {*} [params={}]
     * @memberof IBizViewController
     */
    IBizViewController.prototype.onFillUpdatePanelParam = function (params) {
        if (params === void 0) { params = {}; }
    };
    // 附加方法
    /**
     * 初始化注册界面行为
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regUIActions = function () {
    };
    /**
     * 初始化注册计数器
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regUICounters = function () {
    };
    /**
     * 销毁计数器
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.unRegUICounters = function () {
        var _this_1 = this;
        if (Object.keys(this.uicounters).length == 0) {
            return;
        }
        var _nameArr = Object.keys(this.uicounters);
        _nameArr.forEach(function (name) {
            var _counter = _this_1.getUICounter(name);
            if (_counter) {
                _counter.close();
            }
        });
    };
    /**
     * 初始化代码表
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.regCodeLists = function () {
    };
    /**
     * 解析url参数，初始化调用
     *
     * @private
     * @memberof IBizViewController
     */
    IBizViewController.prototype.parseViewParams = function () {
    };
    /**
     * 添加视图参数, 处理视图刷新操作
     *
     * @param {*} [param={}]
     * @memberof IBizViewController
     */
    IBizViewController.prototype.addViewParam = function (param) {
        if (param === void 0) { param = {}; }
        Object.assign(this.viewParam, param);
        if (this.isInited()) {
            if (this.viewParam.refreshView) {
                this.viewParam = {};
                delete this.viewParam.refreshView;
                Object.assign(this.viewParam, param);
                this.onLoad();
            }
        }
    };
    /**
     * 打开数据视图,模态框打开
     *
     * @param {*} [view={}]
     * @returns {Subject<any>}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.openModal = function (view) {
        if (view === void 0) { view = {}; }
        return null;
    };
    /**
     * 打开数据视图;打开方式,路由打开
     *
     * @param {string} routeString 相对路由地址
     * @param {*} [routeParam={}] 激活路由参数
     * @param {*} [queryParams] 路由全局查询参数
     * @memberof IBizViewController
     */
    IBizViewController.prototype.openView = function (routeString, routeParam, queryParams) {
        if (routeParam === void 0) { routeParam = {}; }
        var params = {};
    };
    /**
    * 视图是否是模态框对象
    *
    * @returns {boolean}
    * @memberof IBizViewController
    */
    IBizViewController.prototype.isModal = function () {
        if (this.modalViewParam) {
            return true;
        }
        return false;
    };
    /**
     * 获取实体名称
     *
     * @returns {string}
     * @memberof IBizViewController
     */
    IBizViewController.prototype.getDEName = function () {
        return '';
    };
    /**
     * 返回历史记录
     *
     * @memberof IBizViewController
     */
    IBizViewController.prototype.goBack = function () {
    };
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
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.actionmode, 'WFFRONT')) {
            if (Object.is(uiaction.fronttype, 'WIZARD') || Object.is(uiaction.fronttype, 'SHOWPAGE')) {
                var className = void 0;
                if (uiaction.frontview.className) {
                    className = uiaction.frontview.className;
                }
                else {
                    className = uiaction.frontview.classname;
                }
                var opt = {};
                var data = this.getFrontUIActionParam(uiaction, params);
                opt.modalZIndex = this.modalZIndex;
                opt.viewParam = {};
                if (data) {
                    Object.assign(opt.viewParam, data);
                }
                if (uiaction.frontview.viewParam) {
                    Object.assign(opt.viewParam, uiaction.frontview.viewParam);
                }
                else {
                    Object.assign(opt.viewParam, uiaction.frontview.viewparam);
                }
                // 打开模态框
                // const modalService: any = this.getModalService(className);
                // if (modalService) {
                //     modalService.openModal(opt).subscribe((result) => {
                //         if (result && Object.is(result.ret, 'OK')) {
                //             this.onWFUIFrontWindowClosed(result);
                //         }
                //     });
                // }
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
 * 首页应用视图
 *
 * @class IBizIndexViewController
 * @extends {IBizMainViewController}
 */
var IBizIndexViewController = /** @class */ (function (_super) {
    __extends(IBizIndexViewController, _super);
    /**
     * Creates an instance of IBizIndexViewController.
     * 创建 IBizIndexViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizIndexViewController
     */
    function IBizIndexViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 视图类型
         *
         * @type {string}
         * @memberof IBizIndexViewController
         */
        _this.viewtype = 'index';
        return _this;
    }
    /**
     * 应用菜单部件初始化
     *
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var appMenu = this.getAppMenu();
        if (appMenu) {
            // 菜单加载完成
            appMenu.on(IBizAppMenu.LOADED).subscribe(function (items) {
                _this.appMenuLoaded(items);
            });
        }
    };
    /**
     * 部件加载
     *
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var appMenu = this.getAppMenu();
        if (appMenu) {
            appMenu.load();
        }
        this.setMianMenuState();
    };
    /**
     * 应用菜单部件加载完成,调用基类处理
     *
     * @private
     * @param {any[]} items
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.appMenuLoaded = function (items) {
    };
    /**
     * 获取表单项
     *
     * @returns {*}
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.getAppMenu = function () {
        return this.getControl('appmenu');
    };
    /**
     * 导航数据跳转处理
     *
     * @param {*} [data={}]
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.navigationLink = function (data) {
        if (data === void 0) { data = {}; }
    };
    /**
     * 设置主菜单状态
     *
     * @param {string} [align]
     * @memberof IBizIndexViewController
     */
    IBizIndexViewController.prototype.setMianMenuState = function (align) {
    };
    return IBizIndexViewController;
}(IBizMainViewController));

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
 * 多项数据视图控制器
 *
 * @class IBizMDViewController
 * @extends {IBizMainViewController}
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
        var _this = _super.call(this, opts) || this;
        /**
         * 当前数据主键
         *
         * @type {string}
         * @memberof IBizMDViewController
         */
        _this.currentDataKey = '';
        /**
         * 是否支持多选
         *
         * @type {boolean}
         * @memberof IBizMDViewController
         */
        _this.multiSelect = false;
        /**
         * 父数据改变
         *
         * @type {boolean}
         * @memberof IBizMDViewController
         */
        _this.parentDataChanged = false;
        /**
         * 表格是否支持行编辑
         *
         * @type {boolean}
         * @memberof IBizMDViewController
         */
        _this.isInGridRowEdit = false;
        /**
         * 实体支持快速搜索属性
         *
         * @type {Array<any>}
         * @memberof IBizMDViewController
         */
        _this.quickSearchEntityDEFields = [];
        /**
         * 快速搜索提示信息
         *
         * @type {string}
         * @memberof IBizMDViewController
         */
        _this.quickSearchTipInfo = '';
        _this.regQuickSearchDEFileds();
        return _this;
    }
    /**
     * 初始化部件对象
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        this.parentDataChanged = false;
        var mdctrl = this.getMDCtrl();
        if (mdctrl) {
            // 多数据部件选中
            mdctrl.on(IBizMDControl.SELECTIONCHANGE).subscribe(function (args) {
                _this.onSelectionChange(args);
            });
            // 多数据部件加载之前
            mdctrl.on(IBizMDControl.BEFORELOAD).subscribe(function (args) {
                _this.onStoreBeforeLoad(args);
            });
            // 多数据部件加载完成
            mdctrl.on(IBizMDControl.LOADED).subscribe(function (args) {
                _this.onStoreLoad(args);
            });
            // 多数据部件状态改变
            mdctrl.on(IBizDataGrid.CHANGEEDITSTATE).subscribe(function (args) {
                _this.onGridRowEditChange(undefined, args, undefined);
            });
            // 多数据界面行为
            mdctrl.on(IBizMDControl.UIACTION).subscribe(function (args) {
                if (args.tag) {
                    _this.doUIAction(args.tag, args.data);
                }
            });
            if (this.isEnableQuickSearch()) {
                var columns_1 = mdctrl.getColumns();
                var columns_name = Object.keys(columns_1);
                var _quickFields_1 = [];
                columns_name.forEach(function (name) {
                    var index = _this.quickSearchEntityDEFields.findIndex(function (item) { return Object.is(item.name, name); });
                    if (index !== -1) {
                        _quickFields_1.push(columns_1[name].caption);
                    }
                });
                this.quickSearchTipInfo = _quickFields_1.join('/');
            }
        }
        var searchform = this.getSearchForm();
        if (searchform) {
            // 搜索表单加载完成
            searchform.on(IBizForm.FORMLOADED).subscribe(function (args) {
                _this.onSearchFormSearched(_this.isLoadDefault());
            });
            // 搜索表单搜索触发，手动触发
            searchform.on(IBizSearchForm.FORMSEARCHED).subscribe(function (args) {
                _this.onSearchFormSearched(true);
            });
            // 搜索表单重置
            searchform.on(IBizSearchForm.FORMRESETED).subscribe(function (args) {
                _this.onSearchFormReseted();
            });
            // 搜索表单值变化
            searchform.on(IBizForm.FORMFIELDCHANGED).subscribe(function (args) {
                if (args == null) {
                    _this.onSearchFormFieldChanged('', null, null);
                }
                else {
                    _this.onSearchFormFieldChanged(args.name, args.field, args.value);
                    _this.onSearchFormFieldValueCheck(args.name, args.field.getValue());
                }
            });
            searchform.setOpen(!this.isEnableQuickSearch());
        }
    };
    /**
     * 多数据视图加载，加载部件
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        if (this.getSearchForm()) {
            var viewparams = {};
            Object.assign(viewparams, this.getViewParam());
            this.getSearchForm().autoLoad(viewparams);
        }
        else if (this.isLoadDefault()) {
            this.load();
        }
    };
    /**
     * 加载多视图部件
     *
     * @param {*} [opt={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.load = function (opt) {
        if (opt === void 0) { opt = {}; }
        if (this.getMDCtrl()) {
            this.getMDCtrl().load(opt);
        }
    };
    /**
     * 执行快速搜索
     *
     * @param {*} event
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onQuickSearch = function (event) {
        if (!Object.is(this.searchValue, event)) {
            this.searchValue = event;
        }
        if (this.isEnableQuickSearch()) {
            this.onSearchFormSearched(true);
        }
    };
    /**
     * 清空快速搜索值
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.clearQuickSearchValue = function () {
        this.searchValue = undefined;
        this.onRefresh();
    };
    /**
     * 搜索表单打开
     *
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.openSearchForm = function () {
        if (!this.isEnableQuickSearch()) {
            return;
        }
        var searchForm = this.getSearchForm();
        if (searchForm) {
            searchForm.setOpen(!searchForm.opened);
        }
    };
    /**
     * 获取搜索表单对象
     *
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getSearchForm = function () {
        return undefined;
    };
    /**
     * 获取所有多项数据
     *
     * @returns {Array<any>}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getAllData = function () {
        if (this.getMDCtrl()) {
            return this.getMDCtrl().getAllData();
        }
        return [];
    };
    /**
     * 搜索表单属性值发生变化
     *
     * @param {string} fieldname
     * @param {*} field
     * @param {*} value
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSearchFormFieldChanged = function (fieldname, field, value) {
    };
    /**
     * 搜索表单属性值检测
     *
     * @param {string} fieldname
     * @param {string} value
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSearchFormFieldValueCheck = function (fieldname, value) {
    };
    /**
     * 数据加载之前
     *
     * @param {any} sender
     * @param {any} args
     * @param {any} e
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onStoreBeforeLoad = function (args) {
        var fetchParam = {};
        if (this.getViewParam() && Object.keys(this.getViewParam()).length > 0) {
            Object.assign(fetchParam, this.getViewParam());
        }
        if (this.getParentMode() && Object.keys(this.getParentMode()).length > 0) {
            Object.assign(fetchParam, this.getParentMode());
        }
        if (this.getParentData() && Object.keys(this.getParentData()).length > 0) {
            Object.assign(fetchParam, this.getParentData());
        }
        if ((this.getSearchForm() && this.getSearchCond() && this.getSearchForm().isOpen()) || !this.isEnableQuickSearch()) {
            Object.assign(fetchParam, this.getSearchCond());
        }
        // //是否有自定义查询
        // if (this.searchform && this.searchform.isCustomSearch()) {
        // 	Object.assign(fetchParam, this.searchform.getCustomSearchVal());
        // }
        // 获取关系数据
        if (this.getReferData()) {
            Object.assign(fetchParam, { srfreferdata: JSON.stringify(this.getReferData()) });
        }
        // 获取快速搜索里的搜索参数
        if (this.isEnableQuickSearch() && this.searchValue !== undefined) {
            Object.assign(fetchParam, { query: this.searchValue });
        }
        Object.assign(args, fetchParam);
    };
    /**
     * 数据加载完成
     *
     * @param {any} sender
     * @param {any} args
     * @param {any} e
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onStoreLoad = function (args) {
        var _this = this;
        var lastActive = null;
        if (this.currentDataKey != null && !Object.is(this.currentDataKey, '') && args && args.items) {
            args.items.forEach(function (element) {
                if (Object.is(element.srfkey, _this.currentDataKey)) {
                    lastActive = element;
                    return false;
                }
            });
        }
        if (lastActive) {
            this.getMDCtrl().setSelection(lastActive);
            this.calcToolbarItemState(true, lastActive.srfdataaccaction);
        }
        else {
            this.currentDataKey = null;
            // this.fireEvent(MDViewControllerBase.SELECTIONCHANGE, this, []);
            this.fire(IBizMDViewController.SELECTIONCHANGE, []);
            this.calcToolbarItemState(false);
        }
        this.parentDataChanged = false;
        this.reloadUICounters();
    };
    /**
     * 数据被激活<最典型的情况就是行双击>
     *
     * @param {*} [record={}] 行记录
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onDataActivated = function (record) {
        if (record === void 0) { record = {}; }
        if (!record || !record.srfkey) {
            return;
        }
        this.fire(IBizMDViewController.DATAACTIVATED, [record]);
        this.currentDataKey = record.srfkey;
        this.calcToolbarItemState(true, record.srfdataaccaction);
        this.onEditData({ data: record });
    };
    /**
     * 行选择变化
     *
     * @param {Array<any>} selected
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSelectionChange = function (selected) {
        if (selected == null || selected.length == 0) {
            this.currentDataKey = null;
        }
        else {
            this.currentDataKey = selected[0].srfkey;
        }
        this.fire(IBizMDViewController.SELECTIONCHANGE, selected[0]);
        this.calcToolbarItemState(this.currentDataKey != null, (this.currentDataKey != null) ? selected[0].srfdataaccaction : null);
    };
    /**
     * 改变工具栏启用编辑按钮信息
     *
     * @param {any} sender
     * @param {any} args
     * @param {any} e
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onGridRowEditChange = function (sender, args, e) {
        // var editButton = null;
        // var submitButton = null;
        // if (this.toolbar && this.toolbar.items) {
        //     .each(this.toolbar.items, function (index, ele) {
        //         if (ele.attr('data-ibiz-tag') == 'NewRow')
        //             submitButton = ele;
        //         if (ele.attr('data-ibiz-tag') == 'ToggleRowEdit')
        //             editButton = ele;
        //     });
        // }
        // this.isInGridRowEdit = args.state;
        // if (editButton) {
        //     if (!args.state) {
        //         editButton.find('span').html(IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE', '启用编辑'));
        //     } else {
        //         editButton.find('span').html(IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE2', '关闭编辑'));
        //     }
        // }
        // if (submitButton)
        //     submitButton[0].disabled = !args.state;
    };
    /**
     * 计算工具栏项状态-<例如 根据是否有选中数据,设置 工具栏按钮是否可点击>
     *
     * @param {boolean} hasdata 是否有数据
     * @param {*} [dataaccaction]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.calcToolbarItemState = function (hasdata, dataaccaction) {
        _super.prototype.calcToolbarItemState.call(this, hasdata, dataaccaction);
        var toolbar = this.getToolBar();
        if (!toolbar) {
            return;
        }
        if (Object.keys(toolbar.getItems()).length > 0) {
            var name_arr = Object.keys(toolbar.getItems());
            var btn_items_1 = toolbar.getItems();
            name_arr.forEach(function (name) {
                var item = btn_items_1[name];
                if (Object.is(item.tag, 'NewRow')) {
                    toolbar.setItemDisabled(name, false);
                }
            });
        }
    };
    /**
     * 实体数据发生变化
     *
     * @param {*} [dataaccaction={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onDataAccActionChange = function (dataaccaction) {
        if (dataaccaction === void 0) { dataaccaction = {}; }
        var toolBar = this.getToolBar();
        if (!toolbar) {
            return;
        }
        toolBar.updateAccAction(Object.assign({}, this.dataaccaction, dataaccaction));
        // if (this.getToolbar())
        //     this.getToolbar().updateAccAction(dataaccaction);
        // if (this.mintoolbar)
        //     this.mintoolbar.updateAccAction(dataaccaction);
        // if (this.floattoolbar)
        //     this.floattoolbar.updateAccAction(dataaccaction);
    };
    /**
     * 新建数据
     *
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onNewData = function () {
        var loadParam = {};
        if (this.getViewParam()) {
            Object.assign(loadParam, this.getViewParam());
        }
        if (this.getParentMode()) {
            Object.assign(loadParam, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(loadParam, this.getParentData());
        }
        if (this.isEnableRowEdit() && (this.getMDCtrl() && this.getMDCtrl().getOpenEdit())) {
            this.doNewRow(loadParam);
            return;
        }
        if (this.isEnableBatchAdd()) {
            this.doNewDataBatch(loadParam);
            return;
        }
        if (this.doNewDataWizard(loadParam)) {
            return;
        }
        this.doNewDataNormal(loadParam);
    };
    /**
     * 批量新建
     *
     * @param {*} [arg={}]
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNewDataBatch = function (arg) {
        var _this = this;
        if (arg === void 0) { arg = {}; }
        var mpickupview = this.getMPickupView(arg);
        if (mpickupview && !Object.is(mpickupview.className, '')) {
            this.openModal(mpickupview).subscribe(function (data) {
                console.log(data);
                if (data && Object.is(data.ret, 'OK')) {
                    _this.onMPickupWindowClose(data.selection);
                }
            });
            return true;
        }
        return false;
    };
    /**
     * 批量新建关闭
     *
     * @param {Array<any>} selection
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onMPickupWindowClose = function (selection) {
        if (selection) {
            this.addDataBatch(selection);
        }
        return;
    };
    /**
     * 批量添加数据
     *
     * @param {Array<any>} selectedDatas
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.addDataBatch = function (selectedDatas) {
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.ADDDATABATCH.INFO', '[addDataBatch]方法必须重写！'), 2);
        this.iBizNotification.warning('警告', '[addDataBatch]方法必须重写！');
    };
    /**
     * 向导新建数据
     *
     * @param {any} arg
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNewDataWizard = function (arg) {
        var _this = this;
        var hasWizardView = false;
        var wizardView = this.getNewDataWizardView(arg);
        if (wizardView) {
            // 打开模态框
            this.openModal(wizardView).subscribe(function (result) {
                if (result && Object.is(result.ret, 'OK')) {
                    var data = result.selection[0];
                    _this.doNewDataNormal(Object.assign({ srfnewmode: data.srfkey }, arg));
                }
            });
            hasWizardView = true;
        }
        return hasWizardView;
    };
    /**
     * 向导新建数据窗口关闭
     *
     * @param {any} win
     * @param {any} eOpts
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onNewDataWizardWindowClose = function (win, eOpts) {
        // var this = win.scope;
        // var loadParam = {};//win.userData;
        // var dialogResult = win.dialogResult;
        // if (!dialogResult) return;
        // if (dialogResult == 'ok') {
        //     var selectedData = win.selectedData;
        //     if (selectedData) {
        //         var newMode = selectedData.srfkey;
        //         loadParam.srfnewmode = newMode;
        //         var view = this.getNewDataView(loadParam);
        //         if (view == null) {
        //             return;
        //         }
        //         this.openDataView(view);
        //     }
        // }
        // return;
    };
    /**
     * 常规新建数据
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNewDataNormal = function (arg) {
        var view = this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        var openMode = view.openMode;
        if (!openMode || Object.is(openMode, '')) {
            view.openMode = 'INDEXVIEWTAB';
        }
        if (!view.state) {
            view.state = 'new';
            var viewParam = {};
            Object.assign(viewParam, view.viewParam);
            if (viewParam && viewParam.srfnewmode && !Object.is(viewParam.srfnewmode, '')) {
                var srfnewmode = viewParam.srfnewmode.split('@').join('__');
                view.state = view.state + '_' + srfnewmode.toLowerCase();
            }
        }
        return this.openDataView(view);
    };
    /**
     * 编辑数据
     *
     * @param {any} arg
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onEditData = function (arg) {
        var loadParam = {};
        if (this.getViewParam()) {
            Object.assign(loadParam, this.getViewParam());
        }
        if (this.getParentMode()) {
            Object.assign(loadParam, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(loadParam, this.getParentData());
        }
        if (arg.srfcopymode) {
            Object.assign(loadParam, {
                srfsourcekey: arg.data.srfkey
            });
        }
        else {
            Object.assign(loadParam, { srfkey: arg.data.srfkey, srfdeid: arg.data.srfdeid });
        }
        var editMode = this.getEditMode(arg.data);
        if (editMode) {
            loadParam.srfeditmode = editMode;
            loadParam.srfviewmode = editMode;
        }
        if (arg.data.srfmstag) {
            loadParam.srfeditmode2 = arg.data.srfmstag;
        }
        this.doEditDataNormal(loadParam);
    };
    /**
     * 执行常规编辑数据
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doEditDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        var view = this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        var openMode = view.openMode;
        if (!openMode || Object.is(openMode, '')) {
            view.openMode = 'INDEXVIEWTAB';
        }
        if (!view.state) {
            view.state = 'edit';
            var viewParam = {};
            Object.assign(viewParam, view.viewParam);
            if (Object.keys(viewParam).length > 0) {
                var srfeditmode = '';
                if (viewParam.srfeditmode && !Object.is(viewParam.srfeditmode, '')) {
                    srfeditmode = viewParam.srfeditmode.split('@').join('__');
                }
                // 实体主状态
                if (viewParam.srfeditmode2 && !Object.is(viewParam.srfeditmode2, '') && !Object.is(viewParam.srfeditmode2, 'MSTAG:null')) {
                    srfeditmode = viewParam.srfeditmode2.split(':').join('__');
                }
                if (!Object.is(srfeditmode, '')) {
                    view.state = "{view.state}_{srfeditmode.toLowerCase()}";
                }
            }
        }
        return this.openDataView(view);
    };
    /**
     * 打开数据视图
     *
     * @param {*} [view={}]
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.openDataView = function (view) {
        var _this = this;
        if (view === void 0) { view = {}; }
        var openMode = view.openMode;
        if (view.redirect) {
            this.redirectOpenView(view);
            return false;
        }
        if (!openMode || Object.is(openMode, 'INDEXVIEWTAB')) {
            var data = {};
            Object.assign(data, view.viewParam);
            this.openView(view.state, data);
            return false;
        }
        if (Object.is(openMode, 'POPUPMODAL')) {
            view.modal = true;
        }
        else if (Object.is(openMode, 'POPUP')) {
            view.modal = true;
        }
        else if (Object.is(openMode, '') || Object.is(openMode, 'INDEXVIEWTAB')) {
            view.modal = false;
        }
        if (!view.modal) {
            return false;
        }
        this.openModal(view).subscribe(function (result) {
            if (result && Object.is(result.ret, 'OK')) {
                _this.onRefresh();
            }
        });
        return true;
    };
    /**
     * 获取编辑模式
     *
     * @param {any} data
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getEditMode = function (data) {
        return data.srfdatatype;
    };
    /**
     * 获取编辑视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getEditDataView = function (arg) {
        return undefined;
    };
    /**
     * 获取新建视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getNewDataView = function (arg) {
        return undefined;
    };
    /**
     * 获取新建向导视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getNewDataWizardView = function (arg) {
        return undefined;
    };
    /**
     * 获取多选视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getMPickupView = function (arg) {
        return undefined;
    };
    /**
     * 获取多数据对象
     *
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getMDCtrl = function () {
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.GETMDCTRL.INFO', '[getMDCtrl]方法必须重写！'), 2);
        this.iBizNotification.warning('警告', '[getMDCtrl]方法必须重写！');
    };
    /**
     * 视图刷新
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    };
    /**
     *
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSetParentData = function () {
        _super.prototype.onSetParentData.call(this);
        this.parentDataChanged = true;
    };
    /**
     * 获取搜索条件
     *
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getSearchCond = function () {
        if (this.getSearchForm()) {
            return this.getSearchForm().getValues();
        }
        return undefined;
    };
    /**
     * 搜索表单搜索执行
     *
     * @param {boolean} isload 是否加载数据
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSearchFormSearched = function (isload) {
        if (this.getMDCtrl() && isload) {
            this.getMDCtrl().setCurPage(1);
            this.getMDCtrl().load();
        }
    };
    /**
     * 搜索表单重置完成
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onSearchFormReseted = function () {
        if (this.getMDCtrl() && (!this.isLoadDefault())) {
            this.getMDCtrl().load();
        }
    };
    /**
     *
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.tag, 'Help')) {
            this.doHelp(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Edit')) {
            this.doEdit(params);
            return;
        }
        if (Object.is(uiaction.tag, 'View')) {
            this.doView(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Print')) {
            this.doPrint(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ExportExcel')) {
            this.doExportExcel(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ExportModel')) {
            this.doExportModel(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Copy')) {
            this.doCopy(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Remove')) {
            this.doRemove(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Import')) {
            this.doImport(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Refresh')) {
            this.doRefresh(params);
            return;
        }
        if (Object.is(uiaction.tag, 'NewRow')) {
            this.doCheck(params);
            return;
        }
        if (Object.is(uiaction.tag, 'New')) {
            this.doNew(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ToggleRowEdit')) {
            this.doToggleRowEdit(params);
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    /**
     * 多数据项界面_行编辑操作
     *
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doToggleRowEdit = function (params) {
        if (params === void 0) { params = {}; }
        if (this.getMDCtrl() && typeof (this.getMDCtrl().isOpenEdit) === 'function') {
            this.getMDCtrl().isOpenEdit(params);
        }
    };
    /**
     * 多数据项界面_新建行操作
     *
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNewRow = function (params) {
        if (params === void 0) { params = {}; }
        if (this.getMDCtrl() && typeof (this.getMDCtrl().newRowAjax) === 'function') {
            this.getMDCtrl().newRowAjax(params);
        }
    };
    /**
     * 多数据项界面_检测行操作
     *
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doCheck = function (params) {
        if (params === void 0) { params = {}; }
        if (this.getMDCtrl() && typeof (this.getMDCtrl().saveAllEditRow) === 'function') {
            this.getMDCtrl().saveAllEditRow();
        }
    };
    /**
     * 多数据项界面_帮助操作
     *
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doHelp = function (params) {
        if (params === void 0) { params = {}; }
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.DOHELP.INFO', '帮助操作'), 0);
        this.iBizNotification.warning('警告', '帮助操作');
    };
    /**
     * 多数据项界面_编辑操作
     *
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
        // 获取要编辑的数据集合
        if (params && params.srfkey) {
            // if (.isFunction(this.getMDCtrl().findItem)) {
            //     params = this.getMDCtrl().findItem('srfkey', params.srfkey);
            // }
            var arg = { data: params };
            this.onEditData(arg);
            return;
        }
        var selectedData = this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length === 0) {
            return;
        }
        this.onEditData({ data: selectedData[0] });
    };
    /**
     * 多数据项界面_行编辑操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doView = function (params) {
        this.doEdit(params);
    };
    /**
     * 多数据项界面_打印操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doPrint = function (params) {
    };
    /**
     * 多数据项界面_导出操作（Excel）
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doExportExcel = function (params) {
        // if (params.itemtag == '') {
        // }
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.DOEXPORTEXCEL.INFO', '导出操作（Excel）'), 0);
        this.iBizNotification.warning('警告', '导出操作（Excel）');
    };
    /**
     * 多数据项界面_导出数据模型
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doExportModel = function (params) {
        this.iBizNotification.warning('警告', '导出数据模型');
    };
    /**
     * 多数据项界面_拷贝操作
     *
     * @param {any} params
     * @returns {void}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doCopy = function (params) {
        // 获取要拷贝的数据集合
        if (!this.getMDCtrl()) {
            return;
        }
        var selectedData = this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length == 0) {
            return;
        }
        var arg = { data: selectedData[0], srfcopymode: true };
        this.onEditData(arg);
    };
    /**
     * 多数据项界面_删除操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doRemove = function (params) {
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), IGM('MDVIEWCONTROLLER.DOREMOVE.INFO', '删除操作'), 0);
        this.iBizNotification.warning('警告', '删除操作');
    };
    /**
     * 多数据项界面_数据导入栏
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doImport = function (params) {
        if (this.getMDCtrl() && this.getDEName() !== '') {
            this.getMDCtrl().doImportData(this.getDEName());
        }
    };
    /**
     * 多数据项界面_刷新操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doRefresh = function (params) {
        this.onRefresh();
    };
    /**
     * 多数据项界面_新建操作
     *
     * @param {any} params
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doNew = function (params) {
        this.onNewData();
    };
    /**
     *
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doWFUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.actionmode, 'WFBACKEND')) {
            var selectedData = this.getMDCtrl().getSelection();
            if (selectedData == null || selectedData.length === 0) {
                return;
            }
            var keys_1 = '';
            selectedData.forEach(function (element, index) {
                var key = element.srfkey;
                if (!Object.is(keys_1, '')) {
                    keys_1 += ';';
                }
                keys_1 += key;
            });
            if (this.getMDCtrl()) {
                this.getMDCtrl().wfsubmit({ srfwfiatag: uiaction.tag, srfkeys: keys_1 });
                return;
            }
        }
        _super.prototype.doWFUIAction.call(this, uiaction, params);
    };
    /**
     *
     *
     * @param {any} win
     * @param {any} data
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
        // this.load();
        this.onRefresh();
    };
    /**
     * 获取UI操作参数
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getFrontUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var arg = {};
        var front_arg = _super.prototype.getFrontUIActionParam.call(this, uiaction, params);
        if (front_arg) {
            Object.assign(arg, front_arg);
        }
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        var target = 'NONE';
        if (uiaction.actiontarget) {
            target = uiaction.actiontarget;
        }
        if (!Object.is(target, 'NONE')) {
            var selectedData = this.getMDCtrl().getSelection();
            if (!(selectedData == null || selectedData.length === 0)) {
                var valueitem_1 = 'srfkey';
                var paramkey = 'srfkeys';
                var paramjo = null;
                if (uiaction.actionparams) {
                    var actionparams = uiaction.actionparams;
                    valueitem_1 = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem_1;
                    paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                    paramjo = actionparams.paramjo ? actionparams.paramjo : {};
                }
                if (Object.is(target, 'SINGLEKEY')) {
                    arg[paramkey] = selectedData[0][valueitem_1];
                }
                else if (Object.is(target, 'SINGLEDATA')) {
                    Object.assign(arg, selectedData[0]);
                }
                else if (Object.is(target, 'MULTIKEY')) {
                    var keys_2 = '';
                    selectedData.forEach(function (item) {
                        var key = item[valueitem_1];
                        if (!Object.is(keys_2, '')) {
                            keys_2 += ';';
                        }
                        keys_2 += key;
                    });
                    arg[paramkey] = keys_2;
                }
                if (paramjo) {
                    Object.assign(arg, paramjo);
                }
            }
        }
        return arg;
    };
    /**
     * 获取后天界面行为参数
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        var arg = {};
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        var bSingle = false;
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY')) {
            bSingle = true;
        }
        var selectedData = this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length === 0)) {
            var valueitem_2 = 'srfkey';
            var paramkey = 'srfkeys';
            var paramitems_1 = '';
            var paramjo = null;
            var infoitem = 'srfmajortext';
            if (uiaction.actionparams) {
                var actionparams = uiaction.actionparams;
                valueitem_2 = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem_2;
                paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                infoitem = (actionparams.textitem && !Object.is(actionparams.textitem, '')) ? actionparams.textitem.toLowerCase() : infoitem;
                paramjo = actionparams.paramjo ? actionparams.paramjo : {};
            }
            if (bSingle) {
                paramitems_1 = selectedData[0][valueitem_2];
            }
            else {
                selectedData.forEach(function (item) {
                    var key = item[valueitem_2];
                    if (!Object.is(paramitems_1, '')) {
                        paramitems_1 += ';';
                    }
                    paramitems_1 += key;
                });
            }
            arg[paramkey] = paramitems_1;
            if (paramjo) {
                Object.assign(arg, paramjo);
            }
        }
        return arg;
    };
    /**
     * 移动记录
     *
     * @param {any} target
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.moveRecord = function (target) {
    };
    /**
     *
     *
     * @param {any} arg
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doBackendUIAction = function (arg) {
        if (this.getMDCtrl()) {
            this.getMDCtrl().doUIAction(arg);
        }
    };
    /**
     * 隐藏关系列
     *
     * @param {any} parentMode
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doHideParentColumns = function (parentMode) {
    };
    /**
     *
     *
     * @param {any} arg
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.onPrintData = function (arg) {
        this.doPrintDataNormal(arg);
    };
    /**
     * 常规新建数据
     *
     * @param {any} arg
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.doPrintDataNormal = function (arg) {
        // var view = this.getPrintDataView(arg);
        // if (view == null) {
        //     return false;
        // }
        // var viewurl = view.viewurl;
        // if (!viewurl || viewurl == '') {
        //     viewurl = BASEURL + '/ibizutil/print.pdf';
        // }
        // else {
        //     viewurl = BASEURL + viewurl;
        // }
        // viewurl = viewurl + (viewurl.indexOf('?') == -1 ? '?' : '&') + .param(view.viewparam);
        // window.open(viewurl, '_blank');
        return true;
    };
    /**
     *
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.getPrintDataView = function (arg) {
        // return null;
        return undefined;
    };
    /**
     * 是否默认加载
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isLoadDefault = function () {
        return true;
    };
    /**
     * 支持批量添加
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isEnableBatchAdd = function () {
        return false;
    };
    /**
     * 是否支持快速搜索
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isEnableQuickSearch = function () {
        return true;
    };
    /**
     * 只支持批量添加
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isBatchAddOnly = function () {
        return false;
    };
    /**
     * 是否支持行编辑
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isEnableRowEdit = function () {
        return false;
    };
    /**
     * 是否支持多选
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.isEnableMultiSelect = function () {
        return this.multiSelect;
    };
    /**
     * 设置支持多选
     *
     * @param {boolean} multiSelect
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.setEnableMultiSelect = function (multiSelect) {
        this.multiSelect = multiSelect;
    };
    /**
     * 注册快速搜索实体属性
     *
     * @memberof IBizMDViewController
     */
    IBizMDViewController.prototype.regQuickSearchDEFileds = function () {
    };
    /*****************事件声明************************/
    /**
     * 数据激活<例如：表格行双击>
     *
     * @static
     * @memberof IBizMDViewController
     */
    IBizMDViewController.DATAACTIVATED = 'DATAACTIVATED';
    /**
     * 数据选择变化
     *
     * @static
     * @memberof IBizMDViewController
     */
    IBizMDViewController.SELECTIONCHANGE = 'SELECTIONCHANGE';
    return IBizMDViewController;
}(IBizMainViewController));

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
 * 表格视图控制
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
        return _super.call(this, opts) || this;
    }
    /**
     * 部件初始化
     *
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var grid = this.getMDCtrl();
        if (grid) {
            // 双击行数据
            grid.on(IBizDataGrid.ROWDBLCLICK).subscribe(function (args) {
                _this.onSelectionChange(args);
                if (_this.getGridRowActiveMode() === 0) {
                    return;
                }
                _this.onDataActivated(args[0]);
            });
            // 单击行数据
            grid.on(IBizDataGrid.ROWCLICK).subscribe(function (args) {
                _this.onSelectionChange(args);
                if (_this.getGridRowActiveMode() === 1) {
                    _this.onDataActivated(args[0]);
                }
            });
            // 表格行数据变化
            grid.on(IBizDataGrid.UPDATEGRIDITEMCHANGE).subscribe(function (param) {
                if (!_this.isEnableRowEdit()) {
                    return;
                }
                _this.onGridRowChanged(param.name, param.data);
            });
        }
    };
    /**
     * 获取多项数据控件对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getMDCtrl = function () {
        return this.getGrid();
    };
    /**
     * 获取表格部件对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getGrid = function () {
        return this.getControl('grid');
    };
    /**
     * 获取搜索表单对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getSearchForm = function () {
        return this.getControl('searchform');
    };
    /**
     * 表格行数据激活模式，默认支持双击激活行数据
     *
     * @returns {number}  0--不激活，1--单击激活模式，2--双击激活行数据
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getGridRowActiveMode = function () {
        return 2;
    };
    /**
     * 隐藏关系列
     *
     * @param {any} parentMode
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.doHideParentColumns = function (parentMode) {
    };
    /**
     * 隐藏列
     *
     * @param {any} columnname
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.hideGridColumn = function (columnname) {
    };
    /**
     * 删除操作
     *
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.doRemove = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (params && params.srfkey) {
            // if ($.isFunction(this.getMDCtrl().findItem)) {
            //     params = this.getMDCtrl().findItem('srfkey', params.srfkey);
            // }
            // //询问框
            // IBiz.confirm($IGM('GRIDVIEWCONTROLLER.DOREMOVE.INFO', '确认要删除数据，删除操作将不可恢复？'), function (result) {
            //     if (result) {
            //         this.removeData({ srfkeys: params.srfkey });
            //     }
            // });
        }
        else {
            var selectedData = this.getGrid().getSelection();
            if (!selectedData || selectedData == null || selectedData.length === 0) {
                return;
            }
            var dataInfo_1 = '';
            selectedData.forEach(function (record, index) {
                var srfmajortext = record.srfmajortext;
                if (index < 5) {
                    if (!Object.is(dataInfo_1, '')) {
                        dataInfo_1 += '、';
                    }
                    dataInfo_1 += srfmajortext;
                }
                else {
                    return false;
                }
            });
            if (selectedData.length < 5) {
                dataInfo_1 = dataInfo_1 + '共' + selectedData.length + '条数据';
            }
            else {
                dataInfo_1 = dataInfo_1 + '...' + '共' + selectedData.length + '条数据';
            }
            dataInfo_1 = dataInfo_1.replace(/[null]/g, '').replace(/[undefined]/g, '').replace(/[ ]/g, '');
            // 询问框
            this.iBizNotification.confirm('警告', '确认要删除 ' + dataInfo_1 + '，删除操作将不可恢复？').subscribe(function (result) {
                if (result && Object.is(result, 'OK')) {
                    _this.removeData(null);
                }
            });
        }
    };
    /**
     * 删除数据
     *
     * @param {*} [arg={}]
     * @returns {void}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.removeData = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg) {
            arg = {};
        }
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        if (!arg.srfkeys) {
            // 获取要删除的数据集合
            var selectedData = this.getGrid().getSelection();
            if (!selectedData || selectedData == null || selectedData.length === 0) {
                return;
            }
            var keys_1 = '';
            selectedData.forEach(function (record) {
                var key = record.srfkey;
                if (!Object.is(keys_1, '')) {
                    keys_1 += ';';
                }
                keys_1 += key;
            });
            arg.srfkeys = keys_1;
        }
        var grid = this.getGrid();
        if (grid) {
            grid.remove(arg);
        }
    };
    /**
     * 批量添加数据
     *
     * @param {Array<any>} selectedDatas
     * @returns {void}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.addDataBatch = function (selectedDatas) {
        var arg = {};
        if (!selectedDatas || selectedDatas == null || selectedDatas.length === 0) {
            return;
        }
        Object.assign(arg, this.viewParam);
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        var keys = '';
        selectedDatas.forEach(function (record) {
            var key = record.srfkey;
            if (!Object.is(keys, '')) {
                keys += ';';
            }
            keys += key;
        });
        arg.srfkeys = keys;
        var grid = this.getGrid();
        if (grid) {
            grid.addBatch(arg);
        }
    };
    /**
     * 编辑操作
     *
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.doEdit = function (params) {
        if (params === void 0) { params = {}; }
        var gridCtrl = this.getGrid();
        if (!gridCtrl) {
            return;
        }
        // 获取要编辑的数据集合
        if (params && params.srfkey) {
            var param = gridCtrl.findItem('srfkey', params.srfkey);
            if (!param) {
                return;
            }
            var arg_1 = { data: Object.assign(params, param) };
            this.onEditData(arg_1);
            return;
        }
        var selectedData = gridCtrl.getSelection();
        if (!selectedData || selectedData == null || selectedData.length === 0) {
            return;
        }
        var arg = { data: selectedData[0] };
        this.onEditData(arg);
    };
    /**
     * 实体界面行为参数
     *
     * @param {*} [uiaction={}] 实体界面行为
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.getBackendUIActionParam = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            var selectedData = this.getGrid().getSelection();
            if (!selectedData && selectedData == null || selectedData.length === 0) {
                return null;
            }
            var valueitem_1 = 'srfkey';
            var paramkey = 'srfkeys';
            var paramitems_1 = '';
            var paramjo = null;
            var infoitem_1 = 'srfmajortext';
            if (uiaction.actionparams) {
                var actionparams = uiaction.actionparams;
                valueitem_1 = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem_1;
                paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                infoitem_1 = (actionparams.textitem && !Object.is(actionparams.textitem, '')) ? actionparams.textitem.toLowerCase() : infoitem_1;
                paramjo = actionparams.paramjo ? actionparams.paramjo : {};
            }
            var dataInfo_2 = '';
            var firstOnly_1 = (Object.is(uiaction.actiontarget, 'SINGLEKEY'));
            selectedData.some(function (record, index) {
                if (record === void 0) { record = {}; }
                var srfmajortext = record[infoitem_1];
                if (valueitem_1) {
                    var temp = record[valueitem_1];
                    if (!Object.is(paramitems_1, '')) {
                        paramitems_1 += ';';
                    }
                    paramitems_1 += temp ? temp : '';
                }
                if (index < 5) {
                    if (!Object.is(dataInfo_2, '')) {
                        dataInfo_2 += '、';
                    }
                    dataInfo_2 += srfmajortext;
                }
                if (firstOnly_1) {
                    return false;
                }
            });
            var data = { dataInfo: dataInfo_2 };
            data[paramkey] = paramitems_1;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            return data;
        }
        return {};
    };
    /**
     * 导出操作（Excel）
     *
     * @param {*} params
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.doExportExcel = function (params) {
        if (this.getMDCtrl()) {
            this.getMDCtrl().exportData(params);
        }
    };
    /**
     * 表格行数据变化
     *
     * @param {string} name
     * @param {*} [data={}]
     * @memberof IBizGridViewController
     */
    IBizGridViewController.prototype.onGridRowChanged = function (name, data) {
        if (data === void 0) { data = {}; }
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
 * 选择表格视图控制器（部件视图）
 *
 * @class IBizPickupGridViewController
 * @extends {IBizGridViewController}
 */
var IBizPickupGridViewController = /** @class */ (function (_super) {
    __extends(IBizPickupGridViewController, _super);
    // /**
    //  * 父数据
    //  *
    //  * @memberof IBizPickupGridViewController
    //  */
    // @Input()
    // set parentData(parentData: any) {
    //     if (parentData) {
    //         this.setParentData(parentData);
    //         this.onRefresh();
    //     }
    // }
    // /**
    //  * 是否支持多项数据选择
    //  * 
    //  * @type {boolean}
    //  * @memberof IBizPickupGridViewController
    //  */
    // @Input()
    // multiselect: boolean;
    // /**
    //  * 当前选择数据
    //  * 
    //  * @type {*}
    //  * @memberof IBizPickupGridViewController
    //  */
    // @Input()
    // currentValue: any;
    // /**
    //  * 删除数据
    //  * 
    //  * @type {*}
    //  * @memberof IBizPickupGridViewController
    //  */
    // @Input()
    // deleteData: any;
    // /**
    //  * 数据选中事件，向外输出处理
    //  * 
    //  * @type {EventEmitter<any>}
    //  * @memberof IBizPickupGridViewController
    //  */
    // @Output()
    // selectionChange: EventEmitter<any> = new EventEmitter();
    // /**
    //  * 行数据激活事件，向外输出处理
    //  *
    //  * @type {EventEmitter<any>}
    //  * @memberof IBizPickupGridViewController
    //  */
    // @Output()
    // dataActivated: EventEmitter<any> = new EventEmitter();
    // /**
    //  * 多数据部件加载所有数据
    //  * 
    //  * @type {EventEmitter<any>}
    //  * @memberof IBizPickupGridViewController
    //  */
    // @Output()
    // allData: EventEmitter<any> = new EventEmitter();
    /**
     * Creates an instance of IBizPickupGridViewController.
     * 创建 IBizPickupGridViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizPickupGridViewController
     */
    function IBizPickupGridViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 部件初始化完成
     *
     * @param {*} opt
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onStoreLoad = function (opt) {
        _super.prototype.onStoreLoad.call(this, opt);
        // if (this.multiselect && Array.isArray(opt)) {
        //     this.allData.emit(opt);
        // }
    };
    /**
     * 视图部件初始化完成
     *
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onInited = function () {
        _super.prototype.onInited.call(this);
        var grid = this.getGrid();
        // if (grid) {
        //     grid.setMultiSelect(this.multiselect);
        // }
    };
    /**
     * 获取多数据对象
     *
     * @returns {*}
     * @memberof IBizGridViewController
     */
    IBizPickupGridViewController.prototype.getMDCtrl = function () {
        return this.getControl('grid');
    };
    /**
     * 数据选择事件触发，提交选中数据
     *
     * @param {Array<any>} selection
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onSelectionChange = function (selection) {
        // this.selectionChange.emit(selection);
    };
    /**
     * 数据被激活<最典型的情况就是行双击>
     *
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizPickupGridViewController
     */
    IBizPickupGridViewController.prototype.onDataActivated = function (data) {
        if (data === void 0) { data = {}; }
        _super.prototype.onDataActivated.call(this, data);
        if (Object.keys(data).length === 0) {
            return;
        }
        // this.dataActivated.emit([data]);
    };
    return IBizPickupGridViewController;
}(IBizGridViewController));

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
 * 编辑视图控制器
 *
 * @class IBizEditViewController
 * @extends {IBizMainViewController}
 */
var IBizEditViewController = /** @class */ (function (_super) {
    __extends(IBizEditViewController, _super);
    /**
     * Creates an instance of IBizEditViewController.
     * 创建IBizEditViewController实例
     *
     * @param {*} [opts={}]
     * @memberof IBizEditViewController
     */
    function IBizEditViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 表单保存后操作行为
         *
         * @private
         * @type {string}
         * @memberof IBizEditViewController
         */
        _this.afterformsaveaction = '';
        /**
         * 最后的工作流实体界面行为
         *
         * @private
         * @type {*}
         * @memberof IBizEditViewController
         */
        _this.lastwfuiaction = {};
        /**
         * 最后工作流操作参数
         *
         * @private
         * @type {*}
         * @memberof IBizEditViewController
         */
        _this.lastwfuaparam = {};
        return _this;
    }
    /**
     * 初始化表单
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var form = this.getForm();
        if (form) {
            // 表单保存之前
            form.on(IBizEditForm.FORMBEFORESAVE).subscribe(function (data) {
                _this.onFormBeforeSaved(data);
            });
            // 表单保存完成
            form.on(IBizForm.FORMSAVED).subscribe(function (data) {
                _this.onFormSaved(data);
            });
            // 表单加载完成
            form.on(IBizForm.FORMLOADED).subscribe(function (data) {
                _this.onFormLoaded();
            });
            // 表单删除完成
            form.on(IBizForm.FORMREMOVED).subscribe(function (data) {
                _this.onFormRemoved();
            });
            // 工作流启动完成
            form.on(IBizForm.FORMWFSTARTED).subscribe(function (data) {
                _this.onFormWFStarted();
            });
            // 工作流提交完成
            form.on(IBizForm.FORMWFSUBMITTED).subscribe(function (data) {
                _this.onFormWFSubmitted();
            });
            // 编辑表单实体界面行为
            form.on(IBizEditForm.UIACTIONFINISHED).subscribe(function (data) {
                if (data.reloadData) {
                    _this.refreshReferView();
                }
                if (data.closeEditview) {
                    _this.closeWindow();
                }
            });
            // 表单属性值变化
            form.on(IBizForm.FORMFIELDCHANGED).subscribe(function (data) {
                if (data == null) {
                    _this.onFormFieldChanged('', null, null);
                }
                else {
                    _this.onFormFieldChanged(data.name, data.field, data.value);
                    _this.onFormFieldValueCheck(data.name, data.field.getValue());
                }
            });
            // 表单权限发生变化
            form.on(IBizForm.DATAACCACTIONCHANGE).subscribe(function (data) {
                _this.onDataAccActionChange(data);
            });
        }
    };
    /**
     * 加载数据
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var editForm = this.getForm();
        if (editForm) {
            editForm.autoLoad(this.getViewParam());
        }
    };
    /**
     *
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.addEditMenu = function () {
    };
    /**
     * 判断表单是否修改了
     *
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.unloaded = function () {
        // 判断表单是否修改了
        // if (this.form.isDirty()) {
        //     return IGM('EDITVIEWCONTROLLER.UNLOADED.INFO', '表单已经被修改是否关闭');
        // }
        return false;
    };
    /**
     * 表单权限发生变化
     *
     * @param {*} dataaccaction
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onDataAccActionChange = function (dataaccaction) {
        if (this.getToolBar()) {
            this.getToolBar().updateAccAction(dataaccaction);
        }
        // if (this.getToolbar())
        //     this.getToolbar().updateAccAction(dataaccaction);
        // if (this.mintoolbar)
        //     this.mintoolbar.updateAccAction(dataaccaction);
        // if (this.floattoolbar)
        //     this.floattoolbar.updateAccAction(dataaccaction);
    };
    /**
     * 设置父数据
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onSetParentData = function () {
        // if (this.isInited() == true) {
        //     if (this.parentData) {
        //         var params = .extend(this.viewparam, this.parentData);
        //         this.form.autoLoad(params);
        //     }
        // }
    };
    /**
     * 获取表单对象
     *
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getForm = function () {
        return this.getControl('form');
    };
    /**
     * 获取数据信息区对象
     *
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getDataInfoBar = function () {
        // return this.datainfobar;
        return;
    };
    /**
     * 表单保存之前，处理视图数据
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormBeforeSaved = function (arg) {
        if (arg === void 0) { arg = {}; }
        Object.assign(arg, this.getViewParam());
    };
    /**
     * 表单保存完成
     *
     * @param {*} [result={}]
     * @returns {void}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormSaved = function (result) {
        if (result === void 0) { result = {}; }
        this.refreshReferView();
        if (Object.is(this.afterformsaveaction, 'exit')) {
            // var window = this.getWindow();
            // if (window) {
            //     window.dialogResult = 'ok';
            //     window.activeData = this.getForm().getValues();
            // }
            this.closeWindow();
            return;
        }
        if (Object.is(this.afterformsaveaction, 'new')) {
            var arg = this.getViewParam();
            if (!arg) {
                arg = {};
            }
            this.getForm().loadDraft(arg);
            return;
        }
        if (Object.is(this.afterformsaveaction, 'dowfuiaction')) {
            this.afterformsaveaction = 'dowfuiactionok';
            this.doWFUIAction(this.lastwfuiaction, this.lastwfuaparam);
            return;
        }
        if (Object.is(this.afterformsaveaction, 'startwf')) {
            this.startWF();
        }
        else {
            // 判断是否已经出现过提示
            if (!result || !result.info) {
                // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), IGM('EDITVIEWCONTROLLER.ONFORMSAVED.INFO', '数据保存成功！'), 1);
                this.iBizNotification.success('信息', '数据保存成功！');
            }
        }
        this.updateViewInfo();
    };
    /**
     * 表单加载完成
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormLoaded = function () {
        this.updateViewInfo();
    };
    /**
     * 工作流表单启动完成
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormWFStarted = function () {
        this.refreshReferView();
        this.closeWindow();
    };
    /**
     * 工作流表单提交完成
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormWFSubmitted = function () {
        this.refreshReferView();
        this.closeWindow();
    };
    /**
     * 更细视图caption信息
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.updateViewInfo = function () {
        var form = this.getForm();
        if (!form) {
            return;
        }
        var _srfuf = form.findField('srfuf');
        if (!_srfuf) {
            return;
        }
        var newdata = !Object.is(_srfuf.getValue(), '1');
        var dataAccAction = form.getdataaccaction();
        this.calcToolbarItemState(!newdata, dataAccAction);
        var info = '';
        if (newdata) {
            info = '新建';
        }
        else {
            var _srfmajortext = form.findField('srfmajortext');
            if (_srfmajortext) {
                info = _srfmajortext.getValue();
            }
        }
        var _StrInfo = info.replace(/[null]/g, '').replace(/[undefined]/g, '').replace(/[ ]/g, '');
        if (_StrInfo.length > 10) {
            info = _StrInfo.substring(0, 10) + "...";
        }
        this.dataInfo = Object.is(info, '') ? '' : info;
    };
    /**
     * 表单删除完成
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormRemoved = function () {
        this.refreshReferView();
        this.closeWindow();
    };
    /**
     * 表单项更新
     *
     * @param {string} fieldname
     * @param {*} field
     * @param {string} value
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormFieldChanged = function (fieldname, field, value) {
    };
    /**
     * 表单项值检测
     *
     * @param {string} fieldname
     * @param {string} value
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onFormFieldValueCheck = function (fieldname, value) {
    };
    /**
     * 处理实体界面行为
     *
     * @param {*} [uiaction={}] 界面行为
     * @param {*} [params={}]  参数
     * @returns {void}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.tag, 'Help')) {
            this.doHelp();
            return;
        }
        if (Object.is(uiaction.tag, 'SaveAndStart')) {
            this.doSaveAndStart();
            return;
        }
        if (Object.is(uiaction.tag, 'SaveAndExit')) {
            this.doSaveAndExit();
            return;
        }
        if (Object.is(uiaction.tag, 'SaveAndNew')) {
            this.doSaveAndNew();
            return;
        }
        if (Object.is(uiaction.tag, 'Save')) {
            this.doSave();
            return;
        }
        if (Object.is(uiaction.tag, 'Print')) {
            this.doPrint();
            return;
        }
        if (Object.is(uiaction.tag, 'Copy')) {
            this.doCopy();
            return;
        }
        if (Object.is(uiaction.tag, 'RemoveAndExit')) {
            this.doRemoveAndExit();
            return;
        }
        if (Object.is(uiaction.tag, 'Refresh')) {
            this.doRefresh();
            return;
        }
        if (Object.is(uiaction.tag, 'New')) {
            this.doNew();
            return;
        }
        if (Object.is(uiaction.tag, 'FirstRecord')) {
            this.doMoveToRecord('first');
            return;
        }
        if (Object.is(uiaction.tag, 'PrevRecord')) {
            this.doMoveToRecord('prev');
            return;
        }
        if (Object.is(uiaction.tag, 'NextRecord')) {
            this.doMoveToRecord('next');
            return;
        }
        if (Object.is(uiaction.tag, 'LastRecord')) {
            this.doMoveToRecord('last');
            return;
        }
        if (Object.is(uiaction.tag, 'Exit') || Object.is(uiaction.tag, 'Close')) {
            this.doExit();
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    /**
     * 编辑界面_实体帮助界面操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doHelp = function () {
        // IBiz.alert(IGM('IBIZAPP.CONFIRM.TITLE.INFO', '信息'), IGM('EDITVIEWCONTROLLER.DOHELP.INFO', '编辑界面_帮助操作！'), 5);
        this.iBizNotification.info('信息', '编辑界面_帮助操作！');
    };
    /**
     * 编辑界面_保存并启动工作流操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doSaveAndStart = function () {
        this.afterformsaveaction = 'startwf';
        this.saveData({ 'postType': 'startwf' });
    };
    /**
     * 编辑界面_保存并退出操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doSaveAndExit = function () {
        this.afterformsaveaction = 'exit';
        var window = this.getWindow();
        // if (window) {
        //     window.dialogResult = 'cancel';
        // }
        this.saveData({});
    };
    /**
     * 编辑界面_保存并新建操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doSaveAndNew = function () {
        this.afterformsaveaction = 'new';
        this.saveData({});
    };
    /**
     * 编辑界面_保存操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doSave = function () {
        this.afterformsaveaction = '';
        this.saveData({});
    };
    /**
     * 编辑界面_打印操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doPrint = function () {
        // var arg = {};
        // arg.srfkey = '';
        // var field = this.getForm().findField('srforikey');
        // if (field) {
        //     arg.srfkey = field.getValue();
        // }
        // if (arg.srfkey == undefined || arg.srfkey == '') {
        //     field = this.getForm().findField('srfkey');
        //     if (field) {
        //         arg.srfkey = field.getValue();
        //     }
        // }
        // if (arg.srfkey == '')
        //     return;
        // this.onPrintData(arg);
    };
    /**
     * 编辑界面_拷贝操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doCopy = function () {
        var arg = {};
        Object.assign(arg, this.getViewParam());
        arg.srfkey = '';
        if (!this.getForm()) {
            return;
        }
        var srforikey = this.getForm().findField('srforikey');
        if (srforikey) {
            arg.srfsourcekey = srforikey.getValue();
        }
        if (!arg.srfsourcekey || Object.is(arg.srfsourcekey, '')) {
            var srfkey = this.getForm().findField('srfkey');
            if (srfkey) {
                arg.srfsourcekey = srfkey.getValue();
            }
        }
        if (!arg.srfsourcekey || Object.is(arg.srfsourcekey, '')) {
            this.iBizNotification.warning('警告', '当前表单未加载数据，不能拷贝');
            return;
        }
        this.getForm().autoLoad(arg);
    };
    /**
     * 编辑界面_删除并退出操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doRemoveAndExit = function () {
        var _this = this;
        this.iBizNotification.confirm('删除提示', '确认要删除当前数据，删除操作将不可恢复？').subscribe(function (result) {
            if (result && Object.is(result, 'OK')) {
                _this.removeData();
            }
        });
    };
    /**
     * 编辑界面_刷新操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doRefresh = function () {
        this.iBizNotification.info('信息', '编辑界面_刷新操作！');
    };
    /**
     * 编辑界面_新建操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doNew = function () {
        this.iBizNotification.info('信息', '编辑界面_新建操作！');
    };
    /**
     * 编辑界面_退出操作
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doExit = function () {
        this.closeWindow();
    };
    /**
     * 保存视图数据
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.saveData = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg) {
            arg = {};
        }
        this.getForm().save2(arg);
    };
    /**
     * 删除视图数据
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.removeData = function (arg) {
        if (arg === void 0) { arg = {}; }
        if (!arg) {
            arg = {};
        }
        this.getForm().remove(arg);
    };
    /**
     * 刷新关联数据
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.refreshReferView = function () {
    };
    /**
     * 更新表单项
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.updateFormItems = function (arg) {
        if (arg === void 0) { arg = {}; }
        this.getForm().updateFormItems(arg);
    };
    /**
     *
     *
     * @param {boolean} bShow
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.showCommandBar = function (bShow) {
        // var toolbar = this.getToolbar();
        // if (toolbar && (toolbar.isHidden() == bShow)) {
        //     if (bShow) {
        //         toolbar.show();
        //     } else toolbar.hide();
        // }
    };
    /**
     * 工作流实体界面行为
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doWFUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (this.isEnableEditData()) {
            if (!Object.is(this.afterformsaveaction, 'dowfuiactionok')) {
                this.afterformsaveaction = 'dowfuiaction';
                this.lastwfuiaction = uiaction;
                this.lastwfuaparam = params;
                this.saveData({});
                return;
            }
            this.afterformsaveaction = '';
            this.lastwfuiaction = null;
            this.lastwfuaparam = null;
        }
        if (Object.is(uiaction.actionmode, 'WFBACKEND')) {
            var arg = {
                srfwfiatag: uiaction.tag
            };
            this.getForm().wfsubmit(arg);
            return;
        }
        _super.prototype.doWFUIAction.call(this, uiaction, params);
    };
    /**
     * 启动工作流
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.startWF = function (arg) {
        if (arg === void 0) { arg = {}; }
        var startuiaction = this.getUIAction('WFStartWizard');
        if (startuiaction) {
            this.doUIAction(startuiaction, {});
        }
        else {
            this.getForm().wfstart(arg);
        }
    };
    /**
     *
     *
     * @param {*} target
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doMoveToRecord = function (target) {
        // var referView = this.getReferView();
        // if (referView && referView.moveRecord) {
        //     var record = referView.moveRecord(target);
        //     if (record) {
        //         var loadParam = {};
        //         .extend(loadParam, {
        //             srfkey: record.get('srfkey')
        //         });
        //         this.getForm().autoLoad(loadParam);
        //     }
        // }
    };
    /**
     * 执行后台界面行为
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doBackendUIAction = function (arg) {
        if (arg === void 0) { arg = {}; }
        this.getForm().doUIAction(arg);
    };
    /**
     * 获取前台行为参数
     *
     * @param {*} [uiaction={}] 行为
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getFrontUIActionParam = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        var arg = _super.prototype.getFrontUIActionParam.call(this, uiaction);
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            var valueitem = 'srfkey';
            var paramkey = 'srfkeys';
            var paramjo = null;
            var paramitems = null;
            if (uiaction.actionparams) {
                var actionparams = uiaction.actionparams;
                valueitem = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem;
                paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                paramjo = actionparams.paramjo ? actionparams.paramjo : {};
            }
            var field = this.getForm().findField('srforikey');
            if (field) {
                paramitems = field.getValue();
            }
            if (!paramitems || Object.is(paramitems, '')) {
                field = this.getForm().findField(valueitem);
                if (field) {
                    paramitems = field.getValue();
                }
            }
            var data = {};
            data[paramkey] = paramitems;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            return Object.assign(arg, data);
        }
        return arg;
    };
    /**
     * 获取后台行为参数
     *
     * @param {*} [uiaction={}] 行为
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getBackendUIActionParam = function (uiaction) {
        if (uiaction === void 0) { uiaction = {}; }
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            var valueitem = 'srfkey';
            var paramkey = 'srfkeys';
            var paramjo = null;
            var infoitem = 'srfmajortext';
            if (uiaction.actionparams) {
                var actionparams = uiaction.actionparams;
                valueitem = (actionparams.valueitem && !Object.is(actionparams.valueitem, '')) ? actionparams.valueitem.toLowerCase() : valueitem;
                paramkey = (actionparams.paramitem && !Object.is(actionparams.paramitem, '')) ? actionparams.paramitem.toLowerCase() : paramkey;
                infoitem = (actionparams.textitem && !Object.is(actionparams.textitem, '')) ? actionparams.textitem.toLowerCase() : infoitem;
                paramjo = actionparams.paramjo ? actionparams.paramjo : {};
            }
            var dataInfo = '';
            var keys = '';
            var field = this.getForm().findField(valueitem);
            if (field) {
                keys = field.getValue();
            }
            field = this.getForm().findField(infoitem);
            if (field) {
                dataInfo = field.getValue();
            }
            var data = { dataInfo: dataInfo };
            data[paramkey] = keys;
            if (paramjo) {
                Object.assign(data, paramjo);
            }
            var formData = this.getForm().getValues();
            if (formData.srfkey) {
                delete formData.srfkey;
            }
            return Object.assign(data, this.getForm().getValues());
        }
        return {};
    };
    /**
     * 初始化浮动工具栏
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.initFloatToolbar = function () {
        // var offset = 60;
        // var duration = 300;
        // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
        //     (window).bind('touchend touchcancel touchleave', function (e) {
        //         if ((this).scrollTop() > offset) {
        //             ('.scroll-to-top').fadeIn(duration);
        //         } else {
        //             ('.scroll-to-top').fadeOut(duration);
        //         }
        //     });
        // } else {
        //     (window).scroll(function () {
        //         if ((this).scrollTop() > offset) {
        //             ('.scroll-to-top').fadeIn(duration);
        //         } else {
        //             ('.scroll-to-top').fadeOut(duration);
        //         }
        //     });
        // }
        // ('.scroll-to-top').click(function (e) {
        //     e.preventDefault();
        //     return false;
        // });
    };
    /**
     * 工作流前端实体界面后窗口关闭
     *
     * @param {*} win
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onWFUIFrontWindowClosed = function (win, data) {
        // if (win.dialogResult == 'ok') {
        //     var window = this.getWindow();
        //     if (window) {
        //         window.dialogResult = 'ok';
        //         window.activeData = this.getForm().getValues();
        //     }
        // this.refreshReferView();
        // this.closeWindow();
        //     return;
        // }
        if (data === void 0) { data = {}; }
        // if (win) {
        //     if (Object.is(win.ret, 'OK')) {
        //         // this.closeView();
        //     }
        // }
        this.refreshReferView();
        this.closeWindow();
    };
    /**
     * 是否启用新建数据
     *
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.isEnableNewData = function () {
        return true;
    };
    /**
     * 是否启用编辑数据
     *
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.isEnableEditData = function () {
        return true;
    };
    /**
     * 是否启用删除数据
     *
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.isEnableRemoveData = function () {
        return true;
    };
    /**
     * 打印数据
     *
     * @param {*} [arg={}]
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onPrintData = function (arg) {
        if (arg === void 0) { arg = {}; }
        this.doPrintDataNormal(arg);
    };
    /**
     * 打印常规数据
     *
     * @param {*} [arg={}]
     * @returns {boolean}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.doPrintDataNormal = function (arg) {
        if (arg === void 0) { arg = {}; }
        // var view = this.getPrintDataView(arg);
        // if (view == null) {
        //     return false;
        // }
        // var viewurl = view.viewurl;
        // if (!viewurl || viewurl == '') {
        //     viewurl = BASEURL + '/ibizutil/print.pdf';
        // }
        // else {
        //     viewurl = BASEURL + viewurl;
        // }
        // viewurl = viewurl + (viewurl.indexOf('?') == -1 ? '?' : '&') + .param(view.viewparam);
        // window.open(viewurl, '_blank');
        return true;
    };
    /**
     * 获取打印数据
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.getPrintDataView = function (arg) {
        // return null;
        if (arg === void 0) { arg = {}; }
        return undefined;
    };
    /**
     * 视图数据刷新
     *
     * @memberof IBizEditViewController
     */
    IBizEditViewController.prototype.onRefresh = function () {
        var form = this.getForm();
        if (form) {
            form.reload();
        }
    };
    return IBizEditViewController;
}(IBizMainViewController));

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
 * 单项选择视图控制器
 *
 * @class IBizPickupViewController
 * @extends {IBizMainViewController}
 */
var IBizPickupViewController = /** @class */ (function (_super) {
    __extends(IBizPickupViewController, _super);
    /**
     * Creates an instance of IBizPickupViewController.
     * 创建 IBizPickupViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizPickupViewController
     */
    function IBizPickupViewController(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * 按钮文本--确定
         *
         * @type {string}
         * @memberof IBizPickupViewController
         */
        _this.okBtnText = '确定';
        /**
         * 按钮文本--取消
         *
         * @type {string}
         * @memberof IBizPickupViewController
         */
        _this.cancelBtnText = '取消';
        /**
         * 是否选中
         *
         * @type {boolean}
         * @memberof IBizPickupViewController
         */
        _this.isSelect = false;
        return _this;
    }
    /**
     * 视图部件初始化
     *
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var pickupViewPanel = this.getPickupViewPanel();
        if (pickupViewPanel) {
            // 选择视图面板数据选中
            pickupViewPanel.on(IBizPickupViewPanel.SELECTIONCHANGE, function (args) {
                _this.onSelectionChange(args);
            });
            // 选择视图面板数据激活
            pickupViewPanel.on(IBizPickupViewPanel.DATAACTIVATED, function (args) {
                _this.onDataActivated(args);
            });
        }
    };
    /**
     * 数据选择，确定功能
     *
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onClickOkButton = function () {
        var pickupViewPanel = this.getPickupViewPanel();
        if (!pickupViewPanel) {
            return;
        }
        if (pickupViewPanel.getSelections().length !== 1) {
            return;
        }
        // this.nzModalSubject.next({ ret: 'OK', selection: pickupViewPanel.getSelections() });
        // this.nzModalSubject.next('DATACHANGE');
        // this.closeWindow();
    };
    /**
     * 取消显示选择视图
     *
     * @param {string} type
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onClickCancelButton = function (type) {
        // this.nzModalSubject.destroy(type);
    };
    /**
     * 接收选择视图数据传递
     *
     * @param {Array<any>} args
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onSelectionChange = function (args) {
        this.isSelect = args.length > 0 ? true : false;
    };
    /**
     * 数据选中激活
     *
     * @param {Array<any>} args
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.onDataActivated = function (args) {
        this.onSelectionChange(args);
        this.onClickOkButton();
    };
    /**
     * 获取选择视图面板
     *
     * @returns {*}
     * @memberof IBizPickupViewController
     */
    IBizPickupViewController.prototype.getPickupViewPanel = function () {
        return this.getControl('pickupviewpanel');
    };
    return IBizPickupViewController;
}(IBizMainViewController));

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
 * 树导航视图控制器
 *
 * @class IBizTreeExpViewController
 * @extends {IBizMainViewController}
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
        var _this = _super.call(this, opts) || this;
        /**
         *
         *
         * @type {string}
         * @memberof IBizTreeExpViewController
         */
        _this.treeReloadMode = '';
        /**
         * 导航分页对象
         *
         * @type {IBizExpTabService}
         * @memberof IBizTreeExpViewController
         */
        _this.exptab = null;
        _this.exptab = new IBizExpTab({
            name: 'exptab',
            viewController: _this,
            url: opts.url,
        });
        _this.regControl('exptab', _this.exptab);
        return _this;
    }
    /**
     * 部件初始化
     *
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var treeExpBar = this.getTreeExpBar();
        if (treeExpBar) {
            treeExpBar.on(IBizTreeExpBar.SELECTIONCHANGE, function (data) {
                _this.treeExpBarSelectionChange(data);
            });
        }
    };
    /**
     * 获取导航部件服务对象
     *
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getTreeExpBar = function () {
        return this.getControl('treeexpbar');
    };
    /**
     * 获取导航分页部件服务对象
     *
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getExpTab = function () {
        return this.getControl('exptab');
    };
    /**
     *
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doDEUIAction = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        this.treeReloadMode = '';
        if (Object.is(uiaction.tag, 'Remove')) {
            this.doRemove(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Refresh')) {
            this.doTreeRefresh(params);
            return;
        }
        if (Object.is(uiaction.tag, 'New')) {
            this.doNew(params);
            return;
        }
        if (Object.is(uiaction.tag, 'EDITDATA')) {
            this.doEdit(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Copy')) {
            this.doCopy(params);
            return;
        }
        _super.prototype.doDEUIAction.call(this, uiaction, params);
    };
    /**
     * 新建操作
     *
     * @param {any} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doNew = function (params) {
        this.onNewData(params);
    };
    /**
     * 拷贝操作
     *
     * @param {any} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doCopy = function (params) {
        var arg = {
            data: params,
            srfcopymode: true
        };
        this.onEditData(arg);
    };
    /**
     * 编辑操作
     *
     * @param {*} params
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doEdit = function (params) {
        // 获取要编辑的数据集合
        if (params && params.srfkey) {
            var arg = { data: params };
            this.onEditData(arg);
            return;
        }
    };
    /**
     * 查看操作
     *
     * @param {any} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doView = function (params) {
        this.doEdit(params);
    };
    /**
     * 删除操作
     *
     * @param {*} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doRemove = function (params) {
        this.onRemove(params);
    };
    /**
     * 刷新操作
     *
     * @param {*} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doTreeRefresh = function (params) {
        this.onTreeRefresh(params);
    };
    /**
     * 新建数据
     *
     * @param {*} arg
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onNewData = function (arg) {
        this.treeReloadMode = IBizTreeExpViewController.REFRESHMODE_CURRENTNODE;
        var loadParam = {};
        if (this.getViewParam()) {
            Object.assign(loadParam, this.getViewParam());
        }
        if (this.getParentMode()) {
            Object.assign(loadParam, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(loadParam, this.getParentData());
        }
        if (this.isEnableBatchAdd()) {
            this.doNewDataBatch(loadParam);
            return;
        }
        if (this.doNewDataWizard(loadParam)) {
            return;
        }
        var newMode = this.getNewMode(arg);
        if (newMode) {
            loadParam.srfnewmode = newMode;
        }
        this.doNewDataNormal(loadParam, arg);
    };
    /**
     * 批量新建
     *
     * @param {*} arg
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doNewDataBatch = function (arg) {
        return false;
    };
    /**
     * 批量新建关闭
     *
     * @param {*} win
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onMPickupWindowClose = function (win) {
    };
    /**
     * 批量添加数据
     *
     * @param {*} selectedDatas
     * @returns {string}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.addDataBatch = function (selectedDatas) {
        return '';
    };
    /**
     * 向导新建数据
     *
     * @param {*} arg
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doNewDataWizard = function (arg) {
        return false;
    };
    /**
     * 向导新建数据窗口关闭
     *
     * @param {any} win
     * @param {any} eOpts
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onNewDataWizardWindowClose = function (win, eOpts) {
        return;
    };
    /**
     * 常规新建数据
     *
     * @param {any} arg
     * @param {any} params
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doNewDataNormal = function (arg, params) {
        var view = this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        if (params && view.viewparam && view.viewparam.srfparenttype) {
            var parentType = view.viewparam.srfparenttype;
            if (Object.is(parentType, 'DER1N')) {
                view.viewparam.srfparentkey = params.srfkey;
            }
        }
        return this.openDataView(view);
    };
    /**
     * 编辑数据
     *
     * @param {any} arg
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onEditData = function (arg) {
        this.treeReloadMode = IBizTreeExpViewController.REFRESHMODE_PARENTNODE;
        var loadParam = {};
        if (this.getViewParam()) {
            Object.assign(loadParam, this.getViewParam());
        }
        if (this.getParentMode()) {
            Object.assign(loadParam, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(loadParam, this.getParentData());
        }
        if (arg.srfcopymode) {
            Object.assign(loadParam, {
                srfsourcekey: arg.data.srfkey
            });
        }
        else {
            Object.assign(loadParam, { srfkey: arg.data.srfkey });
        }
        var editMode = this.getEditMode(arg.data);
        if (editMode) {
            loadParam.srfeditmode = editMode;
        }
        if (arg.data.srfmstag) {
            loadParam.srfeditmode2 = arg.data.srfmstag;
        }
        this.doEditDataNormal(loadParam);
    };
    /**
     * 执行常规编辑数据
     *
     * @param {any} arg
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doEditDataNormal = function (arg) {
        var view = this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        return this.openDataView(view);
    };
    /**
     * 打开数据视图
     *
     * @param {any} view
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.openDataView = function (view) {
        return true;
    };
    /**
     *
     *
     * @param {any} params
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onRemove = function (params) {
    };
    /**
     * 界面操作树节点刷新
     *
     * @param {any} params
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onTreeRefresh = function (params) {
    };
    /**
     * 视图刷新操作
     *
     * @returns {void}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.onRefresh = function () {
        var node;
        if (Object.is(this.treeReloadMode, IBizTreeExpViewController.REFRESHMODE_NONE)) {
            return;
        }
        else if (Object.is(this.treeReloadMode, IBizTreeExpViewController.REFRESHMODE_CURRENTNODE)) {
            var nodes = this.getSelected(true);
            if (nodes && nodes.length > 0) {
                node = nodes[0];
            }
        }
        else if (Object.is(this.treeReloadMode, IBizTreeExpViewController.REFRESHMODE_PARENTNODE)) {
            var nodes = this.getSelected(true);
            if (nodes && nodes.length > 0) {
                node = nodes[0].parent;
            }
        }
        // 刷新树节点
        // this.getTreeExpBar().getTree().reload(node);
    };
    /**
     *
     *
     * @param {any} bFull
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getSelected = function (bFull) {
        var nodes = this.getTreeExpBar().getTree().getSelected(bFull);
        return nodes;
    };
    /**
     * 获取新建模式
     *
     * @param {*} data
     * @returns {string}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getNewMode = function (data) {
        return 'NEWDATA@' + data.srfnodetype.toUpperCase();
    };
    /**
     * 获取编辑模式
     *
     * @param {*} data
     * @returns {string}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getEditMode = function (data) {
        return 'EDITDATA@' + data.srfnodetype.toUpperCase();
    };
    /**
     * 获取编辑视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getEditDataView = function (arg) {
        return this.getEditDataView(arg);
    };
    /**
     * 获取新建视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getNewDataView = function (arg) {
        return this.getNewDataView(arg);
    };
    /**
     * 获取新建向导视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getNewDataWizardView = function (arg) {
        return null;
    };
    /**
     * 获取多选视图
     *
     * @param {any} arg
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getMPickupView = function (arg) {
        return null;
    };
    /**
     *
     *
     * @param {any} arg
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.doBackendUIAction = function (arg) {
    };
    /**
     *
     *
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.isEnableBatchAdd = function () {
        return false;
    };
    /**
     *
     *
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.isBatchAddOnly = function () {
        return false;
    };
    /**
     *
     *
     * @param {*} [uiaction={}]
     * @param {*} [params={}]
     * @returns {*}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.getBackendUIActionParam = function (uiaction, params) {
        if (uiaction === void 0) { uiaction = {}; }
        if (params === void 0) { params = {}; }
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            var node = null;
            var keys = params.srfkey;
            var dataInfo = params.srfmajortext;
            var nodeType = params.srfnodetype;
            return { srfkeys: keys, srfkey: keys, dataInfo: dataInfo, srfnodetype: nodeType };
        }
        return {};
    };
    /**
     * 树导航部件选中变化
     *
     * @param {*} [data={}]
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.treeExpBarSelectionChange = function (data) {
        if (data === void 0) { data = {}; }
        if (!data || Object.keys(data).length === 0 || !data.viewid) {
            return;
        }
        var routeString = data.viewid;
        if (!this.hasChildRoute(routeString.toLocaleLowerCase())) {
            return;
        }
        var viewParam = data.viewParam;
        Object.assign(viewParam, { refreshView: true });
        this.openView(routeString.toLocaleLowerCase(), viewParam);
    };
    /**
     * 是否子路由
     *
     * @private
     * @param {string} link
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizTreeExpViewController.prototype.hasChildRoute = function (link) {
        var hasChildRoute = true;
        return hasChildRoute;
    };
    IBizTreeExpViewController.REFRESHMODE_CURRENTNODE = 'CURRENTNODE';
    IBizTreeExpViewController.REFRESHMODE_PARENTNODE = 'PARENTNODE';
    IBizTreeExpViewController.REFRESHMODE_ALLNODE = 'ALLNODE';
    IBizTreeExpViewController.REFRESHMODE_NONE = 'NONE';
    return IBizTreeExpViewController;
}(IBizMainViewController));

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
 * 导航视图控制器
 *
 * @class IBizExpViewController
 * @extends {IBizMainViewController}
 */
var IBizExpViewController = /** @class */ (function (_super) {
    __extends(IBizExpViewController, _super);
    /**
     * Creates an instance of IBizExpViewController.
     * 创建 IBizExpViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizExpViewController
     */
    function IBizExpViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 初始化导航部件
     *
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.onInitComponents = function () {
        var _this = this;
        _super.prototype.onInitComponents.call(this);
        var expCtrl = this.getExpCtrl();
        if (expCtrl) {
            expCtrl.on(IBizTreeExpBar.SELECTIONCHANGE, function (item) {
                _this.onExpCtrlSelectionChange(item);
            });
            expCtrl.on(IBizTreeExpBar.LOADED, function (item) {
                _this.onExpCtrlLoaded(item);
            });
        }
    };
    /**
     * 导航部件加载
     *
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var expCtrl = this.getExpCtrl();
        if (expCtrl) {
            expCtrl.load({});
        }
    };
    /**
     * 获取导航部件
     *
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getExpCtrl = function () {
        var expctrl = this.getExpBar();
        if (expctrl) {
            return expctrl;
        }
        expctrl = this.getExpTab();
        if (expctrl) {
            return expctrl;
        }
        return undefined;
    };
    /**
     * 获取导航部件
     *
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getExpBar = function () {
        return this.getControl('expbar');
    };
    /**
     * 获取导航分页部件
     *
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getExpTab = function () {
        return this.getControl('exptab');
    };
    /**
     * 导航部件值选中变化
     *
     * @param {*} [item={}]
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.onExpCtrlSelectionChange = function (item) {
        if (item === void 0) { item = {}; }
    };
    /**
     * 导航树部件加载完成
     *
     * @param {*} [item={}]
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.onExpCtrlLoaded = function (item) {
        if (item === void 0) { item = {}; }
    };
    /**
     * 获取导航项视图参数，在发布视图控制器内重写
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getExpItemView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return undefined;
    };
    /**
     * 获取新建导航视图参数，在发布视图控制器中重写
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getNewDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return undefined;
    };
    /**
     * 获取编辑导航视图参数，在发布视图控制器中重写
     *
     * @param {*} [arg={}]
     * @returns {*}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.getEditDataView = function (arg) {
        if (arg === void 0) { arg = {}; }
        return undefined;
    };
    /**
     * 节点路由是否存在
     *
     * @param {string} routeLink
     * @returns {boolean}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.hasRoute = function (routeLink) {
        var hasRoute = false;
        return hasRoute;
    };
    /**
     * 是否需要手动跳转路由
     *
     * @private
     * @param {*} [item={}]
     * @returns {boolean}
     * @memberof IBizTreeExpViewController
     */
    IBizExpViewController.prototype.isRefreshView = function (routeSting) {
        var refreshView = false;
        return refreshView;
    };
    /**
     * 打开导航子视图
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizExpViewController
     */
    IBizExpViewController.prototype.openExpChildView = function (item) {
        if (item === void 0) { item = {}; }
        if (!item || Object.keys(item).length === 0) {
            return;
        }
        var view = this.getExpItemView(item.expitem);
        if (!view) {
            return;
        }
        var hasRouter = this.hasRoute(view.routelink);
        if (!hasRouter) {
            return;
        }
        var data = {};
        Object.assign(data, item.expitem.viewparam);
        if (this.isRefreshView(view.routelink)) {
            Object.assign(data, { refreshView: true });
        }
        var exp = this.getExpBar();
        if (exp) {
            exp.setSelectItem(item);
        }
        this.openView(view.routelink, data);
    };
    return IBizExpViewController;
}(IBizMainViewController));

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
 * 树导航视图控制器
 *
 * @class IBizWFExpViewController
 * @extends {IBizExpViewController}
 */
var IBizWFExpViewController = /** @class */ (function (_super) {
    __extends(IBizWFExpViewController, _super);
    /**
     * Creates an instance of IBizWFExpViewController.
     * 创建 IBizWFExpViewController 实例
     *
     * @param {*} [opts={}]
     * @memberof IBizWFExpViewController
     */
    function IBizWFExpViewController(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    /**
     * 获取树导航部件
     *
     * @memberof IBizTreeExpViewController
     */
    IBizWFExpViewController.prototype.getExpBar = function () {
        return this.getControl('expbar');
    };
    /**
     * 导航视图部件加载完成
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpViewController
     */
    IBizWFExpViewController.prototype.onExpCtrlLoaded = function (item) {
        if (item === void 0) { item = {}; }
        this.openExpChildView(item);
    };
    /**
     * 导航树选中导航变化
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpViewController
     */
    IBizWFExpViewController.prototype.onExpCtrlSelectionChange = function (item) {
        if (item === void 0) { item = {}; }
        this.openExpChildView(item);
    };
    return IBizWFExpViewController;
}(IBizExpViewController));

"use strict";
Vue.component('ibiz-app-menu', {
    template: "\n    <i-menu theme=\"dark\" width=\"auto\" class=\"ibiz-app-menu\"  @on-select=\"onSelect($event)\" active-name=\"ctrl.selection.id\">\n        <template v-for=\"(item0, index0) in ctrl.items\">\n            <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n            <template v-if=\"item0.items && item0.items.length > 0\">\n                <submenu :name=\"item0.id\">\n                    <template slot=\"title\">\n                        <span><i :class=\"[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]\" aria-hidden=\"true\"></i> {{ item0.text }}</span>\n                    </template>\n                    <template v-for=\"(item1, index1) in item0.items\">\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                        <template v-if=\"item1.items && item1.items.length > 0\">\n                            <submenu :name=\"item1.id\">\n                                <template slot=\"title\">\n                                    <span>{{ item1.text }}</span>\n                                </template>\n                                <!---  \u4E09\u7EA7\u83DC\u5355 begin  --->\n                                <template v-for=\"(item2, index2) in item1.items\">\n                                    <menu-item :name=\"item2.id\">\n                                        <span>{{ item2.text }}</span>\n                                    </menu-item>\n                                </template>\n                                <!---  \u4E09\u7EA7\u83DC\u5355\u6709 begin  --->\n                            </submenu>\n                        </template>\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                        <template v-else>\n                            <menu-item :name=\"item1.id\">\n                                <span>{{ item1.text }}</span>\n                            </menu-item>\n                        </template>\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n                    </template>\n                </submenu>\n            </template>\n            <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n            <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n            <template v-else>\n                <menu-item :name=\"item0.id\">\n                    <span><i :class=\"[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]\" aria-hidden=\"true\" style=\"margin-right:8px;\"></i>{{ item0.text }}</span>\n                </menu-item>\n            </template>\n            <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n        </template>\n    </i-menu>\n    ",
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

"use strict";
Vue.component('ibiz-exp-bar', {
    template: "\n        <i-menu theme=\"light\" width=\"auto\" class=\"ibiz-exp-bar\" @on-select=\"onSelect($event)\"  @on-open-change=\"onOpenChange($event)\"\n          active-name=\"ctrl.selection.id\">\n            <template v-for=\"(item0, index0) in ctrl.items\">\n                <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                <template v-if=\"item0.items && item0.items.length > 0\">\n                    <submenu :name=\"item0.id\">\n                        <template slot=\"title\">\n                            <span>{{ item0.text }}</span>\n                            <span>&nbsp;&nbsp;<badge :count=\"item0.counterdata\"></badge></span>\n                        </template>\n                        <template v-for=\"(item1, index1) in item0.items\">\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                            <template v-if=\"item1.items && item1.items.length > 0\">\n                                <submenu :name=\"item1.id\">\n                                    <template slot=\"title\">\n                                        <span>{{ item1.text }}</span>\n                                        <span>&nbsp;&nbsp;<badge :count=\"item1.counterdata\"></badge></span>\n                                    </template>\n                                    <!---  \u4E09\u7EA7\u83DC\u5355 begin  --->\n                                    <template v-for=\"(item2, index2) in item1.items\">\n                                        <menu-item :name=\"item2.id\">\n                                            <span>{{ item2.text }}</span>\n                                            <span>&nbsp;&nbsp;<badge :count=\"item2.counterdata\"></badge></span>\n                                        </menu-item>\n                                    </template>\n                                    <!---  \u4E09\u7EA7\u83DC\u5355\u6709 begin  --->\n                                </submenu>\n                            </template>\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                            <template v-else>\n                                <menu-item :name=\"item1.id\">\n                                    <span>{{ item1.text }}</span>\n                                    <span>&nbsp;&nbsp;<badge :count=\"item1.counterdata\"></badge></span>\n                                </menu-item>\n                            </template>\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n                        </template>\n                    </submenu>\n                </template>\n                <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n                <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                <template v-else>\n                    <menu-item :name=\"item0.id\">\n                        <span>{{ item0.text }}</span>\n                        <span>&nbsp;&nbsp;<badge :count=\"item0.counterdata\"></badge></span>\n                    </menu-item>\n                </template>\n                <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n            </template>\n        </i-menu>\n    ",
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = { opendata: [] };
        return data;
    },
    mounted: function () {
    },
    methods: {
        setOpenData: function (arr) {
            var _this = this;
            arr.forEach(function (item) {
                if (item.items && item.items.length > 0) {
                    _this.opendata.push(item.id);
                    _this.setOpenData(item.items);
                }
            });
        },
        getItem: function (items, id) {
            var _this = this;
            var data = {};
            items.some(function (_item) {
                if (Object.is(id, _item.id)) {
                    Object.assign(data, _item);
                    return true;
                }
                if (_item.items && _item.items.length > 0) {
                    var subItem = _this.getItem(_item.items, id);
                    if (Object.keys(subItem).length > 0) {
                        Object.assign(data, subItem);
                        return true;
                    }
                }
            });
            return data;
        },
        onSelect: function (name) {
            console.log(name);
            var _this = this;
            var _data = _this.getItem(_this.ctrl.items, name);
            _this.ctrl.selection(_data);
        },
        onOpenChange: function (submenu) {
            console.log(submenu);
        },
    },
    watch: {
        'ctrl.items': function (val) {
            if (val && Array.isArray(val)) {
                this.items = val.slice();
                this.setOpenData(val);
            }
        }
    }
});

"use strict";
Vue.component('ibiz-modal', {
    template: "\n        <modal v-model=\"showmodal\" @on-visible-change=\"onVisibleChange($event)\" :title=\"title\" :footer-hide=\"true\" :mask-closable=\"false\" :width=\"width\">\n            <component :is=\"modalviewname\" :params=\"viewparam\" :viewType=\"'modalview'\" @close=\"close\" @dataChange=\"dataChange\"></component>\n        </modal>\n    ",
    props: ['key', 'params', 'index'],
    data: function () {
        var data = {
            showmodal: true,
            width: 0,
            title: '',
            modalviewname: '',
            subject: null,
            viewparam: {},
            _result: {}
        };
        var width = 600;
        if (window && window.innerWidth > 100) {
            if (window.innerWidth > 100) {
                width = window.innerWidth - 100;
            }
            else {
                width = window.innerWidth;
            }
        }
        Object.assign(data, { width: width });
        return data;
    },
    mounted: function () {
        this.modalviewname = this.params.modalviewname;
        if (this.params.subject) {
            this.subject = this.params.subject;
        }
        if (this.params.width && this.params.width !== 0) {
            this.width = this.params.width;
        }
        if (this.params.title) {
            this.title = this.params.title;
        }
        if (this.params.viewparam) {
            Object.assign(this.viewparam, this.params.viewparam);
        }
    },
    methods: {
        close: function (result) {
            console.log(result);
            if (this.subject) {
                if (result && Object.is(result.ret, 'OK')) {
                    this.subject.next(result);
                }
                else {
                    this.subject.unsubscribe();
                }
            }
            this.showmodal = false;
            // this.$emit("on-close", this.index)
        },
        dataChange: function (result) {
            console.log(result);
            this._result = {};
            if (result) {
                Object.assign(this._result, result);
            }
        },
        onVisibleChange: function ($event) {
            console.log($event);
            if ($event) {
                return;
            }
            if (this.subject) {
                if (this._result && Object.is(this._result.ret, 'OK')) {
                    this.subject.next(this._result);
                }
                else {
                    this.subject.unsubscribe();
                }
            }
        }
    }
});

"use strict";
Vue.component('ibiz-picker', {
    template: "\n    <i-input style=\"width: 100%;\" :icon=\"'ios-search'\" v-model=\"field.value\" :disabled=\"field.disabled\" @on-click=\"openView\">\n    </i-input>\n    ",
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        var data = {};
        Object.assign(data, this.field.editorParams);
        Object.assign(data, { form: this.field.getForm() });
        return data;
    },
    mounted: function () {
    },
    methods: {
        //  填充条件
        fillPickupCondition: function (arg) {
            if (this.form) {
                if (this.itemParam && this.itemParam.fetchcond) {
                    var fetchparam = {};
                    var fetchCond = this.itemParam.fetchcond;
                    if (fetchCond) {
                        for (var cond in fetchCond) {
                            var field = this.form.findField(fetchCond[cond]);
                            if (!field) {
                                this.iBizNotification.error('操作失败', '未能找到当前表单项' + fetchCond[cond] + '，无法继续操作');
                                return false;
                            }
                            var value = field.getValue();
                            if (!value == null || Object.is(value, '')) {
                                return false;
                            }
                            fetchparam[cond] = value;
                        }
                    }
                    Object.assign(arg, { srffetchcond: JSON.stringify(fetchparam) });
                }
                if (this.itemParam && this.itemParam.temprs) {
                    // if (form.tempMode) {
                    // 	arg.srftempmode = true;
                    // }
                }
                Object.assign(arg, { srfreferitem: this.name });
                Object.assign(arg, { srfreferdata: JSON.stringify(this.form.getActiveData()) });
                return true;
            }
            else {
                this.iBizNotification.error('操作失败', '部件对象异常');
                return false;
            }
        },
        openView: function () {
            var _this = this;
            var view = { viewparam: {} };
            var viewController;
            if (this.form) {
                viewController = this.form.getViewController();
                var _srfkey = this.form.findField('srfkey');
                if (_srfkey) {
                    Object.assign(view.viewparam, { srfkey: _srfkey.getValue() });
                }
            }
            if (viewController) {
                Object.assign(view.viewparam, viewController.getViewParam());
                // Object.assign(view, { modalZIndex: viewController.modalZIndex });
            }
            var bcancel = this.fillPickupCondition(view.viewparam);
            if (!bcancel) {
                this.iBizNotification.warning('异常', '条件不满足');
                return;
            }
            if (this.pickupView && Object.keys(this.pickupView).length > 0) {
                var subject = new rxjs.Subject();
                Object.assign(view, this.pickupView, { subject: subject });
                this.$root.addModal(view);
                subject.subscribe(function (result) {
                    console.log(result);
                    if (!result || !Object.is(result.ret, 'OK')) {
                        return;
                    }
                    var item = {};
                    if (result.selections && Array.isArray(result.selections)) {
                        Object.assign(item, result.selections[0]);
                    }
                    if (_this.form) {
                        var valueField = _this.form.findField(_this.valueItem);
                        if (valueField) {
                            valueField.setValue(item.srfkey);
                        }
                        var itemField = _this.form.findField(_this.name);
                        if (itemField) {
                            itemField.setValue(item.srfmajortext);
                        }
                    }
                });
            }
        }
    }
});
