/**
 * 树部件
 *
 * @class IBizTree
 * @extends {IBizControl}
 */
class IBizTree extends IBizControl {

    /**
     * 树数据
     *
     * @type {Array<any>}
     * @memberof IBizTree
     */
    public items: Array<any> = [];

    public tableselection = null;

    public tableselections: any = {};

    /**
     *  默认节点
     *
     * @private
     * @type {*}
     * @memberof IBizTree
     */
    private node: any = {};

    /**
     * Creates an instance of IBizTree.
     * 创建 IBizTree 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizTree
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
    }

    public setSize(width, height): void {

    }
    public setCatalog(catalog): void {

    }

    /**
     * 加载
     *
     * @param {*} [opt]
     * @memberof IBizTree
     */
    public load(opt?: any): void {
        let _this = this;

        let param: any = {
            srfnodeid: _this.node.id ? _this.node.id : '#', srfaction: 'fetch', srfrender: 'JSTREE',
            srfviewparam: JSON.stringify(_this.getViewController().getViewParam()),
            srfctrlid: _this.getName()
        };
        if (opt) {
            Object.assign(param, opt);
        }

        _this.fire(IBizMDControl.BEFORELOAD, param);

        _this.iBizHttp.post(_this.getBackendUrl(), param).subscribe((result: any) => {
            if (result.ret !== 0) {
                _this.iBizNotification.error('错误', result.info);
                return;
            }
            _this.items = [..._this.formatDatas(result.items)];
            _this.fire(IBizTree.CONTEXTMENU, _this.items);
            console.log(result);
        }, (error: any) => {
            _this.iBizNotification.error('错误', error.info);
        });
    }
	/**
	 * 获取选择节点数据
	 * 
	 * bFull，true：返回的数据包含节点全部数据，false：返回的数组仅包含节点ID
	 */
    public getSelected(bFull): any {
        return null;
    }

    /**
     * 重新加载
     *
     * @param {*} [node={}]
     * @memberof IBizTree
     */
    public reload(node: any = {}): void {
    }

    /**
     * 格式化树数据
     *
     * @private
     * @param {Array<any>} datas
     * @returns {Array<any>}
     * @memberof IBizTree
     */
    private formatDatas(datas: Array<any>): Array<any> {
        datas.forEach((data) => {
            data.label = data.text;
        });
        return datas;
    }

    /**
     * 删除
     *
     * @param {*} [node={}]
     * @memberof IBizTree
     */
    public remove(node: any = {}): void {
        let _this = this;
        let arg = { srfnodeid: node.id };
        Object.assign(arg, { srfaction: 'remove' });

        _this.beginLoading();
        _this.iBizHttp.post(_this.getBackendUrl(), arg).subscribe((data: any) => {
            _this.endLoading();
            if (data.ret === 0) {
                _this.tableselection = null;
                _this.tableselections = {};
                _this.reload(node.parent);
                if (data.info && data.info != '') {
                    // IBiz.alert($IGM('IBIZTREE.REMOVE.TITLE', '删除成功'), $IGM('IBIZTREE.REMOVE.INFO', '删除数据成功,' + data.info, [data.info]), 1);
                    _this.iBizNotification.success('删除成功', `删除数据成功${data.info}`);
                }

                IBizUtil.processResult(data);
            } else {
                // IBiz.alert($IGM('IBIZTREE.REMOVE.TITLE2', '删除失败'), $IGM('IBIZTREE.REMOVE.INFO2', '删除数据失败,' + data.info, [data.info]), 2);
                _this.iBizNotification.error('删除失败', `删除数据失败${data.info}`);
            }
        }, (error: any) => {
            _this.endLoading();
            // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), $IGM('IBIZTREE.AJAX.INFO', '执行请求发生异常'), 2);
            _this.iBizNotification.warning('警告', '执行请求发生异常');
        });;
    }

    /**
     * 操作界面行为
     *
     * @param {*} [params={}]
     * @returns {Subject<any>}
     * @memberof IBizTree
     */
    public doUIAction(params: any = {}): Subject<any> {
        let _this = this;
        const subject: Subject<any> = new rxjs.Subject();
        if (params) {
            params = {};
        }
        Object.assign(params, { srfaction: 'uiaction' });
        _this.beginLoading();

        _this.iBizHttp.post(_this.getBackendUrl(), params).subscribe((data: any) => {
            _this.endLoading();
            if (data.ret === 0) {
                if (data.reloadData) {
                    // _this.refresh();
                }

                if (data.info && data.info != '') {
                    // IBiz.alert($IGM('IBIZTREE.DOUIACTION.TITLE', '操作成功'), $IGM('IBIZTREE.DOUIACTION.INFO', '操作成功,' + data.info, [data.info]), 1);
                    _this.iBizNotification.success('操作成功', `操作成功${data.info}`);
                }
                IBizUtil.processResult(data);
                subject.next(data);
            } else {
                // IBiz.alert($IGM('IBIZTREE.DOUIACTION.TITLE2', '操作失败'), $IGM('IBIZTREE.DOUIACTION.INFO2', '操作失败,执行操作发生错误,' + data.info, [data.info]), 2);
                _this.iBizNotification.error('操作失败', `操作失败,执行操作发生错误,${data.info}`);
                subject.error(data);
            }
        }, (error: any) => {
            _this.endLoading();
            // IBiz.alert($IGM('IBIZAPP.CONFIRM.TITLE.WARN', '警告'), $IGM('IBIZTREE.AJAX.INFO', '执行请求发生异常'), 2);
            _this.iBizNotification.warning('警告', '执行请求发生异常');
            subject.error(error);
        });

        return subject;
    }

    /**
     * 节点选中
     *
     * @param {*} [data={}]
     * @memberof IBizTree
     */
    public nodeSelect(data: any = {}): void {
        console.log(data);
        this.fire(IBizTree.SELECTIONCHANGE, [data]);
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