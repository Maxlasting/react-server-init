import React from 'react'
import { Link } from 'react-router-dom'
import Router from '../router/router'

class App extends React.Component {
  componentDidMount() {
    // ....
  }

  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <ul>
          <li>
            <Link to="/">测试首页</Link>
          </li>
          <li>
            <Link to="/api">测试API</Link>
          </li>
        </ul>
        <hr />
        <Router />
      </div>
    )
  }
}

export default App
