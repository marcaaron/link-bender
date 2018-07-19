import React, {Component} from 'react';
import { CreateLinkBtn, HomeBtn, UsersBtn, ProfileBtn } from './icons';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO } from '../queries';
import { UPDATE_ERROR_MESSAGE, TOGGLE_CREATE_LINK } from '../mutations';
class FooterNav extends Component {
  toggleCreateLinkState = () => {
    const token = this.props.getUserInfo.userInfo.token;
    if(!token){
      this.props.updateErrorMessage({
        variables: {errorMessage: 'Must Sign In Before Posting Links'}
      })
    }else{
      this.props.toggleCreateLink({
        variables: { isCreateLinkHidden: false }
      })
    }
  }

  render() {
    const { toggleCreateLinkState } = this;
    return (
      <div className="footer-nav">
        <Link to="/"><HomeBtn/></Link>
        <div onClick={toggleCreateLinkState}><CreateLinkBtn/></div>
        <div onClick={()=>alert('Under Construction')}><UsersBtn/></div>
        <div onClick={()=>alert('Under Construction')}><ProfileBtn/></div>
      </div>
    );
  }
}

export default compose(
  graphql(GET_USER_INFO, {name:'getUserInfo'}),
  graphql(UPDATE_ERROR_MESSAGE, {name:'updateErrorMessage'}),
  graphql(TOGGLE_CREATE_LINK, {name:'toggleCreateLink'})
)(FooterNav);
