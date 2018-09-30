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
    /**
     * 所有工具栏按钮
     *
     * @private
     * @type {Array<any>}
     * @memberof IBizToolbar
     */
    private items: Array<any> = [];

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
        this.items.push(item);
    }

    /**
     * 获取所有工具栏按钮
     *
     * @returns {Array<any>}
     * @memberof IBizToolbar
     */
    public getItems(): Array<any> {
        return this.items;
    }

    /**
     * 获取工具栏按钮
     *
     * @param {string} [name] 名称（可选）
     * @param {string} [tag] 标识（可选）
     * @returns {*}
     * @memberof IBizToolbar
     */
    public getItem(name?: string, tag?: string): any {
        let _item = {};
        Object.assign(this._getItem(this.items, name, tag));
        return _item;
    }

    /**
     * 
     *
     * @private
     * @param {Array<any>} items
     * @param {string} [name]
     * @param {string} [tag]
     * @returns {*}
     * @memberof IBizToolbar
     */
    private _getItem(items: Array<any>, name?: string, tag?: string): any {
        let _item = {};
        items.some(item => {
            if (Object.is(item.name, name)) {
                Object.assign(_item, item);
                return true;
            }
            if (Object.is(item.tag, tag)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items) {
                const subItem = this._getItem(item.items, name, tag);
                if (Object.keys(subItem).length > 0) {
                    Object.assign(_item, subItem);
                    return true;
                }
            }
        });
        return _item;
    }

    /**
     * 设置工具栏按钮是否启用
     *
     * @param {string} name
     * @param {boolean} disabled
     * @memberof IBizToolbar
     */
    public setItemDisabled(name: string, disabled: boolean): void {
        this.items.some(item => {
            if (Object.is(item.name, name)) {
                item.disabled = disabled;
                return true;
            }
        });
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