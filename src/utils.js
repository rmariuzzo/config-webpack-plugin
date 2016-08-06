import fs from 'fs';

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
            return fs.readFileSync(path, 'utf8');
        } catch (e) {
            throw new Error(`Cannot load: ${path}. ${e.getMessage()}`);
        }
    }
}

export default new Utils;
