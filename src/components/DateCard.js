import React from 'react';
import { Card, Button } from 'semantic-ui-react';

// if asked = true, user has been asked
const DateCard = (props) => {
    console.log(props)
    const dateTime = new Date(props.dateData.time)
    

    return (<Card className="date-card" style={{ minWidth: "400px" }}>
        <Card.Content>
            <Card.Header>{`${props.dateData.activity} with ${props.partner.first_name}`}</Card.Header>
            <Card.Description style={
                {
                    fontSize: "0.8em",
                    lineHeight: "30px"
                }
            }>
                <p>Time: {dateTime.toLocaleString()}</p>
                <p>Location: {props.dateData.location}</p>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button basic color='green'>
                See Date
                </Button>
                <Button basic color='red'>Delete Date</Button>
            </div>
        </Card.Content>
    </Card>
    )

}
export default DateCard;