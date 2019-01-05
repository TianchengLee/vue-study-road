## vue day11 ##

### VSCode快捷键 ###

1. 向上/下移动代码片段

	alt + 上箭头或下箭头

2. 向上/下复制代码片段

	alt + shift + 上箭头或下箭头

3. 换至下一行

	ctrl + enter

4. 换至上一行

	ctrl + shift + enter

5. 删除选中行

	ctrl + shift + k

6. 关闭当前窗口

	ctrl + w

### mui滑动插件的bug处理方案 ###

babel的目的是将ES6或更高级的语法转换为ES5的语法

在使用babel5以上时, 默认会将每个js文件加上 `'use strict'` 开启严格模式, 而`mui`中使用了`arguments`, 所以会报错

方案1: 放弃mui   舍弃

方案2: 关闭babel默认开启的严格模式   目前版本(babel6及以上) 已经无法通过插件关闭严格模式了  故 舍弃

方案3: 忽略某个文件   采用此方案

在`.babelrc`的配置文件中, 添加ignore节点:

	{
	  "presets": [
	    ["env", {
	      "modules": false,
	      "targets": {
	        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
	      }
	    }],
	    "stage-2"
	  ],
	  "ignore": [
	    "./src/lib/mui/js/mui.js"
	  ]
	}

### vue-preview插件的注意事项 ###

- 由于vue-preview插件已经更新, 所以调整样式很麻烦, 这里推荐使用插件 vue2-preview, 这是一个机制的小伙子保留下来的旧版本插件

- 但是这个机制的小伙子也更新了插件, 所以选择vue2-preview的1.0.2的版本进行使用

1. 装包

		npm i vue2-preview@1.0.2 -S

2. 配置loader

	如果你是使用vue-cli生成的项目，可能需要你修改webpack.base.conf.js文件中的loaders，添加一个loader。 原因：插件编写中使用了es6的语法，需要进行代码编译

		{
		    test: /vue-preview.src.*?js$/,
		    loader: 'babel'
		}

3. 安装插件

		import VuePreview from 'vue2-preview'
		Vue.use(VuePreview)

4. 使用案例

		<template>
		  <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">
		</template>
		
		<script>
		export default {
		    data () {
		      return {
		        list: [{
		          src: 'https://placekitten.com/600/400',
		          w: 600,
		          h: 400
		        }, {
		          src: 'https://placekitten.com/1200/900',
		          w: 1200,
		          h: 900
		        }]
		      }
		    }
		  }
		</script>