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
var concat = require('gulp-concat');
var count = require('gulp-count');
var runSequence = require('run-sequence');

/** === Develop Mode === */
gulp.task('compile:scss', function() {
	var postcssPlugs = [
		autoprefixer({ browsers: [ 'last 2 version' ] })
		// Don't forget to use cssnano
	];

	return gulp.src(config.scss.mains)
		.pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(postcss(postcssPlugs))
		.pipe(gulp.dest(config.css.dir));
});

gulp.task('concatenate:js', function() {
	return gulp.src(config.js.scripts)
		.pipe(count('## files found'))
		.pipe(concat('main.js', { newLine: ';' }))
		.pipe(gulp.dest(config.js.dir));
});

gulp.task('watcher', function() {
	gulp.watch(config.scss.all, gulp.series('compile:scss'));
	gulp.watch(config.js.scripts, gulp.series('concatenate:js'));
});

gulp.task('develop', gulp.series('compile:scss', 'watcher'));

/** === Build Mode ==== */