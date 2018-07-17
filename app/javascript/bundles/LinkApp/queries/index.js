import { gql } from 'apollo-boost';

export const GET_USER_INFO = gql`
  query {
    userInfo @client {
      name
      email
      password
      token
    }
  }
`
