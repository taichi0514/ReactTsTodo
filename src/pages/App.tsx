import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Todo from "./Todo"
import Auth from "./Auth"
import Cookies from 'js-cookie';

class Router extends Component<{}> {
  constructor(props: {}) {
    super(props);
  }
  render() {
    const isLoggin = Cookies.get('isLoggin')
    const Loggin: Boolean = new Boolean([isLoggin])
    console.log("isLoggin:::" + Loggin)
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Auth}>
            {Loggin ? <Redirect to="/todo" /> : <Auth />}
          </Route>
          <Route path='/todo' component={Todo} />
        </div>
      </BrowserRouter>
    )
  }

}
export default Router;