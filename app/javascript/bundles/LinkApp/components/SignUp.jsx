import React, { Component, createRef } from 'react';
import { graphql, compose } from 'react-apollo';

import { CREATE_USER, SIGN_IN_USER, UPDATE_CLIENT_INFO } from '../mutations';
import { GET_USER_INFO } from '../queries';

class SignUp extends Component {
  constructor(){
    super();
    this.state = {
      passwordLabelWidth: 0,
      emailLabelWidth: 0,
      nameLabelWidth: 0
    }

    this.nameLabel = createRef();
    this.emailLabel = createRef();
    this.passwordLabel = createRef();
  }

  componentDidMount(){
    const { passwordLabel, emailLabel, nameLabel } = this;
    const nameLabelWidth = nameLabel.current.getBoundingClientRect().width;
    const emailLabelWidth = emailLabel.current.getBoundingClientRect().width;
    const passwordLabelWidth = passwordLabel.current.getBoundingClientRect().width;
    this.setState({emailLabelWidth, passwordLabelWidth, nameLabelWidth});
  }

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
    const { handleChange, handleSubmit, emailLabel, passwordLabel, nameLabel } = this;
    const { data: { userInfo: { name, email, password } } } = this.props;
    const { emailLabelWidth, nameLabelWidth, passwordLabelWidth } = this.state;
    return(
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="auth-box__input-wrapper">
          <label ref={nameLabel} htmlFor="name">Name:</label>
          <input style={{paddingLeft: `${nameLabelWidth}px`}} id="name" name="name" onChange={handleChange} type="text" value={name}/>
        </div>
        <div className="auth-box__input-wrapper">
          <label ref={emailLabel} htmlFor="email">E-Mail:</label>
          <input style={{paddingLeft: `${emailLabelWidth}px`}} id="email" name="email" onChange={handleChange} type="text" value={email}/>
        </div>
        <div className="auth-box__input-wrapper">
          <label ref={passwordLabel} htmlFor="password">Password:</label>
          <input style={{paddingLeft: `${passwordLabelWidth}px`}} id="password" name="password" onChange={handleChange} type="password" value={password}/>
        </div>
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
