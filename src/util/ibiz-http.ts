/**
 * IBizHttp net 对象
 *
 * @class IBizHttp
 */
class IBizHttp {

    /**
     * post请求
     *
     * @param {string} url 请求路径
     * @param {*} [params={}] 请求参数
     * @returns {Subject<any>} 可订阅请求对象
     * @memberof IBizHttp
     */
    public post(url: string, params: any = {}): Subject<any> {
        let _this = this;
        const subject: Subject<any> = new rxjs.Subject();
        const _strParams: string = this.transformationOpt(params);
        axios({
            method: 'post',
            url: url,
            data: _strParams,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Accept': 'application/json' },
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.ret === 2 && response.data.notlogin) {
                    _this.httpDefaultInterceptor(response.data);
                }
                subject.next(response.data);
            } else {
                subject.error(response);
            }
        }).catch(function (response) {
            subject.error(response);
        });
        return subject;
    }

    /**
     * get请求
     *
     * @param {string} url 请求路径
     * @param {*} [params={}] 请求参数
     * @returns {Subject<any>} 可订阅请求对象
     * @memberof IBizHttp
     */
    public get(url: string, params: any = {}): Subject<any> {
        const subject: Subject<any> = new rxjs.Subject();
        if (Object.keys(params).length > 0) {
            const _strParams: string = this.transformationOpt(params);
            url = url.indexOf('?') ? `${url}&${_strParams}` : `${url}?&${_strParams}`
        }
        axios.get(url).
            then(function (response) {
                subject.next(response);
            }).catch(function (error) {
                subject.error(error);
            });
        return subject;
    }

    /**
     * 模拟http拦截器 重定向登陆处理
     *
     * @param {*} [data={}]
     * @memberof IBizHttp
     */
    public httpDefaultInterceptor(data: any = {}): void {
        const curUrl = decodeURIComponent(window.location.href);
        if (window.location.href.indexOf('/ibizutil/login.html') === -1) {
            window.location.href = `/${IBizEnvironment.SysName}${IBizEnvironment.LoginRedirect}?RU=${curUrl}`;
        }
    }

    /**
     * 请求参数转义处理
     *
     * @private
     * @param {*} [opt={}]
     * @returns {string}
     * @memberof IBizHttp
     */
    private transformationOpt(opt: any = {}): string {
        let params: any = {};
        let postData: Array<string> = [];

        Object.assign(params, opt);
        let keys: string[] = Object.keys(params);
        keys.forEach((key: string) => {
            let val: any = params[key];
            if (val instanceof Array || val instanceof Object) {
                postData.push(`${key}=${encodeURIComponent(JSON.stringify(val))}`);
            } else {
                postData.push(`${key}=${encodeURIComponent(val)}`);
            }
        });
        return postData.join('&');
    }
}