Vue.component('ibiz-app-menu', {
    template: `
        <el-menu class="ibiz-app-menu" background-color="#515a6e" text-color="#fff" @select="onSelect" :default-active="ctrl.selectItem.id">
            <template v-for="(item0, index0) in ctrl.items">

                <!---  一级菜单有子项 begin  --->
                <template v-if="item0.items && item0.items.length > 0">
                    <el-submenu :index="item0.id">
                        <template slot="title">
                            <i :class="[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]" aria-hidden="true"></i>
                            <span slot="title">{{ item0.text }}</span>
                        </template>
                        <template v-for="(item1, index1) in item0.items">

                            <!---  二级菜单有子项 begin  --->
                            <template v-if="item1.items && item1.items.length > 0">
                                <el-submenu :index="item1.id">
                                    <template slot="title">
                                        <span slot="title">{{ item1.text }}</span>
                                    </template>

                                    <!---  三级菜单 begin  --->
                                    <template v-for="(item2, index2) in item1.items">
                                        <el-menu-item :index="item2.id">
                                            <span slot="title">{{ item2.text }}</span>
                                        </el-menu-item>
                                    </template>
                                    <!---  三级菜单有 begin  --->

                                </el-submenu>
                            </template>
                            <!---  二级菜单有子项 end  --->

                            <!---  二级菜单无子项 begin  --->
                            <template v-else>
                                <el-menu-item :index="item1.id">
                                    <span slot="title">{{ item1.text }}</span>
                                </el-menu-item>
                            </template>
                            <!---  二级菜单无子项 end  --->

                        </template>
                    </el-submenu>
                </template>
                <!---  一级菜单有子项 end  --->

                <!---  一级菜单无子项 begin  --->
                <template v-else>
                    <el-menu-item :index="item0.id">
                        <i :class="[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]" aria-hidden="true"></i>
                        <span slot="title">{{ item0.text }}</span>
                    </el-menu-item>
                </template>
                <!---  一级菜单无子项 end  --->

            </template>
        </el-menu>
    `,
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
    },
    methods: {
        onSelect(name) {
            if (this.ctrl && !Object.is(name, '')) {
                let item = this.ctrl.getItem(this.ctrl.getItems(), { id: name });
                this.ctrl.onSelectChange(item);
            }
        }
    }
});