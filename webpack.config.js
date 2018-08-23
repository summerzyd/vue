const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const config = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.jsx$/, use: 'babel-loader' },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use:
          [{
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
              outputPath: '/img'
            }
          },
          ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }

    ),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}
if (isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          path: 'postcss.config.js'
        }
      },
      "stylus-loader"
    ]
  }
  )
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    }
    // hot: true,
    // open:true
    // historyFallback: {

    // }
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.mode ='production',
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl(us)?$/,
      use: [
        {
          loader: ExtractPlugin.loader,
          options: {
            publicPath: ''
          }
        },
        "css-loader",
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            path: 'postcss.config.js'
          }
        },
        "stylus-loader"
      ]
    }
  )
  config.plugins.push(
    new ExtractPlugin({ filename: 'styles.[contentHash:8].css' }),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    })
  )
}
module.exports = config