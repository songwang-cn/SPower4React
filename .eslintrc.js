module.exports = {
  // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
  "env": {
    "browser": true,
    "es6": true
  },
  // 一个配置文件可以被基础配置中的已启用的规则继承。
  "extends": [
    "airbnb",
    "react",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "prettier"
  ],
  // 自定义全局变量
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "_": true,
    "$": true,
  },
  // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
  // "parser": "@typescript-eslint/parser",
  // 配置解析器支持的语法
  "parserOptions": {
    "ecmaFeatures": {
      "js": true,
      "ts": true,
      "jsx": true,
      "tsx": true
    },
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  // ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
  // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
  "plugins": [
    "react",
    // "@typescript-eslint"
  ],
  // ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  "rules": {
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
      }
    ],
    'no-useless-escape': 2,
    'no-console': 'off',
    'max-len': 'off', // 强制一行的最大长度
    'import/extensions': 'off', // 不验证导入文件扩展名
    'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
    'import/no-cycle': 'error', // 禁止一个模块导入一个有依赖路径的模块回到自己身上
    semi: ['error', 'never'], // 不使用分号
    eqeqeq: 'warn', // 要求使用 === 和 !==
    'no-param-reassign': 'off', // 允许 function 的参数进行重新赋值
    'import/prefer-default-export': 'off', // 禁用默认输出
    'default-case': 'error', // switch 必须使用 default
    'no-restricted-syntax': 'off', // 禁用特定的语法
    'no-await-in-loop': 'error', // 禁止在循环中出现 await
    'import/no-unresolved': 'off', // 确保导入指向一个可以解析的文件/模块
  }
};