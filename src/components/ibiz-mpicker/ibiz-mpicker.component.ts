Vue.component("ibiz-mpicker", {
    template: `
    <div style="position: relative;">
        <el-select :value="value" multiple filterable remote :remote-method="onSearch" size="small" style="width:100%;" @change="onSelect" @remove-tag="onRemove" :disabled="field.disabled">
            <el-option v-for="item in items" :label="item.text" :value="item.value"></el-option>
        </el-select>
        <span style="position: absolute;right: 5px;color: #c0c4cc;top: 0;font-size: 13px;">
            <i class="el-icon-search"  @click="openView"></i>
        </span>
    </div>
    `,
    props: ['field', 'name'],
    data: function(){
        let data: any = {
            http: new IBizHttp(),
            items: [],
            value: [],
            selectItems: []
        };
        Object.assign(data, this.field.editorParams);
        Object.assign(data, { form: this.field.getForm() })
        return data;
    },
    mounted: function() {
        // this.onSearch('');
    },
    watch: {
        'field.value': function(newVal, oldVal) {
            this.value = [];
            this.selectItems = [];
            if(newVal) {
                this.selectItems = JSON.parse(newVal);
                this.selectItems.forEach(item => {
                    this.value.push(item.srfkey);
                    let index = this.items.findIndex((i) => Object.is(i.value, item.srfkey));
                    if(index < 0) {
                        this.items.push({text: item.srfmajortext, value:item.srfkey})
                    }
                });
            }
        }
    },
    methods: {
        'onSelect': function(selects) {
            let val: Array<any> = [];
            selects.forEach(select => {
                let index = this.items.findIndex((item) => Object.is(item.value, select));
                if(index >= 0) {
                    let item = this.items[index];
                    val.push({srfkey: item.value, srfmajortext: item.text});
                } else {
                    index = this.selectItems.findIndex((item) => Object.is(item.srfkey, select));
                    if(index >= 0) {
                        let item = this.selectItems[index];
                        val.push(item);
                    }
                }
            });
            if(this.field) {
                let value = val.length > 0 ? JSON.stringify(val) : '';
                this.field.setValue(value);
            }
        },
        'onRemove': function(tag) {
            let index = this.selectItems.findIndex((item) => Object.is(item.value, tag));
            if(index >= 0) {
                this.selectItems.splice(index, 1);
                let value = this.selectItems.length > 0 ? JSON.stringify(this.selectItems) : '';
                if(this.field) {
                    this.field.setValue(value);
                }
            }
        },
        'onSearch': function(query) {
            if(this.url) {
                let param: any = {
                    srfaction: 'itemfetch',
                    query: query
                };
                this.http.post(this.url, param).subscribe((data) => {
                    this.items = data.items;
                })
            }
        },
        'openView': function() {
            if(this.field && this.field.disabled) {
                return;
            }
            let view = { viewparam: {} };
            let viewController: any;
            if (this.form) {
                viewController = this.form.getViewController();
                Object.assign(view.viewparam, {
                    srfreferdata: JSON.stringify(this.form.getActiveData()),
                    selectedData: [...this.selectItems]
                });
            }

            if (viewController) {
                Object.assign(view.viewparam, viewController.getViewParam());
            }

            if (this.pickupView && Object.keys(this.pickupView).length > 0) {
                const subject: Subject<any> = new rxjs.Subject();
                Object.assign(view, this.pickupView, { subject: subject });
                this.$root.addModal(view);
                subject.subscribe((result: any) => {
                    if (!result || !Object.is(result.ret, 'OK')) {
                        return;
                    }
                    let selects: Array<any> = [];
                    if (result.selections && Array.isArray(result.selections)) {
                        result.selections.forEach(select => {
                            selects.push({srfkey: select.srfkey, srfmajortext: select.srfmajortext});
                            let index = this.items.findIndex((item) => Object.is(item.value, select.srfkey));
                            if(index < 0) {
                                this.items.push({text: select.srfmajortext, value: select.srfkey});
                            }
                        });
                    }
                    if(this.field) {
                        let value = selects.length > 0 ? JSON.stringify(selects) : '';
                        this.field.setValue(value);
                    }
                })
            }
        }
    }
})