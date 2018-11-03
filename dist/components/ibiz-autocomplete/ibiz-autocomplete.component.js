"use strict";
Vue.component("ibiz-autocomplete", {
    template: "\n    <i-select :value=\"value\" :disabled=\"field.disabled\">\n        <Scroll :on-reach-bottom=\"onScollBottom\">\n            <template v-for=\"item of items\">\n                <i-option :value=\"item.value\" :disabled=\"item.disabled\"> {{ item.text }} </i-option>\n            </template>\n        </Scroll>\n    </i-select>\n    ",
    props: ['field', 'name'],
    data: function () {
        var data = {
            value: '',
            items: [],
            limit: 50,
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
        onSearch: function (query) {
            this.startrow = 0;
            this.totalrow = 0;
            this.items = [];
            this.searchText = query;
            this.loadData();
        },
        onScollBottom: function () {
            if (this.totalrow == this.items.length) {
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
                                var index = _this.items.findIndex(function (item) { return Object.is(item.value, data.value); });
                                if (index === -1) {
                                    _this.items.push(data);
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
