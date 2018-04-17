import React, {Component} from 'react';
import Message from "./Message.jsx";


export default class MessageList extends Component {
  render() {

      const incomingMessages = this.props.theMessages.map((content, index) =>
        <Message key={index} messageInfo={content} />
      )

        return (
          <div>
            {incomingMessages}
          </div>
        )
  };
};