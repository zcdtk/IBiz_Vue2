"use strict";
Vue.component('ibiz-modal', {
    template: "\n        <modal :width=\"width\" v-model=\"isShow\" @on-close=\"close\" :title=\"title\">\n            <component :is=\"modalviewname\" :params=\"viewparam\" @close=\"close\"></component>\n        </modal>\n    ",
    props: ['params'],
    data: function () {
        var data = {
            isShow: true,
            width: 'calc(100% - 40px)',
            title: '',
            modalviewname: '',
            subject: null,
            viewparam: {}
        };
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
