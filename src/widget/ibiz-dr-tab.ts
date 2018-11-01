/**
 * 关系分页
 *
 * @class IBizDRTab
 * @extends {IBizTab}
 */
class IBizDRTab extends IBizTab {

    /**
     * 父数据对象
     * 
     * @type {*}
     * @memberof IBizDRTab
     */
    public parentData: any = {};

    /**
     * Creates an instance of IBizDRTab.
     * 创建 IBizDRTab 实例
     * @param {*} [opts={}] 
     * @memberof IBizDRTab
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 设置父数据
     * 
     * @param {*} [data={}] 
     * @memberof IBizDRTab
     */
    public setParentData(data: any = {}): void {
        Object.assign(this.parentData, data);
    }

    /**
     * 分页部件选中变化
     *
     * @param {string} name
     * @returns {void}
     * @memberof IBizDRTab
     */
    public onTabSelectionChange(name: string): void {
        let viewid: string = name;
        let controller = this.getViewController();

        let parentKey: string = '';
        if (this.parentData.srfparentkey) {
            parentKey = this.parentData.srfparentkey;
        }

        if (!parentKey || Object.is(parentKey, '')) {
            this.iBizNotification.warning('警告', '请先建立主数据');
            this.setActiveTab(0);
            return;
        }

        if (Object.is(viewid, 'form')) {
            this.fire(IBizDRTab.SELECTCHANGE, { parentMode: {}, parentData: {}, viewid: 'form' });
            this.setActiveTab(0);
            return;
        }

        const dritem: any = { viewid: viewid.toLocaleUpperCase() };
        if (!dritem.viewid || Object.is(dritem.viewid, '')) {
            return;
        }

        const viewItem: any = controller.getDRItemView(dritem);
        if (viewItem == null || !viewItem.viewparam) {
            return;
        }

        const viewParam = viewItem.viewparam;
        let parentData: any = {};
        if (true) {
            Object.assign(parentData, viewParam);
            Object.assign(parentData, this.parentData);

            if (viewParam.srfparentdeid) {
                Object.assign(parentData, { srfparentdeid: viewParam.srfparentdeid });
            }
        }

        // this.setActiveTab(args.index);
        this.fire(IBizDRTab.SELECTCHANGE, { parentMode: viewParam, parentData: parentData, viewid: viewid });
    }

    public static SELECTCHANGE = 'SELECTCHANGE';


}

