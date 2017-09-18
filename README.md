## README

### 使用方法
>npm install         	  --安装项目依赖包

>npm run dev         --本地开发环境 localhost：8000

>npm run build       --项目构建

### 项目说明

1、此项目是根据vue官方样本[webpack-simple](https://github.com/vuejs-templates/webpack-simple)改进而来，加入了一些实际项目中需要用到的功能（稍后会介绍）

2、完整的技术栈是`webpack2.x` + `vue2.x` + `vue-router` + `ES6`模块，未来也可根据需要添加，比如less、vuex、服务端渲染以及gulp任务管理、本地server定制等等功能

3、提供的功能有vue单文件组件、路由、热更新、css文件单独提出、html动态添加、文件打包压缩等功能

4、此项目的webpack配置主要针对于单页面应用开发

5、项目新添加了本地server定制功能，利用express框架搭建了本地服务器，用于开发环境下的调试以及API代理、mock数据等等功能

### 项目结构说明

项目整体分为以下几个目录

>src--存放业务开发过程中的各类资源

>dist--是整个项目的产出，由webpack自动打包生成

>node_modules--存放项目依赖包

>server.js--本地服务器

>build--webpack配置文件

#### 目录结构
``` 
vue-simple-template
|---build             webpack相关配置文件
|---dist
  |---css             编译输出的css
  |---js              编辑输出的js
  |---images          编译输出的图片
  |---fonts           编译输出的字体图标
  index.html          编译后的入口文件
|---src
  |---assets          第三方资源及图片等
    |---images	      图片
    |---lib           第三方资源
  |---components      组件
   	|---button.vue    button组件
  |---layouts         布局文件
	|---main.vue   
  |---pages           页面文件
	|---404.vue
	|---about.vue  
	|---home.vue
  |---index.html      打包入口文件
  |---index.js        js入口文件
  |---routes.js       本地路由文件
|---server.js         本地服务端入口文件
     
```
#### 目录说明



### webpack配置说明

1、在webpack入口处，我使用CommonsChunkPlugin插件对单页面中共同依赖的js文件，如jQuery、vue文件进行单独提取，以方便后期利用cdn进行静态资源缓存，同时减小单次请求下js文件大小，避免all in one情况的出现，减少页面初始加载时间，优化用户体验。

注意:对于不是所有页面均依赖的js文件最好根据实际情况考虑是否利用CommonsChunkPlugin进行提取，比如存在只有两个页面依赖一个js文件，但是剩下的40个页面均不依赖该文件的情况，则应该考虑异步加载的方式，没有必要在页面中全局加载该文件。

2、开发模式的切换，此配置文件有两种开发环境，一种是利用webpack的webpack-dev-server，开箱即用，在package.json文件中修改script中的dev为"cross-env NODE_ENV=development webpack-dev-server --open --hot"，同时配置webpack.config.js中的devServer参数，即可使用。

另一种方式是自定义本地开发环境，我采用**express**进行搭建，利用**webpack-dev-middleware**中间件进行编译，同时加入opn模块(用于自动打开浏览器)和**webpack-hot-middleware**中间件实现热更新(HRM)，本地开发环境好处在于后期可根据项目需求进行个性化定制，比如API代理，处理动态请求，处理静态资源等等。

3、因为项目是单页面应用，前端路由并不是真正意义上的路由，在除首页外的其他路由页面，浏览器刷新之后会因为后台无法找到对应路径而显示404的情况，因此需要配置服务器，将所有路由跳转回单页面的入口文件，不同服务器有不同配置方式，我搭建的本地node服务器，采用的是**connect-history-api-fallback**模块，其他服务器的配置方式等我收集完再来补全。。

### 本地node环境搭建说明

1、除上述本地环境说明外，新增加了代理服务和本地数据mock服务，前后端分离开发时，有可能面临前端开发完成，而API尚未完善的情况，这时为了避免出现互相等待的情况，可以利用数据mock服务对API进行模拟，前端利用本地mock数据进行测试和后续开发，无需等待后台。同时前后端联调时，也可以在本地开发环境下利用proxy服务进行联调，而不必进行编译部署，提高开发效率








