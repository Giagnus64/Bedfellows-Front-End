import React from 'react';
import UserDetailsContainer from '../containers/UserDetailsContainer'

class Profile extends React.Component {

  render() {
    return (
        <UserDetailsContainer
          currentUser={this.props.currentUser}
          editUserInfo={this.props.editUserInfo}
          deleteUser={this.props.deleteUser}
        />
    )
  }

}

export default Profile;
