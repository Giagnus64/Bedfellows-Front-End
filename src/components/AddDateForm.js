import React, {Component} from 'react';
import { Form, Header } from "semantic-ui-react";
import { DateTimeInput } from  "semantic-ui-calendar-react";

const url = "https://vast-badlands-33576.herokuapp.com"
const DEFAULT_STATE = {
    relationship_id: '',
    location: '',
    time: '',
    activity: ''
}

class AddDateForm extends Component {
    
    state = {
        relationship_id: '',
        location: '',
        time: '',
        activity: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(url + `/outings`, {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                outing: {
                    ...this.state,
                    time: this.changeTimeToISOString(this.state.time)
                }
            })
        }).then(res => res.json())
        .then(data => {
            this.props.getDates()
            this.setState({
                ...DEFAULT_STATE
            })
        })
    }

    changeTimeToISOString = (dateTimeStr) => {
        let timeStr = dateTimeStr.slice(10).trim()
        let dateStr = dateTimeStr.slice(0, 10).trim()
        let timeArr = timeStr.split(':');        
        let dateArr = dateStr.split('-');        
        let dateObj = new Date(dateArr[2], (dateArr[1] - 1), dateArr[0], timeArr[0], timeArr[1]);
        return dateObj.toISOString();
    }

    //*******************************FORM STUFF*/
    handleChange = (e, obj) => {
        this.setState({
            [e.target.name]: e.target.value
        }, console.log(this.state))
    }

    //*************************DROPDOWN STUFF **/
    changeSelectedRel = (e, obj) => {
        e.persist()
        const relId = obj.value
        this.setState({
            relationship_id: relId
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

    //********************* DATE STUFF */
    convertToDate = (dateISO) => {
        return new Date(Date.parse(dateISO))
    }
   
    //convet date to format acceptable for semantic date component
    getDateFormat = (dateStr) => {
        let dateToDisplay = '';
            if (dateStr !== ''){
                this.changeTimeToISOString(dateStr)
                 return dateStr
            } else{
                // dateToDisplay = new Date();
                // const dateStr = `${dateToDisplay.getDate()}-${dateToDisplay.getMonth() + 1}-${dateToDisplay.getFullYear()}`
                // this.setState({
                //     time: dateStr
                // })
                // return dateStr
                return dateToDisplay
            }
    }
    
    handleDateChange = (e, obj) =>{
        this.setState({
            time: obj.value
        })
    }
    //********************************* */


    render() {
        return (<>
        <Header size="huge" style={{width:"100%"}}>Schedule Date</Header>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Select fluid 
                    placeholder='Select a Partner!' label="Select A Partner" 
                    options={this.makeOptions()} 
                    style={{ fontSize: '1.5rem', marginRight: '20px' }} 
                    onChange={this.changeSelectedRel}
                />
            </Form.Group>
            <Form.Group widths="equal">
                    <Form.Input fluid
                        label="Location"
                        placeholder="Location"
                        name="location"
                        onChange={this.handleChange}
                        >
                    </Form.Input>
            </Form.Group>
            <Form.Group widths="equal">
                    <Form.Input fluid 
                        label="Activity" 
                        placeholder="Activity" 
                        name="activity"
                        onChange={this.handleChange}
                    >
                    </Form.Input>
            </Form.Group>
            <Form.Group widths="equal">
                    <DateTimeInput
                        label="Date"
                        clearable
                        closable={true}
                        preserveViewMode={false}
                        name="time"
                        placeholder="Time"
                        iconPosition="left"
                        value={this.getDateFormat(this.state.time)}
                        onChange={this.handleDateChange}
                    />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Button style={{ fontSize: '1.5rem' }} >
                    Add Date
                </Form.Button>
            </Form.Group>
        </Form>
        </>)
    }
}
export default AddDateForm