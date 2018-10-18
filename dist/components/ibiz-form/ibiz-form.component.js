"use strict";
Vue.component('ibiz-form', {
    template: "\n        <div>\n            <i-form :model=\"form\">\n                <row :gutter=\"10\">\n                    <slot :form=\"form\" :fields=\"form.fieldMap\"></slot>\n                </row>\n            </i-form>\n        </div>\n    ",
    props: ['form'],
    data: function () {
        var data = {};
        return data;
    }
});
