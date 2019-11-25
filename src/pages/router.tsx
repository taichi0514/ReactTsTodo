import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Home from "./App"
import Todo from "./Todo"
import Auth from "./Auth"
import PrivateRoute from "../model/PrivateRoute"
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
                    <Route path='/todo' component={Todo} />
                    <Route path='/auth' component={Auth} />
                </div>
            </BrowserRouter>
        )
    }

}
export default Router;