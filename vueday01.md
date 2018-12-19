## vue day01 ##

### hello vue ###

vue就是一个js文件而已

1. 新建HTML页面, 引入vue.js文件

		<script src="./lib/vue-2.4.0.js"></script>

2. 在页面中准备一个Vue的控制区域

		<div id="app"></div>	

3. 创建Vue实例

		var vm = new Vue({
	      el: '#app',
	      data: {
	        hello: '你好啊vuejs!'
	      }
	    })

4. 在app控制区域中使用vue的指令或者插值表达式将hello数据渲染到页面

	插值表达式:

		<div id="app">
			<p>
				{{ hello }}
			</p>
		</div>

	v-text:

		<p v-text="hello"></p>

	v-html:

		<p v-html="hello"></p>

	如果hello数据中有HTML标签, v-html会解析HTML标签, 而v-text会直接将其解析成纯文本输出


### 基础指令 ###

在vue中, 一切以 `v-` 开头的都是指令: directive


插值表达式, Mustache语法也被称为小胡子语法:

	{{ msg }}

1. v-cloak

	了解即可, 可以结合css解决插值表达式闪烁的问题, 让标签元素默认隐藏, v-cloak的特点是当数据渲染完成后自动显示

2. v-text

	将数据以**纯文本**的方式渲染到指定标签内部, 会直接覆盖标签内部的内容

3. v-html

	同v-text, 区别在于可以渲染**HTML标签**

4. v-bind

	做属性绑定的指令, 在标签中绑定title属性: 如果使用了属性绑定, 属性值就会被解析成JS表达式, 所以msg必须在vm实例的data中定义好, 否则会报错

		<input v-bind:title="msg" />

	该指令使用非常频繁, 所以有简写形式 是 冒号  `:`

		<input :title="msg" />

	而且v-bind可以绑定原生的dom属性, 也可以绑定自定义属性

5. v-on

	做事件绑定的指令, 简写形式 是 艾特符号 `@`

		<input @mouseover="clickHandler" v-on:click="clickHandler" />

	`clickHandler`必须在vue实例的 methods 节点中定义

		var vm = new Vue({
	      el: '#app',
	      methods: {
	        clickHandler() {
	          console.log('秀!')
	        }
	      }
	    })

	如果需要绑定其他事件, 将click换成其他事件名即可

6. v-model

	**注意: 这是唯一一个实现双向数据绑定的指令, 而且只能用于表单元素, 不需要指定属性, 只能绑定value属性**

		<input type="text" style="width:100%;" v-model="msg">

	如果双向数据绑定, 一定要先在data中定义好msg

### 事件修饰符 ###

事件修饰符在事件绑定时, 加在事件名后面

	<input @click.stop="roll" type="button" value="动起来">

事件修饰符可以串联加多个

	<input @click.stop.prevent="roll" type="button" value="动起来">

1. 阻止冒泡

	.stop

2. 阻止浏览器默认行为
 
	.prevent

3. 使用捕获, 等同于 `addEventListener()` 第三个参数传入true的效果

	.capture

4. 只有点击当前元素自身才会触发事件, 如果通过冒泡或者捕获传递过来的事件不会触发

	.self

5. 只触发一次

	.once

6. 在移动端使用scroll事件时建议加上, 可以提高性能

	.passive