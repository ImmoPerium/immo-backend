const db = require("../../data/db-config.js");

module.exports = {
  find,
  findById,
  findByEmail,
  findBy,
  findRealEstateAdvertisementsByUserId,
  add,
  update,
  remove,
  addfavorite,
  removefavorite,
};

function removefavorite(user_id, ad_id) {
  findById(user_id)
    .then((user) => {
      if (!user) {
        return null;
      }

      return db("users")
        .where("id", user_id)
        .update(
          "favorite_advertisements",
          [
            ...new Set(
              user.favorite_advertisements
                .split("-")
                .filter((element) => element !== ad_id)
            ),
          ].join("-")
        );
    })
    .catch((error) => console.log(error));
}

function addfavorite(user_id, ad_id) {
  findById(user_id)
    .then((user) => {
      if (!user) {
        return null;
      }

      return db("users")
        .where("id", user_id)
        .update(
          "favorite_advertisements",
          [
            ...new Set(user.favorite_advertisements.split("-").concat(ad_id)),
          ].join("-")
        );
    })
    .catch((error) => console.log(error));
}

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where("id", id)
    .first()
    .then((user) => (user ? user : null));
}

function findByEmail(user_email) {
  return db("users")
    .where("email_address", user_email)
    .first()
    .then((user) => (user ? user : null));
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first()
    .then((user) => (user ? user : null));
}

function findRealEstateAdvertisementsByUserId(id) {
  return db("real_estate_advertisements as r")
    .join("users as u", "u.id", "r.user_id")
    .select(
      "r.id",
      "r.user_id",
      "r.street",
      "r.streetnumber",
      "r.country",
      "r.city",
      "r.zip",
      "r.level",
      "r.lot_area",
      "r.house_area",
      "r.rental_price_basic",
      "r.rental_price_total",
      "r.rental_deposit",
      "r.purchase_price",
      "r.courtage_percent",
      "r.building_type",
      "r.overall_condition",
      "r.furnishing_condition",
      "r.construction_date",
      "r.renovation_date",
      "r.number_of_floors",
      "r.rooms",
      "r.bedrooms",
      "r.livingrooms",
      "r.bathrooms",
      "r.basement",
      "r.basement_area",
      "r.pets_allowed",
      "r.barrier_free",
      "r.heating",
      "r.pool",
      "r.offstreet_parking",
      "r.vacancy",
      "r.object_number",
      "r.advertisement_purpose",
      "r.advertisement_title",
      "r.advertisement_description",
      "r.furnishing_description",
      "r.location_description",
      "r.other_description",
      "r.photo_1",
      "r.photo_2",
      "r.photo_3",
      "r.photo_4",
      "r.photo_5",
      "r.photo_6",
      "r.photo_7",
      "r.photo_8",
      "r.photo_9",
      "r.photo_10",
      "r.is_public",
      "r.is_location_public",
      "r.view_count",
      "r.favorite_count",
      "r.created_at"
    )
    .where("r.user_id", id);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return db("users").where({ id }).update(changes);
}

function remove(id) {
  return db("users").where("id", id).del();
}
