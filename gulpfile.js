var gulp = require('gulp');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var rollup = require('gulp-rollup');
var jasmine = require('gulp-jasmine');

var asset = {
    src: 'src/**/*.js',
    plugin: 'src/config-webpack-plugin.js',
    loader: 'src/config-loader.js',
    test: 'test/**/*.js',
    testSuite: 'test/suite.js',
    lib: 'lib/**/*.js'
};

// Default task is to build everything.
gulp.task('default', ['build']);

gulp.task('build', ['lint:src'], () => {
    /** @desc compile the source files into the final library. */

    return gulp
        .src([asset.src])
        .pipe(rollup({
            entry: [asset.plugin, asset.loader]
        }))
        .pipe(babel())
        .pipe(gulp.dest('lib/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('lib/'));

});

gulp.task('test', ['lint:test', 'build'], () => {
    /** @desc Run all the tests. */

    return gulp
        .src([asset.testSuite])
        .pipe(jasmine());
});

gulp.task('watch', () => {
    /** @desc Watch source and test files then run all tests on changes. */

    return gulp
        .watch([asset.src, asset.test], ['test']);
});

gulp.task('lint:src', () => {
    /** @desc Lint all source files. */

    return gulp
        .src([asset.src])
        .pipe(eslint());
});

gulp.task('lint:test', () => {
    /** @desc Lint all test files. */

    return gulp
        .src([asset.test])
        .pipe(eslint());
});
