/*global describe,it,expect*/

const loader = require('./helper/config-loader-runner');

describe('config-loader', () => {

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
