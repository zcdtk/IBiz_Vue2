Vue.component("ibiz-picture-upload", {
    template: `
    <div class="ibiz-picture-upload">
        <ul class="el-upload-list el-upload-list--picture-card">
            <template v-for="(file,index) of files">
                <li :key="index" class="el-upload-list__item is-success">
                    <img :src="file.url" class="el-upload-list__item-thumbnail">
                    <a class="el-upload-list__item-name">
                        <i class="el-icon-document"></i> {{ file.name }}
                    </a>
                    <i class="el-icon-close"></i>
                    <label class="el-upload-list__item-status-label">
                        <i class="el-icon-upload-success el-icon-check"></i>
                    </label>
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview">
                            <i class="el-icon-zoom-in" @click="onPreview(file)"></i>
                        </span>
                        <span class="el-upload-list__item-download">
                            <i class="el-icon-download" @click="onDownload(file)"></i>
                        </span>
                        <span class="el-upload-list__item-delete">
                            <i class="el-icon-delete" @click="onRemove(file)"></i>
                        </span>
                    </span>
                </li>
            </template>
        </ul>
        <el-upload :disabled="field.disabled" :show-file-list="false" list-type="picture-card" :file-list="files" :action="uploadUrl" :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError">
            <i class="el-icon-plus"></i>
        </el-upload>
        <Modal v-model="dialogVisible" footer-hide>
            <img width="100%" :src="dialogImageUrl" alt="">
        </Modal>
    <div>
    `,
    props: ['field', 'name'],
    data: function() {
        let data: any = {
            uploadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.UploadFile,
            downloadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.ExportFile,
            files: [],
            dialogVisible: false,
            dialogImageUrl: ''
        };
        return data;
    },
    mounted: function() {

    },
    watch: {
        'field.value': function(newVal, oldVal) {
            if(newVal) {
                this.files = JSON.parse(newVal);
                this.files.forEach(file => {
                    file.url = this.downloadUrl + '?fileid=' + file.id;
                });
            } else {
                this.files = [];
            }
        }
    },
    methods: {
        'onPreview': function(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        'beforeUpload': function(file){
            console.log('上传之前');
        },
        'onSuccess': function(response, file, fileList) {
            let arr: Array<any> = [];
            arr = [...response.files];
            this.files.forEach(f => {
                arr.push({name: f.name, id: f.id});
            });
            let value: String = arr.length > 0 ? JSON.stringify(arr) : '';
            if(this.field) {
                this.field.setValue(value);
            }
        },
        'onError': function(error, file, fileList) {
            this.$Notice.error({title: '上传失败'});
        },
        'onRemove': function(file) {
            if(this.field && this.field.disabled) {
                return;
            }
            let arr:Array<any> = [];
            this.files.forEach(f => {
                if(f.id != file.id) {
                    arr.push({name: f.name, id: f.id});
                }
            });
            let value: String = arr.length > 0 ? JSON.stringify(arr) : '';
            if(this.field) {
                this.field.setValue(value);
            }
        },
        'onDownload': function(file) {
            window.open(file.url);
        }
    }
});