Vue.component('ibiz-picker', {
    template: `
    <div class="ibiz-picker">
        <el-autocomplete v-if="editorType != 'dropdown' && editorType != 'pickup-no-ac'" value-key="text" :disabled="field.disabled" v-model="value" size="small" :fetch-suggestions="onSearch" @select="onACSelect" @blur="onBlur" style="width:100%;">
            <template slot="suffix">
                <i v-if="editorType != 'ac'" class="el-icon-search"  @click="openView"></i>
            </template>
        </el-autocomplete>
        <el-input :value="value" v-if="editorType == 'pickup-no-ac'" readonly size="small" :disabled="field.disabled">
            <template slot="suffix">
                <i class="el-icon-search"  @click="openView"></i>
            </template>
        </el-input>
        <el-select v-if="editorType == 'dropdown'" remote :remote-method="onSearch" :value="value" size="small" filterable @change="onSelect" :disabled="field.disabled" style="width:100%;" clearable @clear="onClear" @visible-change="onSelectOpen">
            <el-option v-for="(item, index) of items" :value="item.value" :label="item.text" :disabled="item.disabled"></el-option>
        </el-select>
        <span v-if="editorType == 'dropdown'" style="position: absolute;right: 5px;color: #c0c4cc;top: 0;font-size: 13px;">
            <i v-if="!open" class="el-icon-arrow-down"></i>
            <i v-if="open" class="el-icon-arrow-up"></i>
        </span>
    </div>
    `,
    props: ['field', 'name', 'modalviewname', 'editorType'],
    data: function () {
        let data: any = {
            http: new IBizHttp(),
            value: '',
            open: false,
            items: []
        };
        Object.assign(data, this.field.editorParams);
        Object.assign(data, { form: this.field.getForm() })
        return data;
    },
    mounted: function () {
        if(this.editorType == 'dropdown') {
            this.onSearch('');
        }
    },
    watch: {
        'field.value': function(newVal, oldVal) {
            this.value = newVal;
        }
    },
    methods: {
        onSelectOpen(flag) {
            this.open = flag;
        },
        onBlur() {
            if(this.field && this.value != this.field.value) {
                if(this.forceSelection) {
                    this.value = this.field.value;
                } else {
                    this.onACSelect({text: this.value, value: ''})
                }
            }
        },
        //  填充条件
        fillPickupCondition(arg: any): boolean {
            if (this.form) {
                if (this.itemParam && this.itemParam.fetchcond) {
                    let fetchparam = {};
                    let fetchCond = this.itemParam.fetchcond;
                    if (fetchCond) {
                        for (let cond in fetchCond) {
                            let field = this.form.findField(fetchCond[cond]);
                            if (!field) {
                                this.iBizNotification.error('操作失败', '未能找到当前表单项' + fetchCond[cond] + '，无法继续操作');
                                return false;
                            }
                            let value = field.getValue();
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
            } else {
                this.iBizNotification.error('操作失败', '部件对象异常');
                return false;
            }
        },
        onSearch(query, func) {
            if(this.url) {
                let param: any = {
                    srfaction: 'itemfetch',
                    query: query
                };
                let bcancel = this.fillPickupCondition(param);
                if (!bcancel) {
                    this.$Notice.warning({title: '异常', desc: '条件不满足'});
                    return;
                }
                this.http.post(this.url, param).subscribe((data) => {
                    this.items = data.items;
                    if(typeof func == 'function') {
                        func(data.items);
                    }
                })
            }
        },
        onSelect(value) {
            let index = this.items.findIndex((item) => Object.is(item.value, value));
            if(index >= 0) {
                const item = this.items[index];
                this.onACSelect(item);
            }
        },
        onClear() {
            if (this.form) {
                let valueField = this.form.findField(this.valueItem);
                if (valueField) {
                    valueField.setValue('');
                }
                let itemField = this.form.findField(this.name);
                if (itemField) {
                    itemField.setValue('');
                }
            }
        },
        onACSelect(item) {
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
        },
        openView() {
            if(this.field && this.field.disabled) {
                return;
            }
            let view = { viewparam: {} };

            let viewController: any;
            if (this.form) {
                viewController = this.form.getViewController();
                let _srfkey = this.form.findField('srfkey');
                if (_srfkey) {
                    Object.assign(view.viewparam, { srfkey: _srfkey.getValue() });
                }
            }

            if (viewController) {
                Object.assign(view.viewparam, viewController.getViewParam());
                // Object.assign(view, { modalZIndex: viewController.modalZIndex });
            }

            const bcancel: boolean = this.fillPickupCondition(view.viewparam);
            if (!bcancel) {
                this.iBizNotification.warning('异常', '条件不满足');
                return;
            }

            if (this.pickupView && Object.keys(this.pickupView).length > 0) {
                const subject: Subject<any> = new rxjs.Subject();
                Object.assign(view, this.pickupView, { subject: subject });
                this.$root.addModal(view);
                subject.subscribe((result: any) => {
                    console.log(result);
                    if (!result || !Object.is(result.ret, 'OK')) {
                        return;
                    }
                    let item: any = {};
                    if (result.selections && Array.isArray(result.selections)) {
                        Object.assign(item, result.selections[0]);
                    }

                    if (this.form) {
                        let valueField = this.form.findField(this.valueItem);
                        if (valueField) {
                            valueField.setValue(item.srfkey);
                        }
                        let itemField = this.form.findField(this.name);
                        if (itemField) {
                            itemField.setValue(item.srfmajortext);
                        }
                    }
                })
            }
        }
    }
});