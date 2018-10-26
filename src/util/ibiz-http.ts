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
        const subject: Subject<any> = new rxjs.Subject();
        const params_keys = Object.keys(params);
        let form_arr: Array<any> = [];
        params_keys.forEach(key => {
            form_arr.push(`${key}=${params[key]}`)
        })
        axios({
            method: 'post',
            url: url,
            data: form_arr.join('&'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Accept': 'application/json' },
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.ret === 2 && response.data.notlogin) {
                    this.httpDefaultInterceptor(response.data);
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
            const params_keys = Object.keys(params);
            let params_arr: Array<any> = [];
            params_keys.forEach(key => {
                if (params[key]) {
                    params_arr.push(`${key}=${params[key]}`)
                }
            });
            url = url.indexOf('?') ? `${url}&${params_arr.join('&')}` : `${url}?&${params_arr.join('&')}`
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
}