import React, {Component} from 'react';

export default class ChatBar extends Component {

handleKeyPress = (evt) => {
  if (evt.key === "Enter") {
    this.props._handleKeyPress(evt.target.value)
    console.log(evt.target, "--chatbar--")
  }
}

handleChange = (evt) => {
  if (evt.key === "Enter") {
    this.props._handleChange(evt.target.value)
    console.log(evt.target, "--hopefully username--")
  }
}

  render() {
    console.log("Rendering <Chatbar/>");
    return (
      <footer className="chatbar">
        <input
          defaultValue={this.props.user}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyPress={this.handleChange}
        />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleKeyPress}
        />
      </footer>
    );
  }
}