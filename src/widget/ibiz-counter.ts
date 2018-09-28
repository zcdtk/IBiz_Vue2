/**
 * 计数器部件对象
 *
 * @class IBizCounter
 * @extends {IBizControl}
 */
class IBizCounter extends IBizControl {


    private timer: any;

    private tag: any;

    private counterid: any;

    private counterparam: any = {};

    private lastReloadArg: any = {};

    private result: any;

    private data: any = {};

    /**
     * Creates an instance of IBizCounter.
     * 创建 IBizCounter 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizCounter
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
        _this.counterid = opts.counterId;
        // this.tag = opts.tag;
        _this.counterparam = JSON.stringify(opts.counterParam);
        _this.timer = opts.timer;
        // this.url = me.getController().getBackendUrl();
        if (_this.timer > 1000) {
            _this.tag = setInterval(function () { _this.reload(); }, _this.timer);
        }
        _this.reload();
    }

    public reload(): void {
        var _this = this;
        let params = { srfcounterid: _this.counterid, srfaction: 'FETCH', srfcounterparam: _this.counterparam };
        this.iBizHttp.post(this.getBackendUrl(), params).subscribe((data) => {
            if (data.ret == 0) {
                _this.setData(data);
            } else {
                console.log('加载计数数据异常.' + data.info);
            }
        }, (error) => {
            console.log(error);
        });
    }
    public setData(data: any): void {
        var _this = this;
        _this.result = data;
        _this.data = data.data;
        _this.fire(IBizCounter.COUNTERCHANGED, _this.data);
    }
    public getResult(): any {
        var _this = this;
        return _this.result;
    }
    public getData(): any {
        var _this = this;
        return _this.data;
    }

    public close(): void {
        if (this.tag !== undefined) {
            clearInterval(this.tag);
            delete this.timer;
        }
    }

    /*****************事件声明************************/
    /**
     * 计数发生变化
     */
    public static COUNTERCHANGED = "COUNTERCHANGED"
}