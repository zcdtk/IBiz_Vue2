"use strict";
Vue.component('ibiz-picker', {
    template: "\n    <i-input style=\"width: 100%;\" :icon=\"'ios-search'\" v-model=\"field.value\" :disabled=\"field.disabled\" @on-click=\"openView\">\n    </i-input>\n    ",
    props: ['field', 'name', 'modalviewname'],
    data: function () {
        var data = {};
        Object.assign(data, this.field.editorParams);
        Object.assign(data, { form: this.field.getForm() });
        return data;
    },
    mounted: function () {
    },
    methods: {
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
        openView: function () {
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
                subject.subscribe(function (selections) {
                    console.log(selections);
                });
            }
        }
    }
});
