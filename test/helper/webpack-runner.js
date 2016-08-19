const webpack = require('webpack');
const tmp = require('tmp');

let webpackConfig = {
    entry: './test/fixture/module.js',
    output: {
        path: tmp.dirSync().name
    },
};

/*globals fail*/

module.exports = {

    /**
     * Run webpack.
     *
     * @param {Object}   plugin The plugin to install.
     * @param {Function} fn     The callback function.
     */
    run(plugin, fn) {
        // Generate a random filename for the output file.
        let filename = Math.random().toString(36).slice(2) + '.js';
        webpackConfig.output.filename = filename;

        // Add given plugin, if any.
        let plugins = [];
        if (plugin) {
            plugins.push(plugin);
        }

        // Prepare the webpack compiler instance.
        let compiler = webpack(Object.assign({}, webpackConfig, {
            plugins
        }));

        // Run webpack's compiler.
        compiler.run((err, stats) => {
            if (err) {
                fail(err);
            }

            // Eval emitted output and return it –if requested-.
            let output;
            try {
                output = eval(stats.compilation.assets[filename].source());
            } catch (err) {
                fail(err);
            }

            if (fn) {
                fn(output);
            }
        });
    }
};
