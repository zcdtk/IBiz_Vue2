Vue.component('ibiz-form', {
    template: `
        <div>
            <i-form :model="form">
                <row :gutter="10">
                    <slot :form="form" :fields="form.fieldMap"></slot>
                </row>
            </i-form>
        </div>
    `,
    props: ['form'],
    data: function () {
        let data: any = {};
        return data;
    }
});