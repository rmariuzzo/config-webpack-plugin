'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The ConfigPlugin class.
 */
var ConfigPlugin = function () {

    /**
     * Construct a new ConfigPlugin instance.
     *
     * @param  {string|Array} files The path of one or more configuration files to merge.
     */
    function ConfigPlugin(files) {
        _classCallCheck(this, ConfigPlugin);

        // If one configuration files was provided let's wrap into an array.
        if (typeof files === 'string') {
            files = [files];
        }

        // If the given argument wasn't a string neither an array
        // then we don't know what we are dealing with.
        if (!Array.isArray(files)) {
            throw new Error('The configuration file should be a string or an array.');
        }

        var cwd = process.cwd();

        // Map each configuration file with their absolute file path.
        this.files = files.map(function (file) {
            return {
                request: file,
                path: _path2.default.join(cwd, file)
            };
        });
    }

    /**
     * Apply this plugin in the compiler build process.
     *
     * @param {Object} compiler The webpack compiler.
     */


    _createClass(ConfigPlugin, [{
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            // Merge configuration files with environment variables.
            var files = this.load(this.files);
            var merged = this.merge(files.map(function (file) {
                return file.source;
            }));

            // Get the main configuration file. As we merge from right to left then our
            // main configuration file is the last in the array.
            var mainConfig = this.files[0];

            // Intercept all resolved modules and look for the specified configuration file.
            compiler.plugin('normal-module-factory', function (nmf) {
                nmf.plugin('after-resolve', function (data, next) {
                    var interceptedPath = data.resource;

                    // Is this one of our configuration files?
                    if (interceptedPath === mainConfig.path) {
                        _this.intercept(data, merged);
                    }

                    // Continue the normal resolution process.
                    return next(null, data);
                });
            });
        }

        /**
         * Load one or more configuration files.
         *
         * @param {Array} files One or more configuration files.
         *
         * @return {Array} List of configuration file contents.
         */

    }, {
        key: 'load',
        value: function load(files) {
            // Get the path of this directory relative to the CWD.
            var cwd = _path2.default.relative(__dirname, process.cwd());

            // Map files to their contents and return it.
            return files.map(function (file) {
                try {
                    // Get the path of the configuration file relative to this file.
                    var request = _path2.default.join(cwd, file.request);

                    // Try to require the configuration file.
                    file.source = require(request);
                    return file;
                } catch (e) {
                    throw new Error('Cannot load: ' + _path2.default + '. ' + e.message);
                }
            });
        }

        /**
         * Merge one more configuration objects then merge with any matching
         * environment variable.
         *
         * @param {Array} configs One or more configuration files to merge.
         *
         * @return {object} The merged configuration.
         */

    }, {
        key: 'merge',
        value: function merge(configs) {
            // Merge configurations together from right to left.
            var merged = Object.assign.apply(Object, [{}].concat(_toConsumableArray(configs)));

            // Merge any matching environment variable.
            Object.keys(process.env).forEach(function (key) {
                if (merged.hasOwnProperty(key)) {
                    merged[key] = process.env[key];
                }
            });

            return merged;
        }

        /**
         * Intercept a data chunk replacing all loaders by ours.
         *
         * @param {Object} data The data chunk.
         */

    }, {
        key: 'intercept',
        value: function intercept(data, replacement) {
            var loader = _path2.default.join(__dirname, 'config-loader.js');
            var json = JSON.stringify(replacement);
            data.loaders = [loader + '?' + json];
        }
    }]);

    return ConfigPlugin;
}();

module.exports = ConfigPlugin;