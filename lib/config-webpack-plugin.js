'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Utils class.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */
var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, [{
        key: 'load',


        /**
         * Load a file contents.
         *
         * @param  {string} path The file path.
         * @return {string}      The file contents.
         */
        value: function load(path) {
            try {
                path = this.sanitize(path);
                return require(path);
            } catch (e) {
                throw new Error('Cannot load: ' + path + '. ' + e.message);
            }
        }

        /**
         * Override configuration properties with environment variables.
         *
         * @param  {Object} config The configuration object.
         * @return {Object}        The overriden configuration object.
         */

    }, {
        key: 'override',
        value: function override(config) {
            Object.keys(process.env).forEach(function (key) {
                if (config.hasOwnProperty(key)) {
                    config[key] = process.env[key];
                }
            });
            return config;
        }

        /**
         * Sanitize a path to be resolved.
         *
         * @param  {string} path The path to be resolved.
         * @return {string}      The resolved path.
         */

    }, {
        key: 'sanitize',
        value: function sanitize(path) {
            return path.replace(/\.js$/, '');
        }
    }]);

    return Utils;
}();

var utils = new Utils();

/**
 * The ConfigPlugin class.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */

var ConfigPlugin = function () {

    /**
     * Construct a new ConfigPlugin instance.
     *
     * @param  {String} configPath The path of the configuration file to manipulate.
     */
    function ConfigPlugin(configPath) {
        _classCallCheck(this, ConfigPlugin);

        // Get absolute path of the configuration file.
        var cwd = process.cwd();
        this.path = _path2.default.join(cwd, configPath);

        // Get the relative path of the configuration file.
        // Needed for requiring the file from here.
        var cwdRelative = _path2.default.relative(__dirname, cwd);
        this.requirePath = _path2.default.join(cwdRelative, configPath);

        console.log('Using configuration file: ' + configPath);

        // Load configuration file and override properties
        // whose matches with current environment variables.
        this.contents = utils.load(this.requirePath);
        this.contents = utils.override(this.contents);
    }

    /**
     * Apply this plugin in the compiler build process.
     *
     * @param  {Object} compiler The webpack compiler.
     */


    _createClass(ConfigPlugin, [{
        key: 'apply',
        value: function apply(compiler) {

            var instance = this;

            // Intercept the configuration file and override configuration values
            // with environment variables.
            compiler.plugin('normal-module-factory', function (nmf) {
                nmf.plugin('after-resolve', function (data, next) {

                    // Is this our configuration file?
                    if (data.resource.replace(/\.js$/, '') === instance.path) {
                        console.log('Processing configuration file: ' + instance.path);

                        // Replace loaders with ours.
                        var loader = _path2.default.join(__dirname, 'config-loader.js');
                        var json = JSON.stringify(instance.contents);
                        data.loaders = [loader + '?' + json];
                    }

                    // Continue the normal resolution process.
                    return next(null, data);
                });
            });
        }
    }]);

    return ConfigPlugin;
}();

module.exports = ConfigPlugin;