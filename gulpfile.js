var gulp = require('gulp');  // gulp 插件
var concat = require('gulp-concat'); // 合并插件

// 合并资源依赖JS文件（非压缩版）
gulp.task('js', function () {
    var assets = [
        'node_modules/vue/dist/vue.js',
        'node_modules/iview/dist/iview.js',
        'node_modules/vue-router/dist/vue-router.js',
        'node_modules/rxjs/Rx.js'
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


