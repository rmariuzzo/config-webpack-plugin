var gulp = require('gulp');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var asset = {
    plugin: 'src/config-webpack-plugin.js',
    loader: 'src/config-loader.js',
    lib: 'lib/'
};

gulp.task('default', () => {

    return gulp
        .src([asset.plugin, asset.loader])
        .pipe(eslint())
        .pipe(babel())
        .pipe(gulp.dest(asset.lib))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(asset.lib));

});
