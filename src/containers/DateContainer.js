import React, { Component } from 'react';

export default class DateContainer extends Component{

    state = {
        displayDate: false,
        currentDate: '',
    }


    render(){
        return (
            <h1>Dates Page</h1>
        )
    }
}