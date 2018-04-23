import React, {Component} from 'react';
import Message from "./Message.jsx";

export default class MessageList extends Component {
  render() {

      const incomingMessages = this.props.theMessages.map((content, index) => {

        if(content.type === "incomingMessage"){
         return <Message key={index} messageInfo={content} />
        } else if(content.type === "incomingNotification"){
          return (
          <div className="notification" key={index}>
            <span className="notification-content">{content.note}</span>
          </div>)
        }
      })

    return (
      <div>
        {incomingMessages}
      </div>
    )
  };
};