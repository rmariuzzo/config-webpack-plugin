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
     * @param  {String} path The path of the configuration file to manipulate.
     */
    constructor(path) {
        this.path = utils.sanitize(path);
        console.log(`Using configuration file: ${this.path}`);
        this.contents = utils.load(this.path);
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
                    console.log(`Processsing configuration file: ${instance.path}`);

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

export default ConfigPlugin;
