Vue.component("ibiz-autocomplete", {
    template: `
    <el-select remote :remote-method="onSearch" @change="onSelect" popper-class="ibiz-autocomplete" :value="value" size="small" filterable :disabled="field.disabled" style="width:100%;" clearable>
        <Scroll :on-reach-bottom="onScollBottom" height="150">
            <el-option v-for="(item, index) of options" :value="item.value" :label="item.text" :disabled="item.disabled"></el-option>
        </Scroll>
    </el-select>
    `,
    props: ['field', 'name'],
    data: function() {
        let data: any = {
            http: new IBizHttp(),
            value: '',
            options: [],
            limit: 5,
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
        onSelect: function(value) {
            let index = this.options.findIndex((item) => Object.is(item.value, value));
            if(index >= 0) {
                const item = this.options[index];
                if (this.form) {
                    let valueField = this.form.findField(this.valueItem);
                    if (valueField) {
                        valueField.setValue(item.value);
                    }
                    let itemField = this.form.findField(this.name);
                    if (itemField) {
                        itemField.setValue(item.text);
                    }
                }
            }
        },
        onSearch: function(query) {
            const _this = this;
            _this.startrow = 0;
            _this.totalrow = 0;
            _this.options = [];
            _this.searchText = query;
            if(_this.url) {
                let param: any = {
                    srfaction: 'itemfetch',
                    query: _this.searchText,
                    start: _this.startrow,
                    limit: _this.limit
                };
                if (_this.form) {
                    Object.assign(param, {srfreferdata: JSON.stringify(_this.form.getActiveData())});
                }
                _this.http.post(_this.url, param).subscribe((response) => {
                    if(response.ret == 0) {
                        response.items.forEach(data => {
                            const index:number = _this.options.findIndex(item => Object.is(item.value, data.value));
                            if (index === -1) {
                                _this.options.push(data);
                            }
                        });
                        _this.totalrow = response.totalrow;
                    }
                });
            }
        },
        onScollBottom: function() {
            if(this.totalrow == this.options.length) {
                return;
            }
            this.startrow += this.limit;
            return this.loadData();
        },
        loadData: function() {
            const _this = this;
            return new Promise(resolve => {
                if(_this.url) {
                    let param: any = {
                        srfaction: 'itemfetch',
                        query: _this.searchText,
                        start: _this.startrow,
                        limit: _this.limit
                    };
                    if (_this.form) {
                        Object.assign(param, {srfreferdata: JSON.stringify(_this.form.getActiveData())});
                    }
                    _this.http.post(_this.url, param).subscribe((response) => {
                        if(response.ret == 0) {
                            response.items.forEach(data => {
                                const index:number = _this.options.findIndex(item => Object.is(item.value, data.value));
                                if (index === -1) {
                                    _this.options.push(data);
                                }
                            });
                            _this.totalrow = response.totalrow;
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