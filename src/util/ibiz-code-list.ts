/**
 * 代码表对象
 *
 * @class IBizCodeList
 * @extends {IBizObject}
 */
class IBizCodeList extends IBizObject {

    /**
     * 静态代码表数据项
     *
     * @private
     * @type {Array<any>}
     * @memberof IBizCodeList
     */
    private items: Array<any> = [];

    /**
     * Creates an instance of IBizCodeList.
     * 创建 IBizCodeList 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizCodeList
     */
    constructor(opts: any = {}) {
        super(opts);
        this.items = [...opts.datas];
    }

    /**
     * 获取静态代码表数据项
     *
     * @returns {Array<any>}
     * @memberof IBizCodeList
     */
    public getDatas(): Array<any> {
        return this.items;
    }

    /**
     * 根据值获文本
     *
     * @param {*} value
     * @param {*} cascade
     * @returns {*}
     * @memberof IBizCodeList
     */
    public getItemByValue(value: any, cascade: any): any {
        let result
        this.items.some(item => {
            if (Object.is(item.value, value)) {
                result = item;
                return true;
            }
        });
        return result;
    }
}