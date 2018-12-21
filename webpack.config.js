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
  // devtool: 'source-map',
  // entry: entry.path,
  entry: {
  	entry: './src/entry.js'
		// jquery: 'jquery', // 这样设置入口是不对的，找不到对应的模块
		// vue: 'vue'
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
  	// CommonsChunkPlugin 在 webpack4 中已经废弃了
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: ['jquery', 'vue'], // 对应entry中的配置key，意思是将入口jquery单独抽离
		// 	filename: 'assets/js/[name].[ext]', // 表示抽离到哪里
		// 	minChunks: 2 // 最少要抽离几个文件，一般是抽离2个文件
		// }),
    // new UglifyJsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			Vue: ['vue/dist/vue.esm.js', 'default']
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
	},
	optimization: {
  	splitChunks: {
  		// all 将所有的导入包抽离出来形成vendors~entry.js(如使用Provide引入的jquery和vue)
  		chunks: "all" // 默认值 async ，只抽离异步导入模块，此时只有一个entry.js产生，包含所有的被引入的模块
		}
	}
}