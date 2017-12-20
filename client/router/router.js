import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import TestPage from '../views/test-page/TestPage'
import TestApi from '../views/test-api/TestApi'

export default () => (
  <div>
    <Route path="/" exact render={() => <Redirect to="/page" />} />
    <Route path="/page" component={TestPage} />
    <Route path="/api" component={TestApi} />
  </div>
)
