import React from 'react';
import { Card, Dimmer, Loader, Container, Header } from 'semantic-ui-react';
import RelationshipCard from "../components/RelationshipCard";
import RelationshipSpecs from "../components/RelationshipSpecs";
import AddRelationshipForm from "../components/AddRelationshipForm"

const url = "http://localhost:3000"

class Landing extends React.Component {

  state = {
    currentRel: '',
    displayRel: false,
    currentUser: this.props.currentUser, 
    currentUserId: localStorage.user_id,
    strangers: [], 
    selectedUserId: ''
  }


//************************** */
//Set Initial state
//**************
 
  componentDidMount = () => {
    if(localStorage.user_id || this.props.currentUser){
      this.getCurrentUser();
      console.log('landing mounted')
    }
  }  

  getCurrentUser = () => {
    fetch(url + `/users/${this.state.currentUserId}`, 
    { headers: { "Authorization": localStorage.token }})
      .then(res => res.json() )
      .then(data => {
        this.setState({
          currentUser: data
        }, this.getUserOptions)
      })
  }

  getUserOptions = () => {
    fetch(url + `/users`, 
      { headers: { "Authorization": localStorage.token } })
    .then(res => res.json())
    .then(data => {
      this.handleUserOptions()}
    )
  }

// get ppl not in relationships w user
  handleUserOptions = () => {
    fetch(url + `/strangers/${localStorage.user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Authorization": localStorage.token 
      }
    })
      .then(r => r.json())
      .then(data => {
        this.setState({
          strangers: this.mapStrangers(data)
        })
      })
  }
  mapStrangers = (strangersArr) => {
    return strangersArr.map((stranger) => {
      return {
        key: stranger.id,
        value: stranger.id, 
        text: `${stranger.first_name}  ${stranger.last_name}` 
      }
    })
  }

//********************************************* */
//Update Relationship Form
//****************************************** */
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

  getCurrentRelationship = (relationship) => {
    console.log("hit get!")
    this.setState({
      currentRel: relationship,
      displayRel: true
    })
  }

//******************************************************** */
// getRelationshipCards
//******************************************************** */
  getRelationshipCards = () => {
    console.log("getting relationship cards")
    let relationshipCards = [];
    if(!this.state.currentUser.asking_for_relationships){
      console.log("hit dimmer!")
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )
    } else{
      console.log("found rel cards")
     const askedArr = this.state.currentUser.asked_for_relationships.map((asked) => {
          return (<RelationshipCard 
            asked={true} 
            key={asked.id} 
            relationship={asked} 
            partner={asked.asker}
            getCurrentRelationship={this.getCurrentRelationship}
            updateRelationshipStatus={this.updateRelationshipStatus}
            />)
     })

     const askingArr = this.state.currentUser.asking_for_relationships.map((asking) => {
         return (<RelationshipCard 
          partner={asking.askee} 
          asked={false} 
          key={asking.id} 
          relationship={asking}
          getCurrentRelationship={this.getCurrentRelationship}
          updateRelationshipStatus={this.updateRelationshipStatus}
           />)
     })
    relationshipCards = [...askedArr, ...askingArr]
    return relationshipCards;
    }
  }
//***************** */
//Update Relationship
//***************** */

updateRelationshipStatus = (status, id) => {
  fetch(url + `/relationships/${id}`,
    {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": localStorage.token
      },
      body: JSON.stringify({
        relationship: {
          status: status
        }
      })
    })
    .then(res => res.json())
    .then(this.getCurrentUser())
}

//*************************************** 
//add relationship form
//***************************************
  changeSelectedUser = (e,obj) => {
    e.persist()
    const userId = obj.value
    this.setState({
      selectedUserId: userId
    }, console.log(this.state))
  }

  handleSubmit = () =>{
    fetch(url + "/relationships",
      { method: 'POST',
        headers: 
        { "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": localStorage.token },
        body: JSON.stringify({
            relationship: {
              asker_id: localStorage.user_id,
              askee_id: this.state.selectedUserId,
              status: "pending"
            }
        }) 
      })
    .then(res => res.json())
    .then(this.getCurrentUser())
  } 
  //**************************************
  //Close Relationship Show
  //************************************** 
  closeShowDiv = () => {
    this.setState({
      displayRel: false
    })
  }
  
  render() {
    
    return (
    <>
    
    <Container fluid style={
      {
        display:'flex',
        justifyContent:'center',
        width:'55%',
        marginTop:'10px',
        }}>
          {this.state.strangers.length !== 0 ? <AddRelationshipForm strangers={this.state.strangers} changeSelectedUser={this.changeSelectedUser} handleSubmit={this.handleSubmit}/> :<Header>You cannot add any more relationships!</Header> }
    </Container>
      <h1 id="relationships-header">Relationships</h1>
    <Container fluid className="relationship-container">
      <Card.Group>
      {this.state.currentUser ? this.getRelationshipCards(): false}
      </Card.Group>
    </Container>
    <br></br>
      {this.state.displayRel ? <RelationshipSpecs 
        partner={this.state.currentRel.asker ? this.state.currentRel.asker : this.state.currentRel.askee} 
        relationship={this.state.currentRel}
        updateRelationship={this.updateRelationship}
        updateRelationshipStatus={this.updateRelationshipStatus}
        closeShowDiv={this.closeShowDiv}
        /> : false }
    </>
    )
  }

}

export default Landing;