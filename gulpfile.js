var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('main', function(){
  gulp.src('dev/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/css'))

    gulp.src('dev/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app/js/'));
    connect.server();
});
