/*global describe,it,expect*/

const ConfigLoader = require('../lib/config-loader');
const loader = require('./helper/config-loader-runner');

describe('config-loader', () => {

    it('should be a function', () => {
        expect(typeof ConfigLoader).toBe('function');
    });

    it('should return an empty object', () => {
        expect(loader.run()).toEqual({});
    });

    it('should return an object with same property', () => {
        let obj = {
            a: 123
        };
        expect(loader.run(obj)).toEqual(obj);
    });

});
