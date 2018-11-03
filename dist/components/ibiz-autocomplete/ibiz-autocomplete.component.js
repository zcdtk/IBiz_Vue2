"use strict";
Vue.component("ibiz-autocomplete", {
    template: "\n    <el-select remote :remote-method=\"onSearch\" @change=\"onSelect\" popper-class=\"ibiz-autocomplete\" :value=\"value\" size=\"small\" filterable :disabled=\"field.disabled\" style=\"width:100%;\" clearable>\n        <Scroll :on-reach-bottom=\"onScollBottom\" height=\"150\">\n            <el-option v-for=\"(item, index) of options\" :value=\"item.value\" :label=\"item.text\" :disabled=\"item.disabled\"></el-option>\n        </Scroll>\n    </el-select>\n    ",
    props: ['field', 'name'],
    data: function () {
        var data = {
            http: new IBizHttp(),
            value: '',
            options: [],
            limit: 5,
            startrow: 0,
            totalrow: 0,
            searchText: ''
        };
        Object.assign(data, this.field.editorParams);
        Object.assign(data, { form: this.field.getForm() });
        return data;
    },
    mounted: function () {
    },
    watch: {
        'field.value': function (newVal, oldVal) {
            this.value = newVal;
        }
    },
    methods: {
        onSelect: function (value) {
            var index = this.options.findIndex(function (item) { return Object.is(item.value, value); });
            if (index >= 0) {
                var item = this.options[index];
                if (this.form) {
                    var valueField = this.form.findField(this.valueItem);
                    if (valueField) {
                        valueField.setValue(item.value);
                    }
                    var itemField = this.form.findField(this.name);
                    if (itemField) {
                        itemField.setValue(item.text);
                    }
                }
            }
        },
        onSearch: function (query) {
            var _this = this;
            _this.startrow = 0;
            _this.totalrow = 0;
            _this.options = [];
            _this.searchText = query;
            if (_this.url) {
                var param = {
                    srfaction: 'itemfetch',
                    query: _this.searchText,
                    start: _this.startrow,
                    limit: _this.limit
                };
                if (_this.form) {
                    Object.assign(param, { srfreferdata: JSON.stringify(_this.form.getActiveData()) });
                }
                _this.http.post(_this.url, param).subscribe(function (response) {
                    if (response.ret == 0) {
                        response.items.forEach(function (data) {
                            var index = _this.options.findIndex(function (item) { return Object.is(item.value, data.value); });
                            if (index === -1) {
                                _this.options.push(data);
                            }
                        });
                        _this.totalrow = response.totalrow;
                    }
                });
            }
        },
        onScollBottom: function () {
            if (this.totalrow == this.options.length) {
                return;
            }
            this.startrow += this.limit;
            return this.loadData();
        },
        loadData: function () {
            var _this = this;
            return new Promise(function (resolve) {
                if (_this.url) {
                    var param = {
                        srfaction: 'itemfetch',
                        query: _this.searchText,
                        start: _this.startrow,
                        limit: _this.limit
                    };
                    if (_this.form) {
                        Object.assign(param, { srfreferdata: JSON.stringify(_this.form.getActiveData()) });
                    }
                    _this.http.post(_this.url, param).subscribe(function (response) {
                        if (response.ret == 0) {
                            response.items.forEach(function (data) {
                                var index = _this.options.findIndex(function (item) { return Object.is(item.value, data.value); });
                                if (index === -1) {
                                    _this.options.push(data);
                                }
                            });
                            _this.totalrow = response.totalrow;
                        }
                        resolve();
                    }, function (error) {
                        resolve();
                    });
                }
            });
        }
    }
});
