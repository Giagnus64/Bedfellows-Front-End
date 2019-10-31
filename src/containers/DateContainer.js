import React, { Component } from 'react';
import { Container, Card, Header } from "semantic-ui-react";
import DateCard from '../components/DateCard'
import AddDateForm from '../components/AddDateForm'
import { getUrl } from "../DBInfo";

const url = getUrl();

export default class DateContainer extends Component{

    state = {
        displayDate: false,
        currentDate: '',
        dates: [],
        selectedUserId: '',
        partners: []
    }

    componentDidMount = () => {
        //get dates
        this.getDates();
        //get partners
        fetch(url + `/partners/${localStorage.user_id}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Authorization": localStorage.token
                }
            })
        .then(res => res.json())
        .then(data => {
            console.log("partners", data)
            this.setState({
                partners: data
            })
        })
    }

    getDates = () => {
        fetch(url + `/dates/${localStorage.user_id}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Authorization": localStorage.token
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    dates: data
                })
            })
    }

    getDateCards = () => {
        return this.state.dates.map((date) => {
            return(<DateCard
            key={date.id}
            dateData={date}
            partner={date.relationship.askee ? date.relationship.askee : date.relationship.asker }
            deleteDate={this.deleteDate}
            />)
        })
    }

    deleteDate = (id) => {
        fetch(url + `/outings/${id}`,{
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.token
        }})
        .then(res => res.json())
        .then(data => this.getDates())
    }

    render(){
        return (
            <>
            <Header as="h1">Your Dates</Header>
                <Container fluid className="date-container">
                    <Card.Group>
                {this.getDateCards()}
                    </Card.Group>
                </Container>
                <div
                        style={
                            {
                                marginTop: '10px',
                                backgroundColor:'white',
                                padding: '20px',
                                borderRadius:'5px',
                                minWidth: "600px",
                                margin: "0 auto"
                            }}
                        className="add-date-form">
                    <AddDateForm partnersObj={this.state.partners} getDates={this.getDates}/>
                </div>
            </>
        )
    }
}