"use strict";
Vue.component("ibiz-check-list", {
    template: "\n    <CheckboxGroup v-model=\"selects\" @on-change=\"onSelectChange\">\n        <template v-for=\"(item, index) of field.config\">\n            <Checkbox :label=\"item.value\" :disabled=\"field.disabled || item.disabled\">{{ item.text }}</Checkbox>\n        </template>\n    </CheckboxGroup>\n    ",
    props: ['field', 'name', 'mode', 'separator'],
    data: function () {
        var data = {
            selects: []
        };
        return data;
    },
    mounted: function () {
    },
    watch: {
        'field.value': function (newVal, oldVal) {
            var _this = this;
            if (!this.mode) {
                this.mode = 'str';
            }
            if (!this.separator) {
                this.separator = ';';
            }
            if (Object.is(this.mode, 'num') && this.field) {
                this.selects = [];
                var num_1 = parseInt(newVal, 10);
                this.field.config.forEach(function (item) {
                    if ((num_1 & item.value) == item.value) {
                        _this.selects.push(item.value);
                    }
                });
            }
            else if (Object.is(this.mode, 'str')) {
                this.selects = newVal.split(this.separator);
            }
        }
    },
    methods: {
        'onSelectChange': function (select) {
            if (!this.mode) {
                this.mode = 'str';
            }
            if (!this.separator) {
                this.separator = ';';
            }
            var value = '';
            if (Object.is(this.mode, 'num')) {
                var temp_1 = 0;
                select.forEach(function (item) {
                    temp_1 = temp_1 | parseInt(item, 10);
                });
                value = temp_1 !== 0 ? temp_1.toString() : '';
            }
            else if (Object.is(this.mode, 'str')) {
                value = select.join(this.separator);
            }
            if (this.field) {
                this.field.setValue(value);
            }
        }
    },
});
