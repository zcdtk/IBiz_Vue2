import { Subject, Observable } from 'rxjs';

/**
 * 抽象接口基类
 *
 * @export
 * @abstract
 * @class IBizObejct
 */
export abstract class IBizObejct {

    /**
     * 名称
     *
     * @type {string}
     * @memberof IBizObejct
     */
    public name: string;

    /**
     * 事件注册管理
     *
     * @type {Map<string, Subject<any>>}
     * @memberof IBizObejct
     */
    public events: Map<string, Subject<any>> = new Map();

    /**
     * Creates an instance of IBizObejct.
     * 创建 IBizObejct 实例对象
     * 
     * @param {*} [opts={}]
     * @memberof IBizObejct
     */
    constructor(opts: any = {}) {
        this.name = opts.name;
    }

    /**
     * 设置名称
     *
     * @param {string} name
     * @memberof IBizObejct
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * 获取名称
     *
     * @returns {string}
     * @memberof IBizObejct
     */
    public getName(): string {
        return this.name;
    }

    /**
     * 事件订阅
     *
     * @param {string} name
     * @returns {Observable<any>}
     * @memberof IBizObejct
     */
    public on(name: string): Observable<any> {
        let subject: Subject<any>;
        if (name && !Object.is(name, '')) {
            if (!this.events.get(name)) {
                subject = new Subject();
                this.events.set(name, subject);
            } else {
                subject = this.events.get(name);
            }
            return subject.asObservable();
        }
    }

    /**
     * 事件抛出
     *
     * @param {string} name
     * @param {*} data
     * @memberof IBizObejct
     */
    public fire(name: string, data: any): void {
        if (this.events.get(name)) {
            const subject: Subject<any> = this.events.get(name);
            subject.next(data);
        }
    }
}