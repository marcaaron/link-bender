import React, {Component} from 'react';
import { TOGGLE_AUTH, UPDATE_CLIENT_INFO } from '../mutations';
import { GET_AUTH_METHOD, GET_USER_INFO } from '../queries';
import { graphql, compose } from 'react-apollo';
import { LogInBtn, LogOutBtn } from './icons';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

class Header extends Component {
  handleClick = () => {
    const { data: {userInfo: { token }}} = this.props;
    if(!token){
      let isNewUser = this.props.authMethod.toggleAuth.isNewUser;
      let isAuthBoxHidden = this.props.authMethod.toggleAuth.isAuthBoxHidden;
      this.props.toggleAuth({
        variables: {
          isNewUser,
          isAuthBoxHidden: isAuthBoxHidden ? !isAuthBoxHidden : isAuthBoxHidden
        }
      })
    }else{
      this.logOut();
    }
  }

  logOut = () => {
    const userInfo = {
      name: '',
      password: '',
      email: '',
      token: '',
      id: ''
    }
    this.props.updateClientInfo({
      variables: userInfo
    })
  }

  render() {
    const {
      data: {
        userInfo: {
          password,
          token
        }
      },
      authMethod: {
        toggleAuth: {
          isAuthBoxHidden
        }
      }
    } = this.props;
    const { handleClick } = this;
    return (
      <header>
        <h1 className="main-header">
          <ErrorMessage/>
          <div>
            <Link to="/"><p>Link Blender</p></Link>
            <div onClick={handleClick}>{token ? <LogOutBtn/> : <LogInBtn/> }</div>
          </div>
        </h1>
      </header>
    );
  }
}

export default compose(
  graphql(GET_USER_INFO),
  graphql(UPDATE_CLIENT_INFO, {name:'updateClientInfo'}),
  graphql(GET_AUTH_METHOD, {name:'authMethod'}),
  graphql(TOGGLE_AUTH, {name:'toggleAuth'})
)(Header);
