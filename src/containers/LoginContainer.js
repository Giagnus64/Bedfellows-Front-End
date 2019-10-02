import React, { Component } from 'react';
import {Card, Menu} from 'semantic-ui-react';
import Register from '../components/register'


class LoginContainer extends Component{

    state = {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        formStatus: 'register'
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.loginUser(this.state)
        this.setState({
          first_name: '',
          last_name: '',
          username: '',
          password: ''
        })
    }

    changeForm = (event) => {
        this.props.removeFormError();
        this.setState({
            formStatus: event.target.dataset.name
        })
    }

    render() {
        return (
            <div className="loginContainer">
                <Menu tabular className="login-menu">
                    <Menu.Item data-name="login" active={this.state.formStatus === "login"} className="menu-item" onClick={this.changeForm}>
                        Login
                    </Menu.Item>
                    <Menu.Item data-name="register" active={this.state.formStatus === 'register'} className="menu-item" onClick={this.changeForm}>
                        Register
                    </Menu.Item>
                </Menu>
                <Card className="login-card">
                <Register formState={this.state} errorState={this.props.currLogin.formError} errorText={this.props.currLogin.formErrorText} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                </Card>
            </div>
        )
    }
}
export default LoginContainer
