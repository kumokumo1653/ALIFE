const HTMLWebpackPlugin = require('html-webpack-plugin');
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
    devServer:{
        client: {
            overlay: true,
        }
    },
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
                        loader: MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
    ]
};