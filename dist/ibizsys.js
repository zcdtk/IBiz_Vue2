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
