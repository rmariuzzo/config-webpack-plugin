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
    lib: 'lib/',
    test: 'test/**/*.js',
    testSuite: 'test/suite.js'
};

gulp.task('default', () => {

    return gulp
        .src([asset.src])
        .pipe(eslint())
        .pipe(rollup({
            entry: [asset.plugin, asset.loader]
        }))
        .pipe(babel())
        .pipe(gulp.dest(asset.lib))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(asset.lib));

});

gulp.task('watch', () => {

    return gulp
        .watch([asset.src], ['default']);
});

gulp.task('test', () => {

    return gulp
        .src([asset.testSuite])
        .pipe(eslint())
        .pipe(babel())
        .pipe(jasmine());
});

gulp.task('test:watch', () => {

    return gulp
        .watch([asset.src, asset.test], ['test']);
});
