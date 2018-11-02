"use strict";
Vue.component('ibiz-exp-bar', {
    template: "\n        <el-menu class=\"ibiz-exp-bar\" @select=\"onSelect\" :default-active=\"ctrl.selectItem.id\" :default-openeds=\"ctrl.expandItems\">\n            <template v-for=\"(item0, index0) in ctrl.items\">\n\n                <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                <template v-if=\"item0.items && item0.items.length > 0\">\n                    <el-submenu :index=\"item0.id\" v-show=\"item0.show\">\n                        <template slot=\"title\">\n                            <span slot=\"title\">{{ item0.text }}</span>\n                            <span>&nbsp;&nbsp;<badge :count=\"item0.counterdata\"></badge></span>\n                        </template>\n                        <template v-for=\"(item1, index1) in item0.items\">\n\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 begin  --->\n                            <template v-if=\"item1.items && item1.items.length > 0\">\n                                <el-submenu :index=\"item1.id\" v-show=\"item1.show\">\n                                    <template slot=\"title\">\n                                        <span slot=\"title\">{{ item1.text }}</span>\n                                        <span>&nbsp;&nbsp;<badge :count=\"item1.counterdata\"></badge></span>\n                                    </template>\n\n                                    <!---  \u4E09\u7EA7\u83DC\u5355 begin  --->\n                                    <template v-for=\"(item2, index2) in item1.items\">\n                                        <el-menu-item :index=\"item2.id\" v-show=\"item2.show\">\n                                            <span slot=\"title\">{{ item2.text }}</span>\n                                            <span>&nbsp;&nbsp;<badge :count=\"item2.counterdata\"></badge></span>\n                                        </el-menu-item>\n                                    </template>\n                                    <!---  \u4E09\u7EA7\u83DC\u5355\u6709 begin  --->\n\n                                </el-submenu>\n                            </template>\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                            <template v-else>\n                                <el-menu-item :index=\"item1.id\" v-show=\"item1.show\">\n                                    <span slot=\"title\">{{ item1.text }}</span>\n                                    <span>&nbsp;&nbsp;<badge :count=\"item1.counterdata\"></badge></span>\n                                </el-menu-item>\n                            </template>\n                            <!---  \u4E8C\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n\n                        </template>\n                    </el-submenu>\n                </template>\n                <!---  \u4E00\u7EA7\u83DC\u5355\u6709\u5B50\u9879 end  --->\n\n                <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 begin  --->\n                <template v-else>\n                    <el-menu-item :index=\"item0.id\" v-show=\"item0.show\">\n                        <span slot=\"title\">{{ item0.text }}</span>\n                        <span>&nbsp;&nbsp;<badge :count=\"item0.counterdata\"></badge></span>\n                    </el-menu-item>\n                </template>\n                <!---  \u4E00\u7EA7\u83DC\u5355\u65E0\u5B50\u9879 end  --->\n\n            </template>\n        </el-menu>\n    ",
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = { opendata: [] };
        return data;
    },
    mounted: function () {
    },
    methods: {
        getItem: function (items, id) {
            var _this = this;
            var data = {};
            items.some(function (_item) {
                if (Object.is(id, _item.id)) {
                    Object.assign(data, _item);
                    return true;
                }
                if (_item.items && _item.items.length > 0) {
                    var subItem = _this.getItem(_item.items, id);
                    if (Object.keys(subItem).length > 0) {
                        Object.assign(data, subItem);
                        return true;
                    }
                }
            });
            return data;
        },
        onSelect: function (name) {
            var _this = this;
            var _data = _this.getItem(_this.ctrl.items, name);
            _this.ctrl.selection(_data);
        },
        onOpenChange: function (submenu) {
            console.log(submenu);
        },
    }
});
