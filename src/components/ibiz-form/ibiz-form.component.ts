Vue.component('ibiz-form', {
    template: `
        <div>
            <i-form :model="form">
                <row :gutter="10">
                    <slot :scope="fields"></slot>
                </row>
            </i-form>
        </div>
    `,
    props: ['form'],
    data: function () {
        let data: any = { fields: this.form.fields };
        return data;
    }
});