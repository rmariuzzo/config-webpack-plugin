import path from 'path';
import utils from './utils';

/**
 * The ConfigPlugin class.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */
class ConfigPlugin {

    /**
     * Construct a new ConfigPlugin instance.
     *
     * @param  {String} configPath The path of the configuration file to manipulate.
     */
    constructor(configPath) {
        if (typeof configPath !== 'string') {
            throw new Error('No configuration file. (specify one as a string)');
        }

        // Get absolute path of the configuration file.
        let cwd = process.cwd();
        this.configPath = path.join(cwd, configPath);

        // Get the relative path of the configuration file.
        // Needed for requiring the file from here.
        let cwdRelative = path.relative(__dirname, cwd);
        this.requirePath = path.join(cwdRelative, configPath);

        // Load configuration file and override properties
        // whose matches with current environment variables.
        this.contents = utils.load(this.requirePath);
        this.contents = utils.override(this.contents);
    }

    /**
     * Apply this plugin in the compiler build process.
     *
     * @param {Object} compiler The webpack compiler.
     */
    apply(compiler) {
        // Intercept all resolved modules and look for the specified configuration file.
        compiler.plugin('normal-module-factory', (nmf) => {
            nmf.plugin('after-resolve', (data, next) => {
                let interceptedPath = data.resource;

                // Is this our configuration file?
                if (interceptedPath === this.configPath) {
                    this.intercept(data);
                }

                // Continue the normal resolution process.
                return next(null, data);
            });
        });
    }

    /**
     * Intercept a data chunk replacing all loaders by ours.
     *
     * @param {Object} data The data chunk.
     */
    intercept(data) {
        let loader = path.join(__dirname, 'config-loader.js');
        let json = JSON.stringify(this.contents);
        data.loaders = [`${loader}?${json}`];
    }
}

module.exports = ConfigPlugin;
