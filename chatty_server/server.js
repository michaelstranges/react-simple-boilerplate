const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log(wss.clients.size, 'Client connected');

    const usersOnline = JSON.stringify({type: "users", count: wss.clients.size})

    wss.clients.forEach(function each(client) {
    if(client.readyState === SocketServer.OPEN){
      client.send(usersOnline);
    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.

  ws.on('close', () => console.log(wss.clients.size, 'Client disconnected'));
  ws.on('message', function incoming(data) {

    incomingMessage = JSON.parse(data)

    switch(incomingMessage.type){
      case "postMessage":
        console.log(`User ${incomingMessage.username} said ${incomingMessage.content}`, "---SERVER---");
        incomingMessage.id = uuidv1(); //add id to incomingmessage obj
        incomingMessage.type = "incomingMessage";
        returningMessage = JSON.stringify(incomingMessage);
        //console.log(wss.clients, "---clients---")
        break;
//case to handle post notifcations when received on the server side.
      case "postNotification":
        let notification = {type: "incomingNotification", online: wss.clients.size, note: `${incomingMessage.oldUser} changed name to ${incomingMessage.username}`}
        returningMessage = JSON.stringify(notification);
        break;
    }
//broadcasting message to send to all child nodes
    wss.clients.forEach(function each(client) {
      if(client.readyState === SocketServer.OPEN){
        client.send(returningMessage);
      }
    })
  });
});