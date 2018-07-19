import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ALL_LINKS, GET_USER_INFO } from '../queries';
import { DELETE_LINK, CREATE_VOTE, DELETE_VOTE } from '../mutations';
import { CloseButton, VoteArrow, VoteArrowAlt } from './icons';
import { Link } from 'react-router-dom';

class LinkItem extends Component {

  delete = (id) => {
    const message = 'Are you sure you want to delete this link and all votes associated with it?';
    if(confirm(message)){
      this.props.deleteLink({
        variables: { id },
        refetchQueries:[{ query: ALL_LINKS }]
      })
      // .then(res=>console.log(res.data));
    }
  }

  upvote = (user_id, link_id) => {
    this.props.upvoteLink({
      variables: { link_id, user_id },
      refetchQueries:[{ query: ALL_LINKS }]
    })
    // .then(res=>console.log(res.data));
  }

  deleteVote = (user_id, link_id) => {
    this.props.deleteVote({
      variables: { link_id, user_id },
      refetchQueries:[{ query: ALL_LINKS }]
    })
    // .then(res=>console.log(res.data));
  }

  handleClick = ({target}) => {
    const { method } = target.dataset;
    const link_id = target.dataset.id;
    const user_id = this.props.data.userInfo.id;
    switch(method){
      case 'DELETE':
        this.delete(link_id);
        break;
      case 'VOTE':
        this.upvote(user_id, link_id);
        break;
      case 'DELETE_VOTE':
        this.deleteVote(user_id, link_id);
        break;
      default:
        console.log('No Method Found.');
    }
  }

  render(){
    const { handleClick } = this;
    const { id, slug, url, description, postedBy, votes, data: { userInfo } } = this.props;
    const userVotes = votes.filter(vote=>vote.user.id === userInfo.id);
    return (
      <li className="link">
        <div className="link__info">
          <Link to={`/link/${slug}`} className="link__description" >{description}</Link>
          <p className="link__user">posted by - <Link to={`/user/${postedBy.id}`}>{postedBy.name}</Link></p>
        </div>
        <div className="link__btns">
          <span className="link__score">{ votes.length }</span>
          <div className="link__btn" onClick={handleClick}>
            {
              postedBy && postedBy.id === userInfo.id &&
              <CloseButton id={`delete_for_${id}`} data-method="DELETE" data-id={id}/>
            }
            {
              userInfo.token && postedBy && postedBy.id !== userInfo.id && userVotes.length === 0 &&
              <VoteArrow id={`vote_for_${id}`} data-method="VOTE" data-id={id}/>
            }
            {
              userInfo.token && postedBy && postedBy.id !== userInfo.id && userVotes.length > 0 &&
              <VoteArrowAlt id={`delete_vote_for_${id}`} data-id={id} data-method="DELETE_VOTE" />
            }
          </div>
        </div>
      </li>
    );
  }
}

export default compose(
  graphql(GET_USER_INFO),
  graphql(CREATE_VOTE, {name:"upvoteLink"}),
  graphql(DELETE_VOTE, {name:"deleteVote"}),
  graphql(DELETE_LINK, {name:'deleteLink'})
)(LinkItem);
