import React, {Component} from 'react';
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";


class App extends Component {
  constructor(props){
    super(props); //steal some props from Component
    this.socket = ""
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  componentDidMount() { //PULL OUT AND CREATE A FUNCTION!
    this.addNewMessage();

    this.socket = new WebSocket("ws://localhost:3001/");
    console.log("---Connected to Server---")

    console.log("componentDidMount <App />");
  }

  addNewMessage = () => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"}; //?
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  };


  _handleKeyPress = evt => {
    const newMessage = {username: this.state.currentUser.name, content: evt};
    //const messages = this.state.messages.concat(newMessage)
    //send new message to server rather than appending it over


      //this.socket.send("AAAA")
      this.socket.send(JSON.stringify(newMessage), "CLIENT");



    //this.setState({messages: messages})
  }

  render() {
    console.log("Rendering <App/>")
    return (

      <div>
        <MessageList theMessages={this.state.messages} />
        <ChatBar user={this.state.currentUser.name} _handleKeyPress={this._handleKeyPress} />
      </div>
    );
  }
}
export default App;
