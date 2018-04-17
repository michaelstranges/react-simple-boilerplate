import React, {Component} from 'react';

export default class ChatBar extends Component {


  render() {
    console.log("Rendering <Chatbar/>");
    console.log(this.props.user)
    return (
      <footer className="chatbar">
        <input
          defaultValue={this.props.user}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
        />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}