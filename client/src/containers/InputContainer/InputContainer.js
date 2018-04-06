import React from "react";
import { Consumer } from "../../context/MainContext";
import HeroInput from "../../components/HeroInput/HeroInput";

import classes from "./InputContainer.css";

// inputContainer holds the heroInput
const InputContainer = () => {
  return (
    <Consumer>
      {context => (
        <React.Fragment>
          {context.isInputOpen ? (
            <div className={classes.InputContainer}>
              <div className={classes.InputContainer__container}>
                <HeroInput
                  placeholder="What are you up to?"
                  label="What are you up to?"
                  change={context.changeMessage}
                />
              </div>
            </div>
          ) : null}
        </React.Fragment>
      )}
    </Consumer>
  );
};

export default InputContainer;
