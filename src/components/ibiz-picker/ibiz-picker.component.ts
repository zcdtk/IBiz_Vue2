Vue.component('ibiz-picker', {
    template: `
        <i-input search icon="ios-search" v-model="field.value" 
        :disabled="field.disabled" @on-search="onSearch"></i-input>
    `,
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        let data: any = {};
        return data;
    },
    mounted: function () {
        
    },
    methods: {
        onSearch(){
            console.log();
            let data = {
                height: 0,
                layout: "fit",
                maximizable: true,
                modal: true,
                modalviewname: "org-pickup-view_modalview",
                openMode: "POPUPMODAL",
                title: "产品编辑视图（vue)",
                viewname: "product-edit-view-vue",
                viewparam: {  },
                viewurl: "/pages/common/product-edit-view-vue/product-edit-view-vue.html#/product-edit-view-vue",
                width: 0
            };
            this.$root.addModal(data);
        },
    }
});