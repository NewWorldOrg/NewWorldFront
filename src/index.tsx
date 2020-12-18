import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact={true} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)