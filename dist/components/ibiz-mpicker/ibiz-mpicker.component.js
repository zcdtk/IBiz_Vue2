"use strict";
Vue.component("ibiz-mpicker", {
    template: "\n    <div style=\"position: relative;\">\n        <el-select :value=\"value\" multiple filterable remote :remote-method=\"onSearch\" size=\"small\" style=\"width:100%;\" @change=\"onSelect\" @remove-tag=\"onRemove\" :disabled=\"field.disabled\">\n            <el-option v-for=\"item in items\" :label=\"item.text\" :value=\"item.value\"></el-option>\n        </el-select>\n        <span style=\"position: absolute;right: 5px;color: #c0c4cc;top: 0;font-size: 13px;\">\n            <i class=\"el-icon-search\"  @click=\"openView\"></i>\n        </span>\n    </div>\n    ",
    props: ['field', 'name'],
    data: function () {
        var data = {
            http: new IBizHttp(),
            items: [],
            value: [],
            selectItems: []
        };
        Object.assign(data, this.field.editorParams);
        Object.assign(data, { form: this.field.getForm() });
        return data;
    },
    mounted: function () {
        // this.onSearch('');
    },
    watch: {
        'field.value': function (newVal, oldVal) {
            var _this = this;
            this.value = [];
            this.selectItems = [];
            if (newVal) {
                this.selectItems = JSON.parse(newVal);
                this.selectItems.forEach(function (item) {
                    _this.value.push(item.srfkey);
                    var index = _this.items.findIndex(function (i) { return Object.is(i.value, item.srfkey); });
                    if (index < 0) {
                        _this.items.push({ text: item.srfmajortext, value: item.srfkey });
                    }
                });
            }
        }
    },
    methods: {
        'onSelect': function (selects) {
            var _this = this;
            var val = [];
            selects.forEach(function (select) {
                var index = _this.items.findIndex(function (item) { return Object.is(item.value, select); });
                if (index >= 0) {
                    var item = _this.items[index];
                    val.push({ srfkey: item.value, srfmajortext: item.text });
                }
                else {
                    index = _this.selectItems.findIndex(function (item) { return Object.is(item.srfkey, select); });
                    if (index >= 0) {
                        var item = _this.selectItems[index];
                        val.push(item);
                    }
                }
            });
            if (this.field) {
                var value = val.length > 0 ? JSON.stringify(val) : '';
                this.field.setValue(value);
            }
        },
        'onRemove': function (tag) {
            var index = this.selectItems.findIndex(function (item) { return Object.is(item.value, tag); });
            if (index >= 0) {
                this.selectItems.splice(index, 1);
                var value = this.selectItems.length > 0 ? JSON.stringify(this.selectItems) : '';
                if (this.field) {
                    this.field.setValue(value);
                }
            }
        },
        'onSearch': function (query) {
            var _this = this;
            if (this.url) {
                var param = {
                    srfaction: 'itemfetch',
                    query: query
                };
                if (this.form) {
                    Object.assign(param, { srfreferdata: JSON.stringify(this.form.getActiveData()) });
                }
                this.http.post(this.url, param).subscribe(function (data) {
                    _this.items = data.items;
                });
            }
        },
        'openView': function () {
            var _this = this;
            if (this.field && this.field.disabled) {
                return;
            }
            var view = { viewparam: {} };
            var viewController;
            if (this.form) {
                viewController = this.form.getViewController();
                Object.assign(view.viewparam, {
                    srfreferdata: JSON.stringify(this.form.getActiveData()),
                    selectedData: this.selectItems.slice()
                });
            }
            if (viewController) {
                Object.assign(view.viewparam, viewController.getViewParam());
            }
            if (this.pickupView && Object.keys(this.pickupView).length > 0) {
                var subject = new rxjs.Subject();
                Object.assign(view, this.pickupView, { subject: subject });
                this.$root.addModal(view);
                subject.subscribe(function (result) {
                    if (!result || !Object.is(result.ret, 'OK')) {
                        return;
                    }
                    var selects = [];
                    if (result.selections && Array.isArray(result.selections)) {
                        result.selections.forEach(function (select) {
                            selects.push({ srfkey: select.srfkey, srfmajortext: select.srfmajortext });
                            var index = _this.items.findIndex(function (item) { return Object.is(item.value, select.srfkey); });
                            if (index < 0) {
                                _this.items.push({ text: select.srfmajortext, value: select.srfkey });
                            }
                        });
                    }
                    if (_this.field) {
                        var value = selects.length > 0 ? JSON.stringify(selects) : '';
                        _this.field.setValue(value);
                    }
                });
            }
        }
    }
});
