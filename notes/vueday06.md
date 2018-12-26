## vue day06 ##

### 路由的基本使用 ###

1. 导入vue-router的js文件

		<script src="./lib/vue-router-3.0.1.js"></script>

2. 创建组件的模板对象

		// 组件的模板对象
	    var login = {
	      template: '<h1>登录组件</h1>'
	    }
	
	    var register = {
	      template: '<h1>注册组件</h1>'
	    }

3. 创建路由对象, 配置路由的匹配规则

		let router = new VueRouter({
			// 匹配规则
			routes: [
				{ path: '/login', component: login },
				{ path: '/register', component: register }
			]
		})

4. 将router挂载到vm实例身上

		let vm = new Vue({
			el: '#app',
			data: {},
			methods: {},
			router
		})

5. 提前准备好一个"坑", 占位组件 `router-view`

	`router-view`在哪里, 路由匹配成功后组件就会放到哪里

		<router-view></router-view>

注意: 当vue-router包引入后, 会自动开启hash路由模式, 也就是在地址栏最后会自动加上 `#/`

路由切换的原理: 地址栏的hash `#/` 的值发生变化时, 路由会进行匹配, 将匹配的组件替换到 `<router-view>` 的区域中

结合a标签可以实现, 点击切换路由, 例如:

	<a href="#/login">登录</a>
	<a href="#/register">注册</a>

### router-link的使用 ###

上面使用a标签的方式, 每次都需要在 `/` 前面加一个 `#` 不符合优雅的程序员编程习惯

Vue-Router也提供了一个组件来帮助我们渲染a标签: `router-link`

	<router-link to="/login">登录</router-link>
	<router-link to="/register">注册</router-link>

如果你不希望router-link渲染成一个a标签, 还可以通过tag属性指定你希望渲染的标签元素

	<router-link tag="span" to="/login">登录</router-link>

**注意: 即使被渲染成了span, 点击还是会切换路由, 因为不管渲染成什么元素, Vue-Router都会为其绑定点击事件**

### redirect的作用 ###

用于设置页面加载时默认显示的组件

在路由匹配规则的配置中使用path+redirect属性来设置重定向的组件:
	
	...
	routes: [
		{ path: '/', redirect: '/login' },
		{ path: '/login', component: login },
	]
	...

### 当前选中的路由链接高亮 ###

`router-link` 默认会有切换时的类样式, 当前显示的路由, 默认加上的类名为: `router-link-active`

我们可以自己添加css类样式完成当前路由高亮的效果

除此之外, 还可以将默认值修改为自定义的类名:

在路由的构造选项中, 通过 `linkActiveClass` 设置自定义类名

	let router = new VueRouter({
      // 本地打开只能使用 hash , 不能使用history, 如果需要使用history模式, 必须后台服务器给予支持
      // mode: 'history',
      // route // 这个配置对象中的 route 表示 【路由匹配规则】 的意思
      routes: [ // 路由匹配规则 
        // 每个路由规则，都是一个对象，这个规则对象，身上，有两个必须的属性：
        //  属性1 是 path， 表示监听 哪个路由链接地址；
        //  属性2 是 component， 表示，如果 路由是前面匹配到的 path ，则展示 component 属性对应的那个组件
        // 注意： component 的属性值，必须是一个 组件的模板对象， 不能是 组件的引用名称；
        // { path: '/', component: login },
        { path: '/', redirect: '/login' }, // 这里的 redirect 和 Node 中的 redirect 完全是两码事
        { path: '/login', component: login },
        { path: '/register', component: register }
      ],
      linkActiveClass: 'myactive'
    })

### 路由传参-query ###

与后端路由传参方式一样, 在链接最后加上 ? 传参

	<router-link to="/login?name=zs&age=18"></router-link>

query传参的特点是, 路由匹配规则和 `/login` 一样, 不需要做额外的修改

	var router = new VueRouter({
      routes: [
        { path: '/login', component: login },
        { path: '/register', component: register }
      ]
    })

在login组件内部, 根据 `组件实例.$route.query` 获取query对象

	this.$route.query.name

如果需要把参数渲染到页面, 由于以前使用data中的数据渲染到页面, 可以省略this, 这里同理, 如果需要使用插值表达式进行渲染:

	{{ $route.query.name }}

### 路由传参-params ###

这种方式需要在路由匹配中定义好才可以使用 `:id`

	var router = new VueRouter({
      routes: [
        { path: '/login/:id/:name', component: login },
        { path: '/register', component: register }
      ]
    })

定义好了路由规则之后, 可以直接在URL中进行传参了:

注意: 必须完整匹配

	<router-link to="/login/1/ls"></router-link>

在login组件实例中可以使用 `$route.params.id` 获取参数

	this.$route.params.id
	this.$route.params.name

如果需要渲染到页面也可以通过插值表达式进行渲染

### 路由嵌套(子路由) ###

先在路由匹配规则中, 通过`children`属性来确定路由之间的关系:

	var router = new VueRouter({
      routes: [
        {
          path: '/account',
          component: account,
          // 使用 children 属性，实现子路由，同时，子路由的 path 前面，不要带 / ，否则永远以根路径开始请求，这样不方便我们用户去理解URL地址
          children: [
            { path: 'login', component: login },
            { path: 'register', component: register }
          ]
        }
        // { path: '/account/login', component: login },
        // { path: '/account/register', component: register }
      ]
    })

注意: 如果在写子路由的匹配规则, 需要注意, path前面不能加 `/` 如果加 `/`表示直接匹配 `/login`, 而我们期望的是匹配 `/account/login`, 所以不能在子路由的规则前面加上 `/` 必须是相对路径, 如果期望就是 `/login`, 那么就可以在前面加上 `/`

匹配规则书写完后, 还需要在account组件中, 放置一个 `<router-view></router-view>` 组件, 用于切换子路由的登录注册组件

### watch的使用 ###

用于监视数据的变化

在data中先定义好数据并使用

与data同级的位置有一个watch属性, 也是一个对象, 在其中可以定义一些与data中要监视的数据同名的函数, 用于监听data中数据的变化:

	let vm = new Vue({
		el: '#app',
		data: {
			msg: '嘻嘻嘻'
		},
		methods: {},
		watch: {
			// 此处的函数名必须和data中要监视的数据一致
			msg(newVal, oldVal) {
				// 当msg发生变化的时候会执行该函数, 在此处可以处理一些操作
			}
		}
	})

除了可以监视data中已有数据, watch还可以监视vm实例身上的属性, 例如最常用的就是监视路由的变化: `$route` 对象的变化

	watch: {
		$route(to, from) {
			// to 表示路由改变后的值
			// from 表示路由改变前的值
		}
	}

### computed属性的使用 ###

1. 计算属性就是定义在 `computed` 中的函数, 虽然是一个函数, 使用时和`data`中的属性一模一样, 就当成一个普通的数据使用即可

2. 在计算属性内部用到的**所有数据**, 只要发生了变化, 计算属性会自动同步

3. 同步的结果还会缓存, 如果多个地方引用了计算属性, 不会重复计算, 每次更新只会计算一次

4. 由于计算属性使用和`data`中的属性一模一样, 也是挂载到vm实例身上的一个数据, 所以**不能和`data`中的属性产生冲突, 重复声明!!!**

5. 计算属性无法通过外界修改, 只有当内部引用的数据发生变化时才会自动更新

案例:


	data: {
		msg: '谢俊今天没洗头,'
	},
	computed: {
		fullMessage() {
			return this.msg + '今天天气真好啊!'
		}
	}

当msg发生变化时, fullMessage会自动更新

### nrm的使用 ###

由于npm默认的服务器站点访问速度较慢, 所以之前我们使用`cnpm`进行包的安装

但是有时候`cnpm`装包会出现问题, 或者无法安装

还有另一个渠道, 使用`nrm`修改npm下载源地址

1. 安装nrm

		npm i -g nrm

		或

		cnpm i -g nrm

2. 通过 `nrm ls` 查看所有支持的源

	`*`表示当前正在使用的源

		C:\Users\LTC>nrm ls
	
		  npm ---- https://registry.npmjs.org/
		  cnpm --- http://r.cnpmjs.org/
		* taobao - https://registry.npm.taobao.org/
		  nj ----- https://registry.nodejitsu.com/
		  rednpm - http://registry.mirror.cqupt.edu.cn/
		  npmMirror  https://skimdb.npmjs.com/registry/
		  edunpm - http://registry.enpmjs.org/

3. 通过 `nrm use cnpm` 切换当前使用的源

		nrm use cnpm

		C:\Users\LTC>nrm use cnpm

   		Registry has been set to: http://r.cnpmjs.org/

4. 做完以上操作后, 正常使用 `npm i` 安装你的包即可

### webpack4的基本使用 ###

1. 打包

	会自动创建输出目录
	
		webpack 入口文件 --output 输出文件

	举例:

		webpack main.js -o ./dist/main.js

	-d 参数可以指定当前的模式为development, 即不压缩

		webpack main.js -o ./dist/main.js -d

	在webpack3中不需要指定以上所有的参数, -o和-d都不需要, 但是在webpack4中必须指定 -o, 如果不指定-d默认以production模式打包, 会进行压缩, 速度较慢, 开发阶段建议不要使用

