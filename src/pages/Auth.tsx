import React, { Component } from 'react';
import './App.scss';
import { useHistory } from 'react-router-dom'

import firebase from '../plugins/firebase';
import Cookies from 'js-cookie';


interface Outh {
    email: string; password: string
}
class auth extends Component<{}, Outh> {
    constructor(props: {}) {
        super(props);
        this.state = { email: "", password: "" }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("ログイン中")
                Cookies.set('isLoggin', 'true')
            } else {
                console.log("ログアウト中")
                Cookies.set('isLoggin', 'false')
            }
        });
    }
    Login = () => {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + ":" + errorMessage)
        });
        const history = useHistory();
        console.log(Object.keys(history));
    }

    signOut = () => {
        firebase.auth().signOut();
    }

    emailSet(event: any) {
        this.setState({ email: event.target.value });
    }

    passwordSet(event: any) {
        this.setState({ password: event.target.value });
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="App-Login-Container">
                <input id="email" type="email" placeholder="メールアドレスを入力" value={email} onChange={(event) => this.emailSet(event)} />
                <input id="password" type="password" placeholder="パスワードを入力" value={password} onChange={(event) => this.passwordSet(event)} />
                <button type="button" onClick={this.Login}>Login</button><button type="button" onClick={this.signOut}>Logout</button>
            </div>
        );
    }
};

export default auth;
