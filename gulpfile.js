/**
 * Moments' Gulpfile
 * =================
 * 
 * This file is used to run tasks for helping build theme. There's 2 main mode of tasks, develop and build.
 * 
 * 1. Develop mode, the workflow as its follow:
 * ** 1. ... 
 * ** 2. ...
 * ** 3. ...
 * 
 * 2. Build mode, the workflow as its follow:
 * ** 1. ...
 * ** 2. ...
 */

'use strict';

/** Dependencies */
var gulp = require('gulp');
var config = require('./gulpfile.config');
var sass = require('gulp-sass');
	sass.compiler = require('node-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var runSequence = require('run-sequence');

/** === Develop Mode === */
gulp.task('compile:scss', function() {
	var postcssPlugs = [
		autoprefixer({ browsers: [ 'last 2 version' ] })
		// Don't forget to use cssnano
	];

	return gulp.src(config.scss.mains)
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(postcss(postcssPlugs))
		.pipe(gulp.dest(config.css.dir));
});

gulp.task('watcher', function() {
	gulp.watch(config.scss.all, gulp.series('compile:scss'));
});

gulp.task('develop', gulp.series('compile:scss', 'watcher'));

/** === Build Mode ==== */