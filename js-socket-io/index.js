const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
require('./server')(io);
const winston = require('./winston');

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

server.listen(PORT, () => {
  winston.log('info', `Express server listening on port ${PORT}`);
});
