/* 路由配置 */
import React from 'react'
import App from '../App'
import HomePage from '../views/home'
import LoginPage from '../views/login'
import { HashRouter, Route, Switch } from 'react-router-dom'

class IRouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact path="/" component={LoginPage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/home" component={HomePage}></Route>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default IRouter