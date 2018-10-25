"use strict";
Vue.component('ibiz-picker', {
    template: "\n    <i-input placeholder=\"Enter text\" style=\"width: auto\">\n        <icon type=\"ios-search\" slot=\"suffix\" />\n    </i-input>\n    ",
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
    },
    methods: {
        onSelect: function (name) {
            console.log('1231231231');
        }
    }
});
