Vue.component('ibiz-modal', {
    template: `
        <modal :width="width" v-model="isShow" @on-close="close" :title="title">
            <component :is="viewname" :params="params.params" @close="close"></component>
        </modal>
    `,
    props: ['params'],
    data: function () {
        let data: any = { isShow: true };
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
            this.$emit("on-close", this.index)
            if (this.callback) {
                this.callback(result)
            }
        }
    }
});