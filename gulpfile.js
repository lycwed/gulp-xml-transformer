const gulp = require('gulp');
const util = require('gulp-util');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

const src = 'src/*.js';

const lint = () => {
  return gulp.src([src, 'test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
};

const build = () => {
  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest('lib'));
};

const test = () => {
  return gulp.src('test')
    .pipe(mocha())
    .on('error', util.log);
};

const watch = () => {
  gulp.watch(src, gulp.series(['test']));
};

gulp.task('lint', lint);

gulp.task('build', gulp.series(['lint'], build));

gulp.task('test', gulp.series(['lint'], test));

gulp.task('watch', watch);

gulp.task('develop', watch);

gulp.task('default', watch);
