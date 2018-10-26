"use strict";
Vue.component('ibiz-picker', {
    template: "\n        <i-input search icon=\"ios-search\" v-model=\"field.value\" \n        :disabled=\"field.disabled\" @on-search=\"onSearch\"></i-input>\n    ",
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        var data = {};
        return data;
    },
    mounted: function () {
    },
    methods: {
        onSearch: function () {
            console.log();
            var data = {
                height: 0,
                layout: "fit",
                maximizable: true,
                modal: true,
                modalviewname: "org-pickup-view_modalview",
                openMode: "POPUPMODAL",
                title: "产品编辑视图（vue)",
                viewname: "product-edit-view-vue",
                viewparam: {},
                viewurl: "/pages/common/product-edit-view-vue/product-edit-view-vue.html#/product-edit-view-vue",
                width: 0
            };
            this.$root.addModal(data);
        },
    }
});
