exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { email_address: 'fakemail@gmail.com', firstname: 'Peter', lastname:'Petersen', password:'12345', company:'Deutsche Bahn', phonenumber:'+491737782498', street:'Fakestreet', streetnumber:'123', city:'Berlin', zip:'10000', country:'Germany', favorite_advertisements:"Food", website:"www.fake.de" },
        { email_address: 'Einszweidrei@vier.de', firstname: 'Graf', lastname:'Zahl', password:'4711', company:'Television', phonenumber:'011111', street:'Sesame Street', streetnumber:'666', city:'Fantasy', zip:'99999', country:'Andora', favorite_advertisements:"Cookies", website:"www.hungry.com" },
        { email_address: 'test@test.com', firstname: 'Tester', lastname:'Testorius', password:'test123', company:'testhard', phonenumber:'+49171402154',street:'Testerstraße', streetnumber:'22', city:'Hamburg', zip:'22117', country:'Deutschland', favorite_advertisements:"", website:"www.test.de" }
      ]);
    });
};