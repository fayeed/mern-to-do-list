import React from "react";

import classes from "./Item.css";

const Item = props => {
  let checked = null;

  return (
    <div className={classes.Item}>
        
      <input className={classes.Item__checkbox}
        type="checkbox"
        ref={ref => (checked = ref)}
        onClick={() => {
          console.log(checked.checked);
          props.checkItem(props.id, checked.checked);
        }}
        defaultChecked={props.completed}
      />
      <div className={classes.Item__container}>
      <p className={classes.Item__message}>{props.message}</p>
      <p>{props.time}</p>
      </div>
      
      <span
        className={classes.Item__close}
        alt="close button"
        onClick={() => props.removeItem(props.id)}
      />
    </div>
  );
};

export default Item;
