const server = require('./server.js');
require('dotenv').config();
const SERVER_PORT = process.env.PORT || 5000;

server.listen(SERVER_PORT, () => {
  console.log(
    `\n *** API server running on ${process.env.SERVER_URL}:${SERVER_PORT} ***\n`,
  );
});