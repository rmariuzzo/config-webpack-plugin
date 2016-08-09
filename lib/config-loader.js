"use strict";

/**
 * The ConfigLoader function.
 *
 * @author Rubens Mariuzzo <rubens@mariuzzo.com>
 */
module.exports = function () {
  var config = JSON.parse(this.query.slice(1));
  return "module.exports = " + JSON.stringify(config);
};