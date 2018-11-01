"use strict";
Vue.component('ibiz-app-menu', {
    template: "\n        <el-menu background-color=\"#515a6e\" text-color=\"#fff\" @select=\"onSelect\" :default-active=\"ctrl.selectItem.id\">\n            <template v-for=\"(item0, index0) in ctrl.items\">\n\n                <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                <template v-if=\"item0.items && item0.items.length > 0\">\n                    <el-submenu :index=\"item0.id\">\n                        <template slot=\"title\">\n                            <i :class=\"[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]\" aria-hidden=\"true\"></i>\n                            <span slot=\"title\">{{ item0.text }}</span>\n                        </template>\n                        <template v-for=\"(item1, index1) in item0.items\">\n\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                            <template v-if=\"item1.items && item1.items.length > 0\">\n                                <el-submenu :index=\"item1.id\">\n                                    <template slot=\"title\">\n                                        <span slot=\"title\">{{ item1.text }}</span>\n                                    </template>\n\n                                    <!---  \u4E09\u7EA7\u83DC\u5355 begin  --->\n                                    <template v-for=\"(item2, index2) in item1.items\">\n                                        <el-menu-item :index=\"item2.id\">{{ item2.text }}</el-menu-item>\n                                    </template>\n                                    <!---  \u4E09\u7EA7\u83DC\u5355\u6709 begin  --->\n\n                                </el-submenu>\n                            </template>\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                            <template v-else>\n                                <el-menu-item :index=\"item1.id\">{{ item1.text }}</el-menu-item>\n                            </template>\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n\n                        </template>\n                    </el-submenu>\n                </template>\n                <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n\n                <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                <template v-else>\n                    <el-menu-item :index=\"item0.id\">\n                        <i :class=\"[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]\" aria-hidden=\"true\"></i>\n                        <span slot=\"title\">{{ item0.text }}</span>\n                    </el-menu-item>\n                </template>\n                <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n\n            </template>\n        </el-menu>\n    ",
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
    },
    methods: {
        onSelect: function (name) {
            if (this.ctrl && !Object.is(name, '')) {
                var item = this.ctrl.getItem(this.ctrl.getItems(), { id: name });
                this.ctrl.onSelectChange(item);
            }
        }
    }
});
