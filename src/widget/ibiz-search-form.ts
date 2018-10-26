/**
 * 搜索表单
 *
 * @class IBizSearchForm
 * @extends {IBizForm}
 */
class IBizSearchForm extends IBizForm {

    /**
     * 是搜重置搜索
     * 
     * @type {boolean}
     * @memberof IBizSearchForm
     */
    public bResetting: boolean = false;

    /**
     * 是否有更多搜索
     * 
     * @memberof IBizSearchForm
     */
    public searchMore = false;

    /**
     * 搜索表单是否打开
     * 
     * @type {boolean}
     * @memberof IBizSearchForm
     */
    public opened: boolean = false;

    /**
     * Creates an instance of IBizSearchForm.
     * 创建 IBizSearchForm 实例
     * 
     * @param {*} [opt={}] 
     * @memberof IBizSearchForm
     */
    constructor(opt: any = {}) {
        super(opt);
    }

    /**
     * 表单类型
     * 
     * @returns {string} 
     * @memberof IBizSearchForm
     */
    public getFormType(): string {
        return 'SEARCHFORM';
    }

    /**
     * 更多搜索
     * 
     * @memberof IBizSearchForm
     */
    public toggleSearchMore(): void {
        this.searchMore = !this.searchMore;
    }

    /**
     * 执行搜索功能
     * 
     * @memberof IBizSearchForm
     */
    public onSearch(): void {
        this.fire(IBizSearchForm.FORMSEARCHED, null);
    }

    /**
     * 重置表单
     * 
     * @memberof IBizSearchForm
     */
    public onReset(): void {
        this.bResetting = true;
        this.reset();
    }

    /**
     * 搜索表单草稿加载完成
     *
     * @memberof IBizSearchForm
     */
    public onDraftLoaded(): void {
        super.onDraftLoaded();
        if (this.bResetting) {
            this.bResetting = false;
            this.fire(IBizSearchForm.FORMRESETED, null);
        }
    }

    /**
     * 搜索表单加载完成
     *
     * @memberof IBizSearchForm
     */
    public onLoaded(): void {
        super.onLoaded();
        if (this.bResetting) {
            this.bResetting = false;
            this.fire(IBizSearchForm.FORMRESETED, null);
        }
    }


    /**
     * 搜索功能是否支持,全支持
     * 
     * @returns {boolean} 
     * @memberof IBizSearchForm
     */
    public isOpen(): boolean {
        // return this.opened;
        return true;
    }

    /**
     * 设置搜索表单是否展开
     * 
     * @param {boolean} open 
     * @memberof IBizSearchForm
     */
    public setOpen(open: boolean): void {
        this.opened = open;
    }

    /**
     * 关闭搜索功能
     * 
     * @memberof IBizSearchForm
     */
    public close(): void {
        this.opened = false;
    }

    
    /*****************事件声明************************/
    /**
     * 搜索表单重置事件
     */
    public static FORMRESETED = 'FORMRESETED';
    /**
     * 搜索表单搜索事件
     */
    public static FORMSEARCHED = 'FORMSEARCHED';
    /**
     * 搜索表单收缩事件
     */
    public static FORMCONTRACT = 'FORMCONTRACT';
}


