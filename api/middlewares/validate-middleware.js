const Users = require('../users/user-model.js');
const RealEstateAdvertisements = require('../advertisements/advertisements-model.js');

module.exports = {
  validateUserUpdate,
  validateUserId,
  validateUser,
  validateRealEstateAdvertisementId,
  validateRealEstateAdvertisement,
  validateRealEstateAdvertisementUpdate
};

// USERS

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
  } = req;

  if (Object.keys(body).length === 0) {
    res.status(400).json({ warning: 'Missing user data entirely.' });
  } else {
    next();
  }
}

// REAL ESTATE ADVERTISEMENTS

async function validateRealEstateAdvertisementId(req, res, next) {
  try {
    const {
      params: { id },
    } = req;

    const real_estate_advertisements = await RealEstateAdvertisements.findById(id);
    real_estate_advertisements
      ? ((req.real_estate_advertisements = real_estate_advertisements), next())
      : res.status(404).json({
          info: `The real estate advertisements with the id ${id} was not found during validation.`,
        });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred during validation of the real estate advertisements.',
    });
  }
}

function validateRealEstateAdvertisement(req, res, next) {
  const {
    body,
    body: {
      user_id,
      street,
      streetnumber, 
      country,
      city,
      zip,
      level,
      lot_area,
      house_area,
      rental_price_basic,
      rental_price_total,
      rental_deposit,
      purchase_price,
      courtage_percent,
      building_type,
      overall_condition,
      furnishing_condition,
      construction_date,
      renovation_date,
      number_of_floors,
      rooms,
      bedrooms,
      livingrooms,
      bathrooms,
      basement,
      basement_area,
      pets_allowed, 
      barrier_free, 
      heating,
      pool,
      offstreet_parking,
      vacancy,
      object_number,
      advertisement_purpose,
      advertisement_title,
      advertisement_description,
      furnishing_description,
      location_description,
      other_description,
      photo_1,
      photo_2,
      photo_3,
      photo_4,
      photo_5,
      photo_6,
      photo_7,
      photo_8,
      photo_9,
      photo_10,
      is_public,
      is_location_public,
    },
  } = req;

  if (Object.keys(body).length === 0) {
    res.status(400).json({ warning: 'Missing real estate advertisement data entirely.' });
  } else if (
    !user_id||
    !street||
    !streetnumber||
    !country||
    !city||
    !zip||
    !level||
    !lot_area||
    !house_area||
    !rental_price_basic||
    !rental_price_total||
    !rental_deposit||
    !purchase_price||
    !courtage_percent||
    !building_type||
    !overall_condition||
    !furnishing_condition||
    !construction_date||
    !renovation_date||
    !number_of_floors||
    !rooms||
    !bedrooms||
    !livingrooms||
    !bathrooms||
    !basement||
    !basement_area||
    !pets_allowed||
    !barrier_free||
    !heating||
    !offstreet_parking||
    !vacancy||
    !object_number||
    !advertisement_purpose||
    !advertisement_title||
    !advertisement_description||
    !furnishing_description||
    !location_description||
    !other_description
    ) {
    res.status(400).json({
      warning:
        'Missing required data for real estate advertisement.',
    });
  } else {
    next(); 
  }
}

function validateRealEstateAdvertisementUpdate(req, res, next) {
  const {
    body,
  } = req;

  if (Object.keys(body).length === 0) {
    res.status(400).json({ warning: 'Missing real estate advertisement data entirely.' });
  } else {
    next();
  }
}