var path = require('path');

var task = module.exports,
    target = {
        plugin: 'src/config-webpack-plugin.js',
        loader: 'src/config-loader.js',
        lib: 'lib/'
    };

/**
 * The build task.
 */
task.build = function* () {
    /** @desc The build task used to generate the library. */

    yield this
        .clear(target.lib);

    yield this
        .source([target.plugin, target.loader])
        .eslint();

    var babelized = this
        .source(target.plugin)
        .babel();

    yield babelized
        .target(target.lib);

    yield babelized
        .uglify()
        .target(prefix(target.plugin, '.min'));
};

/* Functions. */

function prefix(file, prefix) {
    file = path.basename(file);
    return file.replace(/\.\w+$/, ext => `${prefix}${ext}`);
}
