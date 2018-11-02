"use strict";
Vue.component("ibiz-picture-upload", {
    template: "\n    <div class=\"ibiz-picture-upload\">\n        <ul class=\"el-upload-list el-upload-list--picture-card\">\n            <template v-for=\"(file,index) of files\">\n                <li :key=\"index\" class=\"el-upload-list__item is-success\">\n                    <img :src=\"file.url\" class=\"el-upload-list__item-thumbnail\">\n                    <a class=\"el-upload-list__item-name\">\n                        <i class=\"el-icon-document\"></i> {{ file.name }}\n                    </a>\n                    <i class=\"el-icon-close\"></i>\n                    <label class=\"el-upload-list__item-status-label\">\n                        <i class=\"el-icon-upload-success el-icon-check\"></i>\n                    </label>\n                    <span class=\"el-upload-list__item-actions\">\n                        <span class=\"el-upload-list__item-preview\">\n                            <i class=\"el-icon-zoom-in\" @click=\"onPreview(file)\"></i>\n                        </span>\n                        <span class=\"el-upload-list__item-download\">\n                            <i class=\"el-icon-download\" @click=\"onDownload(file)\"></i>\n                        </span>\n                        <span class=\"el-upload-list__item-delete\">\n                            <i class=\"el-icon-delete\" @click=\"onRemove(file)\"></i>\n                        </span>\n                    </span>\n                </li>\n            </template>\n        </ul>\n        <el-upload :disabled=\"field.disabled\" :show-file-list=\"false\" list-type=\"picture-card\" :file-list=\"files\" :action=\"uploadUrl\" :before-upload=\"beforeUpload\" :on-success=\"onSuccess\" :on-error=\"onError\">\n            <i class=\"el-icon-plus\"></i>\n        </el-upload>\n        <Modal v-model=\"dialogVisible\" footer-hide>\n            <img width=\"100%\" :src=\"dialogImageUrl\" alt=\"\">\n        </Modal>\n    <div>\n    ",
    props: ['field', 'name'],
    data: function () {
        var data = {
            uploadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.UploadFile,
            downloadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.ExportFile,
            files: [],
            dialogVisible: false,
            dialogImageUrl: ''
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
        'onPreview': function (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
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
        'onRemove': function (file) {
            var arr = [];
            this.files.forEach(function (f) {
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
