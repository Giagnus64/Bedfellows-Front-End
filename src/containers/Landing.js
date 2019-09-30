import React from 'react';

const url = "http://localhost:3000"

class Landing extends React.Component {

<<<<<<< HEAD
  state = {

  }

  componentDidMount = () => {
    if (this.props.currentUser.asking_for_relationships === undefined){
      fetch(url + `/users/${localStorage.user_id}`,
        { headers: { "Authorization": localStorage.token } })
      .then(res => res.json())
      .then(console.log)
    }
  }

  render() {
    
    return (<h1>fuck</h1>)
=======
  render() {
    return (
      <h1>{`Welcome ${this.props.currentUser.first_name}`}</h1>
    )
>>>>>>> master
  }

}

export default Landing;
