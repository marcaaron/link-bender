import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ALL_LINKS, GET_USER_INFO } from '../queries';
import { DELETE_LINK, CREATE_VOTE, DELETE_VOTE } from '../mutations';

class Link extends Component {

  handleDelete = ({target}) => {
    const id = target.dataset.id;
    this.props.deleteLink({
      variables: { id },
      refetchQueries:[{ query: ALL_LINKS }]
    })
  }

  handleUpvote = ({target}) => {
    const link_id = target.dataset.id;
    const user_id = this.props.data.userInfo.id;
    this.props.upvoteLink({
      variables: { link_id, user_id },
      refetchQueries:[{ query: ALL_LINKS }]
    })
  }

  handleDeleteUpvote = ({target}) => {
    const link_id = target.dataset.id
    const user_id = this.props.data.userInfo.id;
    this.props.deleteVote({
      variables: { link_id, user_id },
      refetchQueries:[{ query: ALL_LINKS }]
    })
  }

  render(){
    const { handleDelete, handleDeleteUpvote, handleUpvote } = this;
    const { id, url, description, postedBy, votes, data: { userInfo } } = this.props;
    const userVotes = votes.filter(vote=>vote.user.id === userInfo.id);
    console.log(votes, userVotes, userInfo.id);
    return (
      <li>
        <a href={url}>{description}</a>
        {
          postedBy && postedBy.id === userInfo.id &&
          <button id={`delete_for_${id}`} data-id={id} onClick={handleDelete}>Delete</button>
        }
        {
          userInfo.token && postedBy && postedBy.id !== userInfo.id && userVotes.length === 0 &&
          <button id={`vote_for_${id}`} data-id={id} onClick={handleUpvote}>Upvote</button>
        }
        {
          userInfo.token && postedBy && postedBy.id !== userInfo.id && userVotes.length > 0 &&
          <button id={`delete_vote_for_${id}`} data-id={id} onClick={handleDeleteUpvote}>Cancel Vote</button>
        }
        <p>Vote Count: { votes.length }</p>
      </li>
    );
  }
}

export default compose(
  graphql(GET_USER_INFO),
  graphql(CREATE_VOTE, {name:"upvoteLink"}),
  graphql(DELETE_VOTE, {name:"deleteVote"}),
  graphql(DELETE_LINK, {name:'deleteLink'})
)(Link);
