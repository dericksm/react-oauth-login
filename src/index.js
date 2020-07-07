import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'
import App from './components/App'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Signout from './components/Signout'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import AuthGuard from './components/HOCs/AuthGuard'
import reducers from './reducers'

const jwt_token = localStorage.getItem('JWT_TOKEN')
axios.defaults.headers.common['Authorization'] = jwt_token

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwt_token,
          isAuthenticated: jwt_token ? true : false,
        },
      },
      applyMiddleware(reduxThunk),
    )}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={AuthGuard(Dashboard)} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signout" exact component={Signout} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
)
