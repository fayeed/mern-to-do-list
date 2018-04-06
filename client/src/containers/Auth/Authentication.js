import React, { Component } from "react";
import Input from "../../components/Input/Input";
import { Consumer } from "../../context/MainContext";
import LogIn from "../../components/LogIn/LogIn";
import SignUp from "../../components/SignUp/SignUp";

import classes from "./Authentication.css";

// Authentication container
// wraps the input & signup component
class Authentication extends Component {
  // state for maneging the showing signup
  state = {
    active: false
  };

  // toggle funtion to the change the state of the active flag
  toggleActive = () => {
    this.setState({ active: !this.state.active });
  };

  // renders the component based on the flag
  render() {
    return (
      <Consumer>
        {context => (
          <React.Fragment>
            {context.isSignUpOpen ? (
              <div className={classes.Authentication}>
                <React.Fragment>
                  {context.isLoggedIn ? (
                    <span
                      className={classes.Authentication__close}
                      alt="close button"
                      onClick={context.toggleSignUp}
                    />
                  ) : null}
                </React.Fragment>

                {!context.isLoggedIn ? (
                  <div className={classes.Authentication__container}>
                    <LogIn
                      changeEmail={context.changeEmail}
                      changePassword={context.changePassword}
                      getUser={context.getUser}
                      fetchList={context.fetchList}
                    />
                    <SignUp
                      changeName={context.changeUsername}
                      changeEmail={context.changeEmail}
                      changePassword={context.changePassword}
                      active={this.state.active}
                      addUser={context.addUser}
                      toggleActive={this.toggleActive}
                    />
                  </div>
                ) : (
                  <div className={classes.Authentication__logoutContainer}>
                    <Input
                      type="Logout"
                      onClick={context.toggleLoggedIn}
                      label="Logout"
                    />
                  </div>
                )}
              </div>
            ) : null}
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default Authentication;
