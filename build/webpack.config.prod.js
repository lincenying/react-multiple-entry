var path = require("path")
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var entris = require('./entris')

var baseWebpackConfig = require('./webpack.config.base')
var srcPath = path.resolve(__dirname, '../src')
var buildPath = path.join(__dirname, '../dist')
var config = merge(baseWebpackConfig, {
    bail: true,
    devtool: false,
    output: {
        path: buildPath,
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            include: srcPath,
            loader: ExtractTextPlugin.extract(['css?-autoprefixer', 'postcss'])
        },  {
            test: /\.less/,
            include: srcPath,
            loader: ExtractTextPlugin.extract(['css?-autoprefixer', 'postcss', 'less'])
        }, {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'file',
            query: {
                limit: 10000,
                name: 'static/img/[name].[hash:7].[ext]'
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new ExtractTextPlugin('static/css/[name].[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["common", "vendor"]
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
})
console.log(Object.keys(entris))
Object.keys(entris).forEach(function(entry) {
    config.plugins.push(
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'common', entry],
            filename: entry + '.html',
            template: 'template/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    )
})

module.exports = config
