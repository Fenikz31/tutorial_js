import cors from 'cors';
import express from 'express';
import { nanoid } from 'nanoid';
import { messages } from '../db/messages.js';
import { users } from '../db/users.js';
import Router from './routes.js'

const server = express(),
      { HOST, PORT } = process.env; //const { PORT } = process.env; // process.env.PORT

server.use( cors() );
server.use( express.json() );
server.use( express.urlencoded({ extended: true }) );

server.use((req, res, next) => {
  const { method } = req;
  console.log( method)
  next();
});

server.use((req, res, next) => {
  req.me = users[1];
  next();
});

server.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = messages;
 
  // messages = otherMessages;
 
  return res.send(otherMessages);
  

  // objet = { foo: bar}
  // objet.foo => bar
  // objet[foo] => bar
});

server.delete( '/users', (req, res) => {
  res.send('Received a DELETE HTTP method');
});

server.get('/messages', (req, res) => {
  return res.send(Object.values(messages));
});

server.get( '/users', (req, res) => {
  res.send((Object.values(users)));
});

server.post( '/users', (req, res) => {
  res.send('Received a POST HTTP method');
});

server.put( '/users', (req, res) => {
  res.send('Received a PUT HTTP method');
});

server.post( '/message', (req, res) => {
  const id = nanoid(),
        message = {
          id, // id: id
          text: req.body.text,
          userId: req.me.id 
        };

  console.log('req.me :>> ', req.me);
        
  messages[id] = message

  return res.send(message)
})

server.use(Router)

server.listen( PORT, HOST, () => console.log(`App listening on port http://${HOST}:${PORT}!`));
