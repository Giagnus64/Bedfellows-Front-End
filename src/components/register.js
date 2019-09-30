import React from 'react';
import { Form } from 'semantic-ui-react';

const Register = (props) => {

   const getForm = () => {
        if (props.formState.formStatus === "register"){
            return (
                    <>
                    <h2>Register</h2>
                    <Form.Group widths="equal" inline>
                        <Form.Input label="First Name" type="text" placeholder="First Name" value={props.formState.first_name} onChange={props.handleChange} name="first_name" />
                    </Form.Group>
                    <Form.Group widths="equal" inline>
                        <Form.Input label="Last Name" type="text" placeholder="Last Name" value={props.formState.last_name} onChange={props.handleChange} name="last_name" />
                    </Form.Group>
                    </>
            )
        } else {
            return <h2>Login</h2>
        }
    }


    return (
        <Form onSubmit={props.handleSubmit}>
        {getForm()}
            <Form.Group widths="equal" inline>
                <Form.Input label="Username" type="text" placeholder="Username" name="username" value={props.formState.username} onChange={props.handleChange}/>
            </Form.Group>
            <Form.Group widths="equal" inline>
                <Form.Input label="Password" type="password" placeholder="Password" name="password" value={props.formState.password} onChange={props.handleChange}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
    )

}

export default Register;
