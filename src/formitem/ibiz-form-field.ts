/**
 * 表单属性项
 *
 * @class IBizFormField
 * @extends {IBizFormItem}
 */
class IBizFormField extends IBizFormItem {

    /**
     * 是否允许空输入， 默认允许
     *
     * @type {boolean}
     * @memberof IBizFormField
     */
    public allowBlank: boolean = false;

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
        _this.allowBlank = opts.allowBlank ? true : false;
    }
}
