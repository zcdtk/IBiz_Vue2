Vue.component('ibiz-form-group', {
    template: `
        <card :bordered="false" :dis-hover="true">
            <p class="" slot="title">产品基本信息</p>
            <row :gutter="10">
                <slot :form="form" :fields="form.fieldMap"></slot>
            </row>
        </card>
    `,
    props: ['form', 'group'],
    data: function () {
        let data: any = {};
        return data;
    }
});