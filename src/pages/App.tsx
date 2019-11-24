import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from "../model/PrivateRoute"
import Todo from "./Todo"
import Auth from "./Auth"
import Hoge from "./hoge"
import Cookies from 'js-cookie';

class Router extends Component<{}> {
  constructor(props: {}) {
    super(props);
  }
  render() {
    const Loggin = Cookies.get('isLoggin')
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/* <PrivateRoute /> */}
            <Route path="/" exact children={<Auth />} />
            <Route path="/todo" exact children={<Todo />} />
            <Route path="/hoge" exact children={<Hoge />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}
export default Router;