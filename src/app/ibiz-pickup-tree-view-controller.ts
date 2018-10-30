/**
 * 选择树视图控制器（部件视图）
 *
 * @class IBizPickupTreeViewController
 * @extends {IBizTreeViewController}
 */
class IBizPickupTreeViewController extends IBizTreeViewController {

    /**
     * 是否支持多项数据选择 <Input>
     *
     * @private
     * @type {boolean}
     * @memberof IBizPickupTreeViewController
     */
    private multiselect: boolean = true;

    /**
     * 多数据部件加载所有数据  <Output>
     *
     * @private
     * @type {string}
     * @memberof IBizPickupTreeViewController
     */
    private allData: string = 'allData';

    /**
     * 数据选中事件  <Output>
     *
     * @private
     * @type {string}
     * @memberof IBizPickupTreeViewController
     */
    private selectionChange: string = 'selectionChange';

    /**
     * 数据激活事件  <Output>
     *
     * @private
     * @type {string}
     * @memberof IBizPickupTreeViewController
     */
    private dataActivated:string = 'dataActivated';

    /**
     * Creates an instance of IBizPickupTreeViewController.
     * 创建 IBizPickupTreeViewController 实例
     * 
     * @param {*} [opts={}] 
     * @memberof IBizPickupTreeViewController
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 获取树部件
     * 
     * @returns {*} 
     * @memberof IBizPickupTreeViewController
     */
    public getTree(): any {
        return this.getControl('tree');
    }

    /**
     * 是否支持快速搜索
     * 
     * @returns {boolean} 
     * @memberof IBizPickupTreeViewController
     */
    public isEnableQuickSearch(): boolean {
        return false;
    }

    /**
     * 树部件数据选中
     * 
     * @param {Array<any>} datas 
     * @memberof IBizPickupTreeViewController
     */
    public onSelectionChange(datas: Array<any>): void {
        super.onSelectionChange(datas);
        this.$vue.$emit(this.selectionChange, datas);
    }

    /**
     * 树部件数据激活
     *
     * @param {Array<any>} datas
     * @memberof IBizPickupTreeViewController
     */
    public onDataActivated(datas: Array<any>): void {
        super.onDataActivated(datas);
        this.$vue.$emit(this.dataActivated, datas);
    }

    /**
     * 树部件数据加载完成
     * 
     * @param {Array<any>} datas 
     * @memberof IBizPickupTreeViewController
     */
    public onTreeLoad(datas: Array<any>): void {
        super.onTreeLoad(datas);
        const _datas: Array<any> = this.doTreeDatas(datas);
        this.$vue.$emit(this.allData, _datas);
    }

    /**
     * 处理所有树数据
     * 
     * @private
     * @param {Array<any>} datas 
     * @returns {Array<any>} 
     * @memberof IBizPickupTreeViewController
     */
    private doTreeDatas(datas: Array<any>): Array<any> {
        let _datas: Array<any> = [];
        datas.forEach(data => {
            let _data: any = {};
            Object.assign(_data, data);
            if (data.items && data.items.length > 0) {
                const _items: Array<any> = [...this.doTreeDatas(data.items)];
                delete _data.items;
                _datas.push(..._items);
            }
            _datas.push(_data);
        });
        return _datas;
    }
}



