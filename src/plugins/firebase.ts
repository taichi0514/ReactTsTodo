import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

export const config = {
    apiKey: "AIzaSyAgyqSLvhYC_O3hb6kWlpFpVf-fziH_vUA",
    authDomain: "reacttstodo.firebaseapp.com",
    databaseURL: "https://reacttstodo.firebaseio.com",
    projectId: "reacttstodo",
    storageBucket: "reacttstodo.appspot.com",
    messagingSenderId: "852105001616",
    appId: "1:852105001616:web:76512886e32687f3923615",
    measurementId: "G-NZXWR92ERD"
};

firebase.initializeApp(config)

export default firebase