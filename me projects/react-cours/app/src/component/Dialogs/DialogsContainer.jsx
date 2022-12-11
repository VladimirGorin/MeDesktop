import {updateNewDialogMessageActionCreator, addDialogMessageActionCreator } from "../../redux//reducer/dialog-reducer"
import React from "react"

import Dialogs from "./Dialogs"
import StoreContext from "../../StoreContext.js"


function DialogsContainer() {
  return (
  <StoreContext.Consumer>
    { (store) => {
      
        let state = store.getState()
        const TextChanged = (text) => {
          
          let action = updateNewDialogMessageActionCreator(text)
          store.dispatch(action)
        }
      
        
        const addMessage = () => {
          
          store.dispatch(addDialogMessageActionCreator())
      
        }
        
        return <Dialogs addMessage={addMessage} 
        TextChanged={TextChanged} 
        dialogMessages={state.dialog.dialogMessages} 
        dialogUsers={state.dialog.dialogUsers} dialogText={state.dialog.dialogText} />
        
      }
    }

  </StoreContext.Consumer>
    );
}

export default DialogsContainer;
