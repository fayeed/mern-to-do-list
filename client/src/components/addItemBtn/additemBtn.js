import React from "react";
import { Consumer } from "../../context/MainContext";

import classes from "./addItemBtn.css";

// add Button Item used as a toggle for showing InputContainer
// consumes the context from MainContext
const addItemBtn = props => {
  return (
    <Consumer>
      {context => (
        <React.Fragment>
          <div
            className={
              !context.isInputOpen
                ? classes.addItemBtn
                : classes.addItemBtnActive
            }
            onClick={context.toggleInput}
          >
            <div className={classes.addItemBtn__icon} />
          </div>

          {context.isInputOpen ? (
            <div className={classes.addItemBtn_1} onClick={context.addItem}>
              <div className={classes.addItemBtn__icon} />
            </div>
          ) : null}
        </React.Fragment>
      )}
    </Consumer>
  );
};

export default addItemBtn;
