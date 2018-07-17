import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO, GET_AUTH_METHOD } from '../queries';
import { UPDATE_CLIENT_INFO, TOGGLE_AUTH } from '../mutations';

import SignUp from './SignUp';
import LogIn from './LogIn';

class Auth extends Component {

  logOut = () => {
    const userInfo = {
      name: '',
      password: '',
      email: '',
      token: ''
    }
    this.props.updateClientInfo({
      variables: userInfo
    })
  }

  handleAuthToggle = ({target}) => {
    if(!target.id) return null;
    let isNewUser = this.props.authMethod.toggleAuth.isNewUser;
    switch(target.id){
      case 'sign-up':
        if(!isNewUser) isNewUser = !isNewUser;
        break;
      case 'log-in':
        if(isNewUser) isNewUser = !isNewUser;
        break;
      default:
      break;
    }
    this.props.toggleAuthType({variables: { isNewUser }});
  }

  render() {

    const {
      authMethod: {
        toggleAuth: {
          isNewUser
        }
      },
      data: {
        userInfo: {
          token,
          name
        }
      }
    } = this.props;

    const { logOut, handleAuthToggle } = this;

    if(!token){
      return (
        <div className="auth-box">
          <h2 onClick={ handleAuthToggle }>
            <div className={`auth-box__btn ${isNewUser && 'auth-box__btn--active'}`} id="sign-up">Sign Up</div>
            &nbsp;&#47;&nbsp;
            <div className={`auth-box__btn ${!isNewUser && 'auth-box__btn--active'}`} id="log-in">Log In</div>
          </h2>
          { isNewUser ? <SignUp/> : <LogIn/>}
        </div>
      );
    }else{
      return (
        <div>
          <div>Welcome { name }!</div>
          <button onClick={ logOut }>Sign Out</button>
        </div>
      )
    }
  }
}

export default compose(
  graphql(GET_USER_INFO),
  graphql(UPDATE_CLIENT_INFO, {name:'updateClientInfo'}),
  graphql(GET_AUTH_METHOD, {name:'authMethod'}),
  graphql(TOGGLE_AUTH, {name:'toggleAuthType'})
)(Auth);
