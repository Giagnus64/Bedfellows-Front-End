import React, {Component} from 'react';
import { Form, Header } from "semantic-ui-react";

class AddDateForm extends Component {
    
    state = {
        relationshipID: '',
        location: '',
        time: ''
    }

    handleChange = (e, obj) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    makeOptions = () => {
        return this.props.partnersObj.map((partnerObj) => {
            return {
                key: partnerObj.relationship_id,
                value: partnerObj.relationship_id,
                text: `${partnerObj.partner.first_name}  ${partnerObj.partner.last_name}`
            }
        })
    }
    render() {
        return (<>
        <Header size="huge" style={{width:"100%"}}>Schedule Date</Header>
        <Form>
            <Form.Group widths="equal">
                <Form.Select fluid 
                    placeholder='Select a Partner!' label="Select A Partner" 
                    options={this.makeOptions()} 
                    style={{ fontSize: '1.5rem', marginRight: '20px' }} 
                />
                <Form.Input fluid 
                    label="Location" 
                    placeholder="Location" 
                    onChange={this.handleChange}
                >
                </Form.Input>
            </Form.Group>
            <Form.Group>
                <Form.Button style={{ fontSize: '1.5rem' }} >
                    Add Date
                </Form.Button>
            </Form.Group>
        </Form>
        </>)
    }
}
export default AddDateForm