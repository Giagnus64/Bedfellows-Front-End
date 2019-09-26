import React, { Component } from 'react';
import './App.css';
import LoginContainer from "./containers/LoginContainer";

class App extends Component {

  state = {
    loggedIn: true,
    currentUser: 1
  }

  render(){
    return (
    <div className="App">
          <LoginContainer currLogin={this.state} />
      </div>
    );
  }
}

export default App;
