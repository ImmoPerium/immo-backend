
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users
        .string('email_address', 255)
        .notNullable()
        .unique();
      users.string('firstname').notNullable();
      users.string('lastname').notNullable();
      users.string('password').notNullable();
      users.string('company');
      users.string('phonenumber');
      users.string('street');
      users.string('streetnumber');
      users.string('city');
      users.string('zip');
      users.string('country');
      users.string('favorite_advertisements');
      users.string('website');
    })
    .createTable('real_estate_advertisements', real_estate_advertisements => {
      real_estate_advertisements.increments();
      real_estate_advertisements
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      real_estate_advertisements.string('street').notNullable();
      real_estate_advertisements.string('streetnumber').notNullable();
      real_estate_advertisements.string('country').notNullable();
      real_estate_advertisements.string('city').notNullable();
      real_estate_advertisements.string('zip').notNullable();
      real_estate_advertisements.integer('level');
      real_estate_advertisements.decimal('lot_area');
      real_estate_advertisements.decimal('house_area').notNullable();
      real_estate_advertisements.decimal('rental_price_basic');
      real_estate_advertisements.decimal('rental_price_total');
      real_estate_advertisements.decimal('rental_deposit');
      real_estate_advertisements.decimal('purchase_price');
      real_estate_advertisements.decimal('courtage_percent');
      real_estate_advertisements.string('building_type').notNullable();
      real_estate_advertisements.string('overall_condition').notNullable();
      real_estate_advertisements.string('furnishing_condition');
      real_estate_advertisements.date('construction_date').notNullable();
      real_estate_advertisements.date('renovation_date');
      real_estate_advertisements.integer('number_of_floors').notNullable();
      real_estate_advertisements.decimal('rooms').notNullable();
      real_estate_advertisements.integer('bedrooms').notNullable();
      real_estate_advertisements.integer('livingrooms');
      real_estate_advertisements.integer('bathrooms').notNullable();
      real_estate_advertisements.boolean('basement').defaultTo(false);
      real_estate_advertisements.decimal('basement_area');
      real_estate_advertisements.boolean('pets_allowed').notNullable();
      real_estate_advertisements.boolean('barrier_free').notNullable();
      real_estate_advertisements.string('heating').notNullable();
      real_estate_advertisements.boolean('pool').defaultTo(false);
      real_estate_advertisements.boolean('offstreet_parking').notNullable();
      real_estate_advertisements.date('vacancy').notNullable();
      real_estate_advertisements.string('object_number').unique();
      real_estate_advertisements.string('advertisement_purpose').notNullable();
      real_estate_advertisements.string('advertisement_title').notNullable();
      real_estate_advertisements.string('advertisement_description').notNullable();
      real_estate_advertisements.string('furnishing_description');
      real_estate_advertisements.string('location_description');
      real_estate_advertisements.string('other_description');
      real_estate_advertisements.binary('photo_1');
      real_estate_advertisements.binary('photo_2');
      real_estate_advertisements.binary('photo_3');
      real_estate_advertisements.binary('photo_4');
      real_estate_advertisements.binary('photo_5');
      real_estate_advertisements.binary('photo_6');
      real_estate_advertisements.binary('photo_7');
      real_estate_advertisements.binary('photo_8');
      real_estate_advertisements.binary('photo_9');
      real_estate_advertisements.binary('photo_10');
      real_estate_advertisements.boolean('is_public').notNullable();
      real_estate_advertisements.boolean('is_location_public').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('real_estate_advertisements')
    .dropTableIfExists('users');
};