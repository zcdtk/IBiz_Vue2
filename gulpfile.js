var gulp = require('gulp');  // gulp 插件
var concat = require('gulp-concat'); // 合并插件

// 合成资源依赖文件（非压缩版）
gulp.task('assets', function () {
    var assets = [
        'node_modules/vue/dist/vue.js',
        'node_modules/vue-router/dist/vue-router.js',
        'node_modules/rxjs/Rx.js'
    ];
    return gulp.src(assets)
        .pipe(concat('assets.js'))
        .pipe(gulp.dest('dist'));
});


