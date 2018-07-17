import { gql } from 'apollo-boost';

export const GET_USER_INFO = gql`
  query {
    userInfo @client {
      name
      email
      password
      token
      id
    }
  }
`;

export const GET_CLIENT_LINK = gql`
  query {
    linkInfo @client {
      url
      description
    }
  }
`;

export const GET_AUTH_METHOD = gql`
  query {
    toggleAuth @client {
      isNewUser
    }
  }
`;

export const ALL_LINKS = gql`
  query {
    allLinks {
      id
      postedBy{
        name
        votes {
          link {
            description
          }
        }
      }
      votes {
        id
      }
    }
  }
`;

export const SEARCH_LINKS = gql`
  query allLinks($description_contains:String){
    allLinks(filter:{description_contains: $description_contains}){
      description
    }
  }
`;
