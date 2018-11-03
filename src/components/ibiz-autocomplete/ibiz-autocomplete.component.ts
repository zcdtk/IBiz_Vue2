Vue.component("ibiz-autocomplete", {
    template: `
    <i-select :value="value" :disabled="field.disabled">
        <Scroll :on-reach-bottom="onScollBottom">
            <template v-for="item of items">
                <i-option :value="item.value" :disabled="item.disabled"> {{ item.text }} </i-option>
            </template>
        </Scroll>
    </i-select>
    `,
    props: ['field', 'name'],
    data: function() {
        let data: any = {
            value: '',
            items: [],
            limit: 50,
            startrow: 0,
            totalrow: 0,
            searchText: ''
        };
        Object.assign(data, this.field.editorParams);
        Object.assign(data, { form: this.field.getForm() })
        return data;
    },
    mounted: function() {

    },
    watch: {
        'field.value': function(newVal, oldVal) {
            this.value = newVal;
        }
    },
    methods: {
        onSearch: function(query) {
            this.startrow = 0;
            this.totalrow = 0;
            this.items = [];
            this.searchText = query;
            this.loadData();
        },
        onScollBottom: function() {
            if(this.totalrow == this.items.length) {
                return;
            }
            this.startrow += this.limit;
            return this.loadData();
        },
        loadData: function() {
            return new Promise(resolve => {
                if(this.url) {
                    let param: any = {
                        srfaction: 'itemfetch',
                        query: this.searchText,
                        start: this.startrow,
                        limit: this.limit
                    };
                    if (this.form) {
                        Object.assign(param, {srfreferdata: JSON.stringify(this.form.getActiveData())});
                    }
                    this.http.post(this.url, param).subscribe((response) => {
                        if(response.ret == 0) {
                            response.items.forEach(data => {
                                const index:number = this.items.findIndex(item => Object.is(item.value, data.value));
                                if (index === -1) {
                                    this.items.push(data);
                                }
                            });
                            this.totalrow = response.totalrow;
                        }
                        resolve();
                    }, error => {
                        resolve();
                    });
                }
            });
        }
    }
});