require('dotenv').config();

const jsonwbt = require('jsonwebtoken');
const authId = process.env.AUTH

module.exports = {
  validateAuthentication
}

function validateAuthentication(req, res, next) {
  const token = req.headers.authorization;

  jsonwbt.verify(token, authId, (error, decodedToken) => {
    error
      ? res
          .status(401)
          .json({ warning: 'Authorization failed. Access denied!' })
      : ((req.decodedToken = decodedToken), next());
  });
}