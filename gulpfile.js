#!/usr/bin/env node

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var src = 'angular-response-lag.js';
var dest = 'angular-response-lag.min.js';

gulp.task('clean', [], function () {
  return gulp.src(dest, { read: false }).pipe(clean());
});

gulp.task('default', [ 'clean' ], function () {

  return gulp.src([src])
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(rename(dest))
    .pipe(gulp.dest('.'));

});
