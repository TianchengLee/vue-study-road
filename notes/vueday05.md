## vueday05 ##

### 列表动画的其他属性 ###

#### 列表元素同时过渡 ####

例如将数组中的元素删除时, 其他元素也一起执行动画, 此时所有元素都会加上 `v-move` 类名, 当前被删除的元素会加上 `v-leave-active` 类名

	.v-move
	.v-leave-active

所以只需要在`v-move`中开启过渡, `v-leave-active`中开启绝对定位即可

	.v-move {
      transition: all .8s ease;
    }
    .v-leave-active{
      position: absolute;
    }


#### appear属性 ####

列表加载时执行动画

	<transition-group appear>
		<li v-for="(item, i) in list" :key="item.id" @click="del(i)">
			{{item.id}} --- {{item.name}}
		</li>
	</transition-group>

#### tag属性 ####

由于transition-group默认会渲染一个span标签包裹, 如果需要自定义标签, 可以通过tag属性来设置:

	<transition-group appear tag="ul">
		<li v-for="(item, i) in list" :key="item.id" @click="del(i)">
			{{item.id}} --- {{item.name}}
		</li>
	</transition-group>

### 组件化 ###

- 模块化是指在代码的业务逻辑上进行划分, 保证每个模块的职能单一, 从而方便后期管理维护

- 组件化是指在UI界面的代码上进行划分, 提高项目中多个UI组件的复用性



### 创建组件的第一种方式 ###

1. 使用Vue.extend创建组件模板对象

		let com1 = Vue.extend({
			template: '<h1>这是extend创建的组件</h1>'
		})

2. 使用Vue.component注册全局组件

	参数1: 组件名称

	参数2: 组件的模板对象

		Vue.component('com1', com1)

3. 使用组件

	在页面中像使用HTML标签一样, 注意: 如果组件名称是驼峰命名, 需要改为 `-` 连接, 如果全小写, 就是一个单词

		<com1></com1>

### 创建组件的第二种方式 ###

1. 使用Vue.component注册全局组件

	参数1: 组件名称

	参数2: 组件的模板对象

		Vue.component('com2', {
			template: '<h1>这是extend创建的组件</h1>'
		})

2. 使用组件

	在页面中像使用HTML标签一样, 注意: 如果组件名称是驼峰命名, 需要改为 `-` 连接, 如果全小写, 就是一个单词

		<com2></com2>

**注意: 不管使用什么方式注册组件, 组件的根元素都只能有一个**

以上两种注册组件的方式都不好用, 因为template是一个字符串, 所以在其中写HTML没有智能提示, 非常不方便, 所以需要使用最后一种方式来注册

### 创建组件的第三种方式 ###

基本和第二种一样, 但是由于第二种写模板没有智能提示, 所以第三种就将模板抽取到HTML中的template标签内部, 在HTML中先写好模板, 注册组件时直接引用即可

1. 在HTML中定义好模板

		<template id="tmp1">
			<div>
				<h1>这是h1</h1>
				<h2>这是h2</h2>
			</div>
		</template>

1. 使用Vue.component注册全局组件

	参数1: 组件名称

	参数2: 组件的模板对象

		Vue.component('com3', {
			template: '#tmp1'
		})

2. 使用组件

	在页面中像使用HTML标签一样, 注意: 如果组件名称是驼峰命名, 需要改为 `-` 连接, 如果全小写, 就是一个单词

		<com3></com3>

**注意: 不管使用什么方式注册组件, 组件的根元素都只能有一个**


### 组件切换 ###

vscode插件:

	vetur
	vue2 snippets

1. 通过v-if来切换组件

2. 通过component组件来切换组件


		<!-- 这里的component就相当于占位符, 会将comName对应的组件显示在此处, 修改comName的值会切换组件 -->
		<component :is="comName"></component>
	
		data: {
			comName: 'login' // 显示login组件
		}

### 父组件向子组件传值 ###

因为在vue中, 组件之间的data是相互不能共享的, 即使是子组件也无法直接访问父组件的data

如果子组件需要用父组件的数据, 必须通过父组件手动传递过去

通过 **属性绑定** 的方式进行数据传递:

父组件的data:

	data: {
		msg: '这是父组件的数据!'
	}

在子组件使用的地方, 进行属性绑定:

	<sub-com :pmsg="msg"></sub-com>

在子组件的props中需要先声明再使用, props和data还有methods等属性平级, 是一个数组, 其中需要定义字符串类型的属性名:

	...
	data() {},
	methods: {},
	props: ['pmsg'] // 需要存放字符串类型的数据, 字符串就是父组件传递过来的属性名
	...

做完以上操作后, 在子组件中就可以随意的使用pMsg属性了, 用法和data中的数据一样

注意: props中的属性是只读的, data中的属性是可读可写的 

prop的特点是**单向下行绑定**, 数据是只会通过父组件流向子组件的单向数据流, 子组件修改数据父组件是不会同步的, 而父组件修改数据, 所有引用该数据的子组件都会同步刷新

### 子组件向父组件传值 ###

与父组件向子组件传值不同, 子向父传值用的是事件绑定的形式

父组件的methods中声明事件处理函数:

	methods: {
		show(data) {
			console.log('这是子组件传递过来的数据:' + data)
		}
	}

父组件先给子组件绑定一个自定义事件:

	<sub-com @showinfo="show"></sub-com>

子组件在特定的时机, 通过`$emit()`方法触发父组件绑定的事件, 将数据传递过去

`$emit()`:

参数1: 事件名

参数2: 传递的数据, 也就是父组件中事件处理函数的参数

	// 当this指向vm对象时均可触发事件
	this.$emit('showinfo', '哈哈哈,这是子组件的数据')

### ref的使用 ###

Vue不提倡我们操作DOM, 但是有些BT的功能可能通过DOM操作更简单的可以完成, 这时候Vue也提供了访问DOM元素的方式: `ref` 属性

给DOM元素或组件上设置ref属性:

	<h1 ref="hh">这是h1</h1>

在vm实例中可以直接通过`$refs.hh`获取到该DOM对象

	this.$refs.hh

### 路由 ###

路由的目的是为了, 切换不同的组件, 从而实现一个HTML中对应很多组件, 也是所谓的 SPA (Single Page Application) 单页面应用程序

以上就是所谓的前端路由, 通过#锚点完成组件的切换标识

