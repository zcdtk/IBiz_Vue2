var gulp = require('gulp');  // gulp 插件
var typescript = require('gulp-typescript'); // gulp-typescript插件
var tsProject = typescript.createProject('tsconfig.json');  // ts配置信息
var concat = require('gulp-concat'); // 合并插件

// 编译ts文件
gulp.task('compilets', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

// 合并编译后的JavaScript文件（非压缩版）
gulp.task('concatibizsys', function () {
    // 目录（顺序）
    var ibizsys = [
        // app
        'dist/util/ibiz-app.js',
        // util
        'dist/util/ibiz-util.js',
        'dist/util/ibiz-http.js',
        'dist/util/ibiz-notification.js',
        // 基础文件
        'dist/ibiz-object.js',
        'dist/util/ibiz-code-list.js',
        // 表单界面部件
        'dist/formitem/ibiz-form-item.js',
        'dist/formitem/ibiz-form-field.js',
        'dist/formitem/ibiz-form-drpanel.js',
        'dist/formitem/ibiz-form-group.js',
        'dist/formitem/ibiz-form-iframe.js',
        'dist/formitem/ibiz-form-raw-item.js',
        'dist/formitem/ibiz-form-tab-page.js',
        'dist/formitem/ibiz-form-tab-panel.js',
        // 部件
        'dist/widget/ibiz-control.js',
        'dist/widget/ibiz-counter.js',
        'dist/widget/ibiz-app-menu.js',
        'dist/widget/ibiz-toolbar.js',
        'dist/widget/ibiz-md-control.js',
        'dist/widget/ibiz-data-grid.js',
        'dist/widget/ibiz-form.js',
        'dist/widget/ibiz-edit-form.js',
        // 控制器
        'dist/app/ibiz-view-controller.js',
        'dist/app/ibiz-main-view-controller.js',
        'dist/app/ibiz-index-view-controller.js',
        'dist/app/ibiz-md-view-controller.js',
        'dist/app/ibiz-grid-view-controller.js',
        'dist/app/ibiz-edit-view-controller.js',
        // 组件
        'dist/components/ibiz-app-menu/ibiz-app-menu.component.js',
        'dist/components/ibiz-form/ibiz-form.component.js',
        'dist/components/ibiz-form-group/ibiz-form-group.component.js'
    ]
    return gulp.src(ibizsys)
        .pipe(concat('ibizsys.js'))
        .pipe(gulp.dest('dist'));
});


