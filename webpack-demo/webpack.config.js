// 完全遵循了CommonJS规范  这里可以直接写node平台的代码
const path = require('path')
// 1. 导入webpack
const webpack = require('webpack')

// 导入HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './main.js', // 指定入口, 相对路径和绝对路径均可
  output: {
    // path: 'c:\users\ltc\desktop\vue-study-road'
    path: path.join(__dirname, './dist'), // 指定出口目录, 必须是绝对路径, 相对路径会报错!!!
    filename: 'bundle.js' // 指定出口文件名
  }, // 指定出口, 如果不设置, 默认是 ./dist 目录, 输出入口文件同名的文件
  // devServer: {
  //   contentBase: path.join(__dirname, 'src'), // 托管根路径
  //   compress: true, // 启用压缩
  //   port: 3000, // 端口号
  //   open: true, // 自动打开浏览器
  //   hot: true // 2. 开启热更新  如果设置hot为true 需要手动添加HMR插件, 详见第三步
  // },
  plugins: [ // 插件配置项
    new webpack.HotModuleReplacementPlugin(), // 3. 添加热更新插件
    new HtmlWebpackPlugin({ // 用于帮助我们自动生成HTML文件的
      template: './src/index.html', // 如果不指定template, 默认生成一个空的HTML5页面, 指定template表示从哪个HTML文件编译一个新的HTML出来
      filename: 'index.html' // 便于开发人员自己查看
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // less-loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|jpg|gif|jpeg|bmp|webp)$/,
        use: ['url-loader?limit=8192&name=[hash:8]-[name].[ext]']
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192 // 限制 单位为byte  8192字节是8KB
        //     }
        //   }
        // ]
      },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, use: ['url-loader'] }
    ]
  },
  // express.Router()
  mode: 'development' // 开发  developer 开发者  programmer 程序员
}