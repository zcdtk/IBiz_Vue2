/**
 * 工作流启动编辑视图
 *
 * @class IBizWFStartViewController
 * @extends {IBizWFEditViewController}
 */
class IBizWFStartViewController extends IBizWFEditViewController {

    /**
     * Creates an instance of IBizWFStartViewController.
     * 创建 IBizWFStartViewController 实例
     * 
     * @param {*} [opts={}] 
     * @memberof IBizWFStartViewController
     */
    constructor(opts: any = {}) {
        super(opts);
    }


    /**
     *工作流视图启动完成
     * 
     * @memberof IBizWFStartViewController
     */
    public onFormWFStarted(): void {
        super.onFormWFStarted();
    }

    /**
     * 保存启动表单内容并启动
     * 
     * @memberof IBizWFStartViewController
     */
    public onClickOkButton(): void {
        this.doSaveAndStart();
    }

    /**
     * 取消启动工作流
     * 
     * @memberof IBizWFStartViewController
     */
    public onClickCancelButton(): void {
        this.closeWindow();
    }
}

