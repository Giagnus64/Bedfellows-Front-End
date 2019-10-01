import React from 'react';
import { Form } from 'semantic-ui-react'
import {DateInput} from 'semantic-ui-calendar-react';

class EditRelationshipForm extends React.Component {
    state = {
        anniversary: this.props.anniversary,
        nickname: this.props.nickname 
    }

    //convet date to format acceptable for semantic date component
    getDateFormat = (date) => {
      const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      return dateStr
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, console.log("form state", this.state))
    }

    handleDateChange = (e, obj) => {
        e.persist();
        const dateArr = obj.value.split("-");
        let dateObj = new Date(dateArr[2], dateArr[1] - 1, dateArr[0])
        this.setState({
            anniversary: dateObj
        }, console.log(this.state))
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateRelationship(this.state);
        this.props.handleClose();

    }
    render(){
        console.log(this.props)
        return (
            <Form style={{backgroundColor:"white", padding:'20px'}}>
                <Form.Group widths='equal'>
                    <DateInput
                        label="Anniversary"
                        name="anniversary"
                        placeholder="Date"
                        value={this.getDateFormat(this.state.anniversary)}
                        iconPosition="left"
                        onChange={this.handleDateChange}
                    />  
                </Form.Group> 
                <Form.Group widths="equal">
                    <Form.Input fluid label='Nickname' name="nickname" placeholder='Nickname' value={this.state.nickname} onChange={this.handleChange} />
                </Form.Group>
                <Form.Button color="blue" onClick={this.handleSubmit}>Submit</Form.Button>
            </Form>
        )
    }
}
export default EditRelationshipForm;