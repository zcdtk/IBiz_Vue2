/**
 * 工具栏控件
 *
 * @class IBizToolbar
 * @extends {IBizControl}
 */
class IBizToolbar extends IBizControl {

    /**
     * 所有工具栏按钮
     *
     * @type {*}
     * @memberof IBizToolbar
     */
    public items: any = {};

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
        if (!this.items) {
            this.items = {};
        }
        if (Object.keys(item).length > 0 && !Object.is(item.name, '')) {
            item.dataaccaction = true;
            this.items[item.name] = item;
        }
        if (item.items && item.items.length > 0) {
            const _menus: Array<any> = [...item.items];
            _menus.forEach((menu) => {
                this.regToolBarItem(menu);
            });
        }
    }

    /**
     * 获取所有工具栏按钮
     *
     * @returns {Array<any>}
     * @memberof IBizToolbar
     */
    public getItems(): any {
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
        const btn_names: Array<any> = Object.keys(this.items);
        btn_names.some((_name) => {
            if (Object.is(_name, name) || Object.is(tag, this.items[_name].tag)) {
                Object.assign(_item, this.items[_name]);
                return true;
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
        const _itemsName: Array<any> = Object.keys(this.items);
        _itemsName.forEach((name: string) => {
            const priv = this.items[name].priv;
            if ((priv && !Object.is(priv, '')) && (action && Object.keys(action).length > 0 && action[priv] !== 1)) {
                this.items[name].dataaccaction = false;
            } else {
                this.items[name].dataaccaction = true;
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