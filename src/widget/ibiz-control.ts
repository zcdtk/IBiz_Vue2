/**
 * 控制器对象基类
 *
 * @class IBizControl
 * @extends {IBizObject}
 */
class IBizControl extends IBizObject {

    /**
     * Creates an instance of IBizControl.
     * 创建 IBizControl 实例对象
     * 
     * @param {*} [opts={}]
     * @memberof IBizControl
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    public load(params): void {

    }
	/**
	 * 销毁<暂时无效>
	 */
    public destroy(): void {

    }
    public setSize(width, height): void {

    }
    public setWidth(width): void {

    }
    public setHeight(height): void {

    }
    public isVisible(): boolean {
        return true;
    }
    public invoke(command, arg): void {
        var me = this;
        me.onInvoke(command, arg);
    }
    public onInvoke(command, arg): void {

    }
}