import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './components/dashboard/dashboard'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

//boss genius me msg 4个页面
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
          <div>
            <AuthRoute></AuthRoute>
            <Switch>
              <Route path='/bossinfo' component={BossInfo}></Route>
              <Route path='/geniusinfo' component={Geniusinfo}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
              <Route component={Dashboard}></Route>
            </Switch>
          </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)