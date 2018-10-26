/**
 * IBizSys控制器借口对象
 *
 * @abstract
 * @class IBizObject
 */
abstract class IBizObject {

    /**
     * 对象事件集合
     *
     * @private
     * @type {Map<string, any>}
     * @memberof IBizObject
     */
    private events: Map<string, any> = new Map();

    /**
     * IBizHttp 服务对象
     *
     * @type {IBizHttp}
     * @memberof IBizObject
     */
    public iBizHttp: IBizHttp = new IBizHttp();

    /**
     * IBiz 通知对象
     *
     * @type {IBizNotification}
     * @memberof IBizObject
     */
    public IBizNotification: IBizNotification = new IBizNotification();


    /**
     * Creates an instance of IBizObject.
     * 创建 IBizObject 实例 
     * 
     * @param {*} [opts={}]
     * @memberof IBizObject
     */
    constructor(opts: any = {}) {

    }

    /**
     * 注册Rx订阅事件
     *
     * @param {string} eventName
     * @returns {Observable<any>}
     * @memberof IBizObject
     */
    public on(eventName: string): Subject<any> {
        let subject: Subject<any>;
        if (eventName && !Object.is(eventName, '')) {
            if (!this.events.get(eventName)) {
                subject = new rxjs.Subject();
                this.events.set(eventName, subject);
            } else {
                subject = this.events.get(eventName);
            }
            return subject;
        }
    }

    /**
     * Rx事件流触发
     *
     * @param {string} eventName
     * @param {*} data
     * @memberof IBizObject
     */
    public fire(eventName: string, data: any): void {
        const subject: Subject<any> = this.events.get(eventName);
        if (subject) {
            subject.next(data);
        }
    }
}

