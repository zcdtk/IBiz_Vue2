"use strict";
Vue.component('ibiz-modal', {
    template: "\n        <modal :width=\"width\" v-model=\"isShow\" @on-close=\"close\" :title=\"title\">\n            <component :is=\"viewname\" :params=\"params.params\" @close=\"close\"></component>\n        </modal>\n    ",
    props: ['params'],
    data: function () {
        var data = { isShow: true };
        return data;
    },
    mounted: function () {
        this.viewname = this.params.viewname;
        // if (this.params.subject) {
        //     this.callback = this.params.callback;
        // }
        if (this.params.width) {
            this.width = this.params.width;
        }
        if (this.params.title) {
            this.title = this.params.title;
        }
    },
    methods: {
        'close': function (result) {
            this.$emit("on-close", this.index);
            if (this.callback) {
                this.callback(result);
            }
        }
    }
});
