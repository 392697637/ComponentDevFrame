@[TOC](<span id="00">文章目录</span>)

## 介绍
  用vue 结合element-ui ,iview设计的用于智慧林业产品的前端开发库，借鉴github部分代码，也遇见许多为，积累了丰富经验总结出这个vue的单页面多级应用开发模板。
参考文献：[vue.js官网](https://cn.vuejs.org/v2/guide/)
## 功能
 1.  单页面的按需加载，（相关路由配置见页面的roouter/inidex.js）
 2.  按需加载组件见ComponentPage页面
 3.  用户及组织机构管理
 4.  角色管理，权限管理 。
 5.  消息中心
 6.  用户登录
 7. 404页面 common/vue/404
 8. 403页面 common/vue/403
 9. 换肤功能
 10. v-dialog拖动指令common/js/directives 

## 安装步骤
+ svn check out  // 把模板下载到本地
 cd ComponentAdminFrame   // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn
 [转至目录](#00)
## 工程目录说明
1. build 文件夹：
这个文件夹主要是进行webpack的一些配置，就我个人觉得啊~对我们最有用并且可能会使用的就是webpack.base.config.js、webpack.dev.config.js、webpack.prod.config.js三个webpack的配置文件，分别是基本webpack配置、开发环境配置、生产环境配置。实际上这些文件里面的内容，一些简单的配置都已经有了，包括入口文件、插件、loader、热更新等都已经配置好了。我们要做的只是根据自己的项目有什么loader需要增加的，比如生成环境需要加上UglifyJsPlugin插件等可以自行配置，或者一些插件增加或者不需要的删除，其实都是和业务相关了，其他的都可以不需要动。

2. config 文件夹：
这几个配置文件我觉得最主要的就是index.js 这个文件进行配置代理服务器，这个地方和我们息息相关，和后台联调就是在这里设置一个地址就可以了。打开index.js 找到“proxyTable“这个属性，然后在里面加上对应的后台地址即可，例如：


3. src文件夹：整个工程最具价值的文件夹，存放绝大部分的页面代码，图片，样式的文件夹。
	 ![智慧林业后台管理系统vue开发模板目录图](https://img-blog.csdnimg.cn/20190418155833754.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1emhlbmc3MDAy,size_16,color_FFFFFF,t_70)

	+ “assets”: 共用的样式、图片
	
	+ “components”: 业务代码存放的地方，里面分成多个组件存放，一个页面是一个组件，一个页面里面还会包着很多组件
	
	+ “router”: 设置路由
	
	+ “App.vue”: vue文件入口界面
	
	+ “main.js：对应App.vue 创建vue实例，也是入口文件，对应webpack.base.config.js里的入口配置

4. static 文件夹：

	存放的文件不会经过webpack处理，可以直接引用，例如swf文件如果要引用可以在webpack配置对swf后缀名的文件处理的loader，也可以直接将swf文件放在这个文件夹引用

5. package.json:

	这个文件有两部分是有用的：scripts 里面设置命令，
	例如设置了dev用于调试则我们开发时输入的是
	`npm run dev`；
	例如设置了build 则是输入` npm run build` 用于打包;
	另一部分是这里可以看到我们需要的依赖包,
	devDependencies：用于本地环境开发环境，这里的包将不会被build。
	dependencies：用户发布环境。
	
	[转至目录](#00)
## 本地开发
+ `npm run dev`
+ // 开启服务器，浏览器访问 http://localhost:7867
##  构建生产
+ // 执行构建命令
	`npm run build`
+ 并将ol.js， ol.css拷贝至dist文件夹下 ***(也可在./index.html中更改对应openlayers引用，按实际更改)*** 
+ 将dist文件夹放在服务器下即可访问
[转至目录](#00)
## 开发注意
+ main.js,router/index.js中有许多全局设置，请慎重按需修改
+ 页面代码建议加上全局class避免样式冲突
+ 能使用已有方法的尽量使用common/js/common.js便于全局管理
+ 获取项目基本属性尽可能用vuex （main.js中配置），同样便于全局管理
[转至目录](#00)
## element-ui iview
+ [element-ui官网](https://element.eleme.cn/#/zh-CN)
+ [iveiw](https://www.iviewui.com/)
## nrm ：一个npm仓库管理工具
 nrm是专门用来管理和快速切换私人配置的registry。当使用官方npm源安装各种包比较慢的时候，建议修改npm源地址。公司有属于自己的是有npm仓库建议使用nrm
+ `nrm ls`  查看nrm 配置
+ `nrm current`  查看当前使用的是哪个源
+ `nrm add  **` 添加npm源，如http://registry.test.org(随便写的)，起个别名叫 test 
  `nrm  add test http://registry.test.org`
+ `nrm  use **` 切换源
+ `nrm  del  **` 删除nrm配置
 [转至目录](#00)
## npm常用命令
+ `npm install  package_name`  //安装
+ `npm install  package_name  -g`//全局安装指定版本，项目中安装得比较少，会在该电脑中安装
+ `npm install  package_name@version`  //项目安装指定版本
+ `npm install  package_name@version --save` //安装指定版本,并将包信息保存在package.json中，项目中一定加--save否则代码+ 可能在别人那跑不了
+ `npm install  package_name@version -dev`//安装指定版本在开发环境中，不会打包
+ `npm uninstall  package_name` //卸载
+ `npm update  package_name` //更新包
[转至目录](#00)
## 打开cmd窗口，powerShell（win10）窗口的快捷方式

+ 在当前窗口地址栏键入cmd可进入对应cmd窗口 cd XX进入当前目录某文件
+ 按住shift，鼠标右击文件夹，进入对应powershell窗口
+ `cd ../`向上一级
[转至目录](#00)


