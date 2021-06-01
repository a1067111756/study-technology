/* 路由配置 */
import React from 'react'
import App from '../App'
import Admin from '../views/admin'
import HomePage from '../views/home'
import LoginPage from '../views/login'
import ButtonPage from '../views/ui/button'
import Page404 from '../views/exception/404'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

class IRouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"></Redirect>
            </Route>

            <Route path="/login">
              { <LoginPage /> }
            </Route>

            <Route>
              {/* <Redirect to="/admin/home"></Redirect> */}
              <Admin>
                <Switch>
                  <Route path="/home">
                    <HomePage />
                  </Route>

                  <Route path="/ui">
                    <Redirect to="/ui/button"></Redirect>
                    <Route component={ButtonPage}></Route>
                  </Route>

                  <Route component={Page404}></Route>
                </Switch>
              </Admin>
            </Route>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default IRouter