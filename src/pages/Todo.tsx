import React, { Component } from 'react';
import './App.scss';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import firebase from '../plugins/firebase';
import moment from "moment";
import { type } from 'os';

const Todo: React.FC<{}> = (props) => {
    const db = firebase.firestore();
    const history = useHistory();
    const [hoge, sethoge] = React.useState();
    const [todos, setTodo] = React.useState([]);
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
        })
        if (uid) {
            userCollection();
        }
    }, []);

    const userCollection = (async () => {
        const citiesRef = db.collection("users").doc(uid).collection("todo");
        let result = await citiesRef.get()
            .then(() => {
                citiesRef.onSnapshot(query => {
                    let data = [{}]
                    query.forEach(d => data.push({ ...d.data(), docId: d.id }))
                    // const product: Product = JSON.parse(data) as Product;
                    const str = JSON.stringify(data);
                    const myobj = JSON.parse(str);
                    const myarray = Object.entries(str)
                    let allNames = myobj.map((todo: any) => {
                        return (todo.value)
                    });
                    console.log("myobj.value =======" + myobj.value)
                    console.log("myobj[0].value =======" + myobj[0].value)
                    console.log("contentKeys =======" + allNames)
                    console.log("iterator =======" + allNames[Symbol.iterator]())
                    setTodo(myobj)
                    console.log(typeof myarray)
                    console.log(typeof todos)
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
            <ul>{todos.map((keyName: any, i: number) => (
                <li className="travelcompany-input" key={i}>
                    <span className="input-label">key: {i} Value: {keyName.value}</span>
                </li>
            ))}</ul>
        </div>
    );

};

export default Todo
