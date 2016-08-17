/*global describe,it,expect,beforeEach*/

describe('config-loader', () => {

    let ConfigLoader;

    beforeEach(() => {
        ConfigLoader = require('../src/config-loader');
    });

    it('should be a function', () => {
        expect(typeof (ConfigLoader)).toBe('function');
    });

    it('should return an empty string', () => {
        expect(eval(ConfigLoader())).toBe('');
    });

    it('should return the specified value', () => {
        expect(eval(ConfigLoader.bind({
            query: ['?', '123']
        })())).toBe(123);
    });

});
