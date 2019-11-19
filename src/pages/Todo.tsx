import React, { Component } from 'react';
import './App.scss';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import Auth from "./Auth"
import Cookies from 'js-cookie';
import firebase from '../plugins/firebase';

class Todo extends Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    signOut = () => {
        firebase.auth().signOut();
        Cookies.set('isLoggin', 'false')
        const location = useLocation();
        const history = useHistory();
        console.log(Object.keys(location)); // ["pathname", "search", "hash", "state"]
        console.log(Object.keys(history));
    }

    render() {
        return (
            <div>
                <p>ログインできています</p>
                <button type="button" onClick={this.signOut}>signOut</button>
            </div>
        );
    }
};

export default Todo;
