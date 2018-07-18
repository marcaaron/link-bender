import React, {Component} from 'react';
import LinkItem from './LinkItem';
import { GET_USER_BY_ID } from '../queries';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

class UserLinks extends Component {
  render() {
    if(this.props.getUserById.loading) return 'Loading...';
    const links = this.props.getUserById.userById[0].links;
    const user = this.props.getUserById.userById[0];
    if(links.length>0){
      return (
        <ul>
          <div className="user-links">
            <div className="user-links__header">Viewing Links By: <span className="user-links__name">{user.name}</span></div>
            <Link to="/">BACK</Link>
          </div>

          {
            links.map(link=><LinkItem key={link.id} {...link}></LinkItem>)
          }
        </ul>
      );
    }else{
      return 'No Links Found For This User :(';
    }
  }
}

export default compose(
  graphql(GET_USER_BY_ID, {
    name:'getUserById',
    options: (props) => ({variables: {id: props.match.params.id}})
  })
)(UserLinks);
