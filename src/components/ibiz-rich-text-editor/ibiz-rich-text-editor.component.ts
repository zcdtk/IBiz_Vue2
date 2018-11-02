Vue.component("ibiz-rich-text-editor", {
    template: `
    <textarea :id="name"></textarea>
    `,
    props: ['field', 'name'],
    data: function() {
        let data: any = {
            uploadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.UploadFile,
            downloadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.ExportFile,
            editor: null
        };
        return data;
    },
    mounted: function() {
         this.init('');
    },
    watch: {
        'field': function(newVal, oldVal) {
            if (newVal) {
                tinymce.remove('#' + this.name);
                this.init(newVal);
            }
        }
    },
    methods: {
        'init': function(val) {
            let richtexteditor = this;
            tinymce.init({
                selector: '#' + this.name,
                language: 'zh_CN',
                branding: false,
                plugins: ['link', 'paste', 'table', 'image', 'codesample', 'code', 'fullscreen', 'preview'],
                codesample_languages: [
                    { text: 'HTML/XML', value: 'markup' },
                    { text: 'JavaScript', value: 'javascript' },
                    { text: 'CSS', value: 'css' },
                    { text: 'PHP', value: 'php' },
                    { text: 'Ruby', value: 'ruby' },
                    { text: 'Python', value: 'python' },
                    { text: 'Java', value: 'java' },
                    { text: 'C', value: 'c' },
                    { text: 'C#', value: 'csharp' },
                    { text: 'C++', value: 'cpp' }
                ],
                setup: editor => {
                    this.editor = editor;
                    editor.on('blur', () => {
                        const content = editor.getContent();
                        if(richtexteditor.field) {
                            richtexteditor.field.setValue(content);
                        }
                    });
                },
                images_upload_handler: function (bolbinfo, success, failure) {
                    const formData = new FormData();
                    formData.append('file', bolbinfo.blob(), bolbinfo.filename());
                    const _url = richtexteditor.uploadUrl;
                    richtexteditor.uploadFile(_url, formData).subscribe((response) => {
                        if (response.ret === 0 && response.files.length > 0) {
                            const id: string = response.files[0].id;
                            const url: string = `${richtexteditor.downloadUrl}?fileid=${id}`
                            success(url);
                        }
                    }, (error) => {
                        console.log(error);
                    });
                },
                init_instance_callback: (editor) => {
                    this.editor = editor;
                    let value = (val && val.length > 0) ? val : '';
                    if (this.editor) {
                        this.editor.setContent(value);
                    }
                    if (this.disabled) {
                        this.editor.setMode('readonly');
                    }
                }
            });
        },
    'uploadFile': function(url: string, formData: any){
        let _this = this;
        const subject: Subject<any> = new rxjs.Subject();
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'image/png', 'Accept': 'application/json' },
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.ret === 2 && response.data.notlogin) {
                    _this.httpDefaultInterceptor(response.data);
                }
                subject.next(response.data);
            } else {
                subject.error(response);
            }
        }).catch(function (response) {
            subject.error(response);
        });
        return subject;
    }
    }
});