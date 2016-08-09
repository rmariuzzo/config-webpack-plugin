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
        // Get absolute path of the configuration file.
        let cwd = process.cwd();
        this.path = path.join(cwd, configPath);

        // Get the relative path of the configuration file.
        // Needed for requiring the file from here.
        let cwdRelative = path.relative(__dirname, cwd);
        this.requirePath = path.join(cwdRelative, configPath);

        console.log(`Using configuration file: ${configPath}`);

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
    apply(compiler) {

        let instance = this;

        // Intercept the configuration file and override configuration values
        // with environment variables.
        compiler.plugin('normal-module-factory', (nmf) => {
            nmf.plugin('after-resolve', (data, next) => {

                // Is this our configuration file?
                if (data.resource.replace(/\.js$/, '') === instance.path) {
                    console.log(`Processing configuration file: ${instance.path}`);

                    // Replace loaders with ours.
                    let loader = path.join(__dirname, 'config-loader.js');
                    let json = JSON.stringify(instance.contents);
                    data.loaders = [`${loader}?${json}`];
                }

                // Continue the normal resolution process.
                return next(null, data);
            });
        });
    }
}

module.exports = ConfigPlugin;
