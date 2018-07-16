import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Link from './Link';
import CreateLink from './CreateLink';
import SignUp from './SignUp';

const GET_LINKS = gql`
  {
    allLinks{
      id
      description
      url
    }
  }
`;

const App = () => (
  <Query query={GET_LINKS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;
      return (
        <div>
          <h1>Link Share</h1>
          <SignUp/>
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
