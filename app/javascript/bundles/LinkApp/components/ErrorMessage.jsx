import React, {Component} from 'react';
import { GET_ERROR_MESSAGE } from '../queries';
import { UPDATE_ERROR_MESSAGE } from '../mutations';
import { graphql, compose } from 'react-apollo';
import { OkButton } from './icons';

class ErrorMessage extends Component {

  handleClick = () => {
    this.props.updateErrorMessage({
      variables: {errorMessage: ''}
    })
  }

  render() {
    const {
      data: {
        errorHandler: {
          errorMessage
        }
      }
    } = this.props;
    const { handleClick } = this;
    const isError = errorMessage !== '';
    return (
      <div className="error-message" aria-expanded={isError}>
        {isError && [
          <div key="em-head">
            <p className="error-message__header">Error: </p>
            <p className="error-message__body">{errorMessage}</p>
          </div>,
          <div key="em-btn" onClick={handleClick} className="error-message__close">
            <OkButton />
          </div>
        ]
        }
      </div>
    );
  }
}

export default compose(
  graphql(GET_ERROR_MESSAGE),
  graphql(UPDATE_ERROR_MESSAGE, {name: 'updateErrorMessage'})
)(ErrorMessage)
