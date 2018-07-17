import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  clientState: {
    defaults: {
      userInfo: {
        __typename: "UserInfo",
        name: '',
        email: '',
        password: '',
        token: null
      }
    },
    resolvers: {
      Query: {},
      Mutation: {
        updateClientInfo: (_, { name, email, password, token }, { cache }) => {
          cache.writeData({
            data: {
              userInfo: {
                __typename: "UserInfo",
                name,
                email,
                password,
                token
              }
            }
          });
          return null;
        }
      }
    }
  }
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
