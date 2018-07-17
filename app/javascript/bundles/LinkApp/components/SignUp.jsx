import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { CREATE_USER, SIGN_IN_USER, UPDATE_CLIENT_INFO } from '../mutations';
import { GET_USER_INFO } from '../queries';

class SignUp extends Component {

  handleChange = (e) => {
    const { data: { userInfo } } = this.props;
    const updatedInfo = {...userInfo};
    const field = e.target.id;
    const value = e.target.value;
    updatedInfo[field] = value;
    this.props.updateClientInfo({
      variables: updatedInfo
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { data: { userInfo: { name, email, password } } } = this.props;
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
        const id = res.data.signinUser.user.id;
        this.props.updateClientInfo({
          variables:{name, email, password, token, id}
        })
      })
    })
    .catch(err=>console.warn(err));
  };

  render(){
    const { handleChange, handleSubmit } = this;
    const { data: { userInfo: { name, email, password } } } = this.props;
    return(
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" onChange={handleChange} type="text" value={name}/>
        <label htmlFor="email">E-Mail:</label>
        <input id="email" name="email" onChange={handleChange} type="text" value={email}/>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" onChange={handleChange} type="password" value={password}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default compose(
  graphql(CREATE_USER, {name: 'createUser'}),
  graphql(SIGN_IN_USER, {name: 'signinUser'}),
  graphql(UPDATE_CLIENT_INFO, {name: 'updateClientInfo'}),
  graphql(GET_USER_INFO)
)(SignUp);
