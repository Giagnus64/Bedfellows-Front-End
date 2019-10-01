import React from 'react';

const url = "http://localhost:3000"

class Landing extends React.Component {

  state = {

  }

  componentDidMount = () => {
    if (this.props.currentUser.asking_for_relationships === undefined){
      fetch(url + `/users/${localStorage.user_id}`,
        { headers: { "Authorization": localStorage.token } })
      .then(res => res.json())
      .then((data) => {
        console.log("from landing component did mount", data);
      })
    }
  }

  render() {
    return (
      <h1>{`Welcome ${this.props.currentUser.first_name}`}</h1>
    )
  }

}

export default Landing;
