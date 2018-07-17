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
        token: null,
        id: ''
      },
      toggleAuth: {
        __typename: "ToggleAuth",
        isNewUser: false
      }
    },
    resolvers: {
      Query: {},
      Mutation: {
        updateClientInfo: (_, { name, email, password, token, id }, { cache }) => {
          cache.writeData({
            data: {
              userInfo: {
                __typename: "UserInfo",
                name,
                email,
                password,
                token,
                id
              }
            }
          });
          return null;
        },
        toggleAuthType: (_, { isNewUser }, { cache }) => {
          cache.writeData({
            data: {
              toggleAuth: {
                __typename: "ToggleAuth",
                isNewUser
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
