import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO, GET_CLIENT_LINK, ALL_LINKS } from '../queries';
import { UPDATE_CLIENT_LINK, CREATE_LINK } from '../mutations';

class CreateLink extends Component {
  handleChange = (e) => {
    const { getClientLink: { linkInfo } } = this.props;
    const updatedInfo = {...linkInfo};
    const field = e.target.id;
    const value = e.target.value;
    updatedInfo[field] = value;
    this.props.updateClientLink({
      variables: updatedInfo
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user_id = this.props.data.userInfo.id;
    const { getClientLink: { linkInfo } } = this.props;
    this.props.createLink({
      variables: {...linkInfo, user_id },
      refetchQueries: [{query: ALL_LINKS }]
    })
    .then(()=>{
      this.props.updateClientLink({
        variables: { url:'', description:'' }
      })
    });
  }

  render(){

    const {
      data: {
        userInfo: {
          token,
          id
        }
      },
      getClientLink: {
        linkInfo: {
          description,
          url
        }
      }
    } = this.props;

    const { handleChange, handleSubmit } = this;
    if(token){
      return(
        <div>
          <h2>Create A New Link</h2>
          <form ref="linkForm" onSubmit={handleSubmit} className="link-form">
            <label htmlFor="description">Description:</label>
            <input onChange={handleChange} value={description} type="text" name="description" id="description"/>
            <label htmlFor="url">URL:</label>
            <input onChange={handleChange} value={url} type="text" name="url" id="url"/>
            <button type="submit">Submit Link</button>
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
  graphql(GET_USER_INFO),
  graphql(CREATE_LINK, {name: 'createLink'}),
  graphql(GET_CLIENT_LINK, {name: 'getClientLink'}),
  graphql(UPDATE_CLIENT_LINK, {name: 'updateClientLink'})
)(CreateLink);
