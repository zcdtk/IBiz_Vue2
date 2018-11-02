Vue.component('ibiz-exp-bar', {
    template: `
        <el-menu class="ibiz-exp-bar" @select="onSelect" :default-active="ctrl.selectItem.id" :default-openeds="ctrl.expandItems">
            <template v-for="(item0, index0) in ctrl.items">

                <!---  一级菜单有子项 begin  --->
                <template v-if="item0.items && item0.items.length > 0">
                    <el-submenu :index="item0.id" v-show="item0.show">
                        <template slot="title">
                            <span slot="title">{{ item0.text }}</span>
                            <span>&nbsp;&nbsp;<badge :count="item0.counterdata"></badge></span>
                        </template>
                        <template v-for="(item1, index1) in item0.items">

                            <!---  二级菜单有子项 begin  --->
                            <template v-if="item1.items && item1.items.length > 0">
                                <el-submenu :index="item1.id" v-show="item1.show">
                                    <template slot="title">
                                        <span slot="title">{{ item1.text }}</span>
                                        <span>&nbsp;&nbsp;<badge :count="item1.counterdata"></badge></span>
                                    </template>

                                    <!---  三级菜单 begin  --->
                                    <template v-for="(item2, index2) in item1.items">
                                        <el-menu-item :index="item2.id" v-show="item2.show">
                                            <span slot="title">{{ item2.text }}</span>
                                            <span>&nbsp;&nbsp;<badge :count="item2.counterdata"></badge></span>
                                        </el-menu-item>
                                    </template>
                                    <!---  三级菜单有 begin  --->

                                </el-submenu>
                            </template>
                            <!---  二级菜单有子项 end  --->

                            <!---  二级菜单无子项 begin  --->
                            <template v-else>
                                <el-menu-item :index="item1.id" v-show="item1.show">
                                    <span slot="title">{{ item1.text }}</span>
                                    <span>&nbsp;&nbsp;<badge :count="item1.counterdata"></badge></span>
                                </el-menu-item>
                            </template>
                            <!---  二级菜单无子项 end  --->

                        </template>
                    </el-submenu>
                </template>
                <!---  一级菜单有子项 end  --->

                <!---  一级菜单无子项 begin  --->
                <template v-else>
                    <el-menu-item :index="item0.id" v-show="item0.show">
                        <span slot="title">{{ item0.text }}</span>
                        <span>&nbsp;&nbsp;<badge :count="item0.counterdata"></badge></span>
                    </el-menu-item>
                </template>
                <!---  一级菜单无子项 end  --->

            </template>
        </el-menu>
    `,
    props: ['ctrl', 'viewController'],
    data: function () {
        let data: any = { opendata: [] };
        return data;
    },
    mounted: function () {
    },
    methods: {
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
            let _this = this;
            let _data = _this.getItem(_this.ctrl.items, name);
            _this.ctrl.selection(_data);
        },
        onOpenChange(submenu: Array<any>) {
            console.log(submenu);
        },
    }
});