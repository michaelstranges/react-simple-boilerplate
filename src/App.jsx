import React, {Component} from 'react';
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import NavBar from "./navbar.jsx";


class App extends Component {
  constructor(props){
    super(props); //steal some props from Component
    this.socket = ""
//Sets state of the App component
    this.state = {
      online: "",
      currentUser:{name: 'Anonymous'},
      messages: []
    }
  }

  componentDidMount() {

    this.addNewMessage();
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      switch(newData.type){
//case when returning an incoming message
        case "incomingMessage":
          const otherMessage = {type: newData.type, username: newData.username, content: newData.content};
          const thisUser = {name: newData.username}
          const nextMessage = this.state.messages.concat(otherMessage);
          this.setState({messages: nextMessage, currentUser: thisUser})
          break;
//case when return message is an incoming notification
        case "incomingNotification":

          const newNotification = {type: newData.type, note: newData.note}
          const arrayNotification = this.state.messages.concat(newNotification);
          this.setState({messages:arrayNotification})
          break;
//case when returning data about users online
        case "users":
          this.setState({online: newData.count})
          break;

        default:
        throw new Error("Unknown event type ");
      }
    }
  }

//This is just a first test message to ensure system is working
  addNewMessage = () => {
    const newMessage = {type: "incomingMessage", username: "Chatty Cathy", content: "Welcome to ChattyApp, don't mind me.  You're free to chat!"}; //?
// Add a new message to the list of messages in the data store
    const messages = this.state.messages.concat(newMessage)
//changes state of App and updates children
    this.setState({messages: messages})
  };


  _handleKeyPress = evt => {
    const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: evt};

//send new message to server rather than appending it over
      this.socket.send(JSON.stringify(newMessage), "CLIENT");
  }


//handle change even is to notify when a user changes names
  _handleChange = evt => {
    let oldName = this.state.currentUser.name;
    this.setState({currentUser:{name: evt}});
    this.socket.send(JSON.stringify({type: "postNotification", username: evt, oldUser: oldName}))
  }

  render() {
    return (

      <div>
        <NavBar usersOnline={this.state.online} />
        <MessageList theMessages={this.state.messages} />
        <ChatBar
          user={this.state.currentUser.name}
          _handleKeyPress={this._handleKeyPress}
          _handleChange={this._handleChange}
          />
      </div>
    );
  }
}
export default App;
