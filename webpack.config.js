const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const entry = require('./webpack_config/entry_webpack.js')
const copyWebpackPlugin = require('copy-webpack-plugin')
// 区分开发环境和生产环境
console.log(encodeURIComponent(process.env.type))
let website
if (process.env.type==='build') {
  website = {
    publicPath: 'http://jspang.com:1717/'
  }
} else {
  website = {
    publicPath: 'http://127.0.0.1:1717/'
  }
}

module.exports = {
  devtool: 'source-map',
  // entry: entry.path,
  entry: {
  	entry: './src/entry.js',
		jquery: 'jquery'
	},
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js',
    publicPath: website.publicPath
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: 'css-loader', options: {importLoaders:1}},
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        use:['html-withimg-loader']
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          },{
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      },{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          },{
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },{
        test: /\.(jsx|js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
  	new webpack.optimize.CommonsChunkPlugin({
			name: 'jquery', // 对应entry中的配置key
			filename: 'assets/js/jquery.js', // 抽离到哪里
			minChunks: 2 // 最少要抽离几个文件
		}),
    // new UglifyJsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPlugin('css/index.css'),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    }),
		new webpack.BannerPlugin('JSPang版权所有，看官方免费视频到jspang.com'),
		new copyWebpackPlugin([
			{
				from: __dirname + '/src/public',
				to: './public'
			}
		])
		// new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '127.0.0.1',
    compress: true,
    port: 1717
  },
	watchOptions: {
  	poll: 1000, // 检测修改的时间，单位是ms
		aggregateTimeout: 500, // 重复按键时，不进行打包，只算一次
		ignored: /node_modules/ // 监控忽略的文件或目录
	}
}