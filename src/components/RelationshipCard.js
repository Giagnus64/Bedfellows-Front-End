import React from 'react';
import { Card, Button} from 'semantic-ui-react';

// if asked = true, user has been asked
const RelationshipCard = (props) => {
    const status = props.relationship.status
    const getButtons = () => {
        if(status === "pending"){
            if(props.asked){
                return (
                <div className='ui two buttons'>
                    <Button onClick={() => handleUpdate("confirmed")}basic color='green'>
                        Approve
                    </Button>
                    <Button onClick={() => handleUpdate("denied")} basic color='red'>
                        Decline
                    </Button>
                </div>
                )
            } else {
                return (<h3 className="pending-text">Relationship pending...</h3>)
            }
        } else if(status === "denied") {
            return (<h3 className="denied-text">Relationship Denied</h3>)
        } else{
            return (
                <div className='ui two buttons'>
                    <Button basic color='blue' onClick={ () => props.getCurrentRelationship(props.relationship)}>
                        See Relationship
                    </Button>
                    
                </div>
            )
        }   
    }

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
                return `${name} has denied your relationship request.`;
            } else if(status === "pending") {
                return `Your relationship request to ${name} is still pending.`;
            } else{
                return `You are in a relationship with ${name}!`
            }
        } 
    }
    const handleUpdate = (status) => {
        props.updateRelationshipStatus(status, props.relationship.id)
    }

    return (<Card className="relationship-card" style={{ minWidth: "400px"}}>
            <Card.Content>
            <Card.Header>{props.partner.first_name + " " + props.partner.last_name}</Card.Header>
                <Card.Description style={ 
                    {fontSize: "0.8em",   
                    } 
                    }>
                {`Status: ${getStatus()}`}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            {getButtons()}
            </Card.Content>
        </Card>
        )

}
export default RelationshipCard;