var webpack = require('webpack');

/**
 * Webpack configuration file.
 */

module.exports = {
    entry: {
        'config-webpack-plugin': './src/config-webpack-plugin',
        'config-webpack-plugin.min': './src/config-webpack-plugin'
    },

    output: {
        path: './dist',
        filename: '[name].js',
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },

    externals: {
        'fs': 'fs',
        'path': 'path'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};
