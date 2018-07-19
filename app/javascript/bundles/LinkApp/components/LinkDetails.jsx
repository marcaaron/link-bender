import React, { Component } from 'react';
import LinkItem from './LinkItem';
import { GET_LINK_BY_SLUG } from '../queries';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

class LinkDetails extends Component {
  render() {
    if(this.props.getLinkBySlug.loading) return 'Loading';
    const {
      getLinkBySlug: {
        linkBySlug
      }
    } = this.props;
    return (
      <ul>
        <LinkItem key={linkBySlug.id} {...linkBySlug}></LinkItem>
        <a target="_blank" href={linkBySlug.url} className="thumbnail">
            <iframe className="thumbnail__iframe" frameBorder="0" src={linkBySlug.url}></iframe>
        </a>
      </ul>
    );
  }
}

export default compose(
  graphql(GET_LINK_BY_SLUG, {
    name:'getLinkBySlug',
    options: (props) => ({variables: {slug: props.match.params.slug}})
  })
)(LinkDetails);
