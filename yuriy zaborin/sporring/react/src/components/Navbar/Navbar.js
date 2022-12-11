import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";
import { Context } from "../../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@material-ui/core";
import './NavBar.css'
import firebase from "firebase";

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
    console.log(user)
}
  return (
        <div className="header__nav">
          {user ? (
            <Button onClick={() => auth.signOut()}>
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button onClick={login} >Логин</Button>
            </NavLink>
          )}
        </div>
  );
};

export default Navbar;
