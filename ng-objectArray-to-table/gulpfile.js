/// <binding BeforeBuild='scripts, sass' />
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var rimraf = require('gulp-rimraf');

var config = {
    //Include all js files but exclude any min.js files
    src: ['app/js/**/*.js', '!app/js/**/*.min.js'],
    jshint: ['app/js/**/*.js', '!app/js/study.js', '!app/js/**/*.min.js'],
    scss: ['app/css/**/*.scss']
}

gulp.task('clean', function () {
    return gulp.src('app/js/all.min.js', { read: false }) // much faster 
    .pipe(rimraf());
});

gulp.task('jshint', function () {
	return gulp.src(config.jshint)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});

// Combine and minify all files from the app folder
gulp.task('scripts',['jshint'], function () {
	return gulp.src(config.src)
      // TODO: remove on production
      //.pipe(uglify({ mangle: false }))
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('app/js/'));
  });

gulp.task('sass', function () {
	gulp.src(config.scss)
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(concat('all.min.css'))
	.pipe(gulp.dest('app/css/'));
});

gulp.task('default',['scripts','sass'], function () {
	return gulp.watch(config.src, ['scripts']);
});

gulp.task('watch', function () {
	return gulp.watch(config.src, ['scripts']);
});

gulp.task('watch-scss', function () {
	return gulp.watch(scssconfig.src, ['sass']);
});