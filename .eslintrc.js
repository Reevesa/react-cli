
/**
 * https: //eslint.org/
 * https: //github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js
 * http : //eslint.cn/docs/rules/
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */
// const dev = process.env.NODE_ENV == 'development';  //区分开发和生产配置
// const dbg = dev ? 'off': ['error', 2];
module.exports = {
  "extends": [
    "yylint",
    "eslint-config-yylint/react"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "experimentalObjectRestSpread": true
  },
  "env": {
      "es6": true,
      "browser": true
  },
  "rules"  : {
    // 以下配置检查
    "array-bracket-spacing": ["error", "always"],              // 强制在[]内使用空格
    "object-curly-spacing" : ["error", "always"],              // 强制在{}使用一致的空格
    "indent"               : ["error", 2, {"SwitchCase": 1}],  // 缩进
    "quotes"               : ["error","single"],               // 强制使用一致的单引号
    "semi"                 : ["error","always"],               // 要求使用分号

    // 关闭规则
    "linebreak-style"        : "off",   // LF CRLF
    "space-in-parens"        : "off",   // ()内的空格
    "no-floating-decimal"    : "off",   // 禁止数字字面量中使用前导和末尾小数点
    "no-param-reassign"      : "off",   // 禁止对 function 的参数进行重新赋值
    "no-return-assign"       : "off",   // 禁止在 return 语句中使用赋值语句
    "radix"                  : "off",   // 强制在parseInt()使用基数参数
    "comma-dangle"           : "off",   // 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，允许（但不要求）使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。
    "no-unexpected-multiline": "off",   // 禁止出现令人困惑的多行表达式
    "valid-typeof"           : "off",   // 强制 typeof 表达式与有效的字符串进行比较
    "no-useless-constructor" : "off",   // 没用的 constructor
    "no-return-await"        : "off",   // 不能return await
    "handle-callback-err"    : "off",   // 不强制回调错误处理
    "react/no-string-refs"   : "off",   // 不能使用refs
    "no-debugger"            : "off",   // 不能使用debugger

    // react自定义规则
    "react/jsx-indent"      : [ 'error', 2 ],   // jsx缩进2个空格
    "react/jsx-indent-props": [ 'error', 2 ],   // @fixable jsx 的 props 缩进必须为四个空格
    "react/jsx-no-duplicate-props":['warn', { ignoreCase: true }],  //检查属性名重名
    "complexity": ['error', 30], // 用来控制函数的复杂度，分支超过30时报错
    "no-extend-native": "off"  ,// 禁止扩展native对象
    "no-inner-declarations": "off", //禁止在块语句中使用声明（变量或函数）
    "complexity": "off",  //循环复杂
    "no-undefined": "off",  //关闭禁止使用undefined变量
  }
};

