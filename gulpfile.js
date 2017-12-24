var gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    autoprefixer = require('autoprefixer'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    /* js压缩插件 */
    concat = require('gulp-concat'),
    /* js合并插件 */
    cssnano = require('gulp-cssnano'),
    /* css压缩插件 */
    postcss = require('gulp-postcss'),
    /* 压缩CSS为一行 */
    minifyCss = require('gulp-minify-css'),
    /*   px2rem = require('postcss-px2rem'), */
    less = require('gulp-less'),
    /* less文件编译 */
    htmlmin = require('gulp-htmlmin'); /* html压缩插件 */


gulp.task('clean', function(cb) {
    return del(['dist/*'], cb);
})

gulp.task('js', function() {
    gulp.src('src/js/**') //需要操作的源文件
        //.pipe(uglify())               //压缩js文件
        //.pipe(concat('app.js'))       //把js文件合并成app.js文件
        .pipe(gulp.dest('dist/js')) //把操作好的文件放到dist/js目录下
        .pipe(browsersync.reload({ stream: true }));
});

/*使用postcss px2rem 得到rem*/
gulp.task('less', function() {
    /* var processors = [px2rem({ remUnit: 75 })]; */
    /* var processors = [px2rem({ 'remUnit': 37.5, 'baseDpr': 2 }), autoprefixer({ browsers: ['last 2 versions'] })]; */
    var processors = [autoprefixer({ browsers: ['last 2 versions'] })];
    gulp.src('src/less/**')
        .pipe(less()) //编译less文件
        //.pipe(cssnano())                  //css压缩
        /*  .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         })) */
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css'))
        .pipe(browsersync.reload({ stream: true }));
});

gulp.task('css', function() {
    gulp.src(['src/css/reset.css', 'src/css/bootstrap.min.css'])
        .pipe(concat('common.min.css'))
        .pipe(minifyCss()) //- 压缩处理成一行
        .pipe(cssnano()) //css压缩
        .pipe(gulp.dest('dist/css/'))
        .pipe(browsersync.reload({ stream: true }));
});


/*------------------------- 拷贝资源文件 -----------------------------*/
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**') /* **：代表目录下的所有内容 */
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('img', function() {
    gulp.src('src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browsersync.reload({ stream: true }));
});


gulp.task('html', function() {
    gulp.src('src/html/*.html')
        .pipe(htmlmin({
            /*collapseWhitespace: true,            //压缩html
            collapseBooleanAttributes: true,     //省略布尔属性的值
            removeComments: true,                //清除html注释
            removeEmptyAttributes: true,         //删除所有空格作为属性值
            removeScriptTypeAttributes: true,    //删除type=text/javascript
            removeStyleLinkTypeAttributes: true, //删除type=text/css
            minifyJS:true,                       //压缩页面js
            minifyCSS:true                       //压缩页面css*/
        }))
        .pipe(gulp.dest('dist/html'))
        .pipe(browsersync.reload({ stream: true }));
});

gulp.task('serve', ['clean'], function() {
    gulp.start('js', 'less', 'css', 'html', 'img', 'fonts');
    browsersync.init({
        port: 3000,
        server: {
            baseDir: ['dist']
        }
    });

    gulp.watch('src/js/**', ['js']); //监控文件变化，自动更新
    gulp.watch('src/css/**', ['css']);
    gulp.watch('src/less/**', ['less']);
    gulp.watch('src/img/**', ['img']);
    gulp.watch('src/html/*.html', ['html']);
    gulp.watch('src/fonts/**', ['fonts']);

});


gulp.task('default', ['serve']);