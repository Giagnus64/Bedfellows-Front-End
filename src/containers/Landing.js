import React from 'react';
import { Card, Button, Dimmer, Loader, Container } from 'semantic-ui-react';
import RelationshipCard from "../components/RelationshipCard";
import RelationshipSpecs from "../components/RelationshipSpecs";

const url = "http://localhost:3000"

class Landing extends React.Component {

  state = {
    currentRel: '',
    displayRel: false,
    relationships: [], 
  }

  componentDidMount = () => {

  }  
  
  updateRelationship = (relAttributes) => {
    const options = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": localStorage.token
      },
      body:JSON.stringify({
        ...relAttributes
      })
    }
    fetch(url + `/relationships/${this.state.currentRel.id}`, options)
    .then(res => res.json())
    .then(data => this.setState({
      currentRel: data
    }), console.log(this.state))
    
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
        partner={localStorage.user_id === this.state.currentRel.askee_id ? this.state.currentRel.asker : this.state.currentRel.askee} 
        relationship={this.state.currentRel}
        updateRelationship={this.updateRelationship}
        /> : false }
    </>
    )
  }

}

export default Landing;