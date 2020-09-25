import React from 'react';
import routes from './routes'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont'
import Player from './application/Player'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <IconStyle />
        <Player />
        {renderRoutes(routes)}
      </Router>
    </Provider>
  );
}

export default App;
