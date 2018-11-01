/**
 * 分页
 *
 * @class IBizTab
 * @extends {IBizControl}
 */
class IBizTab extends IBizControl {

    /**
     * 激活分页部件分页数
     * 
     * @type {number}
     * @memberof IBizTab
     */
    public activeTabIndex: number = 0;

    /**
     * 激活tab分页名称
     *
     * @type {string}
     * @memberof IBizTab
     */
    public activeTabName: string = 'form';

    /**
     * 分页部件对象
     * 
     * @type {*}
     * @memberof IBizTab
     */
    public tabs: any = {};

    /**
     * Creates an instance of IBizTab.
     * 创建 IBizTab 实例
     * @param {*} [opts={}] 
     * @memberof IBizTab
     */
    constructor(opts: any = {}) {
        super(opts);
        this.regTabs();
    }

    /**
     * 注册所有分页部件对象
     * 
     * @memberof IBizTab
     */
    public regTabs(): void {

    }

    /**
     * 注册分页部件对象
     * 
     * @param {*} [tab={}] 
     * @memberof IBizTab
     */
    public regTab(tab: any = {}): void {
        if (Object.keys(tab).length > 0 && tab.name) {
            this.tabs[tab.name] = tab;
        }
    }

    /**
     * 获取分页部件对象
     * 
     * @param {string} name 
     * @returns {*} 
     * @memberof IBizTab
     */
    public getTab(name: string): any {
        if (this.tabs[name]) {
            return this.tabs[name];
        }
        return undefined;
    }

    /**
     * 设置激活分页
     *
     * @param {*} [tab={}]
     * @memberof IBizTab
     */
    public setActiveTab(tab: any = {}): void {
        this.activeTabIndex = tab.index;
        this.activeTabName = tab.name;
    }
}
