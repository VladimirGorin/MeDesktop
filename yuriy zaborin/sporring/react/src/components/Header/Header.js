import React, { useContext } from "react";
import './Header.css'
import classes from './Header.module.css'
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.body}>
        <div className={classes.title}>
          <h3>sporing</h3>
        </div>
          <Navbar />
      </div>
    </div>
  );
};

export default Header;
