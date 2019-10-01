import React from 'react';
import {Segment, Grid, Divider, Button, Form} from 'semantic-ui-react';

class ProfileDetailRow extends React.Component {

  state = {
    isEditing: false,
    formValue: ""
  }

  handleOnChange = (e) => {
    this.setState({
      formValue: e.target.value
    })
  }

  renderForm = () => {
    return (
      <Form>
        <Form.Field>
          <label>Please make changes below...</label>
          <input placeholder="..." value={this.state.formValue} onChange={(e) => {this.handleOnChange(e)}} />
        </Form.Field>
        <Form.Field>
          <Button onClick={ () => {
              this.props.editUserInfo(this.props.column)
              this.setState({
                isEditing: !this.state.isEditing
              })
            } }>Save</Button>
        </Form.Field>
      </Form>
    )
  }

  renderButton = () => {
    console.log(this.props)
    return (
      <Button onClick={ () => {
        this.setState({
          isEditing: !this.state.isEditing
        })
      } }>Edit</Button>

    )
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
