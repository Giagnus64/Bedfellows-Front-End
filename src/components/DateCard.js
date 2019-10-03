import React from 'react';
import { Card, Button } from 'semantic-ui-react';

// if asked = true, user has been asked
const DateCard = (props) => {
    console.log(props)
    

    return (<Card className="date-card" style={{ minWidth: "400px" }}>
        <Card.Content>
            <Card.Header>{`${props.dateData.activity} with ${props.partner.first_name}`}</Card.Header>
            <Card.Description style={
                {
                    fontSize: "0.8em",
                    lineHeight: "30px"
                }
            }>
                <p>Time: {props.dateData.time}</p>
                <p>Location: {props.dateData.location}</p>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
        </Card.Content>
    </Card>
    )

}
export default DateCard;