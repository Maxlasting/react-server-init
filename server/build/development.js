const router = require('express').Router()
const MemoryFs = require('memory-fs')
const path = require('path')
const Module = require('module')
const vm = require('vm')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const serverConfig = require('../../config/webpack.server')
const config = require('../../config/config')
const serverRender = require('./server-render')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8081' + config.publicPath + 'index.ejs')
      .then((res) => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const getBundleFromVmModule = (boundle, filename) => {
  const m = { exports: {} } // m 是即将返回的结果，内部的 exports 就是下面包装模块的 exports 对象
  const wrapper = Module.wrap(boundle) // 将webpack打包的boundle包装为node的模块

  const script = new vm.Script(wrapper, {
    filename, // 定义供脚本生成的堆栈跟踪信息所使用的文件名
    displayErrors: true // 当值为真的时候，假如在解析代码的时候发生错误Error，引起错误的行将会被加入堆栈跟踪信息
  })

  // 在当前模块内启用虚拟机，会得到可以运行的代码
  // result 实际上是一个可以执行的函数 function (export, require, module, __filename, __dirname) {...}
  const result = script.runInThisContext()

  // 为了得到webpack打包后的模块，执行result之后将得到的内容储存在m这个对象中
  // 这个内容实际上是 module.exports = (function() {....})()
  result.call(m.exports, m.exports, require, m)

  return m
}

let serverBundle = null

const compiler = webpack(serverConfig)
const mfs = new MemoryFs()

// 将打包的文件输出只内存，而不是硬盘
compiler.outputFileSystem = mfs

// 每次重新打包，都会被监测，执行后面的函数
compiler.watch({}, (err, stats) => {
  if (err) throw err

  // stats 包含了所有打包的信息
  stats = stats.toJson()
  stats.errors.forEach((errItem) => console.error(errItem))
  stats.warnings.forEach((warnItem) => console.warn(warnItem))

  // 一旦发生变化，那么就需要重新获取bundle
  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf8')

  // 拿到bundle之后打包为node模块并在vm中执行
  const m = getBundleFromVmModule(bundle, 'index-server') // m.export中包含ReactSSR要渲染的内容以及 index-server.js 导出的其他模块

  serverBundle = m.exports
})

router.get('*', (req, res, next) => {
  getTemplate().then((template) => {
    return serverRender(req, res, template, serverBundle)
  }).catch(next)
})

module.exports = (app) => {
  // 凡是静态资源，全部代理到客户端服务上
  app.use(config.publicPath, proxy({
    target: 'http://localhost:8081'
  }))
  app.use(router)
}
