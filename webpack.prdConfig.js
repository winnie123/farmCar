'use strict';

const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackZipPlugin = require('zip-webpack-plugin');

module.exports= Merge(CommonConfig, {
    output:{
        path : __dirname + '/_dest',
        filename : 'js/[name].bundle.js',
    },
    plugins: [
        new htmlWebpackPlugin({
            template : './freezone.html',
            filename : 'freezone.html',
            chunks:['index'] ,
            hash : true,
            minify: { removeComments: true, collapseWhitespace: true, removeAttributeQuotes: true } // 压缩 html 文档
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new WebpackZipPlugin({
            initialFile: './dest',  //需要打包的文件夹
            endPath: './',  //打包到对应目录（一般为当前目录'./'）
            filename: 'domesticPack.zip' //打包生成的文件名
        }),
    ]
});