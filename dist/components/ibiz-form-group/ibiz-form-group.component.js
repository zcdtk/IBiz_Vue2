"use strict";
Vue.component('ibiz-form-group', {
    template: "\n        <card :bordered=\"false\" :dis-hover=\"true\">\n            <p class=\"\" slot=\"title\">\u4EA7\u54C1\u57FA\u672C\u4FE1\u606F</p>\n            <row :gutter=\"10\">\n                <slot :form=\"form\" :fields=\"form.fieldMap\"></slot>\n            </row>\n        </card>\n    ",
    props: ['form', 'group'],
    data: function () {
        var data = {};
        return data;
    }
});
