import React, { Component } from "react";
import Axios from "axios";

const { Provider, Consumer } = React.createContext()

class MainContext extends Component {
  state = {
    list: [],
    id: "",
    email: "",
    password: "",
    username: "",
    message: "",
    isLoggedIn: false,
    isSignUpOpen: true,
    isInputOpen: false
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

  changeMessage = message => {
    this.setState({message})
  }

  toggleIsLoggedIn = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn, isSignUpOpen: false, username: "", email: "", password: "", list: [] });
  };

  toggleSignUp = () => {
    this.setState({isSignUpOpen: !this.state.isSignUpOpen})
  }

  toggleInput = () => {
    this.setState({isInputOpen: !this.state.isInputOpen})
  }

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
        {this.props.children}{" "}
      </Provider>
    );
  }
}

export default MainContext;
export { Consumer };
