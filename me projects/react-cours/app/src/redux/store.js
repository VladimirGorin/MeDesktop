// import post_reducer from "./reducer/post-reducer"
// import dialog_reducer from "./reducer/dialog-reducer"

// let store = {
  
//   _state: {
//     dialog: {
//       dialogMessages: [
//         {
//           name: "Андрей",
//           text: "Привет"
//         },
//         {
//           name: "Вы",
//           text: "Ку"
//         }
//       ],
//       dialogText: "",

//       dialogUsers: [
//         {
//           id: 1,
//           dialog: 'Андрей'
//         },
//         {
//           id: 2,
//           dialog: 'Тима'
//         },
//         {
//           id: 3,
//           dialog: 'Тёма'
//         }
//       ]
//     },
//     post: {
//       postDate: [
//         {
//           msg: "Привет",
//           name: "Валера"
//         },
//         {
//           msg: "Как дела",
//           name: "Кирилл"
//         },
//         {
//           msg: "Как дела",
//           name: "Кто то"
//         },
//       ],

//       postText: ""
//     },
//     sidebar: {}

//   },
  

//   renderDomElements() {
//     console.log("asd")
//   },

//   getState(){
//     return this._state

//   },

//   subscribe(observer) {
//     this.renderDomElements = observer
//   },

//   dispatchEvent(action) {
    
//     this._state.post = post_reducer(this._state.post, action)
//     this._state.dialog = dialog_reducer(this._state.dialog, action)


//     this.renderDomElements()

//   }

// }


// export default store