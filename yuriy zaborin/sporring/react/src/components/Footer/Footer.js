import React, { useContext } from "react";
import './Footer.css'
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.body}>
        <span>It's a footer of span</span>
      </div>
    </div>
  );
};

export default Footer;
