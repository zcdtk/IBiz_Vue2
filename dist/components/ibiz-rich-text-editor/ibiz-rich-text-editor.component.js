"use strict";
Vue.component("ibiz-rich-text-editor", {
    template: "\n    <textarea :id=\"name\"></textarea>\n    ",
    props: ['field', 'name'],
    data: function () {
        var data = {
            uploadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.UploadFile,
            downloadUrl: '/' + IBizEnvironment.SysName + IBizEnvironment.ExportFile,
            editor: null
        };
        return data;
    },
    mounted: function () {
        this.init('');
    },
    watch: {
        'field': function (newVal, oldVal) {
            if (newVal) {
                tinymce.remove('#' + this.name);
                this.init(newVal);
            }
        }
    },
    methods: {
        'init': function (val) {
            var _this_1 = this;
            var richtexteditor = this;
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
                setup: function (editor) {
                    _this_1.editor = editor;
                    editor.on('blur', function () {
                        var content = editor.getContent();
                        if (richtexteditor.field) {
                            richtexteditor.field.setValue(content);
                        }
                    });
                },
                images_upload_handler: function (bolbinfo, success, failure) {
                    var formData = new FormData();
                    formData.append('file', bolbinfo.blob(), bolbinfo.filename());
                    var _url = richtexteditor.uploadUrl;
                    richtexteditor.uploadFile(_url, formData).subscribe(function (response) {
                        if (response.ret === 0 && response.files.length > 0) {
                            var id = response.files[0].id;
                            var url = richtexteditor.downloadUrl + "?fileid=" + id;
                            success(url);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                },
                init_instance_callback: function (editor) {
                    _this_1.editor = editor;
                    var value = (val && val.length > 0) ? val : '';
                    if (_this_1.editor) {
                        _this_1.editor.setContent(value);
                    }
                    if (_this_1.disabled) {
                        _this_1.editor.setMode('readonly');
                    }
                }
            });
        },
        'uploadFile': function (url, formData) {
            var _this = this;
            var subject = new rxjs.Subject();
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
                }
                else {
                    subject.error(response);
                }
            }).catch(function (response) {
                subject.error(response);
            });
            return subject;
        }
    }
});
