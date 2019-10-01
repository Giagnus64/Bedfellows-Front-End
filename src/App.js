import React, { Component } from 'react';
import './App.scss';
import { Menu } from "semantic-ui-react";
import LoginContainer from "./containers/LoginContainer";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Landing from './containers/Landing'
import NotFound from './components/NotFound'
import Profile from './components/Profile'

const url = "http://localhost:3000"

class App extends Component {

  state = {
    loggedIn: false,
    currentUserID: null,
    currentUser: {},
    token: null
  }

  editUserInfo = (columnName) => {
    console.log(columnName)

    // [NEED TO PUT THIS CALLBACK ON NEW EDIT FORM BUTTON]
    // const config = {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify({
    //     columnName:
    //   })
    // }
    // fetch(url+"/users/"+this.state.currentUserID)
    //   .then(r => r.json())
    //   .then(console.log())
  }

  loginUser = (creds) => {
    // console.log(creds)
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
      .then(user => {
        // console.log(user)
        if (user.message) {console.log(user.message)}
        else {
          this.setState({
            loggedIn: true,
            currentUserID: user.id,
            currentUser: user,
            token: user.token
          })
        }
        localStorage.token = user.token
        localStorage.user_id = user.id
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
      .then(user => {
        // console.log(user)
        if (user.message) {console.log(user.message)}
        else {
          this.setState({
            loggedIn: true,
            currentUserID: user.id,
            currentUser: user,
            token: user.token
          })
          localStorage.token = user.token
          localStorage.user_id = user.id
        }
      })
  }

  navItems = () => {
    if(this.state.token){
      return (<>
        <NavLink to="/profile"><Menu.Item name='Profile' /></NavLink>
        <NavLink to="/"><Menu.Item name='Dates'/></NavLink>
        <NavLink to="/"><Menu.Item name='Budget'/></NavLink>
        <Menu.Item name='Logout' onClick={this.logout}/>
        </>)
    }
  }
  logout =() =>{
    localStorage.clear()
    this.setState({
      loggedIn: false,
      currentUserID: null,
      currentUser: {},
      token: null
    })
  }

  render(){
    return (
    <div className="App">
        <Menu inverted className="fixed top">
          <Menu.Item header>BedFellows</Menu.Item>
          {this.navItems()}
        </Menu>
        <Switch>
          <Route
            path='/login'
            exact
            render={ (props) => this.state.token ? <Redirect to='/profile' /> : <LoginContainer currLogin={this.state} loginUser={this.loginUser} /> }
          />
        <Route
          path='/home'
          exact
          render={ (props) => this.state.token ? <Landing currentUser={this.state.currentUser} /> : <Redirect to='/login' /> }
        />
        <Route
          path='/profile'
          exact
          render={ () => this.state.token ? <Profile currentUser={this.state.currentUser} editUserInfo={this.editUserInfo} /> : <Redirect to='/login' /> }
        />
        <Route
          exact
          path='/'
          render={ (props) => this.state.token ? <Redirect to='/profile' /> : <Redirect to='/login' /> }
        />
        <Route component={ NotFound } />
        </Switch>
    </div>
    );
  }

  componentDidMount() {
    if (localStorage.token) {
      this.setState({
        token: localStorage.token,
        currentUserID: localStorage.user_id
      })
      fetch(url + `/users/${localStorage.user_id}`,
      { headers: {"Authorization": localStorage.token}})
      .then(res => res.json())
      .then(data => this.setState({
          currentUser: data
      }))
    }
  }

}

export default App;
