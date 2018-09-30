"use strict";
Vue.component('ibiz-tool-bar', {
    template: "\n        <div class=\"ibiz-tool-bar\">\n            <template v-for=\"item in ctrl.items\">\n                <template v-if=\"item.items && item.items.length > 0\">\n                    <template v-for=\"item1 in item.items\">\n                        <Button type=\"info\">{{item1.caption}}</Button>\n                    </template>\n                </template>\n                <template v-else>\n                    <Button type=\"info\">{{item.caption}}</Button>\n                </template>\n            </template>\n        </div>\n    ",
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
        console.log(this.ctrl);
    }
});
