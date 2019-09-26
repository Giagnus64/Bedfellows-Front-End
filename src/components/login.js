import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }


    render() {
        return(
            <Form>
                <Form.Group widths="equal" inline>
                    <Form.Input label="Username" type="text" placeholder="Username" value={this.state.username} />
                </Form.Group>
                <Form.Group widths="equal" inline>
                    <Form.Input label="Password" type="password" placeholder="Password" value={this.state.password} />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
        )

    }
}

export default Login;