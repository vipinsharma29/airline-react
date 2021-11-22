const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'production',
    target: 'web',
    devtool: 'cheap-module-source-map',
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        stats: "minimal",
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/logo.svg",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    }
};
