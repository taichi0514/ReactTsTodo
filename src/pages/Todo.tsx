import React, { Component } from 'react';
import './App.scss';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import firebase from '../plugins/firebase';
import moment from "moment";

const Todo: React.FC<{}> = () => {
    const db = firebase.firestore();
    const history = useHistory();
    const [writingTodo, setWritingTodo] = React.useState();
    const [todos, setTodo] = React.useState([]);
    const [uid, setUid] = React.useState();
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            const dateNow = moment().format()
            console.log(dateNow)
            if (user) {
                await setUid(user.uid)
                Cookies.set("isLoggin", "true");
                Cookies.set("uid", user.uid);
                history.push("/todo")
            } else {
                Cookies.set("isLoggin", "false");
                history.push("/")
            }
            await userCollection();
        })
    }, []);

    const userCollection = (async () => {
        const uidValue = Cookies.get("uid");
        const citiesRef = db.collection("users").doc(uidValue).collection("todo");
        let result = await citiesRef.get()
            .then(() => {
                citiesRef.orderBy("date", "asc").onSnapshot(query => {
                    let data = [{}]
                    query.forEach(d => data.push({ ...d.data(), docId: d.id }))
                    // const product: Product = JSON.parse(data) as Product;
                    const str = JSON.stringify(data);
                    const myobj = JSON.parse(str);
                    setTodo(myobj)
                })
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
        return result
    })

    const dataWriting = async () => {
        // Add a new document in collection "cities"
        const dateNow = moment().format('YYYY/MM/DD HH:mm:ss')
        const uidValue = Cookies.get("uid");
        db.collection("users").doc(uidValue).collection("todo").add({
            value: writingTodo,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: dateNow,
        }).then(() => {
            setWritingTodo("");
        });

    }

    const signOut = () => {
        firebase.auth().signOut();
        Cookies.set('isLoggin', 'false')
        history.push("/")
    }

    const setNewTodo = (event: any) => {
        setWritingTodo(event.target.value);
    }

    // const todoRemove = (event: any) => {
    //     rmPassword(event.target.value);
    // };

    const todoDelete = (event: any) => {
        const target = event.target.value;
        const uidValue = Cookies.get("uid");
        const docId = target
        const citiesRef = db.collection("users").doc(uidValue).collection("todo").doc(docId);
        citiesRef.delete()
    }

    return (
        <div className="App-Login-Container">
            <p>ログインできています</p>
            <button type="button" onClick={signOut}>signOut</button>
            <input type="text" placeholder="post" value={writingTodo || ''} onChange={setNewTodo} />
            <button type="button" onClick={dataWriting}>post</button>
            <ul className="todoList">{todos.map((keyName: any, i: number) => (
                <li className="todoListItem" key={i}>
                    <input type="checkbox" value={keyName.docId} onChange={todoDelete} />
                    <span className="input-label">Time: {keyName.date} Value: {keyName.value}</span>
                </li>
            ))}</ul>
        </div>
    );
}





export default Todo
