"use strict";

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
console.log(`Running ${mode} mode`);

module.exports = {
    mode,
    devtool: 'inline-source-map',
    entry: './src/index.js',
    //watch: true,
    watchOptions: {
        ignored: "/node_modules/",
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: 
                    [
                        ['@babel/preset-env',
                            {
                                "targets": {
                                    "esmodules": true
                                }
                            }
                        ] 
                    ],
                    plugins: [
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-transform-spread",
                        "@babel/plugin-transform-regenerator"
                    ],
                    cacheDirectory: true,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.vue'],
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    output: {
        path: path.resolve(__dirname, './dest'),
        filename: 'quiz-vue.js',
        library: "quiz-vue",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
};
