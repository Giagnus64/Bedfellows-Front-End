import React from 'react';
import {Segment, Grid, Divider, Button, Form} from 'semantic-ui-react';

class ProfileDetailRow extends React.Component {

  state = {
    isEditing: false,
    formValue: "",
    formName: this.props.column
  }

  handleOnChange = (e) => {
    this.setState({
      formValue: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    const { column } = this.props
    const { formValue } = this.state
    this.props.editUserInfo(column, formValue)
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  handleOnCancel = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  renderForm = () => {
    // console.log("from renderForm func: ", this.props.info)
    return (
      <Form
        name={this.props.column}
        onSubmit={(e) => {this.handleOnSubmit(e)}}
      >
        <Form.Field>
          <label>Please make changes below...</label>
          <input
            placeholder="..."
            name={this.props.column}
            value={this.state.formValue}
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <Button>Save</Button>
          <Button onClick={this.handleOnCancel}>Cancel</Button>
        </Form.Field>
      </Form>
    )
  }

  renderButton = () => {
    // console.log("before re-render: ", this.props.info)
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

  componentDidMount() {
    this.setState({
      formValue: this.props.info
    })
  }

}

export default ProfileDetailRow;
