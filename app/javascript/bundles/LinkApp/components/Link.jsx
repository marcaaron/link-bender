import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ALL_LINKS, GET_USER_INFO } from '../queries';
import { DELETE_LINK, CREATE_VOTE } from '../mutations';

class Link extends Component {

  handleDelete = ({target}) => {
    const id = target.dataset.id;
    this.props.deleteLink({
      variables: { id },
      refetchQueries:[{ query: ALL_LINKS }]
    })
  }

  handleUpvote = ({target}) => {
    const linkId = target.dataset.id;
    this.props.upvoteLink({
      variables: { linkId },
      refetchQueries:[{ query: ALL_LINKS }]
    })
  }

  render(){
    const { handleDelete, handleUpvote } = this;
    const { id, url, description, postedBy, votes, data: { userInfo } } = this.props;
    return (
      <li>
        <a href={url}>{description}</a>
        {
          postedBy && postedBy.id === userInfo.id &&
          <button id={`delete_for_${id}`} data-id={id} onClick={handleDelete}>Delete</button>
        }
        {
          userInfo.token && postedBy && postedBy.id !== userInfo.id &&
          <button id={`vote_for_${id}`} data-id={id} onClick={handleUpvote}>Upvote</button>
        }
        <p>Vote Count: { votes.length }</p>
      </li>
    );
  }
}

export default compose(
  graphql(GET_USER_INFO),
  graphql(CREATE_VOTE, {name:"upvoteLink"}),
  graphql(DELETE_LINK, {name:'deleteLink'})
)(Link);
