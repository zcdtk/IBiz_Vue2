import { IBizObejct } from '../ibiz-obejct';

/**
 * 控制器对象基类
 *
 * @export
 * @class IBizControl
 * @extends {IBizObejct}
 */
export class IBizControl extends IBizObejct {

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

    /**
     * 设置名称
     *
     * @param {string} name
     * @memberof IBizControl
     */
    public setName(name: string): void {
        super.setName(name);
    }
}