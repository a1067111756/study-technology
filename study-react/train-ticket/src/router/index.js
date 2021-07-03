/* 路由配置 */
import React from 'react'
import App from '../App'
import HomePage from '@/views/home/index'
import QueryPage from '@/views/query/index'
import Calendar from '@/components/calendar'
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

            <Route path="/query">
              { <QueryPage /> }
            </Route>

            <Route path="/calendar">
              { <Calendar /> }
            </Route>            
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default IRouter