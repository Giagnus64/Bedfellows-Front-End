import React from 'react';
import UserDetailsContainer from '../containers/UserDetailsContainer'

class Profile extends React.Component {

  render() {
    return (
        <UserDetailsContainer currentUser={this.props.currentUser} />
    )
  }

}

export default Profile;
