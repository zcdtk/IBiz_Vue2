Vue.component('ibiz-form-item', {
    template: `
        <form-item class="ivu-form-label-left" :label-width="130" :required="!field.allowEmpty">
            <span slot="label" class="">{{ field.caption }}</span>
            <slot></slot>
        </form-item>
    `,
    props: ['form', 'field', 'name'],
    data: function () {
        let data: any = {};
        data.name = this.field;
        return data;
    }
});