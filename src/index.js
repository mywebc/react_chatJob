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

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolExtension ? window.devToolExtension() : f => f
))

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
              <div>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/register" component={Register}></Route>
                </div>
            </BrowserRouter>
        </Provider>
    ), document.getElementById("root")
)