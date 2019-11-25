import React, { Component } from 'react';
import './App.scss';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import firebase from '../plugins/firebase';

const Todo: React.FC<{}> = () => {
    const db = firebase.firestore();
    const history = useHistory();
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                Cookies.set("isLoggin", "true");
                history.push("/todo")
            } else {
                Cookies.set("isLoggin", "false");
                history.push("/")
            }
        });

        db.collection("users").add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
        })
    }, []);

    const signOut = () => {
        firebase.auth().signOut();
        Cookies.set('isLoggin', 'false')
        history.push("/")
    }
    return (
        <div className="App-Login-Container">
            <p>ログインできています</p>
            <button type="button" onClick={signOut}>signOut</button>
        </div>
    );

};

export default Todo
