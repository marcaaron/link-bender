import React, {Component} from 'react';
import LinkItem from './LinkItem';

export default class LinkList extends Component {
  render() {
    if(this.props.links){
      return (
        <ul>
          {
            this.props.links.map(link=><LinkItem key={link.id} {...link}></LinkItem>)
          }
        </ul>
      );
    }else{
      console.warn('Must Pass links as props to LinkList component!');
      return null;
    }
  }
}
