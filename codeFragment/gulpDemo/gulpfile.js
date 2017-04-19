var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');


var indexPath = ['src/jade/index.jade'];
var jadesPath = ['src/jade/*.jade','!src/jade/index.jade'];
var sassPath = ['src/sass/pages/*.scss','src/sass/global.scss'];
// 编译index
gulp.task('index', function() {
  return gulp.src(indexPath)
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dist/'))
});

// 编译jade里面的文件
gulp.task('jades',['index'], function() {
  return gulp.src(jadesPath)
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dist/pages'))
});


// 编译sass里面的文件
gulp.task('sass', function() {
  gulp.src(sassPath)
    .pipe(sass({
      sourceComments: true,
      outputStyle: 'expanded',
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./dist/css'))
});


gulp.task('default', function() {
  // 监测其他的jades
  gulp.watch('src/jade/*.jade', ['jades']);
  // 监测sass
  gulp.watch('src/sass/**/*.scss', ['sass']);
});
