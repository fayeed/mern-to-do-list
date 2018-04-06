import React, { Component } from "react";
import Axios from "axios";

const { Provider, Consumer } = React.createContext()

// holds the state of the whole application
class MainContext extends Component {
  state = {
    list: [], // list array
    id: "", // userID of the user
    email: "", // email ID of the user
    password: "", // password of the user
    username: "", // username of the user
    message: "", // message of the user
    isLoggedIn: false, // loggedIn flag
    isSignUpOpen: true, // Authenthication container flag
    isInputOpen: false // InputConatiner flag
  };

  // change Email triggers onChange method of the Input
  changeEmail = email => {
    this.setState({ email });
  };

  // change Password triggers onChange method of the Input
  changePassword = password => {
    this.setState({ password });
  };

  // change Username triggers onChange method of the Input
  changeUsername = username => {
    this.setState({ username });
  };

  // chnage Message triggers onChange method of the Input
  changeMessage = message => {
    this.setState({message})
  }

  // flag toggle for the loggedIn
  toggleIsLoggedIn = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn, isSignUpOpen: false, username: "", email: "", password: "", list: [] });
  };

  // flag toggle for the signup
  toggleSignUp = () => {
    this.setState({isSignUpOpen: !this.state.isSignUpOpen})
  }

  // flag toggle for the input
  toggleInput = () => {
    this.setState({isInputOpen: !this.state.isInputOpen})
  }

  // makes the rest api call to the server to get thse user
  // update the state id, loggedInb, isSignUp
  getUser = () => {
    Axios.get(
      `api/getUser?email=${this.state.email}&password=${this.state.password}`
    ).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log('log', res.data._id );
        this.setState({ isLoggedIn: !this.state.isLoggedIn, id:res.data._id, isSignUpOpen: false });
        this.getList();
      }
    });
  };

  // makes the rest api call to the server to add thse user
  // update the state id, loggedInb, isSignUp
  addUser = () => {
    console.log('click')
    Axios.post(
      `api/addUser?email=${this.state.email}&password=${
        this.state.password
      }&username=${this.state.username}`
    ).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log(res);
        this.setState({ isLoggedIn: !this.state.isLoggedIn, id: res.data._id, isSignUpOpen: false });
        return true;
      }
    });
  };

  // makes the rest api call to the server to get thse list
  // update the state list
  getList = () => {
    console.log('id', this.state.id)
    Axios.get(`api/getList?userID=${this.state.id}`).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log(res);
        this.setState({ list: res.data });
        return true;
      }
    });
  };

  // makes the rest api call to the server to add thse list
  // update the state list, isInputOpen, message
  addItem = () => {
    Axios.post(`api/addItem?userID=${this.state.id}&message=${this.state.message}`).then(
      res => {
        if (res === "" || res === null) {
          return false;
        } else {
          console.log(res.data);
          let list = this.state.list || [];
          list.push(res.data);
          this.setState({ list, isInputOpen: false, message: "" });
          return true;
        }
      }
    );
  };

  // makes the rest api call to the server to remove thse item from the list
  // update the state list
  removeItem = itemID => {
    Axios.delete(`api/removeItem?listID=${itemID}`).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log(res);
        let list = this.state.list;
        let newList = list.filter(ele => ele._id !== itemID);
        this.setState({ list: newList });
        return true;
      }
    });
  };

  // makes the rest api call to the server to check the item
  // update the state list
  checkItem = (itemID, checked) => {
    Axios.put(`api/checked?listID=${itemID}&checked=${checked}`).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        let list = this.state.list;
        let newList = list.map(ele => {
          if (ele._id === itemID) {
            ele.completed = checked;
            return ele;
          } else {
            return ele;
          }
        });
        this.setState({ list: newList });
        return true;
      }
    });
  };

  componentDidMount() {
    this.getList()
  }

  render() {
    return (
      // pass all the function and state as value prop to
      // the provider
      <Provider
        value={{
          ...this.state,
          getUser: this.getUser,
          addUser: this.addUser,
          addItem: this.addItem,
          getList: this.getList,
          removeItem: this.removeItem,
          checkItem: this.checkItem,
          changeEmail: this.changeEmail,
          changePassword: this.changePassword,
          changeUsername: this.changeUsername,
          toggleLoggedIn: this.toggleIsLoggedIn,
          toggleSignUp: this.toggleSignUp,
          toggleInput: this.toggleInput,
          changeMessage: this.changeMessage
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default MainContext;
export { Consumer };
