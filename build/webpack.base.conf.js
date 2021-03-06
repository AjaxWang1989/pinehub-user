var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
var glob = require('glob')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var relative = require('relative')
var webpack = require('webpack');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

function getEntry (rootSrc) {
    var map = {};
    glob.sync(rootSrc + '/pages/**/main.js')
    .forEach(file => {
        var key = relative(rootSrc, file).replace('.js', '');
        map[key] = file;
    })
    return map;
}

const appEntry = { app: resolve('./src/main.js') }
const pagesEntry = getEntry(resolve('./src'), 'pages/**/main.js')
const entry = Object.assign({}, appEntry, pagesEntry)

module.exports = {
    // 如果要自定义生成的 dist 目录里面的文件路径，
    // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
    // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
    entry,
    target: require('mpvue-webpack-target'),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'mpvue',
            '@': resolve('src'),
            'mocks': resolve('mocks')

        },
        symlinks: false,
        aliasFields: ['mpvue', 'weapp', 'browser'],
        mainFields: ['browser', 'module', 'main']
    },
    module: {
        rules: [
            // {
            //   test: /\.(js|vue)$/,
            //   loader: 'eslint-loader',
            //   enforce: 'pre',
            //   include: [resolve('src'), resolve('test')],
            //   options: {
            //     formatter: require('eslint-friendly-formatter')
            //   }
            // },
            {
                test: /.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'mpvue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                include: [resolve('src'), resolve('test')],
                use: [
                    'babel-loader',
                    {
                        loader: 'mpvue-loader',
                        options: Object.assign({checkMPEntry: true}, vueLoaderConfig)
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'image-webpack-loader',
                options: {
                    disable: process.env.NODE_ENV === 'production' ? false : true,
                    mozjpeg: {
                        progressive: true,
                        quality: 65,
                    },
                    optipng: {
                        enabled: true, // 表示不啟用這一個圖片優化器
                    },
                    pngquant: {
                        quality: [0.65, 0.8],
                        speed: 4,
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    webp: {
                        quality: 75, // 配置選項表示啟用 WebP 優化器
                    },
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: utils.assetsPath('img/[name].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            },
            {
                test: /\.js$/,
                include: [
                    resolve('src'),
                    resolve('node_modules/mpvue-echarts'),
                    resolve('node_modules/mpvue-wxparse')
                ],
                use: [
                    'babel-loader',
                    {
                        loader: 'mpvue-loader',
                        options: Object.assign({checkMPEntry: true}, vueLoaderConfig)
                    }
                ]
            }
        ]
    },
    plugins: [
        new MpvuePlugin(),
        new CopyWebpackPlugin([{
            from: '**/*.json',
            to: ''
        }], {
            context: 'src/'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: path.resolve(__dirname, '../dist/static'),
                ignore: ['.*', 'jssdk/*', 'images/icon/*.*', 'iview/*']
            }
        ]),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|us/),
    ]
}
