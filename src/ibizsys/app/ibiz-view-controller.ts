import { IBizObejct } from '../ibiz-obejct';

/**
 * 视图控制器基类
 *
 * @export
 * @class IBizViewController
 * @extends {IBizObejct}
 */
export class IBizViewController extends IBizObejct {

    /**
     * Creates an instance of IBizViewController.
     * 创建 IBizViewController 实例对象
     * 
     * @param {*} [opts={}]
     * @memberof IBizViewController
     */
    constructor(opts: any = {}) {
        super(opts);
    }
}