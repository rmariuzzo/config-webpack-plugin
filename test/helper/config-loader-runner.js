let ConfigLoader = require('../../lib/config-loader');

module.exports = {
    run: (json) => {
        let query = [null];
        if (json) {
            query.push(JSON.stringify(json));
        }
        let fn = ConfigLoader.bind({
            query
        });
        return eval(fn());
    }
};
