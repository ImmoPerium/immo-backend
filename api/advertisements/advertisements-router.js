const express = require('express');
const router = express.Router();

const RealEstateAdvertisements = require('./advertisements-model.js');
const ValidateMiddleware = require('../middlewares/validate-middleware.js');

/* GET ALL REAL ESTATE ADVERTISEMENTS */
router.get('/', (req, res) => {
  RealEstateAdvertisements.find()
    .then(real_estate_advertisements => {
      res.status(200).json({ real_estate_advertisements: real_estate_advertisements });
    })
    .catch(error => {
      res.status(500).json({
        error:
          'An error occurred during fetching all real estate advertisements. That one is on us!',
      });
    });
});

/* GET A REAL ESTATE ADVERTISEMENT BY ID */
router.get('/:id', ValidateMiddleware.validateRealEstateAdvertisementId, async (req, res) => {
  try {
    const { real_estate_advertisements: { id } } = req;
    const real_estate_advertisement = await RealEstateAdvertisements.findById(id);

    if (real_estate_advertisement === null) {
      res.status(400).json({
        error: `Real estate advertisement input id ${id} is invalid.`,
      });
    } else {   
      res.status(200).json({
        id: real_estate_advertisement.id,
        user_id: real_estate_advertisement.user_id,
        street: real_estate_advertisement.street,
        streetnumber: real_estate_advertisement.streetnumber,
        country: real_estate_advertisement.country,
        city: real_estate_advertisement.city,
        zip: real_estate_advertisement.zip,
        level: real_estate_advertisement.level,
        lot_area: real_estate_advertisement.lot_area,
        house_area: real_estate_advertisement.house_area,
        rental_price_basic: real_estate_advertisement.rental_price_basic,
        rental_price_total: real_estate_advertisement.rental_price_total,
        rental_deposit: real_estate_advertisement.rental_deposit,
        purchase_price: real_estate_advertisement.purchase_price,
        courtage_percent: real_estate_advertisement.courtage_percent,
        building_type: real_estate_advertisement.building_type,
        overall_condition: real_estate_advertisement.overall_condition,
        furnishing_condition: real_estate_advertisement.furnishing_condition,
        construction_date: real_estate_advertisement.construction_date,
        renovation_date: real_estate_advertisement.renovation_date,
        number_of_floors: real_estate_advertisement.number_of_floors,
        rooms: real_estate_advertisement.rooms,
        bedrooms: real_estate_advertisement.bedrooms,
        livingrooms: real_estate_advertisement.livingrooms,
        bathrooms: real_estate_advertisement.bathrooms,
        basement: real_estate_advertisement.basement,
        basement_area: real_estate_advertisement.basement_area,
        pets_allowed: real_estate_advertisement.pets_allowed,
        barrier_free: real_estate_advertisement.barrier_free,
        heating: real_estate_advertisement.heating,
        pool: real_estate_advertisement.pool,
        offstreet_parking: real_estate_advertisement.offstreet_parking,
        vacancy: real_estate_advertisement.vacancy,
        object_number: real_estate_advertisement.object_number,
        advertisement_purpose: real_estate_advertisement.advertisement_purpose,
        advertisement_title: real_estate_advertisement.advertisement_title,
        advertisement_description: real_estate_advertisement.advertisement_description,
        furnishing_description: real_estate_advertisement.furnishing_description,
        location_description: real_estate_advertisement.location_description,
        other_description: real_estate_advertisement.other_description,
        photo_1: real_estate_advertisement.photo_1,
        photo_2: real_estate_advertisement.photo_2,
        photo_3: real_estate_advertisement.photo_3,
        photo_4: real_estate_advertisement.photo_4,
        photo_5: real_estate_advertisement.photo_5,
        photo_6: real_estate_advertisement.photo_6,
        photo_7: real_estate_advertisement.photo_7,
        photo_8: real_estate_advertisement.photo_8,
        photo_9: real_estate_advertisement.photo_9,
        photo_10: real_estate_advertisement.photo_10,
        is_public: real_estate_advertisement.is_public,
        is_location_public: real_estate_advertisement.is_location_public
      });
    }
  } catch (error) {
    const {
      real_estate_advertisements: { id },
    } = req;
    
    res.status(500).json({
      error: `An error occurred during fetching a real estate advertisement with the id ${id}.`,
    });
  }
});

/* ADD A NEW REAL ESTATE ADVERTISEMENT */
router.post('/add', ValidateMiddleware.validateRealEstateAdvertisement, (req, res) => {
  let {
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
  } = req.body;

  if (
    user_id
  ) {
    RealEstateAdvertisements.add({
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
      is_location_public
    })
    .then(newRealEstateAdvertisements => {
        res.status(201).json({
          id: newRealEstateAdvertisements.id,
          user_id: newRealEstateAdvertisements.user_id,
          street: newRealEstateAdvertisements.website,
          streetnumber: newRealEstateAdvertisements.streetnumber,
          country: newRealEstateAdvertisements.country,
          city: newRealEstateAdvertisements.city,
          zip: newRealEstateAdvertisements.zip,
          level: newRealEstateAdvertisements.level,
          lot_area: newRealEstateAdvertisements.lot_area,
          house_area: newRealEstateAdvertisements.house_area,
          rental_price_basic: newRealEstateAdvertisements.rental_price_basic,
          rental_price_total: newRealEstateAdvertisements.rental_price_total,
          rental_deposit: newRealEstateAdvertisements.rental_deposit,
          purchase_price: newRealEstateAdvertisements.purchase_price,
          courtage_percent: newRealEstateAdvertisements.courtage_percent,
          building_type: newRealEstateAdvertisements.building_type,
          overall_condition: newRealEstateAdvertisements.overall_condition,
          furnishing_condition: newRealEstateAdvertisements.furnishing_condition,
          construction_date: newRealEstateAdvertisements.construction_date,
          renovation_date: newRealEstateAdvertisements.renovation_date,
          number_of_floors: newRealEstateAdvertisements.number_of_floors,
          rooms: newRealEstateAdvertisements.rooms,
          bedrooms: newRealEstateAdvertisements.bedrooms,
          livingrooms: newRealEstateAdvertisements.livingrooms,
          bathrooms: newRealEstateAdvertisements.bathrooms,
          basement: newRealEstateAdvertisements.basement,
          basement_area: newRealEstateAdvertisements.basement_area,
          pets_allowed: newRealEstateAdvertisements.pets_allowed,
          barrier_free: newRealEstateAdvertisements.barrier_free,
          heating: newRealEstateAdvertisements.heating,
          pool: newRealEstateAdvertisements.pool,
          offstreet_parking: newRealEstateAdvertisements.offstreet_parking,
          vacancy: newRealEstateAdvertisements.vacancy,
          object_number: newRealEstateAdvertisements.object_number,
          advertisement_purpose: newRealEstateAdvertisements.advertisement_purpose,
          advertisement_title: newRealEstateAdvertisements.advertisement_title,
          advertisement_description: newRealEstateAdvertisements.advertisement_description,
          furnishing_description: newRealEstateAdvertisements.furnishing_description,
          location_description: newRealEstateAdvertisements.location_description,
          other_description: newRealEstateAdvertisements.other_description,
          photo_1: newRealEstateAdvertisements.photo_1,
          photo_2: newRealEstateAdvertisements.photo_2,
          photo_3: newRealEstateAdvertisements.photo_3,
          photo_4: newRealEstateAdvertisements.photo_4,
          photo_5: newRealEstateAdvertisements.photo_5,
          photo_6: newRealEstateAdvertisements.photo_6,
          photo_7: newRealEstateAdvertisements.photo_7,
          photo_8: newRealEstateAdvertisements.photo_8,
          photo_9: newRealEstateAdvertisements.photo_9,
          photo_10: newRealEstateAdvertisements.photo_10,
          is_public: newRealEstateAdvertisements.is_public,
          is_location_public: newRealEstateAdvertisements.is_location_public
        });
      })
      .catch(error => {
        res.status(500).json({
          error: 'An error occurred during the creation of a new real estate advertisement.' + error,
        });
      });
  } else {
    res.status(400).json({
      warning: 'Not all information were provided to create a new real estate advertisement.',
    });
  }
});

/* DELETE A REAL ESTATE ADVERTISEMENT */
router.delete('/:id', ValidateMiddleware.validateRealEstateAdvertisementId, async (req, res) => {
  try {
    const {
      real_estate_advertisements: { id },
    } = req;
    const deleteRealEstateAdvertisement= await RealEstateAdvertisements.remove(id);

    res.status(200).json({
      message: `The real estate advertisement with the id of ${id} was successfully deleted.`,
    });
  } catch (error) {
    const {
      real_estate_advertisements: { id },
    } = req;
    
    res.status(500).json({
      message: `The real estate advertisement with the id of ${id} could not be deleted.`,
    });
  }
});

/* UPDATE A REAL ESTATE ADVERTISEMENT */
router.put(
  '/:id',
  ValidateMiddleware.validateRealEstateAdvertisementUpdate,
  ValidateMiddleware.validateRealEstateAdvertisementId,
  async (req, res) => {
    try {
      const {
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
          is_location_public
        },
        real_estate_advertisements: { id },
      } = req;

      const successFlag = await RealEstateAdvertisements.update(id, {
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
        is_location_public
      });
      return successFlag > 0
        ? res.status(200).json({
            message: `The real estate advertisement with the id ${id} has been successfully updated!`,
          })
        : res.status(500).json({
            error: `An error occurred within the database thus the real estate advertisement with the id ${id} could not be updated.`,
          });
    } catch (error) {
      const {
        real_estate_advertisements: { id },
      } = req;

      res.status(500).json({
        error:
          `An error occurred during updating the real estate advertisement with the id ${id}.` +
          error,
      });
    }
  },
);

module.exports = router;