"use strict";
Vue.component("ibiz-file-upload", {
    template: "\n    <el-upload :disabled=\"field.disabled\" :file-list=\"files\" :action=\"url\" :before-upload=\"beforeUpload\" :on-success=\"onSuccess\" :on-error=\"onError\" :before-remove=\"onRemove\">\n        <Button icon=\"ios-cloud-upload-outline\">\u4E0A\u4F20</Button>\n    </el-upload>\n    ",
    props: ['field', 'name'],
    data: function () {
        var data = {
            url: '/' + IBizEnvironment.SysName + IBizEnvironment.UploadFile,
            files: []
        };
        return data;
    },
    mounted: function () {
    },
    watch: {
        'field.value': function (newVal, oldVal) {
            if (newVal) {
                this.files = JSON.parse(newVal);
            }
            else {
                this.files = [];
            }
        }
    },
    methods: {
        'beforeUpload': function (file) {
            console.log('上传之前');
        },
        'onSuccess': function (response, file, fileList) {
            var arr = [];
            arr = response.files.slice();
            this.files.forEach(function (f) {
                arr.push({ name: f.name, id: f.id });
            });
            var value = arr.length > 0 ? JSON.stringify(arr) : '';
            if (this.field) {
                this.field.setValue(value);
            }
        },
        'onError': function (error, file, fileList) {
            this.$Notice.error({ title: '上传失败' });
        },
        'onRemove': function (file, fileList) {
            var arr = [];
            fileList.forEach(function (f) {
                if (f.id != file.id) {
                    arr.push({ name: f.name, id: f.id });
                }
            });
            var value = arr.length > 0 ? JSON.stringify(arr) : '';
            if (this.field) {
                this.field.setValue(value);
            }
        }
    }
});
