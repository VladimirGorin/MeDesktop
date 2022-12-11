const ADDDIALOGMESSAGE = "ADD-DIALOG-MESSAGE"
const UPDATENEWDIALOGMESSAGE = "UPDATE-NEW-DIALOG-MESSAGE"

let defultState = {
  dialogMessages: [
    {
      name: "Андрей",
      text: "Привет"
    },
    {
      name: "Вы",
      text: "Ку"
    }
  ],
  dialogText: "",

  dialogUsers: [
    {
      id: 1,
      dialog: 'Андрей'
    },
    {
      id: 2,
      dialog: 'Тима'
    },
    {
      id: 3,
      dialog: 'Тёма'
    }
  ]
}

const dialog_reducer = (state = defultState, action) => {

  switch (action.type) {
    case ADDDIALOGMESSAGE:

      let newObject = {
        name: "Вы",
        text: state.dialogText
      }

      state.dialogMessages.push(newObject)
      state.dialogText = ""
      return state;

    case UPDATENEWDIALOGMESSAGE:
      state.dialogText = action.newText
      return state;

    default:
      return state;

  }

}

export const addDialogMessageActionCreator = () => ({
  type: ADDDIALOGMESSAGE,
})

export const updateNewDialogMessageActionCreator = (text) => ({
  type: UPDATENEWDIALOGMESSAGE,
  newText: text
})

export default dialog_reducer