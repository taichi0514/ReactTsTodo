import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Todo from "./Todo"
import Auth from "./Auth"

const Router: React.FC<{}> = () => {

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact children={<Auth />} />
          <Route path="/todo" exact children={<Todo />} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};
export default Router;