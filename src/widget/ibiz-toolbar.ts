/**
 * 工具栏控件
 *
 * @class IBizToolbar
 * @extends {IBizControl}
 */
class IBizToolbar extends IBizControl {

    /**
     * 工具栏项按钮集合
     *
     * @private
     * @type {Map<string, any>}
     * @memberof IBizToolbar
     */
    private items: Map<string, any> = new Map();

    /**
     * Creates an instance of IBizToolbar.
     * 创建 IBizToolbar 实例对象
     * 
     * @param {*} [opts={}]
     * @memberof IBizToolbar
     */
    constructor(opts: any = {}) {
        super(opts);
        this.regToolBarItems();
    }

    /**
     * 注册所有工具栏按钮
     *
     * @memberof IBizToolbar
     */
    public regToolBarItems(): void {
    }

    /**
     * 注册工具栏按钮
     *
     * @param {*} [item={}]
     * @memberof IBizToolbar
     */
    public regToolBarItem(item: any = {}): void {
        if (Object.keys(item).length > 0 && !Object.is(item.name, '')) {
            item.dataaccaction = true;
            this.items.set(item.name, item);
        }
        if (item.menu && item.menu.length > 0) {
            const _menus: Array<any> = [...item.menu];
            _menus.forEach((menu) => {
                this.regToolBarItem(menu);
            });
        }
    }

    /**
     * 获取所有工具栏按钮
     *
     * @returns {Map<string, any>}
     * @memberof IBizToolbar
     */
    public getItems(): Map<string, any> {
        return this.items;
    }

    /**
     * 设置工具栏按钮是否启用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizToolbar
     */
    public setItemDisabled(name: string, disabled: boolean): void {
        if (this.items.get(name)) {
            this.items.get(name).disabled = disabled
        }
    }

    /**
     * 更新工具栏按钮状态
     *
     * @param {*} [action={}]
     * @memberof IBizToolbar
     */
    public updateAccAction(action: any = {}): void {
        var _this = this;
        _this.items.forEach(value => {
            const priv = value.priv;
            if ((priv && !Object.is(priv, '')) && (action && Object.keys(action).length > 0 && action[priv] !== 1)) {
                value.dataaccaction = false;
            } else {
                value.dataaccaction = true;
            }
        });
    }

    /**
     * 点击按钮
     *
     * @param {string} name
     * @param {string} type
     * @memberof IBizToolbar
     */
    public itemclick(name: string, type: string): void {
        var _this = this;
        _this.fire(IBizToolbar.ITEMCLICK, { tag: type });
    }

    /** ***************事件声明*********************** */

    /**
     * 点击按钮事件
     *
     * @static
     * @memberof IBizToolbar
     */
    public static ITEMCLICK = 'ITEMCLICK';
}