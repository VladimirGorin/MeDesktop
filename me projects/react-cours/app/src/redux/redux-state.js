import { createStore, combineReducers  } from 'redux'

import post_reducer from "./reducer/post-reducer"
import dialog_reducer from "./reducer/dialog-reducer"


let reducers = combineReducers({
    dialog: dialog_reducer,
    post: post_reducer
})

let store = createStore(reducers)

export default store