var gulp = require('gulp');  // gulp 插件
var concat = require('gulp-concat'); // 合并插件

// 合并资源依赖JS文件（非压缩版）
gulp.task('js', function () {
    var assets = [
        'plugins/polyfill/polyfill.min.js',
        'plugins/vue/vue.min.js',
        'plugins/vue/vue-router.min.js',
        'plugins/rxjs/rxjs.umd.min.js',
        'plugins/axios/axios.min.js',
        'plugins/iview/iview.min.js',
        'plugins/element-ui/element-ui.js',
        'plugins/tinymce/tinymce.min.js',
        'plugins/tinymce/langs/zh_CN.js'
    ];
    return gulp.src(assets)
        .pipe(concat('assets.js'))
        .pipe(gulp.dest('dist'));
});

// 合并资源依赖CSS文件（非压缩版）
gulp.task('css', function() {
    var assets = [
        'node_modules/iview/dist/styles/iview.css'
    ];
    return gulp.src(assets)
    .pipe(concat('assets.css'))
    .pipe(gulp.dest('dist'));
});

// font 字体图标
gulp.task('font', function() {
    var font = [
        'node_modules/iview/dist/styles/fonts/ionicons.svg',
        'node_modules/iview/dist/styles/fonts/ionicons.ttf',
        'node_modules/iview/dist/styles/fonts/ionicons.woff'
    ];
    return gulp.src(font)
    .pipe(gulp.dest('dist/font'));
});


