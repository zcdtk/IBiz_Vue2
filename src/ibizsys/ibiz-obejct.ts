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
}