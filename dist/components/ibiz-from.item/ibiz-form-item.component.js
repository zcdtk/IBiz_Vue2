"use strict";
Vue.component('ibiz-form-item', {
    template: "\n        <form-item class=\"ivu-form-label-left\" :label-width=\"130\" :required=\"!field.allowEmpty\">\n            <span slot=\"label\" class=\"\">{{ field.caption }}</span>\n            <slot></slot>\n        </form-item>\n    ",
    props: ['form', 'field', 'name'],
    data: function () {
        var data = {};
        data.name = this.field;
        return data;
    }
});
