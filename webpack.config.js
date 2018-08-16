const path = require('path')//获取路径
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),//入口文件
  output: {
    filename : 'bundle.js',//生成文件
    path: path.join(__dirname, 'dist')//路径
  },
  module: {
    rules: [
      {test: /\.vue$/, use: 'vue-loader'},
      {test: /\.css$/, use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ]},
      {
        test: '/\.styl$/',
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" } ,
          { loader: "stylus-loader"}
        ]
      },
      {test: /\.(gif|jpg|jpeg|png|svg)$/, 
        use: 
        [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name].[ext]'
          }
        },
      ]}
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}


