import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ALL_LINKS } from '../queries';
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
      const { linkId, url, description } = this.props;
      return (
        <li>
          <a href={url}>{description}</a>
          <button id={linkId} onClick={handleClick}>Delete</button>
        </li>
      );
    }
}

export default compose(
  graphql(DELETE_LINK, {name:'deleteLink'})
)(Link);
