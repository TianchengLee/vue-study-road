## vue day09 ##

### vue-cli 脚手架 ###

1. 装包

	全局安装 `webpack` 和 `webpack-cli`

		npm i webpack webpack-cli -g

	全局安装 `vue-cli` 脚手架包

		npm i vue-cli -g

2. 使用脚手架命令新建一个`webpack`工程化的`vue`项目

	找一个风水宝地

		vue init webpack 项目名称(目录名称)

	例如:

		PS C:\Users\LTC\Desktop> vue init webpack vue-cms

		? Project name vue-cms
		? Project description 这是一个高端项目
		? Author TianchengLee <ltc6634284@gmail.com>
		? Vue build runtime
		? Install vue-router? Yes
		? Use ESLint to lint your code? Yes 建议选No
		? Pick an ESLint preset Standard
		? Set up unit tests No
		? Setup e2e tests with Nightwatch? No
		? Should we run `npm install` for you after the project has been created? (recommended) npm

3. 执行以上向导完成后, 会自动开始装包, 注意: 使用的是`npm install`, 速度可能会比较慢

	如果安装失败, 建议ctrl + C终止后执行`cnpm i`

4. 安装完成后所有的webpack配置都已配好, 注意: 但是所有的样式预处理loader都没有安装, 需要使用less就安装less和less-loader, 无需自己配置, 只需要安装即可

