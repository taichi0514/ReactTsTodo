import React, { Component, FC } from 'react';
import './App.css';
import firebase from './plugins/firebase';

const Hello: FC = () => <div>Hello!</div>;
const logProps = (WrappedComponent: FC) => {
  return class extends Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log("ログイン中")
        } else {
          console.log("ログアウト中")
        }
      });
    }
    render() {
      return <WrappedComponent />;
    }
  };
};

export default logProps(Hello);
