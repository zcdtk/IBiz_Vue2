/**
 *  树部件
 *
 * @class IBizTree
 * @extends {IBizControl}
 */
class IBizTree extends IBizControl {

    /**
     * 树部件是否收缩，默认展开
     * 
     * @type {boolean}
     * @memberof IBizTree
     */
    public isCollapsed: boolean = true;

    /**
     * 数据项节点集合
     * 
     * @type {Array<any>}
     * @memberof IBizTree
     */
    public items: Array<any> = [];

    /**
     * 默认节点
     * 
     * @private
     * @type {*}
     * @memberof IBizTree
     */
    private node: any = {};

    public selectNode: any = {};

    /**
     * Creates an instance of IBizTree.
     * 创建 IBizTree 实例
     * 
     * @param {*} [opts={}] 
     * @memberof IBizTree
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 加载节点数据
     * 
     * @param {*} [treeCfg={}] 
     * @memberof IBizTree
     */
    public load(treeCfg: any = {}): void {
        // let param: any = {
        //     srfnodeid: this.node.id ? this.node.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
        //     srfviewparam: JSON.stringify(this.getViewController().getViewParam()),
        //     srfctrlid: this.getName()
        // };

        // this.fire(IBizMDControl.BEFORELOAD, param);

        // this.iBizHttp.post(this.getBackendUrl(), param).subscribe((result) => {
        //     if (result.ret !== 0) {
        //         this.iBizNotification.error('错误', result.info);
        //         return;
        //     }
        //     this.items = this.formatTreeData(result.items);
        //     this.fire(IBizTree.CONTEXTMENU, this.items);
        // }, (error) => {
        //     this.iBizNotification.error('错误', error.info);
        // });
    }

    /**
     * 获取选择节点数据
     * 
     * @param {any} bFull true：返回的数据包含节点全部数据，false：返回的数据仅包含节点ID
     * @returns {*} 
     * @memberof IBizTree
     */
    public getSelected(bFull: boolean): any {

    }

    /**
     * 获取所有节点数据
     *
     * @returns {Array<any>}
     * @memberof IBizTree
     */
    public getNodes(): Array<any> {
        return this.items;
    }

    /**
     * 节点重新加载
     * 
     * @param {*} [node={}] 
     * @memberof IBizTree
     */
    public reload(node: any = {}): void {

    }

    /**
     * 删除节点
     * 
     * @param {any} node 
     * @memberof IBizTree
     */
    public remove(node: any): void {

    }

    /**
     * 实体界面行为
     * 
     * @param {any} params 
     * @memberof IBizTree
     */
    public doUIAction(params: any): void {

    }

    /**
     * 格式化树数据
     * 
     * @private
     * @param {Array<any>} items 
     * @returns {Array<any>} 
     * @memberof IBizTree
     */
    private formatTreeData(items: Array<any>): Array<any> {
        let data: Array<any> = [];
        items.forEach((item) => {
            let tempData: any = {};
            Object.assign(tempData, item);
            tempData.name = tempData.text;
            data.push(tempData);

        });
        return data;
    }

    /**
     * 树节点激活加载子数据
     *
     * @private
     * @param {*} resolve
     * @memberof IBizTree
     */
    private loadChildren(node: any, resolve: any): void {
        let param: any = {
            srfnodeid: node.id ? node.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(this.getViewController().getViewParam()),
            srfctrlid: this.getName()
        };

        this.fire(IBizMDControl.BEFORELOAD, param);

        this.iBizHttp.post(this.getBackendUrl(), param).subscribe((result) => {
            if (result.ret !== 0) {
                this.iBizNotification.error('错误', result.info);
                resolve([]);
                return;
            }
            const _items = [...this.formatTreeData(result.items)];

            if (node.level === 0) {
                this.items = [..._items];
                this.fire(IBizTree.CONTEXTMENU, this.items);
            }
            resolve(_items);

        }, (error) => {
            this.iBizNotification.error('错误', error.info);
            resolve([]);
        });
    }

    /**
     * 树节点激活选中数据
     *
     * @param {*} [data={}]
     * @memberof IBizTree
     */
    public nodeSelect(data: any = {}): void {
        this.fire(IBizTree.SELECTIONCHANGE, [data]);
    }

    /**
     * 
     *
     * @param {*} [item={}]
     * @memberof IBizTree
     */
    public setSelectTreeItem(item: any = {}): void {
        Object.assign(this.selectNode, item);
    }

    /*****************事件声明************************/
    /**
     * 选择变化
     *
     * @static
     * @memberof IBizTree
     */
    public static SELECTIONCHANGE = "SELECTIONCHANGE";
    /**
     * 上下文菜单
     *
     * @static
     * @memberof IBizTree
     */
    public static CONTEXTMENU = "CONTEXTMENU";
}

