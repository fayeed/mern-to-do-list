import React, { Component } from "react";
import Authentication from "../Auth/Authentication";
import Provider from "../../context/MainContext";
import AddItemBtn from "../../components/addItemBtn/additemBtn";
import InputContainer from "../InputContainer/InputContainer";
import "./App.css";
import MainList from "../MainList/MainList";

class App extends Component {
  render() {
    return (
      <Provider>
        <React.Fragment>
          <main>
            <AddItemBtn />
            <InputContainer />
            <Authentication />
            <MainList />
          </main>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
