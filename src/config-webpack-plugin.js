import path from 'path';

/**
 * The ConfigPlugin class.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */
class ConfigPlugin {

    /**
     * Construct a new ConfigPlugin instance.
     *
     * @param  {string|Array} files The path of one or more configuration files to merge.
     */
    constructor(files) {

        // If one configuration files was provided let's wrap into an array.
        if (typeof files === 'string') {
            files = [files];
        }

        // If the given argument wasn't a string neither an array
        // then we don't know what we are dealing with.
        if (!Array.isArray(files)) {
            throw new Error('The configuration file should be a string or an array.');
        }

        let cwd = process.cwd();

        // Map each configuration file with their absolute file path.
        this.files = files.map((file) => {
            return {
                request: file,
                path: path.join(cwd, file)
            };
        });
    }

    /**
     * Apply this plugin in the compiler build process.
     *
     * @param {Object} compiler The webpack compiler.
     */
    apply(compiler) {

        // Merge configuration files with environment variables.
        let files = this.load(this.files);
        let merged = this.merge(files.map(file => file.source));

        // Get the main configuration file. As we merge from right to left then our
        // main configuration file is the last in the array.
        let mainConfig = this.files[0];

        // Intercept all resolved modules and look for the specified configuration file.
        compiler.plugin('normal-module-factory', (nmf) => {
            nmf.plugin('after-resolve', (data, next) => {
                let interceptedPath = data.resource;

                // Is this one of our configuration files?
                if (interceptedPath === mainConfig.path) {
                    this.intercept(data, merged);
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
    load(files) {
        // Get the path of this directory relative to the CWD.
        let cwd = path.relative(__dirname, process.cwd());

        // Map files to their contents and return it.
        return files.map((file) => {
            try {
                // Get the path of the configuration file relative to this file.
                let request = path.join(cwd, file.request);

                // Try to require the configuration file.
                file.source = require(request);
                return file;
            } catch (e) {
                throw new Error(`Cannot load: ${path}. ${e.message}`);
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
    merge(configs) {
        // Merge configurations together from right to left.
        let merged = Object.assign({}, ...configs);

        // Merge any matching environment variable.
        Object.keys(process.env).forEach((key) => {
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
    intercept(data, replacement) {
        let loader = path.join(__dirname, 'config-loader.js');
        let json = JSON.stringify(replacement);
        data.loaders = [`${loader}?${json}`];
    }
}

module.exports = ConfigPlugin;
