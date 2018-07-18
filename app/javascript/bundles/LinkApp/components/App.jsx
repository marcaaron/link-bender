import React from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import LinkList from './LinkList';
import UserLinks from './UserLinks';
import CreateLink from './CreateLink';
import Auth from './Auth';
import Header from './Header';
import { ALL_LINKS, GET_USER_INFO } from '../queries';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = (props) => {
  if(props.data.loading) return 'Loading...';
  const { data: { allLinks }, getUserInfo: { userInfo: { token }}} = props;
  const orderedLinks = [...allLinks].sort((a,b)=>b.votes.length - a.votes.length);
  return (
    <div className="app-container">
      <Header/>
      <Auth/>
      <Switch>
        <Route path="/user/:id" component={UserLinks}/>
        <Route path="/" component={()=><LinkList links={orderedLinks}/>}/>
      </Switch>
      {token && <CreateLink/>}
    </div>
  )

}
export default compose(
  graphql(ALL_LINKS),
  graphql(GET_USER_INFO, {name:'getUserInfo'})
)(App);
