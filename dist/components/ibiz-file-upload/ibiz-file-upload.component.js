"use strict";
Vue.component("ibiz-file-upload", {
    template: "\n    <el-upload :disabled=\"field.disabled\" :file-list=\"files\" :action=\"uploadUrl\" :before-upload=\"beforeUpload\" :on-success=\"onSuccess\" :on-error=\"onError\" :before-remove=\"onRemove\" :on-preview=\"onDownload\">\n        <el-button size=\"small\" icon=\"el-icon-upload\">\u4E0A\u4F20</el-button>\n    </el-upload>\n    ",
    props: ['field', 'name'],
    data: function () {
        var data = {
            uploadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.UploadFile,
            downloadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.ExportFile,
            files: []
        };
        return data;
    },
    mounted: function () {
    },
    watch: {
        'field.value': function (newVal, oldVal) {
            var _this = this;
            if (newVal) {
                this.files = JSON.parse(newVal);
                this.files.forEach(function (file) {
                    file.url = _this.downloadUrl + '?fileid=' + file.id;
                });
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
        },
        'onDownload': function (file) {
            window.open(file.url);
        }
    }
});
