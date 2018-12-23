## vue day04 ##

### vue-resource的使用 ###

使用方法:

1. 在vue.js文件后引入

		<script src="./lib/vue-2.4.0.js"></script>
  		<script src="./lib/vue-resource-1.3.4.js"></script>

2. 当引入完成文件后, 在vue对象中就会有一个属性: `$http`

	发送get请求:

	参数1: URL
	参数2: 配置对象

	配置对象中可以设置一个params属性, 也是一个对象, 用于设置get请求的query参数

		vm.$http.get('url', {}).then(result => {
			// 请求成功的结果
		})

	发送post请求:

	参数1: URL
	参数2: 表单数据
	参数3: 配置对象

	一般使用post请求时, 配置对象中最好开启`emulateJSON: true`, 该配置会将表单数据以传统表单格式提交: `application/x-www-form-urlencoded`的 `Content-Type`

		vm.$http.post('url', {name: 'zs'}, {emulateJSON: true}).then(result => {
			// 请求成功的结果
		})

3. 全局配置

	由于在项目开发中, 请求的api根路径一般都是相同的, 而且为了便于后期修改, 需要将请求的根路径进行全局配置:

		Vue.http.options.root = '/root'

	**注意: 如果配置了全局的根路径, 想让其生效, 发送请求时URL必须是相对路径, 例如: `vm.$http.get('url')`, 而不是 `vm.$http.get('/url')`**

	由于在项目开发中, 每次提交表单数据都需要使用传统表单提交, 所以需要将`emulateJSON`选项全局开启:

		Vue.http.options.emulateJSON = true

	当开启了全局的emulateJSON选项后, 以后发送post请求, 第三个参数就不需要再配置`emulateJSON`选项了

### 动画 ###


![官网过渡动画流程图](https://cn.vuejs.org/images/transition.png)

上图描述了在vue中使用过渡类名完成动画的几个阶段, 其中涉及到6个类名:

1. v-enter

	设置元素执行入场动画前的样式

2. v-enter-to

	设置元素执行入场动画完毕后的样式

3. v-leave

	设置元素执行离场动画前的样式

4. v-leave-to

	设置元素执行离场动画完毕后的样式

5. v-enter-active

	设置元素在执行入场动画时的样式

6. v-leave-active

	设置元素在执行离场动画时的样式


使用动画的步骤:

1. 先在需要加动画的元素(必须得是单元素)外, 包裹一个`transition`标签, 是由Vue提供的组件

		<transition>
	      <h1 v-if="flag">社会毒瘤谢俊</h1>
	    </transition>

2. 添加类样式, 设置动画的过渡属性

		.v-enter,
	    .v-leave-to {
	      opacity: 0;
	      transform: translateX(200px)
	    }
	
	    .v-enter-active, 
	    .v-leave-active {
	      transition: all 0.5s ease;
	    }

如果想书写样式时, 不使用默认的v-开头, 可以在transition标签中声明name属性即可, 这个name属性就是类样式的前缀

用于多个动画场景, 例如: p标签需要平移动画, h1标签需要淡入淡出动画, 为了避免类名冲突, 最好自定义前缀

	<transition name="xj">
	  <h1 v-if="flag">社会毒瘤谢俊</h1>
	</transition>

类样式前缀也要同时修改:

	.xj-enter,
    .xj-leave-to {
      opacity: 0;
      transform: translateX(200px)
    }

    .xj-enter-active, 
    .xj-leave-active {
      transition: all 0.5s ease;
    }

### 列表动画 ###

不同于单元素动画, 如果是使用v-for循环渲染出来的列表, 需要使用 `transition-group` 标签包裹

	<transition-group>
	    <li v-for="(item, i) in list" :key="item.id" @click="del(i)">
	      {{item.id}} --- {{item.name}}
	    </li>
	</transition-group>

其他地方同上, 也需要设置过渡的类样式

	.v-enter,
	.v-leave-to {
	  opacity: 0;
	  transform: translateY(50px)
	}
	
	.v-enter-active, 
	.v-leave-active {
	  transition: all 0.5s ease;
	}