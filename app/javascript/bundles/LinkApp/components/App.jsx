import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Link from './Link';
import CreateLink from './CreateLink';
import Auth from './Auth';
import { ALL_LINKS } from '../queries';

const App = () => (
  <Query query={ALL_LINKS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;
      return (
        <div className="app-container">
          <h1 className="main-header">Link Blender</h1>
          <Auth/>
          <CreateLink/>
          <ul>
            {
              data.allLinks.map(link=><Link key={link.id} {...link}></Link>)
            }
          </ul>
        </div>
      )
    }}
  </Query>
)

export default App;
