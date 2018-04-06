import React from "react";

import classes from "./HeroInput.css";

// Heroinput just a normal input but with larger font
const HeroInput = props => {
  // creates a reference to the input object for 
  // getting the value
  const notref = React.createRef();

  return (
    <div className={classes.HeroInput}>
      <input
        type="text"
        className={classes.HeroInput__input}
        placeholder={props.placeholder}
        onChange={() => props.change(notref.current.value)}
        value={props.value}
        ref={notref}
      />
      <label className={classes.HeroInput__label}>{props.label}</label>
    </div>
  );
};

export default HeroInput;
