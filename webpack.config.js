const path = require('path')
const glob = require('glob')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const entry = require('./webpack_config/entry_webpack.js')

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
  entry: entry.path,
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
    // new UglifyJsPlugin(),
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
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    compress: true,
    port: 1717
  }
}