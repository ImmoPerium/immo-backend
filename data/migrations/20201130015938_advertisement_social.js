exports.up = function (knex) {
  return knex.schema.table(
    "real_estate_advertisements",
    function (real_estate_advertisements) {
      real_estate_advertisements.integer("view_count").defaultTo(0);
      real_estate_advertisements.integer("favorite_count").defaultTo(0);
      real_estate_advertisements.date("created_at").defaultTo(knex.fn.now());
    }
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("real_estate_advertisements");
};
