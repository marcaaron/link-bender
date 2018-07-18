import React, { Component, createRef } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO } from '../queries';
import { SIGN_IN_USER, CREATE_USER, UPDATE_CLIENT_INFO } from '../mutations';

class LogIn extends Component {

  constructor(){
    super();
    this.emailLabel = createRef();
    this.passwordLabel = createRef();
    this.state = {
      emailLabelWidth: 0,
      passwordLabelWidth: 0
    }
  }

  componentDidMount(){
    const { emailLabel, passwordLabel } = this;
    const emailLabelWidth = emailLabel.current.getBoundingClientRect().width;
    const passwordLabelWidth = passwordLabel.current.getBoundingClientRect().width;
    this.setState({emailLabelWidth, passwordLabelWidth});
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
    const { handleChange, handleSubmit, emailLabel, passwordLabel } = this;
    const { emailLabelWidth, passwordLabelWidth } = this.state;
    const { data: { userInfo: { name, email, password, id } } } = this.props;
    return(
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="auth-box__input-wrapper">
          <label ref={emailLabel} htmlFor="email">E-Mail:</label>
          <input style={{paddingLeft: `${emailLabelWidth}px`}} required id="email" name="email" onChange={handleChange} type="text" value={email}/>
        </div>
        <div className="auth-box__input-wrapper">
          <label ref={passwordLabel} htmlFor="password">Password:</label>
          <input style={{paddingLeft: `${passwordLabelWidth}px`}} required id="password" name="password" onChange={handleChange} type="password" value={password}/>
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
)(LogIn);
