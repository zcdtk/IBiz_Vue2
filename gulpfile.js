var gulp = require("gulp");  // gulp 插件
var typescript = require("gulp-typescript"); // gulp-typescript插件
var tsProject = typescript.createProject("tsconfig.json");  // ts配置信息
var concat = require('gulp-concat'); // 合并插件

// 编译ts文件
gulp.task("compilets", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

// 合并编译后的JavaScript文件（非压缩版）
gulp.task('concatibizsys', function () {
    // 目录（顺序）
    var alljs = [
        // 基础文件
        'dist/ibiz-obejct.js',
        // 部件
        'dist/widget/ibiz-control.js',
        // 控制器
        'dist/app/ibiz-view-controller.js'
    ]
    return gulp.src(alljs)
        .pipe(concat('ibizsys.js'))
        .pipe(gulp.dest("dist"));
});

