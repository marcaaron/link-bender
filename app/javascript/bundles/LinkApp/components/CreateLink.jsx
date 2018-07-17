import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO } from '../queries';

class CreateLink extends Component {
  render(){
    const { data: { userInfo: { token, id } } } = this.props;
    if(token){
      return(
        <div>
          <h2>Create A New Link</h2>
          <form ref="linkForm">
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" id="description"/>
            <label htmlFor="url">URL:</label>
            <input type="text" name="url" id="url"/>
          </form>
        </div>
      )
    }else{
      return(
        <div>Sign Up or Log In to Add Some Links!</div>
      )
    }
  }
}

export default compose(
  graphql(GET_USER_INFO)
)(CreateLink);
