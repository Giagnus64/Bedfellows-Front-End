import React, { Component } from 'react';
import './App.css';
import LoginContainer from "./containers/LoginContainer";

const url = "http://localhost:3000"

class App extends Component {

  state = {
    loggedIn: false,
    currentUserID: null,
    currentUser: {},
    token: ""
  }

  loginUser = (creds) => {
    console.log(creds)
    if (creds.formStatus === "register") {
      this.registerFetch(creds)
    } else {
      this.logInFetch(creds)
    }
  }

  logInFetch = (creds) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: creds.username,
        password: creds.password
      })
    }
    fetch(url + `/login`, config)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        if (data.message) {console.log(data.message)}
        else {
          this.setState({
            loggedIn: true,
            currentUserID: data.user.id,
            currentUser: data.user,
            token: data.token
          })
        }
      })
  }

  registerFetch = (creds) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        ...creds
      })
    }

    fetch(url + `/users`, config)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        if (data.message) {console.log(data.message)}
        else {
          this.setState({
            loggedIn: true,
            currentUserID: data.user.id,
            currentUser: data.user,
            token: data.token
          })
        }
      })
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
