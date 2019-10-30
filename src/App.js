import React, { Component } from 'react';
import './App.scss';
import { Menu } from "semantic-ui-react";
import LoginContainer from "./containers/LoginContainer";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Landing from './containers/Landing'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import DateContainer from './containers/DateContainer'

// heroku-hosted backend
//const url = "https://vast-badlands-33576.herokuapp.com"
const url = "http://localhost:3000"

class App extends Component {

  state = {
    loggedIn: false,
    currentUserID: null,
    currentUser: {},
    token: null,
    formError: false,
    formErrorText: ''
  }


  componentDidMount() {
    if (localStorage.token) {
      console.log("app mounted")
      this.setState({
        token: localStorage.token,
        currentUserID: localStorage.user_id
      })
      this.getCurrentUser();
    }
  }

  removeFormError = () =>{
    this.setState({
      formError: false,
      formErrorText: ''
    })
  }

  deleteUser = (id) => {
    localStorage.clear()
    const config ={
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": this.state.token
      },
      body: JSON.stringify({
        id
      })
    }
    console.log(config)
    fetch(url+"/users/"+id, config)
      .then(r => r.json())
      .then(() => {
        this.setState({
          loggedIn: false,
          currentUserID: null,
          currentUser: {},
          token: null
        })
      })
  }

  editUserInfo = (keyName, value) => {
    const updatedUser = this.state.currentUser
    updatedUser[keyName] = value
    this.setState({
      // UPDATING DOM/STATE EVEN WITH BELOW COMMENTED OUT
      currentUser: updatedUser
    })

    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": this.state.token
      },
      body: JSON.stringify({
        [keyName]: value
      })
    }
    fetch(url+"/users/"+this.state.currentUserID, config)
      .then(r => r.json())
      .then(console.log)
  }

  loginUser = (creds) => {
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
        console.log(user)
        if (user.messages) {
          this.setState({
            formError: true,
            formErrorText: user.messages
          })
        }
        else {
          localStorage.token = user.token
          localStorage.user_id = user.id
          this.setState({
            formError: false,
            formErrorText: '',
            loggedIn: true,
            currentUserID: user.id,
            currentUser: user,
            token: user.token
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
      .then(user => {
        if (user.messages) {
          this.setState({
            formError: true,
            formErrorText: user.messages
          })
        }
        else {
          localStorage.token = user.token
          localStorage.user_id = user.id
          this.setState({
            formError: false,
            formErrorText: '',
            loggedIn: true,
            currentUserID: user.id,
            currentUser: user,
            token: user.token
          })
        }
      })
  }

  navItems = () => {
    if(this.state.token){
      return (<>
        <NavLink to="/profile"><Menu.Item name='Profile' /></NavLink>
        <NavLink to="/home"><Menu.Item name='Relationships'/></NavLink>
        <NavLink to="/dates"><Menu.Item name='Dates'/></NavLink>
        <Menu.Item name='Logout' onClick={this.logout}/>
        <Menu.Item className="header-welcome" id="header-username">{`Logged in as ${this.state.currentUser.first_name + " " + this.state.currentUser.last_name}`}</Menu.Item>
        </>)
    }
  }
  logout = () =>{
    localStorage.clear();
    this.setState({
      loggedIn: false,
      currentUserID: null,
      currentUser: {},
      token: null
    })
  }


  getCurrentUser = () => {
    fetch(url + `/users/${localStorage.user_id}`,
      { headers: { "Authorization": localStorage.token } })
      .then(res => res.json())
      .then(data => this.setState({
        currentUser: data
      }))
  }
  

  render(){
    return (<>
      <Menu inverted className="top" id="navbar">
        <Menu.Item header>BedFellows</Menu.Item>
        {this.navItems()}
      </Menu>
    <div className="App">
        <Switch>
          <Route
            path='/login'
            exact
            render={ (props) => this.state.token ? <Redirect to='/home' /> : <LoginContainer currLogin={this.state} removeFormError={this.removeFormError} loginUser={this.loginUser} /> }
          />
        <Route
          path='/home'
          exact
          render={ (props) => this.state.token ? <Landing getCurrentUser={this.getCurrentUser} currentUser={this.state.currentUser}/> : <Redirect to='/login'/> }
        />
        <Route
          path='/profile'
          exact
          render={ () => this.state.token ? <Profile currentUser={this.state.currentUser} editUserInfo={this.editUserInfo} deleteUser={this.deleteUser} /> : <Redirect to='/login' /> }
        />
        <Route
            path='/dates'
            exact
            render={() => this.state.token ? <DateContainer currentUser={this.state.currentUser} /> : <Redirect to='/login' />}
        />
        <Route
          exact
          path='/'
          render={ (props) => this.state.token ? <Redirect to='/profile' /> : <Redirect to='/login' /> }
        />
        
        <Route component={ NotFound } />
        </Switch>
    </div>
    </>
    );
  }

}

export default App;
