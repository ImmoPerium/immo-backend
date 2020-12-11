const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Users = require("./user-model.js");
const ValidateMiddleware = require("../middlewares/validate-middleware.js");
const ValidateAuthenticationMiddleware = require("../middlewares/auth-middleware");
const jsonwebtoken = require("jsonwebtoken");
const { response } = require("../../server.js");
const authId = process.env.AUTH;

/* Add-User-Favorites */
router.get(
  "/:id/addfavorite/:fav_adv_id",
  ValidateAuthenticationMiddleware.validateAuthentication,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    try {
      const {
        params: { fav_adv_id, id },
      } = req;
      const user = await Users.findById(id);

      if (user === null || !fav_adv_id) {
        return res.status(400).json({
          error: `User input is invalid.`,
        });
      } else {
        const updated = await Users.addfavorite(id, fav_adv_id);
        res.status(200).json({
          message: "Adding your new favorite advertisment was a success!",
        });
      }
    } catch (error) {
      const {
        params: { fav_adv_id, id },
      } = req;

      res.status(500).json({
        error:
          `An error occurred during adding favorite advertisements ${fav_adv_id} and user ${id}.` +
          error,
      });
    }
  }
);

/* Remove-User-Favorites */
router.get(
  "/:id/removefavorite/:fav_adv_id",
  ValidateAuthenticationMiddleware.validateAuthentication,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    try {
      const {
        params: { fav_adv_id, id },
      } = req;
      const user = await Users.findById(id);

      if (user === null || !fav_adv_id) {
        return res.status(400).json({
          error: `User input is invalid.`,
        });
      } else {
        const updated = await Users.removefavorite(id, fav_adv_id);
        res.status(200).json({
          message: "Removing the selected advertisment was a success!",
        });
      }
    } catch (error) {
      const {
        params: { fav_adv_id, id },
      } = req;

      res.status(500).json({
        error:
          `An error occurred during removing favorite advertisements ${fav_adv_id} and user ${id}.` +
          error,
      });
    }
  }
);

/* GET ALL USERS */
router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "An error occurred during fetching all users. That one is on us!",
      });
    });
});

/* GET A USER BY ID */
router.get(
  "/:id",
  ValidateAuthenticationMiddleware.validateAuthentication,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
    try {
      const {
        user: { id },
      } = req;
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
  }
);

/* ADD A NEW USER */
router.post("/register", (req, res) => {
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
    email_address &&
    firstname &&
    lastname &&
    password
    /*   company&&
    phonenumber&&
    street&&
    streetnumber&&
    city&&
    zip&&
    country&&
    favorite_advertisements&&
    website */
  ) {
    const hash = bcrypt.hashSync(password, 12);
    password = hash;

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
      website,
    })
      .then((newUser) => {
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
          website: newUser.website,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: "An error occurred during the creation of a new user." + error,
        });
      });
  } else {
    res.status(400).json({
      warning: "Not all information were provided to create a new user.",
    });
  }
});

/* LOGIN A USER */

router.post("/login", (req, res) => {
  const { email_address, password } = req.body;

  Users.findByEmail(email_address)
    .then((user) => {
      /*     console.log(password)
    console.log(bcrypt.compareSync(password, user.password))
    console.log(user.password)
    console.log(user.password === password)
    console.log(typeof(user.password))
    console.log(typeof(password)) */

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateJWT(user);
        res.status(200).json({
          message: `You successfully logged in!`,
          user: {
            id: user.id,
            email_address: user.email_address,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Your email or password is incorrect",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something unexpected occured. This is on us!" + error,
      });
    });
});

// UTILITY FUNCTIONS
function generateJWT(user) {
  const payload = {
    subject: user.id,
    email_address: user.email_address,
  };

  const options = {
    expiresIn: "12h",
  };

  return jsonwebtoken.sign(payload, authId, options);
}

/* LOGOUT A USER */

/* DELETE A USER */
router.delete(
  "/:id",
  ValidateAuthenticationMiddleware.validateAuthentication,
  ValidateMiddleware.validateUserId,
  async (req, res) => {
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
  }
);

/* UPDATE A USER */
router.put(
  "/:id",
  ValidateMiddleware.validateUserUpdate,
  ValidateMiddleware.validateUserId,
  ValidateAuthenticationMiddleware.validateAuthentication,
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
          website,
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
        website,
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
  }
);

// GET ALL REAL ESTATE ADVERTISEMENTS BY A USER ID
router.get(
  "/:id/realestate",
  ValidateMiddleware.validateUserId,
  ValidateAuthenticationMiddleware.validateAuthentication,
  async (req, res) => {
    const {
      user: { id },
    } = req;

    try {
      const userRealEstateAdvertisements = await Users.findRealEstateAdvertisementsByUserId(
        id
      );
      if (userRealEstateAdvertisements && userRealEstateAdvertisements.length) {
        res.status(200).json(userRealEstateAdvertisements);
      } else {
        res.status(404).json({
          info: `No real estate advertisements are available for the user with the id ${id}.`,
        });
      }
    } catch (error) {
      const {
        user: { id },
      } = req;

      res.status(500).json({
        error:
          `An error occurred retrieving the real estate advertisements for the user with the id ${id}.` +
          error,
      });
    }
  }
);

module.exports = router;
