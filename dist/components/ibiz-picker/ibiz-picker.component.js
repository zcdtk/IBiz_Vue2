"use strict";
Vue.component('ibiz-picker', {
    template: "\n        <i-input search icon=\"ios-search\" v-model=\"field.value\" \n        :disabled=\"field.disabled\" @on-search=\"onSearch\"></i-input>\n    ",
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        var data = {};
        Object.assign(data, this.field.editorParams);
        return data;
    },
    mounted: function () {
    },
    methods: {
        onSearch: function () {
            var viewParams = {};
            if (this.pickupView && Object.keys(this.pickupView).length > 0) {
                var subject = new rxjs.Subject();
                Object.assign(viewParams, this.pickupView, { subject: subject });
                this.$root.addModal(viewParams);
                subject.subscribe(function (selections) {
                    console.log(selections);
                });
            }
        },
    }
});
