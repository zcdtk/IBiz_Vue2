"use strict";
Vue.component('ibiz-form-group', {
    template: "\n        <card :bordered=\"false\" :dis-hover=\"true\">\n            <p class=\"\" slot=\"title\"> {{ group.caption }}</p>\n            <row :gutter=\"10\">\n                <slot></slot>\n            </row>\n        </card>\n    ",
    props: ['form', 'group', 'name'],
    data: function () {
        var data = {};
        console.log(this.form);
        console.log(this.group);
        console.log(this.name);
        return data;
    }
});
