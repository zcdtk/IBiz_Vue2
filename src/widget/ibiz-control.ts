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
}