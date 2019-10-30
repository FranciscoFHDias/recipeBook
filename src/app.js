import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './styles.scss'

import Home from './components/pages/home'
import Login from './components/auth/login'
import Register from './components/auth/register'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
          <Route path="/" component={ Home } />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)