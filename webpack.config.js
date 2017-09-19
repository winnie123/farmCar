'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
    entry:{
        index : './js/app.js'
    },
    // entry:["babel-polyfill","./index.js"],
    module:{
        rules:[ {
            test : /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test : /\.css$/,
            exclude: /node_modules/,
            use : ExtractTextPlugin.extract({fallback : 'style-loader',use : ['css-loader','autoprefixer-loader','resolve-url-loader']})
        },{
            test :/\.less/,
            exclude: /node_modules/,
            use : ExtractTextPlugin.extract({fallback : 'style-loader',use : ['css-loader','autoprefixer-loader','less-loader','resolve-url-loader']})
        },{
            test :/\.scss/,
            exclude: /node_modules/,
            use : ExtractTextPlugin.extract({fallback : 'style-loader',use : ['css-loader','autoprefixer-loader','sass-loader','resolve-url-loader']})
        },{
            test :/\.sass/,
            exclude: /node_modules/,
            use : ExtractTextPlugin.extract({fallback : 'style-loader',use : ['css-loader','autoprefixer-loader','sass-loader','resolve-url-loader']})
        },{
            test :/\.html/,
            loaders : ['html-loader']
        },{
            test :/\.inc/,
            loaders : ['html-loader']
        } ,{
            test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
            loader: 'url-loader?limit=1000&name=./[name].[ext]'
        },{
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=1200'   //当图片大小超过limit后的参数大小，就会自动启动base64编码图片
        },{
            test: /\.ts$/,
            loader: ['ts-loader'],
            exclude : /node_modules/
        }]
    },
    resolve : {
        extensions: ['*', '.js', '.jsx','.json','.ts','.tsx','.css']            //解析模块，后缀名自动补全
    },
    plugins : [
        new ExtractTextPlugin({
            filename : './css/[name].css',
            allChunks: true   //分离出css文件
        }),
    ],
    devtool: 'inline-source-map'
};