import React from "react"
import './Posts.css';
import Post from './Post/Post'
import Home from './Home/Home'



function Posts(props) {
  
  let posts = props.postDate.map(p => <Post name={p.name} message={p.msg} />)
  
  let NewPostElement = React.createRef()

  let addPost = () => {
    props.addPost()


  }

  let onPostChange = () => {

    let text = NewPostElement.current.value;

    props.updateNewPostText(text)

  }


  
  return (
    <div className="posts">
      <div className="posts__body">
          <Home />
        <div className="posts__row-2">
              {
                posts
              }
        </div>
        <div className="posts__row-3">
            <div className="posts__chat">
              <textarea onChange={onPostChange} ref={NewPostElement} cols="30" rows="10" value={props.postText} /><br />
              <button onClick={addPost} >Добавить пост</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
