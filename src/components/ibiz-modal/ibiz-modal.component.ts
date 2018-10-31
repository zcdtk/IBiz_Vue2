Vue.component('ibiz-modal', {
    template: `
        <modal v-model="showmodal" @on-visible-change="onVisibleChange($event)" :title="title" :footer-hide="true" :mask-closable="false" :width="width">
            <component v-if="showmodal" :is="modalviewname" :params="viewparam" :viewType="'modalview'" @close="close" @dataChange="dataChange"></component>
        </modal>
    `,
    props: ['key', 'params', 'index'],
    data: function () {
        let data: any = {
            showmodal: true,
            width: 0,
            title: '',
            modalviewname: '',
            subject: null,
            viewparam: {},
            _result: {}
        };

        let width = 600;
        if (window && window.innerWidth > 100) {
            if (window.innerWidth > 100) {
                width = window.innerWidth - 100;
            } else {
                width = window.innerWidth;
            }
        }

        Object.assign(data, { width: width })
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
        close: function (result) {
            console.log(result);
            if (this.subject) {
                if (result && Object.is(result.ret, 'OK')) {
                    this.subject.next(result);
                } else {
                    this.subject.unsubscribe();
                }
            }

            this.showmodal = false;
            // this.$emit("on-close", this.index)
        },
        dataChange: function (result) {
            console.log(result);
            this._result = {};
            if (result) {
                Object.assign(this._result, result);
            }
        },
        onVisibleChange: function ($event) {
            console.log($event);
            if ($event) {
                return;
            }

            if (this.subject) {
                if (this._result && Object.is(this._result.ret, 'OK')) {
                    this.subject.next(this._result);
                } else {
                    this.subject.unsubscribe();
                }
            }
        }
    }
});