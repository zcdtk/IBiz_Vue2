/**
 * 表单成员按钮
 *
 * @class IBizFormButton
 * @extends {IBizFormItem}
 */
class IBizFormButton extends IBizFormItem {

    /**
     * 实体界面行为类型
     *
     * @private
     * @type {string}
     * @memberof IBizFormButton
     */
    private actiontype: string;

    /**
     * 实体界面行为
     *
     * @private
     * @type {*}
     * @memberof IBizFormButton
     */
    private uiaction: any = {};

    /**
     * 表单项更新
     *
     * @private
     * @type {*}
     * @memberof IBizFormButton
     */
    private fiupdate: any = {};

    /**
     * Creates an instance of IBizFormButton.
     * 创建 IBizFormButton 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormButton
     */
    constructor(opts: any = {}) {
        super(opts);
        this.actiontype = opts.actiontype;
        if (opts.uiaction) {
            Object.assign(this.uiaction, opts.uiaction);
        }
        if (opts.fiupdate) {
            Object.assign(this.fiupdate, opts.fiupdate);
        }
    }

    /**
     * 表单成员按钮事件
     *
     * @returns {void}
     * @memberof IBizFormButton
     */
    public onClick(): void {
        const form = this.getForm();
        if (!form) {
            return;
        }
        const viewController = form.getViewController();
        if (Object.is(this.actiontype, 'UIACTION') && viewController && Object.keys(this.uiaction).length > 0) {
            let uiaction = viewController.getUIAction(this.uiaction.tag);
            viewController.doUIAction(uiaction);
        }
        if (Object.is(this.actiontype, 'FIUPDATE') && Object.keys(this.fiupdate).length > 0) {
            form.updateFormItems(this.fiupdate.tag);
        }
    }
}