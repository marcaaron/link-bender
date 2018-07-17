import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO, GET_CLIENT_LINK, GET_LINKS } from '../queries';
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
    const user = this.props.data.userInfo.id;
    console.log(user);
    const { getClientLink: { linkInfo } } = this.props;
    this.props.createLink({
      variables: {...linkInfo, user },
      refetchQueries: [{query: GET_LINKS }]
    })
    .then(res=>console.log(res));
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
    console.log(this.props);
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
