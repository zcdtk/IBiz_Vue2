"use strict";
Vue.component('ibiz-picker', {
    template: "\n    <el-autocomplete value-key=\"text\" :disabled=\"field.disabled\" v-model=\"value\" size=\"small\" :fetch-suggestions=\"onSearch\" @select=\"onSelect\" @focus=\"onFocus\">\n        <template slot=\"suffix\">\n            <i class=\"el-icon-search\"  @click=\"openView\"></i>\n        </template>\n    </el-autocomplete>\n    ",
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        var data = {
            http: new IBizHttp(),
            value: ''
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
        onFocus: function () {
            if (this.field && this.value != this.field.value) {
                this.value = this.field.value;
            }
        },
        //  填充条件
        fillPickupCondition: function (arg) {
            if (this.form) {
                if (this.itemParam && this.itemParam.fetchcond) {
                    var fetchparam = {};
                    var fetchCond = this.itemParam.fetchcond;
                    if (fetchCond) {
                        for (var cond in fetchCond) {
                            var field = this.form.findField(fetchCond[cond]);
                            if (!field) {
                                this.iBizNotification.error('操作失败', '未能找到当前表单项' + fetchCond[cond] + '，无法继续操作');
                                return false;
                            }
                            var value = field.getValue();
                            if (!value == null || Object.is(value, '')) {
                                return false;
                            }
                            fetchparam[cond] = value;
                        }
                    }
                    Object.assign(arg, { srffetchcond: JSON.stringify(fetchparam) });
                }
                if (this.itemParam && this.itemParam.temprs) {
                    // if (form.tempMode) {
                    // 	arg.srftempmode = true;
                    // }
                }
                Object.assign(arg, { srfreferitem: this.name });
                Object.assign(arg, { srfreferdata: JSON.stringify(this.form.getActiveData()) });
                return true;
            }
            else {
                this.iBizNotification.error('操作失败', '部件对象异常');
                return false;
            }
        },
        onSearch: function (query, func) {
            if (this.url) {
                var param = {
                    srfaction: 'itemfetch',
                    query: query
                };
                var bcancel = this.fillPickupCondition(param);
                if (!bcancel) {
                    this.$Notice.warning({ title: '异常', desc: '条件不满足' });
                    return;
                }
                this.http.post(this.url, param).subscribe(function (data) {
                    console.log(data);
                    func(data.items);
                });
            }
        },
        onSelect: function (item) {
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
        },
        openView: function () {
            var _this = this;
            if (this.field && this.field.disabled) {
                return;
            }
            var view = { viewparam: {} };
            var viewController;
            if (this.form) {
                viewController = this.form.getViewController();
                var _srfkey = this.form.findField('srfkey');
                if (_srfkey) {
                    Object.assign(view.viewparam, { srfkey: _srfkey.getValue() });
                }
            }
            if (viewController) {
                Object.assign(view.viewparam, viewController.getViewParam());
                // Object.assign(view, { modalZIndex: viewController.modalZIndex });
            }
            var bcancel = this.fillPickupCondition(view.viewparam);
            if (!bcancel) {
                this.iBizNotification.warning('异常', '条件不满足');
                return;
            }
            if (this.pickupView && Object.keys(this.pickupView).length > 0) {
                var subject = new rxjs.Subject();
                Object.assign(view, this.pickupView, { subject: subject });
                this.$root.addModal(view);
                subject.subscribe(function (result) {
                    console.log(result);
                    if (!result || !Object.is(result.ret, 'OK')) {
                        return;
                    }
                    var item = {};
                    if (result.selections && Array.isArray(result.selections)) {
                        Object.assign(item, result.selections[0]);
                    }
                    if (_this.form) {
                        var valueField = _this.form.findField(_this.valueItem);
                        if (valueField) {
                            valueField.setValue(item.srfkey);
                        }
                        var itemField = _this.form.findField(_this.name);
                        if (itemField) {
                            itemField.setValue(item.srfmajortext);
                        }
                    }
                });
            }
        }
    }
});
