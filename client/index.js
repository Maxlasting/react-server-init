import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';

import { AppContainer } from 'react-hot-loader';  // eslint-disable-line

const root = document.getElementById('root');

const render = (component) => {
  const node = (
    <AppContainer>
      { component }
    </AppContainer>
  );
  ReactDOM.hydrate(node, root);
};

render(<App />);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const Next = require('./views/App').default;  // eslint-disable-line
    render(<Next />);
  })
}
