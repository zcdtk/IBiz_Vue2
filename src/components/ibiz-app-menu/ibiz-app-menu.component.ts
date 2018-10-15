Vue.component('ibiz-app-menu', {
    template: `
    <Menu theme="dark" width="auto" class="ibiz-app-menu"  @on-select="onSelect($event)">
        <template v-for="(item0, index0) in ctrl.items">
            <!---  一级菜单有子项 begin  --->
            <template v-if="item0.items && item0.items.length > 0">
                <Submenu v-bind:name="item0.id">
                    <template slot="title">
                        <span><i v-bind:class="[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]" aria-hidden="true"></i> {{ item0.text }}</span>
                    </template>
                    <template v-for="(item1, index1) in item0.items">
                        <!---  二级菜单有子项 begin  --->
                        <template v-if="item1.items && item1.items.length > 0">
                            <Submenu v-bind:name="item1.id">
                                <template slot="title">
                                    <span>{{ item1.text }}</span>
                                </template>
                                <!---  三级菜单 begin  --->
                                <template v-for="(item2, index2) in item1.items">
                                    <MenuItem v-bind:name="item2.id">
                                        <span>{{ item2.text }}</span>
                                    </MenuItem>
                                </template>
                                <!---  三级菜单有 begin  --->
                            </Submenu>
                        </template>
                        <!---  二级菜单有子项 end  --->
                        <!---  二级菜单无子项 begin  --->
                        <template v-else>
                            <MenuItem v-bind:name="item1.id">
                                <span>{{ item1.text }}</span>
                            </MenuItem>
                        </template>
                        <!---  二级菜单无子项 end  --->
                    </template>
                </Submenu>
            </template>
            <!---  一级菜单有子项 end  --->
            <!---  一级菜单无子项 begin  --->
            <template v-else>
                <MenuItem v-bind:name="item0.id">
                    <span><i v-bind:class="[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]" aria-hidden="true" style="margin-right:8px;"></i>{{ item0.text }}</span>
                </MenuItem>
            </template>
            <!---  一级菜单无子项 end  --->
        </template>
    </Menu>
    `,
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
        console.log(this.ctrl);
    },
    methods: {
        onSelect(name) {
            if (this.ctrl && !Object.is(name, '')) {
                let item = this.ctrl.getItem(name, this.ctrl.getItems());
                this.ctrl.onSelectChange(item);
            }
        }
    }
});