import express from 'express';
import 'dotenv/config';

const server = express()

const serverPort = process.env.SERVER_PORT || 4000;

server.get('/', function (req, res) {
  res.send('To do list server')
})

console.log('Starting server on PORT : '+serverPort);
server.listen(serverPort);