/**
 * 分页控件
 *
 * @class IBizTab
 * @extends {IBizControl}
 */
class IBizTab extends IBizControl {

    /**
     * Creates an instance of IBizTab.
     * 创建 IBizTab 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizTab
     */
    constructor(opts: any = {}) {
        super(opts);
        let _this = this;
    }

    public setActiveItem(index: number): void {
        // if ($.isNumeric(index)) {
        //     $('#' + this.config.id + ' li:eq(' + index.toString() + ') a').tab('show');
        // }
        // else {
        //     $('#' + this.config.id + ' a[href="#' + index + '"]').tab('show');
        // }
    }
    public setSize(width, height): void {
        // var me = this;
        // $('#' + me.id).width(width);
        // $('#' + me.id).height(height);
        /*if(me.activeSubController != null){
            me.activeSubController.setSize(width,height);
        }*/
    }
    public getHeight(): any {
        // var me = this;
        // return $('#' + me.id).height();
    }
    public getWidth(): any {
        // var me = this;
        // return $('#' + me.id).width();
    }
}