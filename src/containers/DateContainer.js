import React, { Component } from 'react';
import DateCard from '../components/DateCard'

const url = "http://localhost:3000"

export default class DateContainer extends Component{

    state = {
        displayDate: false,
        currentDate: '',
        dates: [],
        selectedUserId: ''
    }

    componentDidMount = () => {
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
            />)
        })
    }

    render(){
        return (
            <>
            {this.getDateCards()}
            </>
        )
    }
}