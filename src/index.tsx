import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './App.scss'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MyPage from './components/MyPage'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducer from './store/reducer'
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/my-page" component={MyPage} exact={true} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
