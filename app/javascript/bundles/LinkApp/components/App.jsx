import React from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import Link from './Link';
import CreateLink from './CreateLink';
import Auth from './Auth';
import Header from './Header';
import { ALL_LINKS, GET_USER_INFO } from '../queries';

const App = (props) => {
  console.log(props);
  const { data: { allLinks }, getUserInfo: { userInfo: { token }}} = props;
  return (
    <div className="app-container">
      <Header/>
      <Auth/>
      {token && <CreateLink/>}
      <ul>
        {
          allLinks.map(link=><Link key={link.id} {...link}></Link>)
        }
      </ul>
    </div>
  )

}
export default compose(
  graphql(ALL_LINKS),
  graphql(GET_USER_INFO, {name:'getUserInfo'})
)(App);
