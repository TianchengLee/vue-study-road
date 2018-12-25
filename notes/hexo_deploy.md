---
title: 使用hexo部署一个博客服务器
date: 2018-12-25 18:38:04
tags:
---


## 使用hexo部署一个博客服务器

### 环境准备 ###

1. 安装node.js
2. 安装git

如果不会, 自行百度

### 安装hexo相关的工具 ###

1. 全局安装 `hexo-cli`

		npm i hexo-cli -g

### 创建一个博客项目 ###

1. 使用`hexo init <目录名>`

	下载时间较长, 比较耗时, 需要去github下载模板代码

		hexo init hexo-blog

2. 使用`npm install`安装项目依赖

		cd hexo-blog
		npm i

3. 当安装完毕后, 目录中就会有一系列文件, 其中 `_config.yml` 存放着博客的配置信息

4. `_config.yml` 配置项如下:

		title: 天成的个人博客 # 标题
		subtitle: Code is my life. # 子标题
		description: Code is my life. # 描述
		keywords: Web,前端,node,ES6,开发,程序员,技术宅,java,android,Python,爬虫 # 关键词, 用于做SEO优化
		author: 李天成 # 作者
		language: zh-CN # 语言
		timezone: Asia/Shanghai # 时区

	更多配置参见官网配置文档

5. 使用`hexo new <文章标题>`来写博客

		hexo new frontend_niubi

	执行完该命令后, 会在 `./source/_posts/`目录下新建一个 `frontend_niubi.md` 文件

	之后就可以随心所欲的写笔记了!

6. 写完笔记后, 使用 `hexo g` 命令结合主题(配置文件中: theme: landscape)和笔记(./srouce/_posts/目录中)生成HTML/css/js静态文件 

		hexo g

	执行完命令后, 会在 `./public` 中生成静态文件

7. 最后只需要执行`hexo server` 启动服务器, 即可看到博客了!

		hexo server

	默认开启端口是4000, 通过 -p 可以指定端口号

		hexo server -p 80

## hexo与github.io爱的结晶 ##

Github给每个用户都提供了一个轻量级的web服务器, 每个人的域名是: `用户名.github.io`

非常适合做博客, 这里就可以结合hexo生成的静态文件部署一个属于自己的个人博客

1. 在github上新建一个仓库, 仓库名必须是`github用户名.github.io`

2. 使用hexo的deploy功能完成项目的自动化部署

	在部署之前, 一定要先配置好部署的参数

	hexo支持五个部署方式, 我们采取git

	首先在`_config.yml`配置文件中的 `deploy:` 节点下配置一下 `type`

		deploy: 
  			type: git

	如果使用的是git部署, 必须先装一个包:

		npm install hexo-deployer-git --save
	
	装完以后修改配置:

		deploy:
		  type: git # 类型为git
		  repo: <repository url>  # 仓库地址
		  branch: [branch] # 分支名
		  message: [message] # 

	配置完成后, 执行`hexo g` 然后执行 `hexo d`

	hexo d是在将生成的静态文件, push到远程刚刚建好的仓库中, 而刚刚建的那个仓库正好可以通过`用户名.github.io`直接访问, 就是一个web服务器

		hexo g
		hexo d

## 设置hexo的主题 ##

**墙裂推荐next主题, 不接受反驳!!!**

1. 安装

	进入hexo博客的目录

		cd hexo-blog
	
	将next的源码克隆到当前目录的themes目录下

		git clone https://github.com/iissnan/hexo-theme-next themes/next