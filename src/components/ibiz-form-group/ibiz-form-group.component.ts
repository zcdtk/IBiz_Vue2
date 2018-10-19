Vue.component('ibiz-form-group', {
    template: `
        <card :bordered="false" :dis-hover="true">
            <p class="" slot="title"> {{ group.caption }}</p>
            <row :gutter="10">
                <slot></slot>
            </row>
        </card>
    `,
    props: ['form', 'group' , 'name'],
    data: function () {
        let data: any = {};
        console.log(this.form);
        console.log(this.group);
        console.log(this.name);
        return data;
    }
});