import React from 'react';
import { Card, Button, Dimmer, Loader, Container } from 'semantic-ui-react';
import RelationshipCard from "../components/RelationshipCard";

const url = "http://localhost:3000"

class Landing extends React.Component {

  getRelationshipCards = () => {
    let relationshipCards = [];
    if(!this.props.currentUser.asking_for_relationships){
      console.log("hit dimmer!")
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )
    } else{
     console.log(this.props.currentUser)
     const askedArr = this.props.currentUser.asked_for_relationships.map((asked) => {
          return <RelationshipCard asked={true} key={asked.id} relationship={asked} partner={asked.asker}/>
     })
     const askingArr = this.props.currentUser.asking_for_relationships.map((asking) => {
         return <RelationshipCard  partner={asking.askee} asked={false} key={asking.id} relationship={asking} />
     })
    relationshipCards = [...askedArr, ...askingArr]
    return relationshipCards;
    }
    
  
  }


  render() {
    
    return (<>
      <h1 id="relationships-header">Relationships</h1>
    <Container fluid className="relationship-container">
      <Card.Group>
      {this.getRelationshipCards()}
      </Card.Group>
    </Container>
    </>
    )
  }

}

export default Landing;
 //make new relationship form
    //edit relationship form
    //seed some data for relationship stuff
    // put relationship data in cards