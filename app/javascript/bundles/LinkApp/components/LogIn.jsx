import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO } from '../queries';
import { SIGN_IN_USER, CREATE_USER, UPDATE_CLIENT_INFO } from '../mutations';

class LogIn extends Component {
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
    const { data: { userInfo: { email, password } } } = this.props;
    this.props.signinUser({
      variables: {
        email,
        password
      }
    })
    .then((res)=>{
      const { user: { name, email, id }, token } = res.data.signinUser;
      this.props.updateClientInfo({
        variables:{ name, email, password: '', token, id }
      })
    })
    .catch(err=>console.log(err));
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { data: { userInfo: { name, email, password, id } } } = this.props;
    return(
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail:</label>
        <input required id="email" name="email" onChange={handleChange} type="text" value={email}/>
        <label htmlFor="password">Password:</label>
        <input required id="password" name="password" onChange={handleChange} type="password" value={password}/>
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
)(LogIn);
