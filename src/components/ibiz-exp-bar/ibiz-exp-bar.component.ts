Vue.component('ibiz-exp-bar', {
    template: `
        <i-menu theme="light" width="auto" class="ibiz-exp-bar" @on-select="onSelect($event)"  @on-open-change="onOpenChange($event)"
          active-name="ctrl.selection.id">
            <template v-for="(item0, index0) in ctrl.items">
                <!---  一级菜单有子项 begin  --->
                <template v-if="item0.items && item0.items.length > 0">
                    <submenu :name="item0.id">
                        <template slot="title">
                            <span>{{ item0.text }}</span>
                            <span>&nbsp;&nbsp;<badge :count="item0.counterdata"></badge></span>
                        </template>
                        <template v-for="(item1, index1) in item0.items">
                            <!---  二级菜单有子项 begin  --->
                            <template v-if="item1.items && item1.items.length > 0">
                                <submenu :name="item1.id">
                                    <template slot="title">
                                        <span>{{ item1.text }}</span>
                                        <span>&nbsp;&nbsp;<badge :count="item1.counterdata"></badge></span>
                                    </template>
                                    <!---  三级菜单 begin  --->
                                    <template v-for="(item2, index2) in item1.items">
                                        <menu-item :name="item2.id">
                                            <span>{{ item2.text }}</span>
                                            <span>&nbsp;&nbsp;<badge :count="item2.counterdata"></badge></span>
                                        </menu-item>
                                    </template>
                                    <!---  三级菜单有 begin  --->
                                </submenu>
                            </template>
                            <!---  二级菜单有子项 end  --->
                            <!---  二级菜单无子项 begin  --->
                            <template v-else>
                                <menu-item :name="item1.id">
                                    <span>{{ item1.text }}</span>
                                    <span>&nbsp;&nbsp;<badge :count="item1.counterdata"></badge></span>
                                </menu-item>
                            </template>
                            <!---  二级菜单无子项 end  --->
                        </template>
                    </submenu>
                </template>
                <!---  一级菜单有子项 end  --->
                <!---  一级菜单无子项 begin  --->
                <template v-else>
                    <menu-item :name="item0.id">
                        <span>{{ item0.text }}</span>
                        <span>&nbsp;&nbsp;<badge :count="item0.counterdata"></badge></span>
                    </menu-item>
                </template>
                <!---  一级菜单无子项 end  --->
            </template>
        </i-menu>
    `,
    props: ['ctrl', 'viewController'],
    data: function () {
        let data: any = { opendata: [] };
        return data;
    },
    mounted: function () {
    },
    methods: {
        setOpenData(arr: Array<any>) {
            let _this = this;
            arr.forEach(item => {
                if (item.items && item.items.length > 0) {
                    _this.opendata.push(item.id);
                    _this.setOpenData(item.items);
                }
            })
        },
        getItem(items: Array<any>, id) {
            let _this = this;
            let data: any = {};
            items.some(_item => {
                if (Object.is(id, _item.id)) {
                    Object.assign(data, _item);
                    return true;
                }
                if (_item.items && _item.items.length > 0) {
                    let subItem = _this.getItem(_item.items, id);
                    if (Object.keys(subItem).length > 0) {
                        Object.assign(data, subItem);
                        return true;
                    }
                }
            });
            return data;
        },
        onSelect(name: string) {
            console.log(name);
            let _this = this;
            let _data = _this.getItem(_this.ctrl.items, name);
            _this.ctrl.selection(_data);
        },
        onOpenChange(submenu: Array<any>) {
            console.log(submenu);
        },
    },
    watch: {
        'ctrl.items': function (val) {
            if (val && Array.isArray(val)) {
                this.items = [...val];
                this.setOpenData(val);
            }
        }
    }
});