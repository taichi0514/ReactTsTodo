import React, { Component } from 'react';
import './App.scss';
import { useHistory } from "react-router-dom";
import Auth from "./Auth"
import Cookies from 'js-cookie';
import firebase from '../plugins/firebase';

const Todo: React.FC<{}> = () => {
    const history = useHistory();

    const signOut = () => {
        firebase.auth().signOut();
        Cookies.set('isLoggin', 'false')
        history.push("/")
    }
    return (
        <div>
            <p>ログインできています</p>
            <button type="button" onClick={signOut}>signOut</button>
        </div>
    );

};

export default Todo
