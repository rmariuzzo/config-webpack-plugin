/**
 * The Utils class.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */
class Utils {

    /**
     * Load a file contents.
     *
     * @param  {string} path The file path.
     * @return {string}      The file contents.
     */
    load(path) {
        try {
            path = this.sanitize(path);
            return require(path);
        } catch (e) {
            throw new Error(`Cannot load: ${path}. ${e.message}`);
        }
    }

    /**
     * Override configuration properties with environment variables.
     *
     * @param  {Object} config The configuration object.
     * @return {Object}        The overriden configuration object.
     */
    override(config) {
        Object.keys(process.env).forEach((key) => {
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
    sanitize(path) {
        return path.replace(/\.js$/, '');
    }
}

export default new Utils;
