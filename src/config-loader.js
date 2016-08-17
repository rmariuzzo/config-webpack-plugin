/**
 * The ConfigLoader function.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */
module.exports = function () {
    let query = Array.isArray(this.query) ? this.query.slice(1) : '""';
    let config = JSON.parse(query);
    return `module.exports = ${JSON.stringify(config)}`;
};
