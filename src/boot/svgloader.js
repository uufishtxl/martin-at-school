/* eslint-disable */

import { boot } from 'quasar/wrappers'

const req = require.context('src/assets/icons', true, /\.svg$/)
// 遍历require.context的返回模块，并导入
const requireAll = (requireContext) => requireContext.keys().map(requireContext) // eslint-disable-line
// import所有符合条件的svg 三个参数：文件夹、是否使用子文件夹、正则
requireAll(req)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot((/* { app, router, ... } */) => {
  // something to do
})
