"use strict";
Vue.component('ibiz-form', {
    template: "\n        <div>\n            <i-form :model=\"form\">\n                <row :gutter=\"10\">\n                    <slot :scope=\"fields\"></slot>\n                </row>\n            </i-form>\n        </div>\n    ",
    props: ['form'],
    data: function () {
        var data = {};
        Object.assign(data, { fields: this.form.fieldMap });
        return data;
    }
});
