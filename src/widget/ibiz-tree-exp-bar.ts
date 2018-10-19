/**
 * 树导航栏
 *
 * @class IBizTreeExpBar
 * @extends {IBizControl}
 */
class IBizTreeExpBar extends IBizControl {

    private tree: IBizTree = null;;

    private tabctrl = null;;

    private treeCfg: any = {};

    private expframe = null;

    private pvpanel = null;;

    /**
     * Creates an instance of IBizTreeExpBar.
     * 创建 IBizTreeExpBar 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizTreeExpBar
     */
    constructor(opts: any = {}) {
        super(opts);
    }

    public setSize(width, height): void {
    }
    public getTree(): IBizTree {
        return this.tree;
    }
    public getExpTab(): any {
        return this.tabctrl;
    }
    public getTreeCfg(): any {
        return this.treeCfg || {};
    }
    public getExpFrame(): any {
        return this.expframe;
    }
    public getPVPanel(): any {
        return this.pvpanel;
    }
    public onTreeSelectionChange(tree, records, eOpts): void {

        var _this = this;
        if (records == null || records.length == 0)
            return;

        var record = records[0];
        if (!record.original)
            return;

        var tag = record.original.tag;
        if (!tag || !(tag.srfnodetype))
            return;

        //替换键值
        var nodeids = record.id.split(';');
        var nodetext = record.text;

        var controller = _this.getViewController();
        if (_this.getExpTab()) {
            var viewarg = { viewid: tag.srfnodetype };
            var viewItem = controller.getExpItemView(viewarg);
            if (viewItem == null)
                return;
            var layoutcard = _this.getExpTab();
            var itemid = layoutcard.id + '_' + tag.srfnodetype;
            layoutcard.setActiveItem(itemid);

            var viewParam = {};
            if (viewItem.viewparam) {
                // $.extend(viewParam, viewItem.viewparam);
                Object.assign(viewParam, viewItem.viewparam);
            }

            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }

            var subController = controller.getController(controller.getCId2() + viewItem.embedviewid);
            layoutcard.setActiveSubController(subController);
            if (!subController.isInited()) {
                subController.asyncInit({ parentData: viewParam, renderTo: itemid, subApp: viewItem.subapp });
                return;
            }

            subController.setParentData(viewParam);
            subController.refresh();
            return;
        }

        if (_this.getPVPanel()) {
            // var viewarg = { nodetype: tag.srfnodetype };
            Object.assign(viewarg, { nodetype: tag.srfnodetype });
            // var viewParam = controller.getNavViewParam(viewarg);
            Object.assign(viewParam, controller.getNavViewParam(viewarg));
            if (viewParam == null)
                return;

            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }

            _this.getPVPanel().setParentData(viewParam);
            return;
        }

        if (_this.getExpFrame()) {
            var viewarg = { viewid: tag.srfnodetype };
            var viewItem = controller.getExpItemView(viewarg);
            if (viewItem == null)
                return;

            var viewParam = {};
            if (viewItem.viewparam) {
                // $.extend(viewParam, viewItem.viewparam);
                Object.assign(viewParam, viewItem.viewparam);
            }


            for (var key in viewParam) {
                var value = viewParam[key];
                if (value) {
                    value = value.replace(new RegExp('%NODETEXT%', 'g'), nodetext);
                    //进行替换
                    for (var i = 1; i < nodeids.length; i++) {
                        value = value.replace(new RegExp('%NODEID' + ((i == 1) ? '' : i.toString()) + '%', 'g'), nodeids[i]);
                    }
                    viewParam[key] = value;
                }
            }

            // var url = $.getIBizApp().parseURL(BASEURL, viewItem.viewurl, {});
            // url += "&" + $.param({ 'srfifchild': true, 'srfparentdata': JSON.stringify(viewParam) });
            // _this.getExpFrame().attr("src", url);
            return;
        }
    }
    public onTreeContextMenu(tree, params, eOpts): void {
        var _this = this;
        var node = params.node;

    }
    public fetchCat(backendurl, arg): void {

    }
}