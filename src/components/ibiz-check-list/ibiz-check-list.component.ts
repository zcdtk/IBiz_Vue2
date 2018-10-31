Vue.component("ibiz-check-list", {
    template: `
    <CheckboxGroup v-model="selects" @on-change="onSelectChange">
        <template v-for="(item, index) of field.config">
            <Checkbox :label="item.value">{{ item.text }}</Checkbox>
        </template>
    </CheckboxGroup>
    `,
    props: ['field', 'name', 'mode', 'separator'],
    data: function() {
        let data: any = {
            selects: []
        };
        return data;
    },
    mounted: function() {

    },
    watch: {
        'field.value': function(newVal, oldVal) {
            if(!this.mode) {
                this.mode = 'str';
            }
            if(!this.separator) {
                this.separator = ';';
            }
            if(Object.is(this.mode, 'num') && this.field) {
                this.selects = [];
                let num: number = parseInt(newVal, 10);
                this.field.config.forEach(item => {
                    if((num & item.value) == item.value) {
                        this.selects.push(item.value);
                    }
                });
            } else if(Object.is(this.mode, 'str')) {
                this.selects = newVal.split(this.separator);
            }
        }
    },
    methods: {
        'onSelectChange': function(select) {
            if(!this.mode) {
                this.mode = 'str';
            }
            if(!this.separator) {
                this.separator = ';';
            }
            let value: string = '';
            if(Object.is(this.mode, 'num')) {
                let temp: number = 0;
                select.forEach(item => {
                    temp = temp | parseInt(item, 10);
                });
                value = temp !== 0 ? temp.toString() : '';
            } else if (Object.is(this.mode, 'str')) {
                value = select.join(this.separator);
            }
            if(this.field) {
                this.field.setValue(value);
            }
        }
    },

});