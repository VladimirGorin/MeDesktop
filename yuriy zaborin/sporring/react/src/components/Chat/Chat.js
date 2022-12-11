import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Button, Container, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../Loader/Loader";
import firebase from "firebase";
import classes from './Chat.module.css'

const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )


    const sendMessage = async () => {

        if(value === ""){
            setValue('')
            alert("В ведите текст!")
        }else{
    
            firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setValue('')
        }
        
    }

    if (loading) {
        return <Loader/>
    }



    return (
        <div>
            <Grid 
                  justify={"center"}
                  style={{}}>
                <div style={{width: '100%', height: '60vh', overflowY: 'auto', padding: '10px 20px', borderBottom: '1px solid #eee'}}>
                    {messages.map(message =>
                        <div style={{
                            margin: 10,
                            border: user.uid === message.uid ? '2px solid gray' : '2px solid gray',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            borderRadius: '15px',
                            padding: 5,
                            wordBreak: 'break-all',
                            width: '70%'
                        }}>
                            <Grid >
                                <Avatar src={message.photoURL}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                <Grid
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{width: '80%', margin: '10px auto'}}
                >
                    <TextField
                        fullWidth
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button style={{margin: '15px 0 0 0'}} onClick={sendMessage} variant={"outlined"}>Отправить</Button>
                </Grid>
            </Grid>
        </div>
    );

};

export default Chat;
