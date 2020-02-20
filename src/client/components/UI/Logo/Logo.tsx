import React from "react";

// CSS
import "./Logo.css";

// IMAGE
import * as icon from "../../../assets/img/red_tetris_icon.png";

const Logo = () => (
  <div className="Logo">
    <img src={icon} alt="icon" />
  </div>
);

export default Logo;
