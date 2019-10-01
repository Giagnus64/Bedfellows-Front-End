import React from 'react';
import { Form } from "semantic-ui-react";
 const AddRelationshipForm = (props) => {
    return (<Form>
        <Form.Group>
            <Form.Select fluid onChange={props.changeSelectedUser} placeholder='Select a User!' options={props.strangers} style={{ fontSize: '1.5rem', marginRight: '20px' }} />
            <Form.Button style={{fontSize: '1.5rem'}} onClick={props.handleSubmit}>
                Request Relationship
            </Form.Button>
        </Form.Group>
          </Form>)
 }
 export default AddRelationshipForm