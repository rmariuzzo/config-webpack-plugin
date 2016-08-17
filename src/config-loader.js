/**
 * The ConfigLoader function.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */
module.exports = function () {
    // Get JSON string from query string.
    let query = '{}';
    if (Array.isArray(this.query) && this.query.length > 1) {
        query = this.query[1];
    }

    // Parse the JSON string and... stringify it back.
    let config = JSON.parse(query);
    return `module.exports = ${JSON.stringify(config)}`;
};
