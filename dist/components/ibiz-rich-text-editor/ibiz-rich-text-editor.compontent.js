"use strict";
Vue.component("ibiz-rich-text-editor", {
    template: "\n    <textarea :id=\"name\"></textarea>\n    ",
    props: ['field', 'name'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
        tinymce.init({
            selector: '#' + this.name,
            language: 'zh_cn'
        });
    },
    watch: {},
    methods: {}
});
