## vue day07 ##

### webpack基本使用的复习 ###

1. 在项目中安装webpack包

		npm install -D webpack
		npm install -D webpack-cli

	注意事项: 如果安装的是4以上的版本, 还需要装`cli`的包


2. 在全局安装webpack包

		npm install webpack -g
		npm install webpack-cli -g

3. 使用全局的webpack指令, 编译输出文件

	与webpack3不同, webpack4使用指令时, 必须加上 `-o` 的参数才可以正确的输出到./dist目录下

		webpack main.js -o ./dist/main.js

### webpack的配置文件 ###

如果每次执行webpack指令时都需要指定入口和出口, 就太麻烦了, 官方文档也提供了一种配置文件的方式, 只需要在项目的根目录下新建一个名为: `webpack.config.js` 文件, 并且遵循CommonJS规范对外暴露一个配置对象, 按照官方文档进行配置, 即可每次只需要输入webpack自动查找配置文件进行编译打包:

webpack.config.js文件配置如下:

	// 完全遵循了CommonJS规范  这里可以直接写node平台的代码
	const path = require('path')
	
	module.exports = {
	  entry: './main.js', // 指定入口, 相对路径和绝对路径均可
	  output: {
	    path: path.join(__dirname, './dist'), // 指定出口目录, 必须是绝对路径, 相对路径会报错!!!
	    filename: 'bundle.js' // 指定出口文件名
	  }, // 指定出口, 如果不设置, 默认是 ./dist 目录, 输出入口文件同名的文件
	  mode: 'development' // 开发  developer 开发者  Programmer 程序员
	}

### webpack-dev-server的使用 ###

每次修改代码都需要手动运行`webpack`指令, 不符合开发人员的需求

所以可以结合`webpack-dev-server`工具, 完成自动化编译打包

1. 安装`webpack-dev-server`

	必须先安装`webpack`和`webpack-cli`在项目开发依赖!

		npm i webpack webpack-cli -D

	再安装`webpack-dev-server`到项目开发依赖

		npm i webpack-dev-server -D

2. 在`package.json`的`scripts`节点中配置一个运行脚本

	因为webpack-dev-server是安装在项目开发依赖, 无法全局直接运行, 所以必须在`package.json`中配置运行脚本

		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "dev": "webpack-dev-server"
		 },

3. 配置完脚本后, 通过`npm run dev`可以运行脚本

		npm run dev

#### webpack-dev-server的特点 ####

1. 运行`npm run dev`后, 会启动一个web服务器, 将项目根目录托管到web服务器中

2. 每当修改了项目中的main.js文件后就会自动编译

3. 编译输出的文件被托管在项目根目录下, 是一个虚拟文件, 通过`http://localhost:8080/bundle.js`可以直接访问, 但是不会存储在物理磁盘上, 而是放在内存中

	因为放在物理磁盘上影响效率, 而且对磁盘的寿命也有影响

了解了webpack-dev-server的特点后, 在`index.html`中, 就不能再引入 `../dist/bundle.js` 而是应该引入, web服务器根目录的`bundle.js`

	<script src="/bundle.js"></script>

享受它带来的快感吧!

每次修改了main.js后会自动编译输出到根目录的内存中的bundle.js文件, 同时还支持自动刷新浏览器

注意: webpack-dev-server, 主要作用就是在开发阶段方便程序员频繁修改代码, 自动看效果, 如果项目最终上线, 还是需要使用webpack进行打包编译输出到物理磁盘的dist目录

#### webpack-dev-server的常用参数 ####

	--open // 自动打开浏览器
	--port // 自定义端口号
	--contentBase // 指定托管的根目录
	--hot // 热模块替换 HMR Hot Module Replacement

在`package.json`的`scripts`节点下设置:

	"scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1",
	    "dev": "webpack-dev-server --open --port 3000 --contentBase ./src --hot"
	 },

#### webpack-dev-server参数写入配置(第二种设置参数的方式) ####

可以不再命令后面使用参数, `package.json`中直接调用`webpack-dev-server`

在`package.json`的`scripts`节点下设置:

	"scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1",
	    "dev": "webpack-dev-server",
	    "dev2": "webpack-dev-server --open --port 3000 --contentBase ./src --hot"
	},

参数在`webpack.config.js`文件中的`devServer`节点中设置:

	devServer: {
	    contentBase: path.join(__dirname, 'src'), // 托管根路径
	    compress: true, // 启用压缩
	    port: 3000, // 端口号
	    open: true, // 自动打开浏览器
	    hot: true // 2. 开启热更新  如果设置hot为true 需要手动添加HMR插件, 详见第三步
	},

**注意**: 必须有 `webpack.HotModuleReplacementPlugin` 才能完全启用 HMR, 如果 `webpack` 或 `webpack-dev-server` 是通过 `--hot` 选项启动的，那么这个插件会被自动添加, 反之需要手动添加HMR插件, 在`plugins`节点下创建HMR对象即可

	// 1. 导入webpack
	const webpack = require('webpack')

	module.exports = {
		// ...
		plugins: [ // 插件配置项
			new webpack.HotModuleReplacementPlugin(), // 3. 添加热更新插件
		],
	}

### HtmlWebpackPlugin的使用 ###

因为每次使用物理磁盘的`index.html`, 还需要考虑`bundle.js`的位置, `DevServer`生成的`bundle.js`在 `/` 目录, 而`webpack`打包输出的却在`dist`目录, 所以容易产生一些困扰, 开发阶段引用根目录, 上线后又要手动换成`dist`目录, 不太方便

`HtmlWebpackPlugin`帮助我们解决了`bundle.js`的路径问题

1. 将`index.html`托管到内存中的根目录下, 和`bundle.js`同级

2. 自动添加了`bundle.js`的引用

使用方法:

1. 安装插件
	
		npm install --save-dev html-webpack-plugin

2. 在`webpack.config.js`中引入

		// 导入HtmlWebpackPlugin
		const HtmlWebpackPlugin = require('html-webpack-plugin')

3. 在`plugins`节点下添加插件

		plugins: [ // 插件配置项
		    new webpack.HotModuleReplacementPlugin(), // 3. 添加热更新插件
		    new HtmlWebpackPlugin({ // 用于帮助我们自动生成HTML文件的
		      template: './src/index.html', // 如果不指定template, 默认生成一个空的HTML5页面, 指定template表示从哪个HTML文件编译一个新的HTML出来
		      filename: 'index.html' // 默认值就是index.html, 便于开发人员自己查看
		    })
		],

### loader的使用 ###

- webpack默认情况下只支持js文件的打包编译, 除此以外所有的文件都无法解析处理

- 这样设计的目的是为了让webpack更轻量级, 可定制性更高, 根据开发者的需要而选择合适的loader来解析对应的文件

- 所以提出了loader的概念, 主要的目的是为了处理一些其他文件的打包编译

在webpack中, 最基础的css文件也无法处理, 而且使用了webpack之后, css也不会像以前那样在HTML中引入, 而是放在`main.js`中使用es6的`import`语法引入:

	import './src/css/index.css'

#### css-loader和style-loader的使用 ####

由于项目中并未安装`css-loader` 所以无法解析css后缀的文件

1. 安装css-loader和style-loader

		npm i style-loader css-loader -D

2. 配置loader

	rules节点表示loader的匹配规则, 根据不同的正则来匹配不同的文件类型, 从而选择合适的loader来解析文件

		module.exports = {
		  module: {
		    rules: [
		      {
		        test: /\.css$/,
		        use: [ 'style-loader', 'css-loader' ]
		      }
		    ]
		  }
		}

	**注意: loader是有加载顺序的, 顺序是从右到左**

	为什么会有style-loader和css-loader呢?

	css-loader用于解析css文件, 将其解析为样式, 交给style-loader应用到页面中

#### less-loader的使用 ####

根据上面的经验来学习less-loader

1. 装包, 注意: 需要装less-loader和less两个包

		npm i less-loader less -D

2. 配置

		module: {
		    rules: [
		      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
		      // less-loader
		      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
		    ]
		},


#### sass-loader的使用 ####

根据上面的经验来学习sass-loader

1. 装包, 注意需要安装sass-loader和node-sass两个包

		npm i sass-loader node-sass -D

2. 配置

		module: {
		    rules: [
		      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
		      // less-loader
		      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
		      { test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
		    ]
		},

#### url-loader的使用 ####

根据上面的经验来学习url-loader

作用: 由于webpack无法加载图片, 在css中如果使用了`background-image`, webpack就会报错, 同理如果使用了字体文件也无法加载

此时都需要使用`file-loader`或者`url-loader`

两者的区别在于: `url-loader` 更高级一些, 可以添加一些配置, 实现在指定大小以内的图片进行base64的转码, 减少浏览器的二次请求

1. 装包

		npm i -D url-loader file-loader

2. 配置

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

