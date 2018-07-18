import React, { Component, createRef } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO, GET_CLIENT_LINK, ALL_LINKS } from '../queries';
import { UPDATE_CLIENT_LINK, CREATE_LINK } from '../mutations';

class CreateLink extends Component {
  constructor(){
    super();
    this.descriptionLabel = createRef();
    this.urlLabel = createRef();
    this.state = {
      descriptionLabelWidth: 0,
      urlLabelWidth: 0
    }
  }

  handleChange = (e) => {
    const { getClientLink: { linkInfo } } = this.props;
    const updatedInfo = {...linkInfo};
    const field = e.target.id;
    const value = e.target.value;
    updatedInfo[field] = value;
    this.props.updateClientLink({
      variables: updatedInfo
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user_id = this.props.data.userInfo.id;
    const { getClientLink: { linkInfo } } = this.props;
    this.props.createLink({
      variables: {...linkInfo, user_id },
      refetchQueries: [{query: ALL_LINKS }]
    })
    .then(()=>{
      this.props.updateClientLink({
        variables: { url:'', description:'' }
      })
    });
  }

  componentDidMount(){
    const { descriptionLabel, urlLabel } = this;
    const descriptionLabelWidth = descriptionLabel.current.getBoundingClientRect().width;
    const urlLabelWidth = urlLabel.current.getBoundingClientRect().width;
    this.setState({ descriptionLabelWidth, urlLabelWidth });
  }

  render(){
    const {
      data: {
        userInfo: {
          token,
          id
        }
      },
      getClientLink: {
        linkInfo: {
          description,
          url
        }
      }
    } = this.props;

    const { handleChange, handleSubmit } = this;
    const { descriptionLabelWidth, urlLabelWidth } = this.state;
    if(token){
      return(
        <div className="auth-box">
          <h2>Create A New Link</h2>
          <div className="auth-box__form">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="auth-box__input-wrapper">
                <label ref={this.descriptionLabel} htmlFor="description">Description:</label>
                <input style={{paddingLeft: `${descriptionLabelWidth}px`}} onChange={handleChange} value={description} type="text" name="description" id="description"/>
              </div>
              <div className="auth-box__input-wrapper">
                <label ref={this.urlLabel} htmlFor="url">URL:</label>
                <input style={{paddingLeft: `${urlLabelWidth}px`}} onChange={handleChange} value={url} type="text" name="url" id="url"/>
              </div>
              <button type="submit">Submit Link</button>
            </form>
          </div>
        </div>
      )
    }else{
      return null;
    }
  }
}

export default compose(
  graphql(GET_USER_INFO),
  graphql(CREATE_LINK, {name: 'createLink'}),
  graphql(GET_CLIENT_LINK, {name: 'getClientLink'}),
  graphql(UPDATE_CLIENT_LINK, {name: 'updateClientLink'})
)(CreateLink);
