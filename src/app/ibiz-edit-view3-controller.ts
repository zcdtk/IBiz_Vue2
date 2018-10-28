/**
 * 分页编辑视图
 *
 * @class IBizEditView3Controller
 * @extends {IBizEditViewController}
 */
class IBizEditView3Controller extends IBizEditViewController {

    /**
     * Creates an instance of IBizEditView3Controller.
     * 创建 IBizEditView3Controller 实例
     * 
     * @param {*} [opts={}] 
     * @memberof IBizEditView3Controller
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    /**
     * 视图部件初始化，注册所有事件
     * 
     * @memberof IBizEditView3Controller
     */
    public onInitComponents(): void {
        super.onInitComponents();
        const drTab: any = this.getDRTab();
        if (drTab) {
            // 分页导航选中
            drTab.on(IBizDRTab.SELECTCHANGE).subscribe((data) => {
                this.doDRTabSelectChange(data);
            });
        }
    }

    /**
     * 表单加载完成
     * 
     * @memberof IBizEditView3Controller
     */
    public onFormLoaded(): void {
        super.onFormLoaded();

        const drtab: any = this.getDRTab();
        if (this.isHideEditForm()) {
            const form = this.getForm();
            const _field = form.findField('srfkey');
            const _srfuf = form.findField('srfuf');
            if (!_field) {
                return;
            }
            if (Object.is(_srfuf.getValue(), 0) && Object.is(_field.getValue(), '')) {
                this.iBizNotification.warning('警告', '新建模式，表单主数据不存在');
                if (drtab) {
                    drtab.setActiveTab(0);
                }
                return;
            }
        }

        let form = this.getForm();
        if (form.findField('srfkey') && !Object.is(form.findField('srfkey').getValue(), '')) {
            const index: number = this.getDRTabIndex();
            if (drtab) {
                drtab.setActiveTab(index);
            }

        }
    }

    /**
     * 是否隐藏编辑表单
     * 
     * @returns {boolean} 
     * @memberof IBizEditView3Controller
     */
    public isHideEditForm(): boolean {
        return false;
    }

    /**
     * 视图信息更新
     * 
     * @returns {void} 
     * @memberof IBizEditView3Controller
     */
    public updateViewInfo(): void {
        super.updateViewInfo();
        const form = this.getForm();
        if (!form) {
            return;
        }
        const field = form.findField('srfkey');
        if (!field) {
            return;
        }
        let keyvalue = field.getValue();

        const srforikey = form.findField('srforikey');
        if (field) {
            const keyvalue2 = field.getValue();
            if (keyvalue2 && !Object.is(keyvalue2, '')) {
                keyvalue = keyvalue2;
            }
        }
        let deid = '';
        const deidfield = form.findField('srfdeid');
        if (deidfield) {
            deid = deidfield.getValue();
        }
        let parentData: any = { srfparentkey: keyvalue };
        if (!Object.is(deid, '')) {
            parentData.srfparentdeid = deid;
        }
        if (this.getDRTab()) {
            this.getDRTab().setParentData(parentData);
        }
    }

    /**
     * 关系分页部件选择变化处理
     * 
     * @param {*} [data={}] 
     * @memberof IBizEditView3Controller
     */
    public doDRTabSelectChange(data: any = {}): void {
        let params: any = {};
        let _isShowToolBar: boolean = Object.is(data.viewid, 'form') ? true : false;
        setTimeout(() => {
            this.isShowToolBar = _isShowToolBar;
        });
        Object.assign(params, data.parentMode);
        Object.assign(params, data.parentData);
        this.openView(data.viewid, params);
    }

    /**
     * 获取关系视图参数
     * 
     * @param {*} [arg={}] 
     * @returns {*} 
     * @memberof IBizEditView3Controller
     */
    public getDRItemView(arg: any = {}): any {

    }

    /**
     * 刷新视图
     * 
     * @memberof IBizEditView3Controller
     */
    public onRefresh(): void {
        if (this.getDRTab()) {
            this.getDRTab().refresh();
        }
    }

    /**
     * 获取关系分页部件
     * 
     * @returns {*} 
     * @memberof IBizEditView3Controller
     */
    public getDRTab(): any {
        return this.getControl('drtab');
    }

    private getDRTabIndex(): number {
        let _tab: number = 0;


        return _tab;


    }
}
