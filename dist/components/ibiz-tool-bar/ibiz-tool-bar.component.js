"use strict";
Vue.component('ibiz-tool-bar', {
    template: "\n        <div class=\"ibiz-tool-bar\">\n            <template v-for=\"item in ctrl.items\">\n                <template v-if=\"item.items && item.items.length > 0\">\n                    <Dropdown>\n                        <Button type=\"primary\">\n                            <span>{{item.caption}}</span>\n                            <Icon type=\"ios-arrow-down\"></Icon>\n                        </Button>\n                        <DropdownMenu slot=\"list\">\n                            <template v-for=\"(item1, index1) in item.items\">\n                                <DropdownItem :divided=\"index1 > 0 ? true:false\">\n                                    <span>{{item1.caption}}</span>\n                                </DropdownItem>\n                            </template>\n                        </DropdownMenu>\n                    </Dropdown>\n                </template>\n                <template v-else>\n                    <Button type=\"info\">{{item.caption}}</Button>\n                </template>\n            </template>\n        </div>\n    ",
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
        console.log(this.ctrl);
    }
});
