Vue.component("ibiz-file-upload", {
    template: `
    <el-upload :disabled="field.disabled" :file-list="files" :action="uploadUrl" :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError" :before-remove="onRemove" :on-preview="onDownload">
        <el-button size="small" icon="el-icon-upload">上传</el-button>
    </el-upload>
    `,
    props: ['field', 'name'],
    data: function() {
        let data: any = {
            uploadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.UploadFile,
            downloadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.ExportFile,
            files: []
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
        'onRemove': function(file, fileList) {
            let arr: Array<any> = [];
            fileList.forEach(f => {
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