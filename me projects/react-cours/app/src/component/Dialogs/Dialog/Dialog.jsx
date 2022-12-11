import '../Dialogs.css';
import {Link} from "react-router-dom"


function Dialog(props) {
    return (
        <div className="dialogs__item">
            <Link to={`/dialogs/${props.id}`}>{props.dialog}</Link>
        </div>
    )
}

export default Dialog;
