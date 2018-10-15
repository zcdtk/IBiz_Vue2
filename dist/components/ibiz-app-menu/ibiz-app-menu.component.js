"use strict";
Vue.component('ibiz-app-menu', {
    template: "\n    <Menu theme=\"dark\" width=\"auto\" class=\"ibiz-app-menu\"  @on-select=\"onSelect($event)\">\n        <template v-for=\"(item0, index0) in ctrl.items\">\n            <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n            <template v-if=\"item0.items && item0.items.length > 0\">\n                <Submenu v-bind:name=\"item0.id\">\n                    <template slot=\"title\">\n                        <span><i v-bind:class=\"[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]\" aria-hidden=\"true\"></i> {{ item0.text }}</span>\n                    </template>\n                    <template v-for=\"(item1, index1) in item0.items\">\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                        <template v-if=\"item1.items && item1.items.length > 0\">\n                            <Submenu v-bind:name=\"item1.id\">\n                                <template slot=\"title\">\n                                    <span>{{ item1.text }}</span>\n                                </template>\n                                <!---  \u4E09\u7EA7\u83DC\u5355 begin  --->\n                                <template v-for=\"(item2, index2) in item1.items\">\n                                    <MenuItem v-bind:name=\"item2.id\">\n                                        <span>{{ item2.text }}</span>\n                                    </MenuItem>\n                                </template>\n                                <!---  \u4E09\u7EA7\u83DC\u5355\u6709 begin  --->\n                            </Submenu>\n                        </template>\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                        <template v-else>\n                            <MenuItem v-bind:name=\"item1.id\">\n                                <span>{{ item1.text }}</span>\n                            </MenuItem>\n                        </template>\n                        <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n                    </template>\n                </Submenu>\n            </template>\n            <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n            <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n            <template v-else>\n                <MenuItem v-bind:name=\"item0.id\">\n                    <span><i v-bind:class=\"[item0.iconcls == '' ? 'fa fa-cogs' : item0.iconcls ]\" aria-hidden=\"true\" style=\"margin-right:8px;\"></i>{{ item0.text }}</span>\n                </MenuItem>\n            </template>\n            <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n        </template>\n    </Menu>\n    ",
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
                var item = this.ctrl.getItem(name, this.ctrl.getItems());
                this.ctrl.onSelectChange(item);
            }
        }
    }
});
