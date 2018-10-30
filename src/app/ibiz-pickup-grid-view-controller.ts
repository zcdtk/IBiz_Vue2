/**
 * 选择表格视图控制器（部件视图）
 *
 * @class IBizPickupGridViewController
 * @extends {IBizGridViewController}
 */
class IBizPickupGridViewController extends IBizGridViewController {

    /**
     * 父数据  <Input>
     *
     * @private
     * @type {*}
     * @memberof IBizPickupGridViewController
     */
    private parentData: any = null;

    /**
     * 是否支持多项数据选择  <Input>
     *
     * @private
     * @type {boolean}
     * @memberof IBizPickupGridViewController
     */
    private multiselect: boolean = true;

    /**
     *  当前选择数据 <Input>
     *
     * @private
     * @type {*}
     * @memberof IBizPickupGridViewController
     */
    private currentValue: any = null;

    /**
     * 删除数据 <Input>
     *
     * @private
     * @type {*}
     * @memberof IBizPickupGridViewController
     */
    private deleteData: any = null;

    /**
     * 数据选中事件 <Output>
     *
     * @private
     * @type {string}
     * @memberof IBizPickupGridViewController
     */
    private selectionChange: string = 'selectionChange';

    /**
     * 行数据激活事件 <Output>
     *
     * @private
     * @type {string}
     * @memberof IBizPickupGridViewController
     */
    private dataActivated: string = 'dataActivated';

    /**
     * 多数据部件加载所有数据 <Output>
     *
     * @private 
     * @type {string}
     * @memberof IBizPickupGridViewController
     */
    private allData: string = 'allData';

    /**
     * Creates an instance of IBizPickupGridViewController.
     * 创建 IBizPickupGridViewController 实例
     * 
     * @param {*} [opts={}] 
     * @memberof IBizPickupGridViewController
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 解析视图参数，初始化调用
     *
     * @memberof IBizPickupGridViewController
     */
    public parseViewParams():void {
        super.parseViewParams();
        if (this.$vue.parentData) {
            this.parentData = this.$vue.parentData;
        }
        if (this.$vue.multiselect) {
            this.multiselect = this.$vue.multiselect;
        }
        if (this.$vue.currentValue) {
            this.currentValue = this.$vue.currentValue;
        }
        if (this.$vue.deleteData) {
            this.deleteData = this.$vue.deleteData;
        }
    }

    /**
     * 部件初始化完成
     * 
     * @param {*} opt 
     * @memberof IBizPickupGridViewController
     */
    public onStoreLoad(opt: any): void {
        super.onStoreLoad(opt);

        if (this.multiselect && Array.isArray(opt)) {
            // this.allData.emit(opt);
            this.$vue.$emit(this.allData, opt);
        }
    }

    /**
     * 视图部件初始化完成
     * 
     * @memberof IBizPickupGridViewController
     */
    public onInited(): void {
        super.onInited();

        const grid: any = this.getGrid();
        if (grid) {
            grid.setMultiSelect(this.multiselect);
        }
    }

    /**
     * 获取多数据对象
     * 
     * @returns {*} 
     * @memberof IBizGridViewController
     */
    public getMDCtrl(): any {
        return this.getControl('grid');
    }

    /**
     * 数据选择事件触发，提交选中数据
     * 
     * @param {Array<any>} selection 
     * @memberof IBizPickupGridViewController
     */
    public onSelectionChange(selection: Array<any>): void {
        // this.selectionChange.emit(selection);
        this.$vue.$emit(this.selectionChange, selection);
    }

    /**
     * 数据被激活<最典型的情况就是行双击>
     *
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizPickupGridViewController
     */
    public onDataActivated(data: any = {}): void {
        super.onDataActivated(data);
        if (Object.keys(data).length === 0) {
            return;
        }
        // this.dataActivated.emit([data]);
        this.$vue.$emit(this.dataActivated, [data]);
    }
}



