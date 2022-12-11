import '../Dialogs.css';

function Message(props) {
    return (
        <div className="dialogs">
            <div className="dialogs__item">
                <div className="dialogs__info">
                    <img src="https://ichef.bbci.co.uk/news/800/cpsprodpb/70D7/production/_106078882_gettyimages-1127799959.jpg.webp" alt="" />
                    <span>{props.name}</span>
                </div>
                <div className="dialogs__text">
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    );
}

export default Message;
