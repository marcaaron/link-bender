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

export const GET_LINK_BY_SLUG = gql`
  query LinkBySlug($slug: String!){
    linkBySlug(slug: $slug){
      id
      description
      slug
      url
      postedBy{
        id
        name
      }
      votes{
        id
        user{
          name
          id
        }
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query userById($id: ID!){
  userById(id: $id){
    id
    name
    links {
      id
      url
      slug
      description
      postedBy{
        name
        id
        votes {
          link {
            slug
            description
          }
        }
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
}
`

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
      isAuthBoxHidden
    }
  }
`;

export const GET_CREATE_LINK_TOGGLE = gql`
  query {
    toggleCreateLink @client {
      isCreateLinkHidden
    }
  }
`;

export const GET_ERROR_MESSAGE = gql`
  query {
    errorHandler @client {
      errorMessage
    }
  }
`;

export const ALL_LINKS = gql`
  query allLinks{
    allLinks {
      id
      url
      slug
      description
      postedBy{
        name
        id
        votes {
          link {
            slug
            description
          }
        }
      }
      votes {
        id
        user {
          id
        }
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
