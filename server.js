const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

/* const UsersRouter = require('./api/users/user-router.js'); */

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

server.get('/', function rootHandler(req, res) {
  res.send(
    `Welcome to the ${process.env.DEPLOYMENT} environment API of Immoperium!`,
  );
});

/* server.use('/v1/users', UsersRouter); */

module.exports = server;