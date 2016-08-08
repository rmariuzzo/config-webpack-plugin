var webpack = require('webpack');

/**
 * Webpack configuration file.
 */

module.exports = {
    entry: {
        'config-webpack-plugin': './src/config-webpack-plugin',
        'config-webpack-plugin.min': './src/config-webpack-plugin',
        'config-loader': './src/config-loader',
        'config-loader.min': './src/config-loader'
    },

    target: 'node',

    output: {
        path: './lib',
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'commonjs2',
        umdNamedDefine: true
    },

    module: {
        exprContextCritical: false,
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};
