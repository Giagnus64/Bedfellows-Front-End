import React from 'react';
import { Card, Dimmer, Loader, Container, Header } from 'semantic-ui-react';
import RelationshipCard from "../components/RelationshipCard";
import RelationshipSpecs from "../components/RelationshipSpecs";
import AddRelationshipForm from "../components/AddRelationshipForm"
import { getUrl } from "../DBInfo";


const url = getUrl();

class Landing extends React.Component {

  state = {
    currentRel: '',
    displayRel: false, 
    currentUserId: parseInt(localStorage.user_id),
    strangers: [], 
    selectedUserId: ''
  }


//************************** */
//Set state of APP and LANDING
//************************** *?
 
  componentDidMount = () => {
    if(localStorage.user_id || this.props.currentUser){
      this.props.getCurrentUser();
      this.getUserOptions();
    }
  }  

  getUserOptions = () => {
    fetch(url + `/users`, 
      { headers: { "Authorization": localStorage.token } })
    .then(res => res.json())
    .then(data => {
      this.handleUserOptions()}
    )
  }

// get users not in relationships w logged in user
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
  //get object of strangers for addRelationshipSelect
  mapStrangers = (strangersArr) => {
    return strangersArr.map((stranger) => {
      return {
        key: stranger.id,
        value: stranger.id, 
        text: `${stranger.first_name} ${stranger.last_name}` 
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
    .then(data => {
      this.setState({
      currentRel: data
      })
      this.props.getCurrentUser();
    }
    )
    
  }
  // display relationship show box
  getCurrentRelationship = (relationship) => {
    this.setState({
      currentRel: relationship,
      displayRel: true
    })
  }

//******************************************************** */
// getRelationshipCards
//******************************************************** */
  getRelationshipCards = () => {
    let relationshipCards = [];
    if(!this.props.currentUser.asking_for_relationships){
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
            updateRelationshipStatus={this.updateRelationshipStatus}
            />)
     })

     const askingArr = this.props.currentUser.asking_for_relationships.map((asking) => {
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
    if (relationshipCards.length === 0){
      return (<h1>You don't have any relationships yet!</h1>)
    } else{
      return relationshipCards;
    }
    
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
    .then(data => {
      this.props.getCurrentUser()
    })
}

//*************************************** 
//add relationship form
//***************************************
//onchange for controlled user form
  changeSelectedUser = (e,obj) => {
    e.persist()
    const userId = obj.value
    this.setState({
      selectedUserId: userId
    })
  }
  // submit relationship
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
    .then((data) => {
      //console.log(data, "submit new rel");
      this.props.getCurrentUser();
      this.getUserOptions();
    })
  } 

  //**************************************
  //Close Relationship Show
  //************************************** 
  closeShowDiv = () => {
    this.setState({
      displayRel: false
    })
  }

  getPartner = () => {
    if(this.state.currentRel.asker){
      if(this.state.currentRel.asker.id === this.state.currentUserId){
        return this.state.currentRel.askee
      } else{
        return this.state.currentRel.asker
      }
    } else if(this.state.currentRel.askee){
      if(this.state.currentRel.askee.id === this.state.currentUserId){
        return this.state.currentRel.asker
      } else{
        return this.state.currentRel.askee
      }
    }
}
  
  render() {
    console.log(this.state)
    return (
    <>
    <Container fluid style={
      {
        display:'flex',
        justifyContent:'center',
        alignItems:'space-between',
        flexWrap: 'wrap',
        width:'85%',
        marginTop:'10px',
        }}>
          {this.state.strangers.length !== 0 ? <AddRelationshipForm strangers={this.state.strangers} changeSelectedUser={this.changeSelectedUser} handleSubmit={this.handleSubmit}/> :<Header>You cannot add any more relationships!</Header> }
    </Container>
      <h1 id="relationships-header">Relationships</h1>
    <Container fluid className="relationship-container">
      <Card.Group>
      {this.props.currentUser ? this.getRelationshipCards(): false}
      </Card.Group>
    </Container>
    <br></br>
      {this.state.displayRel ? <RelationshipSpecs 
        partner={this.getPartner()} 
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