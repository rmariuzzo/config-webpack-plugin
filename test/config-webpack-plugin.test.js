/*global describe,it,expect,spyOn*/

const ConfigPlugin = require('../lib/config-webpack-plugin');
const config1 = require('./fixture/config1');
const mergedConfig = require('./fixture/merged-config');
const webpackRunner = require('./helper/webpack-runner');

describe('config-webpack-plugin', () => {

    it('should be a function', () => {
        expect(typeof ConfigPlugin).toBe('function');
    });

    it('should complain when no configuration file is specified', () => {
        expect(() => new ConfigPlugin()).toThrow();
    });

    it('should invoke `apply` when webpack is resolving modules', (done) => {
        let plugin = new ConfigPlugin('./test/fixture/config1.js');
        spyOn(plugin, 'apply').and.callThrough();

        webpackRunner.run(plugin, () => {
            expect(plugin.apply).toHaveBeenCalled();
            done();
        });
    });

    it('should invoke `intercept` when webpack try to resolve the specified configuration file', (done) => {
        let plugin = new ConfigPlugin('./test/fixture/config1.js');
        spyOn(plugin, 'intercept').and.callThrough();

        webpackRunner.run(plugin, () => {
            expect(plugin.intercept).toHaveBeenCalled();
            done();
        });
    });

    it('should not do anything with the specified configuration file when plugin is not installed', (done) => {
        webpackRunner.run(null, (output) => {
            expect(output).toEqual(config1);
            done();
        });
    });

    it('should not do anything with the specified configuration file when there is no matching environment variables', (done) => {
        let plugin = new ConfigPlugin('./test/fixture/config1.js');
        webpackRunner.run(plugin, (output) => {
            expect(output).toEqual(config1);
            done();
        });
    });

    it('should modify the source of the specified configuration file when there is a matching environment variable', (done) => {
        try {
            process.env.name = 'intercepted';
            let plugin = new ConfigPlugin('./test/fixture/config1.js');
            webpackRunner.run(plugin, (output) => {
                expect(output.name).toBe('intercepted');
                done();
            });
        } finally {
            delete process.env.name;
        }
    });

    it('should merge multiple configuration files', (done) => {
        let plugins = new ConfigPlugin([
            './test/fixture/config1.js',
            './test/fixture/config2.js'
        ]);
        webpackRunner.run(plugins, (output) => {
            expect(output).toEqual(mergedConfig);
            done();
        });
    });
});
