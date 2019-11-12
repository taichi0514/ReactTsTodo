import React, { Component } from 'react';
import './App.css';
import firebase from '../plugins/firebase';
interface Outh {
  email: string; password: string
}
class hoge extends Component<{}, Outh> {
  constructor(props: {}) {
    super(props);
    this.state = { email: "", password: "" }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("ログイン中")
      } else {
        console.log("ログアウト中")
      }
    });
  }
  Login = () => {
    console.log("login")
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  }
  render() {
    const { email, password } = this.state;
    return (
      <>
        <input id="email" type="email" placeholder="メールアドレスを入力" value={email} />
        <input id="password" type="password" placeholder="パスワードを入力" value={password} />
        <button type="button" onClick={this.Login}>Login</button><button type="button">Logout</button>
        {email}
      </>
    );
  }
};

export default hoge;
