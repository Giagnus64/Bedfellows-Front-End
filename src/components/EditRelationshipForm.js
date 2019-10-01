import React from 'react';
import { Form } from 'semantic-ui-react'

const EditRelationshipForm = (props) => {
    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Anniversary' name="anniversary" placeholder='Anniversary' />
                <Form.Input fluid label='Nickname' name="nickname" placeholder='Nickname' />  
            </Form.Group> 
            <Form.Button>Submit</Form.Button>
        </Form>
    )
}