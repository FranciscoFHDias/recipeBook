import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Auth from '../../lib/auth'

const SecureRoute = (props) => {
  if(Auth.isAuthenticated()) return <Route {...props} />
  return <Redirect to="/register" />
}

export default SecureRoute
