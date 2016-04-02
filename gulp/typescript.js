'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../gulp.config');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var tsProject = $.typescript.createProject("tsconfig.json");

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function() {
    var sourceTsFiles = ["src/client/**/*.ts",
        "missing-typings/**/*.d.ts",
        "typings/browser/**/*.ts",
        "typings/browser.d.ts"];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe($.typescript(tsProject));

    return tsResult.js
        .pipe(gulp.dest("ts-output/client"));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function(cb) {
    var typeScriptGenFiles = [
        'ts-output/**/*.js',    // path to all JS files auto gen'd by editor
        'ts-output/**/*.js.map', // path to all sourcemap files auto gen'd by editor
        'ts-output/**/*.d.ts',
        '!ts-output/lib'
    ];

    // delete the files
    $.del(typeScriptGenFiles, cb);
});

gulp.task('watch-ts', function() {
    gulp.watch(["src/**/*.ts"], ['compile-ts']);
});