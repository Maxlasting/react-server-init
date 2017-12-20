import React from 'react';
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet'

@inject('appState') @observer
class TestPage extends React.Component {
  componentDidMount() {
    // ....
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      }, 2000)
    })
    // this.props.appState.msg = 3
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Test Page</title>
          <meta name="description" content="This is test page." />
        </Helmet>
        <div>
          {this.props.appState.msg}
        </div>
      </div>
    )
  }
}

export default TestPage;
