import React, {Component} from 'react';

export default class ChatBar extends Component {

handleKeyPress = (evt) => {
  if (evt.key === "Enter") {
    this.props._handleKeyPress(evt.target.value)
  }
}

handleChange = (evt) => {
  if (evt.key === "Enter") {
    this.props._handleChange(evt.target.value)
  }
}

  render() {
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