## vue day08 ##

### babel的使用 ###

1. 装核心包和loader的包

	**注意事项**: 由于`babel-loader`和`babel-core`已经更新, `babel-core`换了个包名, 最新版的包名是`@babel/core`, 最新版本的`babel-core`必须结合最新版本的`babel-loader`使用, 也就是`babel-core7`结合`babel-loader8`使用, 而`npm i babel-loader babel-core -D` 这个指令安装的是`babel-loader8` 和 `babel-core6`, 所以会导致`babel`无法使用, 需要手动将`babel-loader`的版本降为 7

	总结:

		npm i babel-loader@7 babel-core -D

2. 装语法的包

	由于babel默认只能将一部分ES6语法转为ES5, 所以还需要根据自身的需求选择语法预设 (preset)

	必须要装的是`env`, `stage-X`可以选装, 但是如果需要用更高级的ES6语法, 建议都装

	不推荐使用最新版本的插件而放弃stage, 这样你会多很多工作

		npm i babel-preset-env babel-preset-stage-0 -D

3. 在`webpack.config.js`中配置好loader

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
		      { test: /\.(eot|svg|ttf|woff|woff2)$/, use: ['url-loader'] },
		      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
		    ]
	  	},

4. 在项目根目录新建一个`.babelrc`配置文件, 并在其中配置好语法预设

		{
		  "presets": ["env", "stage-0"]
		}

### render函数的使用 ###

创建VM实例时, 指定el属性来设置VM实例的托管区域, 以后可以将注册的组件在托管区域内以标签形式来使用

如果使用render函数, 则是将指定的某个组件, 直接替换掉托管区域(app)

传统的component方式:

	var login = {
      template: '<h1>这是登录组件</h1>'
    }

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: {
        login
      }
    });

使用render函数渲染组件:

	var login = {
		template: '<h1>这是登录组件</h1>'
	}

	var vm = new Vue({
		el: '#app',
		data: {},
		methods: {},
		render: function(createElement) {
			return createElement(login)
		}
	})

简写:

	var login = {
		template: '<h1>这是登录组件</h1>'
	}

	var vm = new Vue({
		el: '#app',
		data: {},
		methods: {},
		render: c => c(login)
	})

### 使用webpack引入vue ###

1. 安装

		npm i vue -S

2. 正在main.js中引入vue

	注意: 如果在main.js中直接引入安装好的vue, 那么默认会引入`vue.runtime.common.js`而非完整版的vue.js文件

	vue包的package.json中配置的main节点如下:

		"main": "dist/vue.runtime.common.js",

3. 在引入vue之前, 先给vue引入起个别名, 指向完整版的vue.js文件

	在webpack.config.js的配置对象中, 新增一个`resolve`节点, 添加`alias`属性

		resolve: {
		    alias: {
		      'vue$': 'vue/dist/vue.js'
		    }
		},

4. 在main.js中直接引入vue

		import Vue from 'vue'

### 模块化vue组件 ###

1. 装包

		npm i vue-loader vue-template-compiler -D

2. 在webpack配置文件中添加匹配规则

		{ test: /\.vue$/, use: 'vue-loader'}

3. 在webpack添加VueLoaderPlugin插件

	**注意: 这一个插件是必须的!**

		const VueLoaderPlugin = require('vue-loader/lib/plugin')
		...
		plugins: [ // 插件配置项
		    new webpack.HotModuleReplacementPlugin(), // 3. 添加热更新插件
		    new HtmlWebpackPlugin({ // 用于帮助我们自动生成HTML文件的
		      template: './src/index.html', // 如果不指定template, 默认生成一个空的HTML5页面, 指定template表示从哪个HTML文件编译一个新的HTML出来
		      filename: 'index.html' // 便于开发人员自己查看
		    }),
		    new VueLoaderPlugin()
		],

4. 新建vue文件

	注意: vue文件内部有三个节点, 分别是 `<template></template>` 和 `<script></script>` 还有 `<style></style>`

	分别表示HTML模板, js代码, 样式, template节点下只能有一个根元素

	login.vue:

		<template>
		  <div>
		    <h1>这是通过vue文件写的登录组件!!!</h1>
		  </div>
		</template>
		
		<script>
		export default {
		  
		}
		</script>
		
		<style>
		h1 {
		  color: pink;
		}
		</style>

5. 在main.js中导入login.vue文件, 以变量接收对象
	
		import login from './src/login.vue'

6. 使用render函数渲染login组件

		let vm = new Vue({
		  el:'#app',
		  data: {
		    msg: 'xxx'
		  },
		  render: c => c(login)
		})

	**注意**: 使用render函数渲染组件, 可以使用`vue.runtime.common.js`的vue包, 不会报错

	不过render函数的特点是将app盒子直接替换成login组件

### ES6的export和export default ###

在同一个目录中有两个js文件: `m1.js` 和 `m2.js`

在ES6中, 导入和导出的语法一共就4种方式:

	import *** from *** 例如: import $ from 'jquery'
	import *** 例如: import './css/1.css'
	export
	export default

由于开发中会用到模块化, 所以在一个js文件中定义的成员, 需要向外暴露, 就可以使用export或export default

1. export default 介绍

	一个js文件, 只能通过 `export default` 向外暴露一次

	通过 `export default` 暴露的对象, 可以在 `import` 的时候手动指定变量名接收, 不需要考虑导出时的变量, 相当于直接把整个数据导出了

	案例: 在`m1.js`中导出一个对象, 在`m2.js`中接收

	`m1.js`

		export default {
			name: '张三',
			age: 18
		} 

	`m2.js`

		import person from './m1.js'

2. export 介绍

	一般将export称为按需导出

	在一个js文件中, 可以通过`export`向外暴露多个成员

	通过 `export` 暴露的成员, 必须定义名称, 而且其他地方导入的时候, 必须按照导出时定义名称来选择导入

	导入时可以通过 `as` 起别名

	案例: 在`m1.js`中导出多个数据, 在`m2.js`中接收

	`m1.js`

		export let name = '李四'
		export let age = 18
		export let gender = '男'
		export let obj = { name: '对象的名字' }

	`m2.js`

		import { name, age, obj as o } from './m1.js'

### 在webpack中使用vue-router ###

1. 装包

		npm i vue-router -S

2. 导入vue-router包并安装到vue身上

		import Vue from 'vue'
		import VueRouter from 'vue-router'
		// 手动安装到vue身上
		Vue.use(VueRouter)

3. 创建路由对象

		import account from './componets/account.vue'

		let router = new VueRouter({
			routes: [
				{ path: '/account', component: account }
			]
		})

4. 将路由对象挂载到vm实例

		let vm = new Vue({
			el: '#app',
			data: {},
			router
		})

