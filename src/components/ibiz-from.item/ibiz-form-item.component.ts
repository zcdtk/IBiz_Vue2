Vue.component('ibiz-form-item', {
    template: `
        <div>
            <form-item class="ivu-form-label-left" :label-width="130" :required="!item.allowEmpty">
                <span slot="label" class="">{{ item.caption }}</span>
                <slot></slot>
            </form-item>
        </div>
    `,
    props: ['form', 'item', 'name'],
    data: function () {
        let data: any = {};
        return data;
    }
});