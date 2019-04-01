import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

/* Components */
import ErrorBoundary from './ErrorBoundary'
import ProductList from '../ProductList'
import Checkout from '../ProductList/Checkout'

const routeList = [
  {
    path: '/',
    component: ProductList,
    exact: true
  },
  {
    path: '/checkout',
    component: Checkout,
    exact: false
  }
]

const RouteBuilder = route => {
  return (
    <ErrorBoundary>
      <Route
            exact={!!route.exact}
            path={route.path}
            render={props => (<route.component {...props} />)} />
    </ErrorBoundary>
    
  )
}

const Routes = props => {
  return (
    <Switch>
      {routeList.map((route, key) => {
          return <RouteBuilder key={key} {...route} />
        }  
      )}
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default withRouter(Routes)