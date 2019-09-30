import React, { Component } from 'react';
import './App.css';
import { Menu } from "semantic-ui-react";
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

  navItems = () => {
    if(this.state.loggedIn){
      return (<div className="navItems">
      <Menu.Item name='Home'/>
        <Menu.Item name='Edit User'/>
        <Menu.Item name='Logout' />
        </div>)
    }
  }

  render(){
    return (
    <div className="App">
        <Menu inverted stackable className="fixed top">
          <Menu.Item header>BedFellows</Menu.Item>
          {this.navItems()}
        </Menu>
        <LoginContainer currLogin={this.state} loginUser={this.loginUser} />
      </div>
    );
  }
}

export default App;
