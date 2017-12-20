import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'
import { createStoreMap } from './stores/store'

useStaticRendering(true)

/**
 * 默认导出的是一个函数
 * //
 * @stores 可以是很多个store
 * @routerContext 是静态路由的参数，包括Redirect的url信息
 * @url 代表当前 request 的url
 */

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)

// 这里的 createStoreMap 实际上是 store.js 里面的函数，返回值是一个所有store的字典
export { createStoreMap }
