import React from "react";
import "./App.scss";
import { useHistory } from "react-router-dom";

import firebase from "../plugins/firebase";
import Cookies from "js-cookie";

const Auth: React.FC<{}> = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("ログイン中");
                Cookies.set("isLoggin", "true");
            } else {
                console.log("ログアウト中");
                Cookies.set("isLoggin", "false");
            }
        });
    }, []);

    const history = useHistory();

    const login = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + ":" + errorMessage);
            });
        console.log(Object.keys(history));
        history.push('/todo')
    };

    const signOut = () => {
        firebase.auth().signOut();
    };

    const emailSet = (event: any) => {
        setEmail(event.target.value);
    };

    const passwordSet = (event: any) => {
        setPassword(event.target.value);
    };

    return (
        <div className="App-Login-Container">
            <input
                id="email"
                type="email"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={emailSet}
            />
            <input
                id="password"
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={passwordSet}
            />
            <button type="button" onClick={login}>
                Login
      </button>
            <button type="button" onClick={signOut}>
                Logout
      </button>
        </div>
    );
};

export default Auth;