const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist'),
    },
    mode: 'production',
    devtool: "eval-source-map",
    devServer:{
        client: {
            overlay: true,
        }
    },
    cache: false,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ],
                    },
                    
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        //loader: MiniCssExtractPlugin.loader,
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },

        ]
    },
    performance: { hints: false },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            hash: true,
            minify: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/Assets',
                    to: 'Assets'
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
    ]
};