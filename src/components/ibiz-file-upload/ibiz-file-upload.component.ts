Vue.component("ibiz-file-upload", {
    template: `
    <el-upload :disabled="field.disabled" :file-list="files" :action="url" :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError" :before-remove="onRemove">
        <Button icon="ios-cloud-upload-outline">上传</Button>
    </el-upload>
    `,
    props: ['field', 'name'],
    data: function() {
        let data: any = {
            url: '/' + IBizEnvironment.SysName + IBizEnvironment.UploadFile,
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
        }
    }
});