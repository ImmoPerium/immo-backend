const Users = require('../users/user-model.js');

module.exports = {
  validateUserUpdate,
  validateUserId,
  validateUser,
};

async function validateUserId(req, res, next) {
  try {
    const {
      params: { id },
    } = req;

    const user = await Users.findById(id);
    user
      ? ((req.user = user), next())
      : res.status(404).json({
          info: `The user with the id ${id} was not found during validation.`,
        });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred during validation of the user.',
    });
  }
}

function validateUser(req, res, next) {
  const {
    body,
    body: {
      email_address,
      firstname,
      lastname,
      company,
      phonenumber,
      street,
      streetnumber,
      city,
      zip,
      country,
      favorite_advertisements,
      website,
    },
  } = req;

  if (Object.keys(body).length === 0) {
    res.status(400).json({ warning: 'Missing user data entirely.' });
  } else if (
      !email_address||
      !firstname||
      !lastname||
      !company||
      !phonenumber||
      !street||
      !streetnumber||
      !city||
      !zip||
      !country||
      !favorite_advertisements||
      !website
    ) {
    res.status(400).json({
      warning:
        'Missing required data for user.',
    });
  } else {
    next();
  }
}

function validateUserUpdate(req, res, next) {
  const {
    body,
    body: {
      email_address,
      firstname,
      lastname,
      company,
      phonenumber,
      street,
      streetnumber,
      city,
      zip,
      country,
      favorite_advertisements,
      website,
    },
  } = req;

  if (Object.keys(body).length === 0) {
    res.status(400).json({ warning: 'Missing user data entirely.' });
  } else {
    next();
  }
}