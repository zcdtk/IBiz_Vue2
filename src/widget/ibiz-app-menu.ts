/**
 * 应用菜单
 *
 * @class IBizAppMenu
 * @extends {IBizControl}
 */
class IBizAppMenu extends IBizControl {

    /**
     * 应用功能数据
     *
     * @type {Array<any>}
     * @memberof IBizAppMenu
     */
    public appFunctions: Array<any> = [];

    /**
     * 菜单数据项
     * 
     * @type {any[]}
     * @memberof IBizAppMenu
     */
    public items: Array<any> = [];

    /**
     * 选中项
     *
     * @type {*}
     * @memberof IBizAppMenu
     */
    public selectItem: any = {};

    /**
     * Creates an instance of IBizAppMenu.
     * 创建 IBizAppMenu 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizAppMenu
     */
    constructor(opts: any = {}) {
        super(opts);
        this.setAppFunctions();
    }

    /**
     * 设置应用功能参数
     *
     * @memberof IBizAppMenu
     */
    public setAppFunctions(): void {
    }

    /**
     * 部件加载
     * 
     * @memberof IBizAppMenu
     */
    public load(): void {
        const params: any = { srfctrlid: this.getName(), srfaction: 'FETCH' };
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe((success: any) => {
            if (success.ret === 0) {
                this.items = success.items;
                this.fire(IBizAppMenu.LOADED, this.items);
            }
        }, error => {
            console.log(error);
        });
    }

    /**
     * 菜单选中
     *
     * @param {*} [item={}]
     * @returns {*}
     * @memberof IBizAppMenu
     */
    public onSelectChange(item: any = {}): any {
        // tslint:disable-next-line:prefer-const
        let _item = {};
        Object.assign(_item, item);
        const _appFunction: any = this.appFunctions.find(appfunction => Object.is(appfunction.appfuncid, item.appfuncid));
        if (!_appFunction) {
            return;
        }
        Object.assign(_item, _appFunction);
        this.fire(IBizAppMenu.MENUSELECTION, _item);
    }

    /**
     * 设置选中菜单
     *
     * @param {*} [item={}]
     * @memberof IBizAppMenu
     */
    public setAppMenuSelected(item: any = {}): void {
        if (!item) {
            return;
        }
        this.selectItem = {};
        const appfunction = this.appFunctions.find(_appfunction => Object.is(_appfunction.routerlink, item.routerlink));
        if (!appfunction) {
            return;
        }
        const _selectItem = this.getSelectMenuItem(this.items, appfunction);

        if (_selectItem && Object.keys(_selectItem).length > 0) {
            Object.assign(this.selectItem, _selectItem);
        }
    }

    /**
     * 获取选中菜单项
     *
     * @private
     * @param {Array<any>} items
     * @param {*} [appfunction={}]
     * @returns {*}
     * @memberof IBizAppMenu
     */
    private getSelectMenuItem(items: Array<any>, appfunction: any = {}): any {
        // tslint:disable-next-line:prefer-const
        let item = {};
        items.some(_item => {
            if (Object.is(_item.appfuncid, appfunction.appfuncid)) {
                Object.assign(item, _item);
                return true;
            }
            if (_item.items) {
                const subItem = this.getSelectMenuItem(_item.items, appfunction);
                if (subItem && Object.keys(subItem).length > 0) {
                    Object.assign(item, subItem);
                    return true;
                }
            }
        });
        return item;
    }

     /**
     * 获取菜单数据
     *
     * @returns {Array<any>}
     * @memberof IBizAppMenu
     */
    public getItems(): Array<any> {
        return this.items;
    }

    /**
     * 获取菜单数据项
     *
     * @param {string} id
     * @param {Array<any>} items
     * @returns {*}
     * @memberof IBizAppMenu
     */
    public getItem(id: string, items: Array<any>): any {
        let _this = this;
        let _item: any = {};
        items.some(item => {
            if (Object.is(item.id, id)) {
                Object.assign(_item, item);
                return true;
            }
            if (item.items && item.items.length > 0 && Array.isArray(item.items)) {
                let _subItem = _this.getItem(id, item.items);
                if (_subItem && Object.keys(_subItem).length > 0) {
                    Object.assign(_item, _subItem);
                    return true;
                }
            }
        });
        return _item;
    }

    /**
     * 菜单加载
     *
     * @static
     * @memberof IBizAppMenu
     */
    public static LOADED = 'LOADED';

    /**
     * 菜单选中
     *
     * @static
     * @memberof IBizAppMenu
     */
    public static MENUSELECTION = 'MENUSELECTION';
}
