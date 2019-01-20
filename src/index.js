import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Link, Route, Redirect, Switch } from 'react-router-dom'

import reducer from './reducer'
import './config'

import Login from './container/login'
import Register from './container/register'
import AuthRoute from "./component/authRoute"
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import DashBorad from './component/dashborad'
import './index.css'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolExtension ? window.devToolExtension() : f => f
))

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute />
                    <Switch>
                        <Route path="/bossinfo" component={BossInfo}></Route>
                        <Route path="/geniusinfo" component={GeniusInfo}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        {/* 所有没有匹配的进这儿 */}
                        <Route component={DashBorad}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ), document.getElementById("root")
)