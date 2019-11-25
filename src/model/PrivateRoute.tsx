import React, { Component } from 'react'
import Todo from "../pages/Todo"
import Auth from "../pages/Auth"
import Cookies from 'js-cookie';
import { Route, RouteProps } from 'react-router-dom'
import firebase from '../plugins/firebase';

type Outh = {
  loading?: boolean; isAuthenticated?: any
}

class PrivateRoute extends Component<RouteProps, Outh>{
  constructor(props: {}) {
    super(props);
    this.state = {
      // ログインチェックが終わるまで、ローディングを表示.
      loading: true,
      isAuthenticated: "false"
    }
  }

  async componentDidMount() {
    const isLoggin = await Cookies.get("isLoggin")
    this.setState({
      loading: false,
      isAuthenticated: isLoggin
    })
  }

  render() {
    if (this.state.isAuthenticated === "true") {
      console.log(this.state.isAuthenticated)
      return (<Route to="/todo" component={Todo} />);
    }
    if (this.state.isAuthenticated === "false") {
      console.log(this.state.isAuthenticated)
      return (<Route to="/auth" component={Auth} />);
    }
  }
}

export default PrivateRoute;