Vue.component('ibiz-picker', {
    template: `
    <i-input style="width: 100%;" :icon="'ios-search'" v-model="field.value" :disabled="field.disabled" @on-click="onClick">
    </i-input>
    `,
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        let data: any = {};
        Object.assign(data, this.field.editorParams);
        return data;
    },
    mounted: function () {
    },
    methods: {
        onClick() {
            let viewParams = {};
            if (this.pickupView && Object.keys(this.pickupView).length > 0) {
                const subject: Subject<any> = new rxjs.Subject();
                Object.assign(viewParams, this.pickupView, { subject: subject });
                this.$root.addModal(viewParams);
                subject.subscribe((selections: Array<any>) => {
                    console.log(selections);
                })
            }
        }
    }
});