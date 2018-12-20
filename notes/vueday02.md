## vue day02 ##

### 往期知识点回顾 ###

1. 创建对象的方式:

		// 对象字面量
		var obj = {} // new Object()
		
		// 数组字面量
		var arr = [] // new Array()
		
		// 正则字面量
		var regex = /\w+/ // new RegExp()
		
		// 使用Object构造函数创建对象
		var obj2 = new Object()
		
		// 自定义工厂函数创建对象
		var obj3 = createObj('zs')
		
		function createObj(name) {
			return {
				name: name
			}
		}
		
		// 自定义构造函数创建对象
		var obj4 = new Student('ls')
		
		function Student(name) {
			this.name = name
		}
		
		// 判断对象的类型, typeof判断对象永远都是 'object'
		console.log(typeof obj4) // 'object'
		
		// instanceof 判断对象的具体类型
		// instanceof 判断依据 是看对象是否在 该构造函数的原型链上
		// A instanceof B 就是看B是否在A的原型链上
		console.log(obj4 instanceof Student) // true
		console.log(obj4 instanceof Object) // true

	总结: 创建对象 永远都离不开 构造函数, 最终一定是 new 构造函数创建出来的对象, 所以不存在几种创建对象的方式, 只有一种, 就是通过构造函数创建对象

2. 闭包

	函数内部包含一个函数, 在内部函数中访问了外部函数中的局部成员

		function outer() {
			var a = 10
			function inner() {
				// 在下面这行代码执行时就会产生 closure 闭包空间
				var b = a + 20
			}
			return inner
		}

		outer()()

	在开发中尽量减少使用闭包, 因为闭包一定会导致内存泄漏

	内存泄漏: 本该被释放的内存, 没有被释放

3. 事件委托(事件代理)

	> 一般用在动态创建元素还需要绑定事件时

	> 因为直接绑定事件, 页面加载时就会绑定一次, 但是动态添加的元素就无法被绑定事件了, 而事件委托的原理是依赖于事件冒泡, 也就是说事件被绑定在父元素身上, 如果将来有新加入的子元素也会响应事件

### 设置类样式 ###

总结来说使用属性绑定的方式设置样式, 一般就是设置 对象 或 数组

1. 设置一个数组

	适合同时设置多个固定样式 (一般不用)

		<h1 :class="['red', 'thin']">这是一个很大很大的H1，大到你无法想象！！！</h1>

	如果其中某些**样式需要动态切换**, 根据标记切换

	在js中属性名如果是合法的变量名, 可以不用加引号, 以下代码表示h1固定样式是red和thin, active样式是根据flag的true或false动态切换

	flag需要在data中定义

		<h1 :class="['red', 'thin', { active: flag }]">这是一个很大很大的H1，大到你无法想象！！！</h1>

	此方式适合多个固定样式结合少量动态切换的样式使用

2. 设置一个对象

	适合多个动态切换的样式, 少部分固定样式使用, 因为固定样式也需要手动加上true, 不如直接用数组来设置样式

		<h1 :class="{ red: true, thin: false, active: true }">这是一个很大很大的H1，大到你无法想象！！！</h1>

3. 使用字符串拼接动态操作类样式 (**不推荐!!!**)

	因为字符串操作容易出现问题, 所以尽量不要使用字符串拼接的方式去动态修改类样式

		<h1 :class="'active red' + (flag ? ' thin' : '')">这是一个很大很大的H1，大到你无法想象！！！</h1>

### 设置行内样式 ###

将样式对象挂载到data节点中:

	var vm = new Vue({
      el: '#app',
      data: {
        styleObj1: { color: 'red', 'font-weight': 200 },
        styleObj2: { 'font-style': 'italic' }
      },
      methods: {}
    })

1. 设置一个对象(比较常用)

		<h1 :style="styleObj1">这是一个h1</h1>

2. 设置一个数组 (数组中放多个样式对象, 可以合并)

		<h1 :style="[ styleObj1, styleObj2 ]">这是一个h1</h1>

### v-for 列表渲染 ###

准备渲染的数据:

	var vm = new Vue({
      el: '#app',
      data: {
        list: [1, 2, 3, 4, 5, 6],
		users: [
          { id: 1, name: 'zs1' },
          { id: 2, name: 'zs2' },
          { id: 3, name: 'zs3' },
          { id: 4, name: 'zs4' }
        ],
		user: {
          id: 1,
          name: '托尼·屎大颗',
          gender: '男'
        }
      }
    })

1. 渲染普通数组

		<p v-for="(item, index) in list">
			每一项: {{ item }}
			索引: {{ index }}
		</p>

2. 渲染对象数组

		<p v-for="(user, index) in users">
			用户ID: {{ user.id }}
			用户名: {{ user.name }}
			索引: {{ index }}
		</p>

3. 渲染对象
		
		<p v-for="(val, key) in user">
			键: {{ key }}
			值: {{ val }}
		</p>

4. 迭代数字

	item从1开始到20结束, 如果要当成索引用, 可以手动 -1

		<p v-for="item in 20">
			{{ item }}
		</p>

### v-for 中的 key 属性 ###

- 结论: 除非使用的列表非常简单, 或者追求极致的性能体验, **都建议在使用v-for时加上 key 属性**

- 原理: 由于使用v-for渲染列表时, vue不会记录每个列表项和数据之间的关系, 都是统一按照索引进行渲染的, 如果此时有一个复选框表单元素被勾选, 然后将新的元素插入到列表的前面, 导致整个列表顺序发生变化, 那么复选框也会跟随索引而勾选 不会跟随数据勾选

- 解决方式: 在使用v-for时加上 :key 属性绑定, 绑定的值为每项数据的唯一标识, 而且数据类型必须是number / string 一般都用id作为唯一标识, 如果没有id时也可以使用索引 实在不行用name也行

### v-if 和 v-show ###

- v-if和v-show都是用于控制元素的显示隐藏
- v-if有较高的切换渲染消耗
- v-show有较高的初始渲染消耗

总结: 如果需要频繁的切换显示隐藏推荐使用v-show, 如果只需要一次切换, 或者一次都没有, 则使用v-if

