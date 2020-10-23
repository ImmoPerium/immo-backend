const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  findByObjectId,
  findBy,
  findByEmail,
  add,
  update,
  remove,
};

function find() {
  return db('real_estate_advertisements');
}

function findById(id) {
  return db('real_estate_advertisements')
    .where('id', id)
    .first()
    .then(real_estate_advertisements => (real_estate_advertisements ? real_estate_advertisements : null));
}

function findByObjectNumber(object_number) {
  return db('real_estate_advertisements')
    .where('object_number', object_number)
    .first()
    .then(real_estate_advertisements => (real_estate_advertisements ? real_estate_advertisements : null));
}

function findBy(filter) {
  return db('real_estate_advertisements')
    .where(filter)
    .first()
    .then(real_estate_advertisements => (real_estate_advertisements ? real_estate_advertisements : null));
}

function add(real_estate_advertisements) {
  return db('real_estate_advertisements')
    .insert(real_estate_advertisements, 'id')
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return db('real_estate_advertisements')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('real_estate_advertisements')
    .where('id', id)
    .del();
}