import '../Posts.css';

function Post(props) {
  return (
    <div className="post">
        <div className="post__img">
            <p>{props.name}</p>
            <img src="https://cdn.create.vista.com/api/media/medium/251691910/stock-photo-silhouette-man-looking-camera-isolated?token=" alt="" />    
        </div>
        <div className="post__text">
            <span>{props.message}</span>
        </div>
    </div>  
  );
}

export default Post;
