import './Header.css';

import {Link} from "react-router-dom"

function Header() {
  return (
    <header className="header">
        <ul>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/dialogs">Dialogs</Link></li>
          <li><Link to="#">Info</Link></li>
          <li><Link to="#">Strem</Link></li>
        </ul>
    </header>
  );
}

export default Header;
