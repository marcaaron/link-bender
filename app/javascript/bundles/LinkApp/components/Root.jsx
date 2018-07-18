import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { BrowserRouter as Router } from 'react-router-dom';

// const cache = new InMemoryCache();
//
// persistCache({
//   cache,
//   storage: window.localStorage,
// });

// Figure out Why Apollo Won't List more than 11 items when cache

const client = new ApolloClient({
  // cache,
  uri: 'https://pacific-lowlands-20399.herokuapp.com/graphql',
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
      linkInfo: {
        __typename: "LinkInfo",
        description: '',
        url: ''
      },
      toggleAuth: {
        __typename: "ToggleAuth",
        isNewUser: false,
        isAuthBoxHidden: false
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
        toggleAuthType: (_, { isNewUser, isAuthBoxHidden }, { cache }) => {
          cache.writeData({
            data: {
              toggleAuth: {
                __typename: "ToggleAuth",
                isNewUser,
                isAuthBoxHidden
              }
            }
          });
          return null;
        },
        updateClientLink: (_, { url, description }, { cache }) => {
          cache.writeData({
            data: {
              linkInfo: {
                __typename: "ToggleAuth",
                url,
                description
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
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

export default Root;
