Vue.component('ibiz-exp-bar', {
    template: `
        <i-menu theme="light" width="auto" class="ibiz-app-menu" @on-select="onSelect($event)" active-name="ctrl.selection.id">
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
        let data: any = {};
        return data;
    },
    mounted: function () {
    },
    methods: {

    }
});