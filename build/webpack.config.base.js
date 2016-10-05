var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')
var HappyPack = require('happypack')

var entris = require('./entris')

var isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')));
var relativePath = isInNodeModules ? '../../..' : '..';
var isInDebugMode = process.argv.some(arg =>
    arg.indexOf('--debug-template') > -1
);
if (isInDebugMode) {
    relativePath = '..';
}
var srcPath = path.resolve(__dirname, relativePath, 'src')
var nodeModulesPath = path.join(__dirname, '..', 'node_modules')
var buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'dist')

var config = {
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: buildPath,
        pathinfo: true,
        filename: '[name].js',
        publicPath: '/'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        alias: {
            "api": path.join(__dirname, "../src/api")
        },
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: nodeModulesPath,
        moduleTemplates: ['*-loader']
    },
    module: {
        preLoaders: [{
            test: /\.js|\.jsx$/,
            loader: 'eslint',
            include: srcPath,
        }],
        loaders: [{
            test: /\.js|\.jsx$/,
            include: srcPath,
            exclude: /node_modules/,
            loader: 'babel',
            query: require('./babel.dev')
        }, {
            test: /\.json$/,
            loader: 'json'
        },{
            test: /\.(mp4|webm)$/,
            loader: 'url?limit=10000'
        }]
    },
    eslint: {
        useEslintrc: true
    },
    postcss: [
        autoprefixer({ browsers: browserslist('last 2 version, > 0.1%')})
    ],
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};
config.entry = Object.assign(config.entry, entris)
module.exports = config;
