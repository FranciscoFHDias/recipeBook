import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './styles.scss'
import SecureRoute from '../src/components/common/secureRoute'

import Home from './components/pages/home'
import Login from './components/auth/login'
import Register from './components/auth/register'
import IndexRecipes from './components/recipes/indexRecipes'
import Navbar from './components/common/navbar'
import ShowRecipe from './components/recipes/showRecipe'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
          <SecureRoute path="/recipes/:id" component={ ShowRecipe } />
          <SecureRoute path="/recipes" component={ IndexRecipes } />
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