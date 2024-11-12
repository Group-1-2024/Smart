# 目录结构

mock/ 本地 mock 文件 [需要更改] src/ 核心工作目录 [需要更改] types/ 整个项目的类型声明文件 [需要更改] .editorconfig .env 在不同环境下面自动读取/注入不同的环境变量 import.meta.env.VITE_xxx_xxx .eslintignore 避免 eslint 检查 .eslintrc.js eslint 配置文件 .gitignore 避免 git 跟踪 .prettierignore 避免 prettier 检查 prettier.config.js prettier 配置文件

CHANGELOG.md 项目更新日志 commitlint.config.js 规范提交

# 基础信息

npm run bootstrap 安装项目依赖 pnpm i/npm i/yarn i npm run serve => npm run dev 启动项目 npm run build => npm run build:prod 打包项目

# 如何新增页面

1. 新增路由模块 /src/router/routes/modules/模块名.ts

- /src/router/routes/modules/about.ts 单页模块代表
- /src/router/routes/modules/deshboard.ts 多页模块代表核心动作: 修改 path name redirect meta children

2. 新增路由模块所需要的页面

- 每一个模块的所有页面最好用一个目录管理(一个页面用一个目录/index.vue 来表达)
- /src/views/模块名/页面名/index.vue

# 如何在本地 mock 数据

1. 在根目录下的 mock 目录中 新建一个 ts 文件 (文件名没有什么要求，只求语义化)
2. 默认导出一个数组 数组里的每一个成员对象就是一个接口
