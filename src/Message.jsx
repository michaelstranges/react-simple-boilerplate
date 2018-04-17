import React, {Component} from 'react';

export default class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    console.log(this.props.messageInfo, "DDD")
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