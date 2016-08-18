let ConfigLoader = require('../../lib/config-loader');

module.exports = {

    /**
     * Run the config loader.
     *
     * @param  {Object} json The JSON object to pass to the config loader.
     * @return {Object}      The result of the config loader.
     */
    run: (json) => {
        let query = '';
        if (json) {
            query = '?' + JSON.stringify(json);
        }
        let fn = ConfigLoader.bind({
            query
        });
        return eval(fn());
    }
};
