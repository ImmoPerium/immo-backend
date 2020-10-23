const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  findBy,
  findByEmail,
  add,
  update,
  remove,
};

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where('id', id)
    .first()
    .then(user => (user ? user : null));
}

function findByEmail(user_email) {
  return db('users')
    .where('email_address', user_email)
    .first()
    .then(user => (user ? user : null));
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first()
    .then(user => (user ? user : null));
}

/* function complex(userId) {
  return db('complex as t')
    .join('users as u', 'u.id', 't.user_id')
    .select('t.id', 'u.email as user_email')
    .where('t.user_id', userId);
} */

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}