import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_LINKS = gql`
  {
    allLinks{
      id
      description
    }
  }
`;

const App = () => (
  <Query query={GET_LINKS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;
      console.log(data);
      return (
        <div>Links</div>
      )
    }}
  </Query>
)

export default App;
