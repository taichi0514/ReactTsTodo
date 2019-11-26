import React, { Component } from 'react';
import './App.scss';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import firebase from '../plugins/firebase';
import moment from "moment";

const Todo: React.FC<{}> = (props) => {
    const db = firebase.firestore();
    const history = useHistory();
    const [hoge, sethoge] = React.useState({ data: {} });
    const [todo, setTodo] = React.useState();
    const [uid, setUid] = React.useState();
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                Cookies.set("isLoggin", "true");
                history.push("/todo")
                setUid(user.uid)
            } else {
                Cookies.set("isLoggin", "false");
                history.push("/")
            }
        });
    }, []);

    const userCollection = (() => {
        const citiesRef = db.collection("users");
        citiesRef.doc(uid).collection("todo").get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    sethoge({
                        data: doc.data().name
                    });
                    console.log(JSON.stringify(doc.data().name))
                    setTodo(JSON.stringify(doc.data().name))
                });
            })
            .then(() => {

            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
        return hoge;
    })

    const dataW = () => {
        // Add a new document in collection "cities"
        const dateNow = moment().format('YYYY/HH');
        db.collection("users").doc(uid).collection("todo").add({
            name: "ddd",
            state: "false",
            time: dateNow
        })
            .then(function () {
                console.log("Document written with ID: ");
            })
            .catch(function () {
                console.error("Error writing document: ");
            });
    }

    const signOut = () => {
        firebase.auth().signOut();
        Cookies.set('isLoggin', 'false')
        history.push("/")
    }
    return (
        <div className="App-Login-Container">
            <p>ログインできています</p>
            <button type="button" onClick={signOut}>signOut</button>
            <button type="button" onClick={dataW}>hoge</button>
            <button type="button" onClick={userCollection}>userCollection</button>
            {JSON.stringify(hoge.data)}
            {todo}
            {/* {hoge} */}
            {/* {.map(hoges => <div>{hoges}</div>)} */}
            {/* <ul>
                {todo.map((val: any) =>
                    <li>
                        <a>{val}</a>
                    </li>
                )}
            </ul> */}
        </div>
    );

};

export default Todo
