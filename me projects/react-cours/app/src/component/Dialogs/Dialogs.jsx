import "./Dialogs.css"
import React from "react"

import Message from "./Messages/Messages.jsx";
import Dialog from "./Dialog/Dialog.jsx";

function Dialogs(props) {

  let NewDialogMessage = React.createRef()

  let dialogMessage =  props.dialogMessages.map(m => <Message name={m.name} text={m.text} />)
  let dialogUser =  props.dialogUsers.map(u => <Dialog id={u.id} dialog={u.dialog} />)
  
  const TextChanged = () => {
    
    let text = NewDialogMessage.current.value  

    props.TextChanged(text)
  }


  const addMessage = () => {
    
    props.addMessage()

  }

  
  return (
    <div className="dialogs">
      <div className="dialogs__users">  
        {
          dialogUser
        }
      </div>
      <div className="dialogs__chat">
            {
              dialogMessage 
            }
        <div className="dialogs__create">
          <input ref={NewDialogMessage} type="text" onChange={TextChanged} value={props.dialogText} />
          <button onClick={addMessage} >Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;
