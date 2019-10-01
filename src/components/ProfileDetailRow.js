import React from 'react';
import {Segment, Grid, Button, Divider, Input} from 'semantic-ui-react';

class ProfileDetailRow extends React.Component {

  state = {
    isEditing: false
  }

  renderForm = () => {
    return (
      <>
        <Input />
        <Button onClick={ () => {
            this.props.editUserInfo(this.props.column)
            this.setState({
              isEditing: !this.state.isEditing
            })
          } }>Save</Button>
      </>
    )
  }
  renderButton = () => {
    return <Button onClick={ () => {
        console.log("edit button")
        this.setState({
          isEditing: !this.state.isEditing
        })
      } }>Edit</Button>
  }

  render() {
    return (
      <Segment
        className="profileSegment"
        textAlign="left"
        raised>
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
            <p>{this.props.label + ": " + this.props.info }</p>
          </Grid.Column>
          <Grid.Column>
            {this.state.isEditing ? this.renderForm() : this.renderButton()}
          </Grid.Column>
        </Grid>
        <Divider vertical></Divider>
      </Segment>
    )
  }

}

export default ProfileDetailRow;
