import React from 'react';
import { Card, Button} from 'semantic-ui-react';

const RelationshipCard = (props) => {
    console.log(props)
    const status = props.relationship.status

    const getButtons = () => {
        //check status and display Accept/Decline if pending and youve been asked
        //display see relationship/edit relationship if confirmed
        //display denied if denied
        
    }
    //make new relationship form
    //edit relationship form
    //seed some data for relationship stuff
    // put relationship data in cards

    //css ideas - make nave bigger make cards bigger desc text smaller and placement once forms are up



    const getStatus = () => {
        const name = props.partner.first_name
        if (props.asked){
            if (status === "denied" ) {
                return `You have denied a relationship request from ${name}.`
            } else if(status === "pending"){
                return `${name}'s relationship request is waiting for your response!`
            } else {
                return `You are in a relationship with ${name}!`
            }
        } else {
            if(status === "denied") {
                return `${name} has denied you relationship request.`;
            } else if(status === "pending") {
                return `Your relationship request to ${name} is still pending>`;
            } else{
                return `You are in a relationship with ${name}!`
            }
        } 
    }

    return (<Card>
            <Card.Content>
            <Card.Header>{props.partner.first_name + " " + props.partner.last_name}</Card.Header>
                <Card.Description>
                {`Status: ${getStatus()}`}
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