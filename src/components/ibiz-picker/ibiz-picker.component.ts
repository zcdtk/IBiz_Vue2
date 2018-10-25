Vue.component('ibiz-picker', {
    template: `
    <i-input placeholder="Enter text" style="width: auto">
        <icon type="ios-search" slot="suffix" />
    </i-input>
    `,
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        let data: any = {};
        return data;
    },
    mounted: function () {
        
    },
    methods: {
        onSelect(name) {
            console.log('1231231231');
        }
    }
});