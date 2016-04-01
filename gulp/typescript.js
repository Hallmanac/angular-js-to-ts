'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var tsProject = $.typescript.createProject("tsconfig.json");

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = ['typings/**/*.ts', 'fuse-types/**/*.d.ts', config.allTypeScript];//, //path to typescript files
                         //config.libraryTypeScriptDefinitions]; //reference to library .d.ts files


    var tsResult = gulp.src(sourceTsFiles)
                       //.pipe($.sourcemaps.init())
                       .pipe($.typescript(tsProject));

    //tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
                    //.pipe($.sourcemaps.write('.'))
                    .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [
                                config.tsOutputPath + '/**/*.js',    // path to all JS files auto gen'd by editor
                                config.tsOutputPath + '/**/*.js.map', // path to all sourcemap files auto gen'd by editor
                                config.tsOutputPath + '/**/*.d.ts',
                                '!' + config.tsOutputPath + '/lib'
    ];

    // delete the files
    $.del(typeScriptGenFiles, cb);
});

gulp.task('watch-ts', function () {
    gulp.watch([config.allTypeScript], ['compile-ts']);
});