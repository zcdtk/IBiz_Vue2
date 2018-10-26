/**
 * 表单属性项
 *
 * @class IBizFormField
 * @extends {IBizFormItem}
 */
class IBizFormField extends IBizFormItem {

    /**
     * label 宽度
     *
     * @type {number}
     * @memberof IBizFormField
     */
    public labelWidth: number = 130;

    /**
     * 实体属性输入旧值
     *
     * @private
     * @type {string}
     * @memberof IBizFormField
     */
    private oldVal: string = '';

    /**
     * 数据流观察对象
     *
     * @private
     * @type {Subject<any>}
     * @memberof IBizFormField
     */
    private subject: Subject<any> = new rxjs.Subject();

    /**
     * 编辑器参数
     *
     * @type {*}
     * @memberof IBizFormField
     */
    public editorParams: any = {};

    /**
     * Creates an instance of IBizFormField.
     * 创建 IBizFormField 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormField
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
        _this.labelWidth = opts.labelWidth;
        if (opts.editorParams) {
            Object.assign(this.editorParams, opts.editorParams);
        }

        // 停止输入值间隔500 毫秒，进行值绑定
        _this.subject.pipe(
            rxjs.operators.debounceTime(500),
            rxjs.operators.distinctUntilChanged((o: any = {}, n: any = {}) =>
                !Object.is(o.oldVal, o.newVal) && !Object.is(n.oldVal, n.newVal)
                && Object.is(o.oldVal, n.oldVal) && Object.is(o.newVal, n.newVal)
            ),
        ).subscribe((data: any = {}) => {
            _this.setOldValue(data.oldVal);
            _this.setValue(data.newVal);
        });
    }

    /**
     * 设置旧值
     *
     * @param {string} val
     * @memberof IBizFormField
     */
    public setOldValue(val: string): void {
        let _this = this;
        _this.oldVal = val;
    }

    /**
     * 获取旧值
     *
     * @returns {string}
     * @memberof IBizFormField
     */
    public getOldValue(): string {
        let _this = this;
        return _this.oldVal;
    }

    /**
     * 属性值变化
     *
     * @param {*} event
     * @memberof IBizFormField
     */
    public valueChange(event: any): void {
        let _this = this;
        if (!event || !event.target) {
            return;
        }
        let target: any = event.target;
        let oldVal = target._value;
        let newVal = target.value;
        if ((typeof newVal !== 'string')) {
            oldVal = JSON.stringify(oldVal);
        }
        if ((typeof newVal !== 'string')) {
            newVal = JSON.stringify(newVal);
        }
        _this.subject.next({ oldVal: oldVal, newVal: newVal });
    }

}
