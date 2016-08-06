/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _path = __webpack_require__(1);

	var _path2 = _interopRequireDefault(_path);

	var _utils = __webpack_require__(2);

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
	     * @param  {String} path The path of the configuration file to manipulate.
	     */
	    function ConfigPlugin(path) {
	        _classCallCheck(this, ConfigPlugin);

	        this._path = path;
	        this._contents = _utils2.default.load(path);
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

	exports.default = ConfigPlugin;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = path;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fs = __webpack_require__(3);

	var _fs2 = _interopRequireDefault(_fs);

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
	         * @param  {string} path The file path.
	         * @return {string}      The file contents.
	         */
	        value: function load(path) {
	            try {
	                return _fs2.default.readFileSync(path, 'utf8');
	            } catch (e) {
	                throw new Error('Cannot load: ' + path + '. ' + e.getMessage());
	            }
	        }
	    }]);

	    return Utils;
	}();

	exports.default = new Utils();

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = fs;

/***/ }
/******/ ]);