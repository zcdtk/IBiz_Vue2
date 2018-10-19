Vue.component('ibiz-form-group', {
    template: `
        <div>
            <template v-if="group.showCaption">
                <card :bordered="false" :dis-hover="true">
                    <p class="" slot="title"> {{ group.caption }}</p>
                    <row :gutter="10">
                        <slot></slot>
                    </row>
                </card>
            </template>
            <template v-else>
                <row :gutter="10">
                    <slot></slot>
                </row>
            </template>
        </div>
    `,
    props: ['form', 'group', 'name'],
    data: function () {
        let data: any = { };
        console.log(this.form);
        console.log(this.group);
        console.log(this.name);
        return data;
    }
});