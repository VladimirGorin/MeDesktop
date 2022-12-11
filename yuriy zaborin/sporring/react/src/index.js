import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './css/App.css'
import firebaseInit from './firebase/FirebaseInit'
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'


firebaseInit(firebase)

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()


ReactDOM.render(
    
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);

