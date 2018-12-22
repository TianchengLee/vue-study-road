## vue day03 ##

### 过滤器 ###

- 用于 v-bind 和 插值表达式做最后输出前的简单文本处理, **只能用于v-bind和插值表达式**

- 过滤器不会修改原数据, 只是在输出前做一道处理而已, 不能在过滤器中做太复杂的业务逻辑处理

定义过滤器有两种方式:

1. 全局过滤器

	在所有vm实例中都可以使用

	在Vue对象中有一个filter方法用于定义全局过滤器

	参数1: 过滤器的名称

	参数2: 过滤器的回调函数

	回调函数中一定有一个参数, 是在使用过滤器时, 管道符左边的数据

	回调函数的返回值就是过滤器处理的结果

		Vue.filter('msgFormat', (content, unit = "元") => {
			return '¥' + content + unit
		})

	使用方法(msg已定义在data中):

		<p> {{ msg | msgFormat('美元') }} </p>

2. 私有过滤器

	只能在当前vm实例中使用的过滤器, 在Vue构造函数的配置对象中的filters节点下, 和methods/data同级

		let vm = new Vue({
			el: '#app',
			data: {},
			methods: {},
			filters: {
				msgFormat(content) {
					// 这里就是私有过滤处理的区域
					// content就是管道符左边的内容
					// 需要将处理完毕的结果return出去
					return content + '~~~'
				}
			}
		})

### 按键修饰符 ###

如果需要在用户输入完内容, 按回车进行表单的提交, 或者数据添加等操作, 就需要给文本框绑定键盘事件

同时还需要监听到用户输入回车键

Vue提供了按键修饰符解决这个问题

	<input type="text" class="form-control" v-model="name" @keydown.enter="add">

预定义的内置按键修饰符:

	.enter 回车
	.tab 
	.delete (捕获“删除”和“退格”键)
	.esc
	.space 空格
	.up
	.down
	.left
	.right

如果需要用到其他按键, 可以直接使用 .keycode , 以上内置的按键修饰符也可以通过 .keycode来使用

	<input type="text" class="form-control" v-model="name" @keydown.13="add">

如果需要自定义其他按键修饰符别名, 可以通过 `Vue.config.keycodes.xxx = 111` 的方式来定义

	// 可以使用 `v-on:keyup.f2`
	Vue.config.keyCodes.f2 = 113

	<input type="text" class="form-control" v-model="name" @keydown.f2="add">

### 自定义指令(了解) ###

当Vue提供的内置指令无法满足某些需求的时候, 就需要自定义指令来解决问题了

举官方文档中的案例:

需求: 当页面加载时让某个文本框获取焦点, 通过自定义指令 `v-focus` 来完成

1. 全局指令

	通过`Vue.directive()` 定义全局指令

	参数1: 指令名, 不需要v-开头, 但是在使用时需要加上v-便于Vue编译模板时区分普通属性和指令

	参数2: 指令的钩子函数(在特定阶段执行的函数)

		Vue.directive('focus', {
			bind(el) {
				// 当指令被绑定到标签上时执行该函数, 只执行一次
			},
			inserted(el) {
				// 当被绑定元素插入父节点时调用
				// 形参el 就是该指令绑定的元素, 原生DOM对象
				el.focus()
			},
			update(el) {
				// 当DOM元素更新时调用
			},
			componentUpdated() {
				
			},
			unbind() {
				// 只调用一次, 指令与元素解绑时调用
			}
		})

	<input type="text" v-focus />

2. 私有指令

	只能在当前vm实例内部使用

	在Vue构造函数的配置对象中directives节点下, 和data/methods同级

		let vm = new Vue({
			el: '#app',
			data: {},
			methods: {},
			filters: {},
			directives: {
				//focus: {
				//	bind(){},
				//	inserted() {}
				//}
				// 如果focus指令只需要在bind和update阶段做具体的操作,则可以简写为一个函数(全局指令也同理):
				focus() {

				}
			}
		})



