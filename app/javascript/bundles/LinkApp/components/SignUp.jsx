import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

const CREATE_USER = gql`
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

const SIGN_IN_USER = gql`
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

class SignUp extends Component {
  state = {
    name:'',
    email:'',
    password:'',
    token: null
  }

  handleChange = (e) => {
    this.setState({[e.target.id]:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.props.createUser({
      variables: {
        name,
        email,
        password
      }
    })
    .then(()=>{
      this.props.signinUser({
        variables: {
          email,
          password
        }
      })
      .then((res)=>{
        const token = res.data.signinUser.token;
        this.setState({token})
      })
    })
    .catch(err=>console.warn(err));
  };

  render(){
    const { name, email, password, token } = this.state;
    const { handleChange, handleSubmit } = this;
    if(!this.state.token){
      return(
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" onChange={handleChange} type="text" value={name}/>
          <label htmlFor="email">E-Mail:</label>
          <input id="email" name="email" onChange={handleChange} type="text" value={email}/>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" onChange={handleChange} type="password" value={password}/>
          <button type="submit">Submit</button>
        </form>
      )
    }else{
      return <h2>Welcome {name}!</h2>;
    }
  }
}

export default compose(
  graphql(CREATE_USER, {name: 'createUser'}),
  graphql(SIGN_IN_USER, {name: 'signinUser'})
)(SignUp);
