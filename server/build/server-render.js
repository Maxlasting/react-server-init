const ejs = require('ejs')
const serialize = require('serialize-javascript') // 用来序列化 js 中对象的，并且会对一些特殊字符转义
const ReactSSR = require('react-dom/server')
const Helmet = require('react-helmet').default //用来做seo优化
const asyncBootstrapper = require('react-async-bootstrapper').default // 在服务端渲染的时候，处理组件内部的异步操作

// 获取所有 store 中的最新数据，最终的 result 就是储存了所有 store 中最新数据的对象
const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeKey) => {
    result[storeKey] = stores[storeKey].toJson()
    return result
  }, {})
}

module.exports = (req, res, template, bundle) => {
  return new Promise((resolve, reject) => {
    const routerContext = {}
    const stroes = bundle.createStoreMap()
    const app = bundle.default(stroes, routerContext, req.url)

    // 处理组件中的异步请求，对应组件内部的 asyncBootstrap 函数
    asyncBootstrapper(app).then(() => {
      // 如果react的路由中有Redirect，那么会把重定向的url放到 routerContext 这个对象中
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        return res.end()
      }

      // seo 优化部分
      const helmet = Helmet.rewind()
      const state = getStoreState(stroes)
      const content = ReactSSR.renderToString(app)

      const html = ejs.render(template, {
        app: content,
        initState: serialize(state), // 将普通js对象序列化为字符串，包括数据内部的函数都会被序列化而JSON.stringify不会
        meta: helmet.meta.toString(),
        title: helmet.meta.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString()
      })

      res.send(html)
    }).catch(reject)
  })
}
