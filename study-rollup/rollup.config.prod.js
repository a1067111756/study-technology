const path = require('path')
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import vuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

module.exports = {
  input: path.resolve(__dirname, './src/index.js'), // 入口文件
  output: [
    { // 打包umd格式文件
      file: path.resolve(__dirname, './dist/bundle.min.umd.js'), // 输出路劲
      format: 'umd', // umd - 统一兼容模式 cjs - commonJs模式 ejs - es6模式
      name: 'TestLib', // 对外暴露的顶级变量
      globals: {  // 全局变量
        'vue': 'Vue'
      }       
    },
    { // 打包es格式文件
      file: path.resolve(__dirname, './dist/bundle.min.es.js'), // 输出路劲
      format: 'es', // umd - 统一兼容模式 cjs - commonJs模式 ejs - es6模式
      name: 'TestLib', // 对外暴露的顶级变量
      globals: {  // 全局变量
        'vue': 'Vue'
      }        
    },
    { // 打包es格式文件
      file: path.resolve(__dirname, './dist/bundle.min.common.js'), // 输出路劲
      format: 'cjs', // umd - 统一兼容模式 cjs - commonJs模式 es - es6模式
      name: 'TestLib', // 对外暴露的顶级变量
      globals: {  // 全局变量
        'vue': 'Vue'
      }       
    }    
  ],
  // 排除打包的资源
  external: ['vue'],  
  // 插件
  plugins: [
    nodeResolve(), // 三方依赖打包
    json(), // 支持引用json文件
    vuePlugin(), // vue文件解析器
    postcss(), // css预处理器
    commonjs(), // 支持commonJs语法
    babel(), // babel语法转义
    terser() // 压缩插件    
  ]
}