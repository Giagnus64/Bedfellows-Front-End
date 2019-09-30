import React, { Component } from 'react';
import './App.css';
import LoginContainer from "./containers/LoginContainer";

class App extends Component {

  state = {
    loggedIn: true,
    currentUser: 1
  }

  loginUser = (creds) => {
    console.log(creds)
  }

  render(){
    return (
    <div className="App">
          <LoginContainer currLogin={this.state} loginUser={this.loginUser} />
      </div>
    );
  }
}

export default App;
