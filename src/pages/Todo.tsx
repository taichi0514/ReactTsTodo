import React, { Component } from 'react';
import './App.scss';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import firebase from '../plugins/firebase';
import moment from "moment";

const Todo: React.FC<{}> = (props) => {
    const db = firebase.firestore();
    const history = useHistory();
    const [hoge, sethoge] = React.useState();
    const [todos, setTodo] = React.useState();
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

    const userCollection = (async () => {

        const citiesRef = db.collection("users").doc(uid).collection("todo");
        let result = await citiesRef.get()
            .then(() => {
                citiesRef.onSnapshot(query => {
                    let data: Array<any> = []
                    query.forEach(d => data.push({ ...d.data(), docId: d.id }))
                    setTodo(JSON.stringify(data))
                })
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
    })

    const dataW = () => {
        // Add a new document in collection "cities"
        const dateNow = moment().format('YYYY/HH/ss');
        db.collection("users").doc(uid).collection("todo").add({
            value: dateNow
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
            {todos}
            <div>
                {/* <ul>
                    {todos.map((todos: any, i: number) => {
                        return <li key={i}>{todos}</li>
                    })}
                </ul> */}
            </div>
        </div>
    );

};

export default Todo
