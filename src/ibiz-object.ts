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
    public iBizNotification: IBizNotification = new IBizNotification();

    /**
     * 对象id
     *
     * @private
     * @type {string}
     * @memberof IBizObject
     */
    private id: string = '';

    /**
     * 对象name
     *
     * @private
     * @type {string}
     * @memberof IBizObject
     */
    private name: string = '';

    /**
     * 设置id
     *
     * @memberof IBizObject
     */
    set Id(id: string) {
        this.id = id;
    }

    /**
     * 获取id
     *
     * @type {string}
     * @memberof IBizObject
     */
    get Id(): string {
        return this.id;
    }

    /**
     * 设置name
     *
     * @memberof IBizObject
     */
    set Name(name: string) {
        this.name = name;
    }

    /**
     * 获取name
     *
     * @type {string}
     * @memberof IBizObject
     */
    get Name(): string {
        return this.name;
    }

    /**
     * Creates an instance of IBizObject.
     * 创建 IBizObject 实例 
     * 
     * @param {*} [opts={}]
     * @memberof IBizObject
     */
    constructor(opts: any = {}) {
        this.Id = opts.id;
        this.Name = opts.name;
    }

    /**
     * 获取id
     *
     * @returns {string}
     * @memberof IBizObject
     */
    public getId(): string {
        return this.id;
    }

    /**
     * 获取名称
     *
     * @returns {string}
     * @memberof IBizObject
     */
    public getName(): string {
        return this.name;
    }

    /**
     * 注册Rx订阅事件
     *
     * @param {string} eventName
     * @returns {Subject<any>}
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

