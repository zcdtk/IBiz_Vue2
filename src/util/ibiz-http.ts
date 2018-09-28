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
     * @returns {Observable<any>} 可订阅请求对象
     * @memberof IBizHttp
     */
    public post(url: string, params: any = {}): Observable<any> {
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
                subject.next(response.data);
            } else {
                subject.error(response);
            }
        }).catch(function (response) {
            subject.error(response);
        });
        return subject.asObservable();
    }

    /**
     * get请求
     *
     * @param {string} url 请求路径
     * @param {*} [params={}] 请求参数
     * @returns {Observable<any>} 可订阅请求对象
     * @memberof IBizHttp 
     */
    public get(url: string, params: any = {}): Observable<any> {
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
                // handle success
                console.log(response);
                subject.next(response);
            }).catch(function (error) {
                // handle error
                console.log(error);
                subject.error(error);
            });
        return subject.asObservable();
    }
}