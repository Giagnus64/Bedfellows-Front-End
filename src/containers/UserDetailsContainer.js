import React from 'react'
import { Container, Header, Segment, Form, Button} from 'semantic-ui-react'
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
          <ProfileDetailRow
            label={"First Name"}
            column={"first_name"}
            info={props.currentUser.first_name}
            editUserInfo={props.editUserInfo}
          />
          <ProfileDetailRow
            label={"Last Name"}
            column={"last_name"}
            info={props.currentUser.last_name}
            editUserInfo={props.editUserInfo}
          />
          <ProfileDetailRow
            label={"Username"}
            column={"username"}
            info={props.currentUser.username}
            editUserInfo={props.editUserInfo}
          />
          <ProfileDetailRow
            label={"Email"}
            column={"email"}
            info={props.currentUser.email}
            editUserInfo={props.editUserInfo}
          />
          <ProfileDetailRow
            label={"About"}
            column={"bio"}
            info={props.currentUser.bio}
            editUserInfo={props.editUserInfo}
          />

          {/*<Form>
            <Form.Field>
              <Button>Delete Profile</Button>
            </Form.Field>
          </Form>*/}

          <Segment raised>
            <Header as='h2' textAlign="center" attached="bottom">{"Delete Profile"}
              <Form onSubmit={ () => {props.deleteUser(props.currentUser.id)} }><Button id="deleteButton">Delete</Button></Form>
            </Header>
          </Segment>

        </Segment.Group>

      </Container>
    </div>
  )
}

export default UserDetailsContainer
