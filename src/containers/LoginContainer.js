import React, { Component } from 'react';
import {Card} from 'semantic-ui-react';
import Login from '../components/login'
import Register from '../components/register'

class LoginContainer extends Component{
    

    state = {
        login: false
    }

    handleUserForm = () => {
       if(this.state.login){
        return (<Login />)
       } else {
        return (<Register/>)
       }
    }



    render() {
        return (
            <div className="loginContainer">
                <Card>
                {this.handleUserForm()}
                </Card>
            </div>
        )
    }
}
export default LoginContainer