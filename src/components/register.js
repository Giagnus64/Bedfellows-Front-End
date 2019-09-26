import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        username: '',
        password: ''

    }


    render() {
        return (
            <Form>
                <Form.Group widths="equal" inline>
                    <Form.Input label="First Name" type="text" placeholder="First Name" value={this.state.first_name} />
                </Form.Group>
                <Form.Group widths="equal" inline>
                    <Form.Input label="Last Name" type="text" placeholder="Last Name" value={this.state.last_name} />
                </Form.Group>
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

export default Register;