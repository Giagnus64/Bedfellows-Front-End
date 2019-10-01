import React from 'react'
import { Container, Header, Segment, Grid, Divider, Button } from 'semantic-ui-react'
import ProfileDetailRow from '../components/ProfileDetailRow'

const UserDetailsContainer = (props) => {

  // const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

  const divStyle = {
    backgroundColor : "#776274",
    padding : ".6em .6em",
    width : "85vw",
    borderRadius : "1.2%",
  }

  return (
    <div style={divStyle}>
      <Container fluid>
      <Segment raised>
        <Header as='h1' textAlign="center" attached="top">{"Your Profile Details"}</Header>
      </Segment>
        <Segment.Group size="massive">
          <ProfileDetailRow label={"First Name"} info={props.currentUser.first_name}/>
          <ProfileDetailRow label={"Last Name"} info={props.currentUser.last_name}/>
          <ProfileDetailRow label={"Username"} info={props.currentUser.username}/>
          <ProfileDetailRow label={"Email"} info={props.currentUser.email}/>
          <ProfileDetailRow label={"About"} info={props.currentUser.bio}/>
        </Segment.Group>

      </Container>
    </div>
  )
}

export default UserDetailsContainer
