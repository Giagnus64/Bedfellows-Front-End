import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'

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
        <Segment.Group size="massive">

          <Segment raised>
            <Header
              as='h1'
              textAlign="center"
              attached="top">
              {"Your Profile Details"}
            </Header>
          </Segment>

          <Segment
            className="profileSegment"
            textAlign="left"
            raised>
            {"First Name: " + props.currentUser.first_name}
          </Segment>

          <Segment
            className="profileSegment"
            textAlign="left"
            raised>
            {"Last Name: " + props.currentUser.last_name}
          </Segment>

          <Segment
            className="profileSegment"
            textAlign="left"
            raised>
            {"Username: " + props.currentUser.username}
          </Segment>

          <Segment
            className="profileSegment"
            textAlign="left"
            raised>
            {"Email: " + props.currentUser.email}
          </Segment>

          <Segment
            className="profileSegment"
            textAlign="left"
            raised>
            {"Bio: " + props.currentUser.bio}
          </Segment>
          
        </Segment.Group>
      </Container>
    </div>
  )
}

export default UserDetailsContainer
