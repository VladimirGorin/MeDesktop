const ADDPOST = "ADD-POST"
const UPDATENEWPOSTTEXT = "UPDATE-NEW-POST-TEXT"

let defultState = {
  postDate: [
    {
      msg: "Привет",
      name: "Валера"
    },
    {
      msg: "Как дела",
      name: "Кирилл"
    },
    {
      msg: "Как дела",
      name: "Кто то"
    },
  ],

  postText: ""
}

const post_reducer = (state = defultState, action) => {
  switch (action.type) {
    case ADDPOST:

      let postObject = {
        msg: state.postText,
        name: 'Както'
      }
      state.postDate.push(postObject)
      state.postText = ""
      return state;

    case UPDATENEWPOSTTEXT:
      state.postText = action.newText
      return state;

    default:
      return state;

  }
}

export const addPostActionCreator = () => ({
  type: ADDPOST
})

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATENEWPOSTTEXT,
  newText: text
})

export default post_reducer