/**
 * 工作流交互视图控制器
 *
 * @class IBizWFActionViewController
 * @extends {IBizWFEditViewController}
 */
class IBizWFActionViewController extends IBizWFEditViewController {

    /**
     * Creates an instance of IBizWFActionViewController.
     * 创建 IBizWFActionViewController 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizWFActionViewController
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 工作流提交
     * 
     * @memberof IBizWFActionViewController
     */
    public onFormWFSubmitted(): void {
        super.onFormWFSubmitted();
    }

    /**
     * 工作流提交
     * 
     * @memberof IBizWFActionViewController
     */
    public onClickOkButton(): void {
        const form = this.getForm();
        if (form) {
            form.wfsubmit(this.getViewParam());
        }
    }

    /**
     * 关闭工作流操作界面
     * 
     * @memberof IBizWFActionViewController
     */
    public onClickCancelButton(): void {
        this.closeWindow();

    }
}

