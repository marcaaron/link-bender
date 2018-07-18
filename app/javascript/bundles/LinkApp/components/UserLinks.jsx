import React, {Component} from 'react';
import LinkItem from './LinkItem';
import { GET_USER_BY_ID } from '../queries';
import { graphql, compose } from 'react-apollo';

class UserLinks extends Component {
  render() {
    if(this.props.getUserById.loading) return 'Loading...';
    const links = this.props.getUserById.userById[0].links;
    if(links.length>0){
      return (
        <ul>
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
