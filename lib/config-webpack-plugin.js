'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        this.path = configPath;
        console.log('Using configuration file: ' + this.path);
        this.contents = _utils2.default.load(this.path);
        this.contents = _utils2.default.override(this.contents);
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
                        console.log('Processsing configuration file: ' + instance.path);

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