import React, {Component} from 'react';

export default class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.messageInfo.username}</span>
          <span className="message-content">{this.props.messageInfo.content}</span>
        </div>
      </div>
    );
  }
}