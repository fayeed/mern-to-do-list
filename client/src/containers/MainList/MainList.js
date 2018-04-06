import React from "react";
import { Consumer } from "../../context/MainContext";
import Item from "../../components/Item/Item";
import userIcon from "../../assets/user.svg";

import classes from "./MainList.css";

// mainlist hold all the list item
const MainList = () => {
  let items = null;

  return (
    <Consumer>
      {context => (
        <React.Fragment>
          <img
            className={classes.MainList__userIcon}
            src={userIcon}
            alt="user Icon"
            onClick={context.toggleSignUp}
          />
          <div className={classes.MainList}>
            <p className={classes.MainList__greetings}>
              Hello, {context.username} <br />
              <span>here's whats on your list</span>
            </p>
            {context.list.length > 0 ? (
              (items = context.list.map(ele => {
                return (
                  <Item
                    key={ele._id}
                    id={ele._id}
                    time={ele.time}
                    completed={ele.completed === "true"}
                    message={ele.message}
                    checkItem={context.checkItem}
                    removeItem={context.removeItem}
                  />
                );
              }))
            ) : (
              <p className={classes.MainList__noItem}>
                No Items added Please add by clicking on the add button.
              </p>
            )}
          </div>
        </React.Fragment>
      )}
    </Consumer>
  );
};

export default MainList;
