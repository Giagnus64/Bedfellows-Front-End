import React from 'react';


class Landing extends React.Component {

  state ={

  }

  render() {
    console.log(this.props.currentUser);
    return <h1>{`Welcome ${this.props.currentUser.first_name}`}</h1>
  }

}

export default Landing;
