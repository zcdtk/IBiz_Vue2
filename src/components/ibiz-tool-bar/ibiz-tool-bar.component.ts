Vue.component('ibiz-tool-bar', {
    template: `
        <div class="ibiz-tool-bar">
            <template v-for="item in ctrl.items">
                <template v-if="item.items && item.items.length > 0">
                    <template v-for="item1 in item.items">
                        <Button type="info">{{item1.caption}}</Button>
                    </template>
                </template>
                <template v-else>
                    <Button type="info">{{item.caption}}</Button>
                </template>
            </template>
        </div>
    `,
    props: ['ctrl', 'viewController'],
    data: function () {
        var data = {};
        return data;
    },
    mounted:function() {
        console.log(this.ctrl);
    }
});