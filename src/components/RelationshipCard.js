import React from 'react';
import { Card, Button} from 'semantic-ui-react';

const RelationshipCard = (props) => {
    console.log(props)

    const getStatus = () => {
        if (props.asked){
            if (props.relationship.status === "denied" ) {
                return `You have denied a relationship request from ${props.relationship.asker.first_name}.`
            } else if(props.relationship.status === "pending"){
                return "<Thisguy>'s relationship request is waiting for your response!"
            } else {
                return "You are in a relationship with <thisguy>!"
            }
        } else {
            if(props.relationship.status === "denied") {
                return "<Thisguy> has denied you relationship request.";
            } else if(props.relationship.status === "pending") {
                return "Your relationship request to <thisguy> is still pending>";
            } else{
                return "You are in a relationship with <thisguy>!"
            }
        } 
    }

    return (<Card>
            <Card.Content>
            <Card.Header>{}</Card.Header>
                <Card.Description>
                    {getStatus()}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
          </Button>
                    <Button basic color='red'>
                        Decline
          </Button>
                </div>
            </Card.Content>
        </Card>
        )

}
export default RelationshipCard;