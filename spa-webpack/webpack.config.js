const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const setIterm2Badge = require('set-iterm2-badge');
const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    join
} = require("path");
// setIterm2Badge("老袁的开发环境");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require("glob");
console.log("寻找文件", glob.sync(join(__dirname, './dist/*.html')));
webpackConfig = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                // 'style-loader', 
                {
                    // loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
                    loader: 'css-loader'
                }
            ]
        }]
    },
    devServer: {
        // port: 3000,
        // hot: true,
        before(app) {
            app.get("/api/test", (req, res) => {
                res.json({
                    code: 200,
                    message: 'Hello World'
                })
            })
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 1,
                    maxinitalaRequest: 5,
                    minSize: 0
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    plugins: [
        // new WebpackDeepScopeAnalysisPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag?"styles/[name].[hash:5].css":"styles/[name].css",
            chunkFilename: _modeflag?"styles/[id].[hash:5].css":"styles/[name].css"
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"src/index.html"
        }),
        new CleanWebpackPlugin(['dist']),
        // new PurifyCSSPlugin({
        //     paths: glob.sync(join(__dirname, './dist/*.html')),
        // })
    ],
};
module.exports = merge(_mergeConfig, webpackConfig);