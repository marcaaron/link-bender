import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation createUser($name:String!, $email:String!, $password:String!){
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ){
      id
      email
      name
    }
  }
`;

export const SIGN_IN_USER = gql`
  mutation signinUser($email:String!, $password:String!){
    signinUser(
      email: {
        email: $email,
        password: $password
      }
    ){
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const UPDATE_CLIENT_INFO = gql`
  mutation updateClientInfo($name:String, $email:String, $password:String, $token:String, $id:ID){
    updateClientInfo(name: $name, email: $email, password: $password, token: $token, id:$id) @client
  }
`;

export const UPDATE_CLIENT_LINK = gql`
  mutation updateClientLink($url:String, $description:String){
    updateClientLink(url: $url, description: $description) @client
  }
`;

export const TOGGLE_AUTH = gql`
  mutation toggleAuthType($isNewUser: Boolean!){
    toggleAuthType(isNewUser: $isNewUser) @client
  }
`;

export const CREATE_LINK = gql`
  mutation createLink($url:String!, $description:String!){
    createLink(url:$url, description:$description){
      id
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($linkId:ID){
    createVote(linkId:$linkId){
      link {
        description
      }
      user {
        name
      }
    }
  }
`;
