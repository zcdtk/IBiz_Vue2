"use strict";
Vue.component('ibiz-modal', {
    template: "\n        <modal :width=\"width\" @on-close=\"close\" :title=\"title\" :footer-hide=\"true\" :mask-closable=\"false\">\n            <component :is=\"modalviewname\" :params=\"viewparam\" :viewType=\"modalview\" @close=\"close\"></component>\n        </modal>\n    ",
    props: ['params'],
    data: function () {
        var data = {
            width: 0,
            title: '',
            modalviewname: '',
            subject: null,
            viewparam: {}
        };
        var width = 600;
        if (window && window.innerWidth > 100) {
            if (window.innerWidth > 100) {
                width = window.innerWidth - 100;
            }
            else {
                width = window.innerWidth;
            }
        }
        Object.assign(data, { width: width });
        return data;
    },
    mounted: function () {
        this.modalviewname = this.params.modalviewname;
        if (this.params.subject) {
            this.subject = this.params.subject;
        }
        if (this.params.width && this.params.width !== 0) {
            this.width = this.params.width;
        }
        if (this.params.title) {
            this.title = this.params.title;
        }
        if (this.params.viewparam) {
            Object.assign(this.viewparam, this.params.viewparam);
        }
    },
    methods: {
        'close': function (result) {
            this.$emit("on-close", this.index);
            console.log(result);
            // if (this.callback) {
            //     this.callback(result)
            // }
        }
    }
});
