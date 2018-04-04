const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        app: path.join(__dirname, '/src/index.js'),
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "assets/js/[name].js",
        chunkFilename: "assets/js/[name].chunk.js"
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    priority: -20,
                    chunks: "all"
                }
            }
        }
        // splitChunks: {
        //     chunks: "all",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
        //     minSize: 0,                // 最小尺寸，默认0
        //     minChunks: 1,              // 最小 chunk ，默认1
        //     maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        //     maxInitialRequests: 1,    // 最大初始化请求书，默认1
        //     name: () => { },              // 名称，此选项课接收 function
        //     cacheGroups: {                 // 这里开始设置缓存的 chunks
        //         priority: "0",                // 缓存组优先级 false | object |
        //         vendor: {                   // key 为entry中定义的 入口名称
        //             chunks: "all",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //             test: /react/,     // 正则规则验证，如果符合就提取 chunk
        //             name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
        //             minSize: 0,
        //             minChunks: 1,
        //             enforce: true,
        //             maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        //             maxInitialRequests: 1,    // 最大初始化请求书，默认1
        //             reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
        //         }
        //     }
        // }
    },
    resolve: {     // resolve是分解的意思， extensions是扩展的意思(扩展名)
        extensions: ['.js', '.jsx']    // 不用写.js和.jsx文件的后缀名
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: "babel"
            }, {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "file",
                    options: {}
                }
                ]
            }, {
                test: /\.(scss|sass|css)$/,
                loaders: [
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', 
                        options: { 
                            sourceMap: true ,
                            url:false} 
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }]),
        new ExtractTextPlugin("assets/css/site.min.css"),
        new HtmlWebpackPlugin({
            title: 'React Demo',
            filename: 'index.html',
            //chunks: ['app'],
            template: path.resolve(__dirname, 'src/index.html'),
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        port: 1234,
        hot: true,
        open: true
    }
}