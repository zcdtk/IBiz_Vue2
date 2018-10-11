/**
 * 表单属性项
 *
 * @class IBizFormField
 * @extends {IBizFormItem}
 */
class IBizFormField extends IBizFormItem {

    /**
     * label 宽度
     *
     * @type {string}
     * @memberof IBizFormField
     */
    public labelWidth: string;

    /**
     * Creates an instance of IBizFormField.
     * 创建 IBizFormField 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormField
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
        _this.labelWidth = opts.labelWidth;
    }
}
