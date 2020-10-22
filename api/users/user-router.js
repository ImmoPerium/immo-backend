const express = require('express');
const router = express.Router();

const Users = require('./user-model.js');
const ValidateMiddleware = require('../middlewares/validate-middleware.js');

/* GET ALL USERS */
router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(error => {
      res.status(500).json({
        error:
          'An error occurred during fetching all users. That one is on us!',
      });
    });
});

/* GET A USER BY ID */
router.get('/:id', ValidateMiddleware.validateUserId, async (req, res) => {
  try {
    const { user: { id } } = req;
    const user = await Users.findById(id);

    if (user === null) {
      res.status(400).json({
        error: `User input id ${id} is invalid.`,
      });
    } else {   
      res.status(200).json({
        id: user.id,
        email_address: user.email_address,
        firstname: user.firstname,
        lastname: user.lastname,
        company: user.company,
        phonenumber: user.phonenumber,
        street: user.street,
        streetnumber: user.streetnumber,
        city: user.city,
        zip: user.zip,
        country: user.country,
        favorite_advertisements: user.favorite_advertisements,
        website: user.website,
      });
    }
  } catch (error) {
    const {
      user: { id },
    } = req;
    
    res.status(500).json({
      error: `An error occurred during fetching an user with the id ${id}.`,
    });
  }
});

/* ADD A NEW USER */
router.post('/register', ValidateMiddleware.validateUser, (req, res) => {
  let {
    email_address,
    firstname,
    lastname,
    password,
    company,
    phonenumber,
    street,
    streetnumber,
    city,
    zip,
    country,
    favorite_advertisements,
    website,
  } = req.body;

  if (
    email_address&&
    firstname&&
    lastname&&
    password&&
    company&&
    phonenumber&&
    street&&
    streetnumber&&
    city&&
    zip&&
    country&&
    favorite_advertisements&&
    website
  ) {
    Users.add({
      email_address,
      firstname,
      lastname,
      password,
      company,
      phonenumber,
      street,
      streetnumber,
      city,
      zip,
      country,
      favorite_advertisements,
      website
    })
    .then(newUser => {
        res.status(201).json({
          id: newUser.id,
          email_address: newUser.email_address,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          company: newUser.company,
          phonenumber: newUser.phonenumber,
          street: newUser.street,
          streetnumber: newUser.streetnumber,
          city: newUser.city,
          zip: newUser.zip,
          country: newUser.country,
          favorite_advertisements: newUser.favorite_advertisements,
          website: newUser.website
        });
      })
      .catch(error => {
        res.status(500).json({
          error: 'An error occurred during the creation of a new user.' + error,
        });
      });
  } else {
    res.status(400).json({
      warning: 'Not all information were provided to create a new user.',
    });
  }
});

/* LOGIN A USER */

/* DELETE A USER */
router.delete('/:id', ValidateMiddleware.validateUserId, async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const deleteUser = await Users.remove(id);

    res.status(200).json({
      message: `The user with the id of ${id} was successfully deleted.`,
    });
  } catch (error) {
    const {
      user: { id },
    } = req;
    
    res.status(500).json({
      message: `The user with the id of ${id} could not be deleted.`,
    });
  }
});

/* UPDATE A USER */
router.put(
  '/:id',
  ValidateMiddleware.validateUserUpdate,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    try {
      const {
        body: {
          email_address,
          firstname,
          lastname,
          password,
          company,
          phonenumber,
          street,
          streetnumber,
          city,
          zip,
          country,
          favorite_advertisements,
          website
        },
        user: { id },
      } = req;

      const successFlag = await Users.update(id, {
        email_address,
        firstname,
        lastname,
        password,
        company,
        phonenumber,
        street,
        streetnumber,
        city,
        zip,
        country,
        favorite_advertisements,
        website
      });
      return successFlag > 0
        ? res.status(200).json({
            message: `The user with the id ${id} has been successfully updated!`,
          })
        : res.status(500).json({
            error: `An error occurred within the database thus the user with the id ${id} could not be updated.`,
          });
    } catch (error) {
      const {
        user: { id },
      } = req;

      res.status(500).json({
        error:
          `An error occurred during updating the user with the id ${id}.` +
          error,
      });
    }
  },
);

/* // GET ALL TASTE_PROFILE OF A USER BY USER ID
router.get(
  '/:id/advertisements',
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    const {
      user: { id },
    } = req;
    try {
      const userTasteProfiles = await Users.findTasteProfiles(id);
      if (userTasteProfiles && userTasteProfiles.length) {
        res.status(200).json(userTasteProfiles);
      } else {
        res.status(404).json({
          info: `No advertisements are available for the user with the id ${id}.`,
        });
      }
    } catch (error) {
      const {
        user: { id },
      } = req;
      res.status(500).json({
        error:
          `An error occurred retrieving the advertisements for the user with the id ${id}. ` +
          error,
      });
    }
  },
); */

module.exports = router;