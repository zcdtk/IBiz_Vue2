/**
 * 工作流树导航部件
 *
 * @class IBizWFExpBar
 * @extends {IBizControl}
 */
class IBizWFExpBar extends IBizControl {

    /**
 * 导航树部件是否收缩，默认展开
 * 
 * @type {boolean}
 * @memberof IBizWFExpBarService
 */
    public isCollapsed: boolean = true;

    /**
     * 导航菜单数据项
     * 
     * @type {Array<any>}
     * @memberof IBizWFExpBarService
     */
    public items: Array<any> = [];

    /**
     * 选中菜单项
     * 
     * @type {*}
     * @memberof IBizWFExpBarService
     */
    public selectItem: any = {};

    /**
     * 计数器
     *
     * @type {IBizUICounterService}
     * @memberof IBizWFExpBarService
     */
    public UICounter: IBizUICounter = null;

    /**
     * Creates an instance of IBizWFExpBar.
     * 创建 IBizWFExpBar 实例
     * 
     * @param {*} [otps={}]
     * @memberof IBizWFExpBar
     */
    constructor(otps: any = {}) {
        super(otps);
        let _this = this;

        if (_this.getViewController()) {
            const viewController = _this.getViewController();
            // viewController.on(IBizViewController.INITED).subscribe(() => {
            //     _this.UICounter = viewController.uicounters.get(_this.getUICounterName());
            //     _this.onCounterChanged(_this.items);
            //     _this.UICounter.on(IBizUICounter.COUNTERCHANGED).subscribe((data) => {
            //         _this.onCounterChanged(_this.items);
            //     });
            // });
        }
    }

    /**
     * 加载导航树数据
     * 
     * @param {*} _opt 
     * @memberof IBizWFExpBar
     */
    public load(_opt: any): void {
        let _this = this;
        let opts: any = {};
        Object.assign(opts, _opt);
        Object.assign(opts, { srfaction: 'fetch', srfctrlid: this.getName() });

        _this.iBizHttp.post(this.getBackendUrl(), opts).subscribe((result) => {
            if (result.ret === 0) {
                // this.items = result.items;
                this.onCounterChanged(result.items);
                this.formarItems(this.items);
                this.items = [...result.items];
                this.fire(IBizWFExpBar.LOADED, this.items[0]);
            }
        }, error => {
            console.log(error);
        });
    }

    /**
     * 格式化数据项
     *
     * @private
     * @param {*} _items
     * @returns {*}
     * @memberof IBizWFExpBar
     */
    private formarItems(_items: any): any {
        let _this = this;
        _items.forEach(item => {
            if (item.checked) {
                Object.assign(_this.selectItem, item);
            }
            item.bchecked = item.checked ? true : false;

            if (item.items) {
                const hasItemCheck = _this.formarItems(item.items);
                if (hasItemCheck) {
                    item.expanded = true;
                }
            }
            item.hassubmenu = item.items ? true : false;
        });
    }

    /**
     * 菜单项选中处理
     *
     * @param {*} [item={}]
     * @returns {void}
     * @memberof IBizWFExpBar
     */
    public selection(item: any = {}): void {
        if (item.items && item.items.length > 0) {
            return;
        }

        if (Object.is(item.id, this.selectItem.id)) {
            return;
        }
        this.selectItem = {};
        Object.assign(this.selectItem, item);

        this.fire(IBizWFExpBar.SELECTIONCHANGE, this.selectItem);
    }


    /**
     * 菜单节点选中处理
     * 
     * @param {*} [item={}] 
     * @memberof IBizWFExpBar
     */
    public expandedAndSelectSubMenu(item: any = {}): void {
        if (Object.is(item.id, this.selectItem.id)) {
            return;
        }
        this.selectItem = {};
        Object.assign(this.selectItem, item);

        this.fire(IBizWFExpBar.SELECTIONCHANGE, this.selectItem);
    }

    /**
     * 获取计数器名称
     * 在发布器中重写
     * 
     * @returns {string} 
     * @memberof IBizWFExpBar
     */
    public getUICounterName(): string {
        return undefined;
    }

    /**
     * 设置选中项
     *
     * @param {*} [item={}]
     * @memberof IBizWFExpBar
     */
    public setSelectItem(item: any = {}): void {
        if (item && !Object.is(item.id, this.selectItem.id)) {
            this.selectItem = {};
            Object.assign(this.selectItem, item);
        }
    }

    /**
     * 计数器值变化
     *
     * @private
     * @returns {void}
     * @memberof IBizWFExpBar
     */
    private onCounterChanged(items: Array<any>): void {
        if (!this.UICounter) {
            return;
        }
        const data = this.UICounter.getData();
        if (!data) {
            return;
        }
        let bNeedReSelect: boolean = this.itemSelect(items, data);

        if (bNeedReSelect) {
            this.selectItem = {};
            Object.assign(this.selectItem, this.items[0]);
            this.fire(IBizWFExpBar.SELECTIONCHANGE, this.selectItem);
        }
    }

    /**
     * 选中项
     *
     * @private
     * @param {Array<any>} items
     * @param {*} [data={}]
     * @returns {boolean}
     * @memberof IBizWFExpBar
     */
    private itemSelect(items: Array<any>, data: any = {}): boolean {
        let bNeedReSelect: boolean = false;
        items.forEach(item => {
            let counterid = item.counterid;
            let countermode = item.countermode;

            item.show = true;
            let count = data[counterid];
            if (!count) {
                count = 0;
            }
            if (count === 0 && countermode && countermode === 1) {
                item.show = false;
                // 判断是否选中列，如果是则重置选中
                if (this.selectItem && Object.is(this.selectItem.id, item.id)) {
                    bNeedReSelect = true;
                }
            }

            item.counterdata = count;
            if (item.items) {
                bNeedReSelect = this.itemSelect(item.items, data);
            }
        });
        return bNeedReSelect;
    }

    /**
     * 获取数据项
     *
     * @returns {Array<any>}
     * @memberof IBizWFExpBar
     */
    public getItems(): Array<any> {
        return this.items;
    }

    /*****************事件声明************************/
    /**
     * 选择变化
     *
     * @static
     * @memberof IBizWFExpBar
     */
    public static SELECTIONCHANGE = "SELECTIONCHANGE";

    /**
     * 加载完成
     *
     * @static
     * @memberof IBizWFExpBar
     */
    public static LOADED = 'LOADED';
}