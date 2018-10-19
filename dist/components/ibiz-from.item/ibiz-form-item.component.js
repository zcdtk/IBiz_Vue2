"use strict";
Vue.component('ibiz-form-item', {
    template: "\n        <div>\n            <form-item class=\"ivu-form-label-left\" :label-width=\"130\" :required=\"!item.allowEmpty\">\n                <span slot=\"label\" class=\"\">{{ item.caption }}</span>\n                <slot></slot>\n            </form-item>\n        </div>\n    ",
    props: ['form', 'item', 'name'],
    data: function () {
        var data = {};
        return data;
    }
});
