import React, {useContext} from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Context} from "../../index";
import firebase from "firebase";
import './Login.css'
import classes from './Login.module.css'

const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
        console.log(user)
    }

    return (
        <div className={classes.auth}>
            <div className={classes.box}>
                <button className={classes.btn} onClick={login}>ВОЙТИ С ПОМОЩЬЮ GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;
