import React, { Component } from 'react';
import './App.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Auth from "./Auth"
import Cookies from 'js-cookie';
import firebase from '../plugins/firebase';

class Todo extends Component<RouteComponentProps> {
    signOut = () => {
        firebase.auth().signOut();
        Cookies.set('isLoggin', 'false')
        this.props.history.push("/hoge");
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

export default withRouter(Todo);
