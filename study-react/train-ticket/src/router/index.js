/* 路由配置 */
import React from 'react'
import App from '../App'
import HomePage from '@/views/home/index'
import CitySelectPage from '@/views/city-selector/index'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

class IRouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home"></Redirect>
            </Route>

            <Route path="/home">
              { <HomePage /> }
            </Route>

            <Route path="/city-selector">
              { <CitySelectPage /> }
            </Route>            
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default IRouter