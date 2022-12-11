import {addPostActionCreator, updateNewPostTextActionCreator} from "../../redux/reducer/post-reducer"
import React from "react"

import Post from "./Posts"
import StoreContext from "../../StoreContext"


function PostContainer() {
    
  return (
    <StoreContext.Consumer>
      { (store) => {
        let state = store.getState()

        let addPost = () => {

          store.dispatch(addPostActionCreator())
      
      
        }
      
        let updateNewPostText = (text) => {
  
          let action = updateNewPostTextActionCreator(text)
          store.dispatch(action)
      
        }
        return <Post addPost={addPost} 
        updateNewPostText={updateNewPostText}
         postText={state.post.postText}
          postDate={state.post.postDate} />
      }  
    }
    </StoreContext.Consumer>
  );
}

export default PostContainer;
