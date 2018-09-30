Vue.component('ibiz-tool-bar', {
    template: `
        <div class="ibiz-tool-bar">
            <template v-for="item in ctrl.items">
                <template v-if="item.items && item.items.length > 0">
                    <Dropdown>
                        <Button type="primary">
                            <span>{{item.caption}}</span>
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <template v-for="(item1, index1) in item.items">
                                <DropdownItem :divided="index1 > 0 ? true:false">
                                    <span>{{item1.caption}}</span>
                                </DropdownItem>
                            </template>
                        </DropdownMenu>
                    </Dropdown>
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