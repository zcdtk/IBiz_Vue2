var gulp = require('gulp');  // gulp 插件
var typescript = require('gulp-typescript'); // gulp-typescript插件
var tsProject = typescript.createProject('tsconfig.json');  // ts配置信息
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
        .pipe(gulp.dest('assets'));
});

// 编译ts文件
gulp.task('compilets', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('ibizsys'));
});

// 合并编译后的JavaScript文件（非压缩版）
gulp.task('concatibizsys', function () {
    // 目录（顺序）
    var ibizsys = [
        // 基础文件
        'ibizsys/ibiz-obejct.js',
        // 部件
        'ibizsys/widget/ibiz-control.js',
        // 控制器
        'ibizsys/app/ibiz-view-controller.js'
    ]
    return gulp.src(ibizsys)
        .pipe(concat('ibizsys.js'))
        .pipe(gulp.dest('ibizsys'));
});

