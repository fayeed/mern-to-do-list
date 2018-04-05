import React, { Component } from "react";
import Axios from "axios";

const { Provider, Consumer } = React.createContext();

class MainContext extends Component {
  state = {
    list: [],
    id: "",
    email: "",
    password: "",
    username: "",
    isLoggedIn: false
  };

  changeEmail = email => {
    this.setState({ email });
  };

  changePassword = password => {
    this.setState({ password });
  };

  changeUsername = username => {
    this.setState({ username });
  };

  toggleIsLoggedIn = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  };

  getUser = () => {
    Axios.get(
      `api/getUser?email=${this.state.email}&password=${this.state.password}`
    ).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log(res);
        this.setState({ isLoggedIn: !this.state.isLoggedIn });
        this.getList();
      }
    });
  };

  addUser = () => {
    Axios.post(
      `api/addUser?email=${this.state.email}&password=${
        this.state.password
      }&username=${this.state.username}`
    ).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log(res);
        this.setState({ isLoggedIn: !this.state.isLoggedIn });
        return true;
      }
    });
  };

  getList = () => {
    Axios.get(`api/getList?userID=${this.state.id}`).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log(res);
        this.setState({ list: res });
        return true;
      }
    });
  };

  addItem = message => {
    Axios.post(`api/addItem?userID=${this.state.id}&message=${message}`).then(
      res => {
        if (res === "" || res === null) {
          return false;
        } else {
          console.log(res);
          let list = this.state.list;
          list.push(res);
          this.setState({ list });
          return true;
        }
      }
    );
  };

  removeItem = itemID => {
    Axios.delete(`api/removeItem?listID=${itemID}`).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log(res);
        let list = this.state.list;
        let newList = list.filter(ele => ele.id !== itemID);
        this.setState({ list: newList });
        return true;
      }
    });
  };

  checkItem = itemID => {
    Axios.post(`api/checked?listID=${itemID}`).then(res => {
      if (res === "" || res === null) {
        return false;
      } else {
        console.log(res);
        let list = this.state.list;
        let newList = list.map(ele => {
          if (ele.id === itemID) {
            ele.completed = !ele.completed;
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

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          getUser: this.getUser,
          addItem: this.addItem,
          getList: this.getList,
          removeItem: this.removeItem,
          checkItem: this.checkItem,
          changeEmail: this.changeEmail,
          changePassword: this.changePassword,
          changeUsername: this.changeUsername,
          toggleIsLoggedIn: this.toggleIsLoggedIn
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default MainContext;
export { Consumer };
