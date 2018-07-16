import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const client = new ApolloClient({ uri: 'https://pacific-lowlands-20399.herokuapp.com/graphql' });

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
