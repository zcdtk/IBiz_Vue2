/**
 * 抽象接口对象
 *
 * @class IBizObject
 */
abstract class IBizObject {

    private events: Map<string, any> = new Map();

    /**
     * 对象id
     *
     * @private
     * @type {string}
     * @memberof IBizObject
     */
    private id: string;

    /**
     * 对象名称
     *
     * @private
     * @type {string}
     * @memberof IBizObject
     */
    private name: string;

    /**
     * 对象关联名称
     *
     * @private
     * @type {string}
     * @memberof IBizObject
     */
    private refname: string;

    /**
     * 对象视图控制器
     *
     * @private
     * @type {*}
     * @memberof IBizObject
     */
    private viewController: any;

    /**
     * Creates an instance of IBizObject.
     * 创建 IBizObject 实例对象
     * 
     * @param {*} [opts={}]
     * @memberof IBizObject
     */
    constructor(opts: any = {}) {
        this.id = opts.id;
        this.name = opts.name;
        this.refname = opts.refname;
        this.viewController = opts.viewController;
    }


    /**
     * 对象初始化
     *
     * @param {*} [params={}]
     * @memberof IBizObject
     */
    public init(params: any = {}): void {
        this.onInit();
    }

    /**
     * 执行初始化
     *
     * @memberof IBizObject
     */
    public onInit(): void {

    }

    /**
     * 设置对象id
     *
     * @param {string} id
     * @memberof IBizObject
     */
    public setId(id: string): void {
        this.id = id;
    }

    /**
     * 获取对象id
     *
     * @returns {string}
     * @memberof IBizObject
     */
    public getId(): string {
        return this.id;
    }

    /**
     * 设置对象名称
     *
     * @param {string} name
     * @memberof IBizObject
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * 获取对象名
     *
     * @returns {string}
     * @memberof IBizObject
     */
    public getName(): string {
        return this.name;
    }

    /**
     * 获取对象关联名称
     *
     * @returns {string}
     * @memberof IBizObject
     */
    public getRefName(): string {
        return this.refname;
    }

    /**
     * 获取界面控制器
     *
     * @returns {*}
     * @memberof IBizObject
     */
    public getController(): any {
        return this.viewController;
    }
	/**
	 * 注册事件
	 * @param event 事件名称
	 * @param callback 回调函数<不支持字符串><3个参数 sender,data,event>
	 * @param scope 作用域
	 */
    public on(name: string): any {
        return;
    }
	/**
	 * 呼出事件<参数会封装成JSON对象进行传递>
	 * @param event 事件名称
	 * @param sender 源
	 * @param args 参数
	 */
    public fire(name: string, data: any): void {
    }
}