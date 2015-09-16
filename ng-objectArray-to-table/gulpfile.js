/// <binding BeforeBuild='scripts, sass' />
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var sass = require('gulp-sass');

var config = {
    //Include all js files but exclude any min.js files
    src: ['app/**/*.js','!app/**/*.min.js']
}

var scssconfig = {
    //Include all js files but exclude any min.js files
    src: ['css/**/*.scss']
}

//delete the output file(s)
gulp.task('clean', function (cb) {
    //del is an async function and not a gulp plugin (just standard nodejs)
    //It is important to pass in the callback function so del can
    //  notify gulp when this task is complete.
    //  Without the callback, gulp will attempt to proceed with the 
    //  next task before the del function is actually done delete the files.
    del(['app/app.min.js'], cb);
});

// Combine and minify all files from the app folder
// This tasks depends on the clean task which means gulp will ensure that the 
// Clean task is completed before running the scripts task.
gulp.task('scripts', function () {
    return gulp.src(config.src)
      .pipe(uglify({ mangle: false }))
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('app/'));
});

gulp.task('sass', function () {
    gulp.src(scssconfig.src)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    return gulp.watch(config.src, ['scripts']);
});

gulp.task('watch-scss', function () {
    return gulp.watch(scssconfig.src, ['sass']);
});