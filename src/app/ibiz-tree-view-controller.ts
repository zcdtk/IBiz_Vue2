/**
 * 树视图视图控制器
 *
 * @class IBizTreeViewController
 * @extends {IBizMDViewController}
 */
class IBizTreeViewController extends IBizMDViewController {

    /**
     * 所有选中树数据
     * 
     * @type {*}
     * @memberof IBizTreeViewController
     */
    public selectedDatas: Array<any> = [];

    /**
     * 当前选中树数据
     * 
     * @type {*}
     * @memberof IBizTreeViewController
     */
    public selectedData: any = {};

    /**
     * Creates an instance of IBizTreeViewController.
     * 创建 IBizTreeViewController 实例
     * 
     * @param {*} [opts={}] 
     * @memberof IBizTreeViewController
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 部件初始化
     * 
     * @memberof IBizTreeViewController
     */
    public onInitComponents(): void {
        super.onInitComponents();
        const tree = this.getTree();
        if (tree) {
            // 树加载完成
            tree.on(IBizTree.CONTEXTMENU).subscribe((datas) => {
                this.onTreeLoad(datas);
            });
            // 数据选中
            tree.on(IBizTree.SELECTIONCHANGE).subscribe((datas) => {
                this.onSelectionChange(datas);
            });
            // 数据激活
            // tree.on(IBizTree.DATAACTIVATED, (datas) => {
            //     this.onDataActivated(datas);
            // });
        }
    }

    /**
     * 获取多数据部件
     * 
     * @returns {*} 
     * @memberof IBizTreeViewController
     */
    public getMDCtrl(): any {
        return this.getTree();
    }

    /**
     * 获取数部件
     * 
     * @returns {*} 
     * @memberof IBizTreeViewController
     */
    public getTree(): any {
        return undefined;
    }

    /**
     * 数据部件数据加载完成
     * 
     * @param {Array<any>} args 
     * @memberof IBizTreeViewController
     */
    public onTreeLoad(args: Array<any>): void {

    }

    /**
     * 值选中变化
     * 
     * @param {Array<any>} args 
     * @memberof IBizTreeViewController
     */
    public onSelectionChange(args: Array<any>): void {
        if (args.length > 0) {
            const record = args[0];
            const selectedData = { srfkey: record.srfkey, srfmajortext: record.srfmajortext };
            this.selectedData = selectedData;

            this.selectedDatas = [];
            args.forEach((item, index) => {
                var record = item;
                var selectedData = { srfkey: record.srfkey, srfmajortext: record.srfmajortext };
                if (index == 0) {
                    this.selectedData = selectedData;
                }
                this.selectedDatas.push(selectedData);
            });
        } else {
            this.selectedData = {};
            this.selectedDatas = [];
        }
        super.onSelectionChange(args);
    }

}