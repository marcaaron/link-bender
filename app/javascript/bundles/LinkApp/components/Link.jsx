import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ALL_LINKS, GET_USER_INFO } from '../queries';
import { DELETE_LINK } from '../mutations';

class Link extends Component {
  handleClick = ({target}) => {
    const id = target.id;
    this.props.deleteLink({
      variables: { id },
      refetchQueries:[{ query: ALL_LINKS }]
    })
  }
  render(){
    const { handleClick } = this;
    const { id, url, description, postedBy, data: { userInfo } } = this.props;
    return (
      <li>
        <a href={url}>{description}</a>
        {
          postedBy && postedBy.id === userInfo.id &&
          <button id={id} onClick={handleClick}>Delete</button>
        }
      </li>
    );
  }
}

export default compose(
  graphql(GET_USER_INFO),
  graphql(DELETE_LINK, {name:'deleteLink'})
)(Link);
