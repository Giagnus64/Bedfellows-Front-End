import React from 'react';
import { Card, Button, Dimmer, Loader, Container } from 'semantic-ui-react';
import RelationshipCard from "../components/RelationshipCard";
import RelationshipSpecs from "../components/RelationshipSpecs";

const url = "http://localhost:3000"

class Landing extends React.Component {

  state = {
    currentRel: '',
    displayRel: false,
  }

  handleChange = () => {

  }

  handleSubmit = () => {

  }

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
          return (<RelationshipCard 
            asked={true} 
            key={asked.id} 
            relationship={asked} 
            partner={asked.asker}
            getCurrentRelationship={this.getCurrentRelationship}
            />)
     })

     const askingArr = this.props.currentUser.asking_for_relationships.map((asking) => {
         return (<RelationshipCard 
          partner={asking.askee} 
          asked={false} 
          key={asking.id} 
          relationship={asking}
          getCurrentRelationship={this.getCurrentRelationship}
           />)
     })
    relationshipCards = [...askedArr, ...askingArr]
    return relationshipCards;
    }
  }
  getCurrentRelationship = (relationship) => {
    this.setState({
      currentRel: relationship,
      displayRel: true
    })
  }

  render() {
    
    return (
    <>
      <h1 id="relationships-header">Relationships</h1>
    <Container fluid className="relationship-container">
      <Card.Group>
      {this.getRelationshipCards()}
      </Card.Group>
    </Container>
    <br></br>
      {this.state.displayRel ? <RelationshipSpecs 
        partner={this.state.currentRel.askee ? this.state.currentRel.askee : this.state.currentRel.asker} 
        relationship={this.state.currentRel}
        handleChange={this.handleChange}/> : false }
    </>
    )
  }

}

export default Landing;
 //make new relationship form
    //edit relationship form
    //seed some data for relationship stuff
    // put relationship data in cards