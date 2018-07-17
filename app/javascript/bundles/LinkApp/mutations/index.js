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
      }
    }
  }
`;

export const UPDATE_CLIENT_INFO = gql`
  mutation updateClientInfo($name:String, $email:String, $password:String, $token:String){
    updateClientInfo(name: $name, email: $email, password: $password, token: $token) @client
  }
`;
