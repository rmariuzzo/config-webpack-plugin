/**
 * The ConfigLoader function.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */
module.exports = function () {
    // Get JSON string from query string.
    let query = '{}';
    if (typeof this.query === 'string' && this.query.charAt(0) === '?') {
        query = this.query.slice(1);
    }

    // Parse the JSON string and... stringify it back.
    let config = JSON.parse(query);
    return `module.exports = ${JSON.stringify(config)}`;
};
