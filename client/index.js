import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'

import { AppContainer } from 'react-hot-loader' // eslint-disable-line

import AppState from './stores/app-store'

const initState = window.__INIT_STATE__ || {} // eslint-disable-line

const root = document.getElementById('root')

const render = (component) => {
  const Node = (
    <AppContainer>
      <Provider appState={new AppState(initState.appState)}>
        <BrowserRouter>
          { component }
        </BrowserRouter>
      </Provider>
    </AppContainer>
  )
  ReactDOM.hydrate(Node, root)
}

render(<App />)

/* eslint-disable */
if (module.hot) {
  module.hot.accept('./views/App', () => {
    const Next = require('./views/App').default
    render(<Next />)
  })
}
/* eslint-enable */
