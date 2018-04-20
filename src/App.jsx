import React, {Component} from 'react';
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";


class App extends Component {
  constructor(props){
    super(props); //steal some props from Component
    this.socket = ""

    this.state = {
      notification: [],
      currentUser:{name: 'Anonymous'},
      messages: []
    }


    // this.state = {
    //   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    //   messages: [
    //     {
    //       username: "Bob",
    //       content: "Has anyone seen my marbles?",
    //     },
    //     {
    //       username: "Anonymous",
    //       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    //     }
    //   ]
    // }
  }

  componentDidMount() { //PULL OUT AND CREATE A FUNCTION!
    this.addNewMessage();

    this.socket = new WebSocket("ws://localhost:3001/");
console.log("---Connected to Server---")

console.log("componentDidMount <App />");

    this.socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);

        switch(newData.type){
          case "incomingMessage":
            const otherMessage = {type: newData.type, username: newData.username, content: newData.content};
            const thisUser = {name: newData.username}
            const nextMessage = this.state.messages.concat(otherMessage);
            this.setState({messages: nextMessage, currentUser: thisUser})
            break;
// I have a notification coming in, send to state? then to message list?
          case "incomingNotification":

            const newNotification = {type: newData.type, note: newData.note}

console.log(newNotification);

            const arrayNotification = this.state.messages.concat(newNotification);

console.log(arrayNotification, "----notify----")

            this.setState({messages:arrayNotification})
            //console.log(newData.note, "---the notification---")
            break;

          default:

          throw new Error("Unknown event type " + data.type);


        }


      }
  }

//might not even need this!
  addNewMessage = () => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {type: "incomingMessage", username: "Michelle", content: "Hello there!"}; //?
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  };


  _handleKeyPress = evt => {
    const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: evt};

    //send new message to server rather than appending it over
      this.socket.send(JSON.stringify(newMessage), "CLIENT");
  }

  _handleChange = evt => {
    console.log("---handleChange---")
    console.log(evt)
    let oldName = this.state.currentUser.name;
    this.setState({currentUser:{name: evt}});
    this.socket.send(JSON.stringify({type: "postNotification", username: evt, oldUser: oldName}))
  }

  render() {
    console.log("Rendering <App/>")
    console.log(this.state.notification);
    console.log(this.state.messages);
    return (

      <div>
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
