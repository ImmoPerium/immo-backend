exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('real_estate_advertisements')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('real_estate_advertisements').insert([
        {user_id: 1, street:'Langestraße', streetnumber:'14', country:'Deutschland',city:'Hamburg', zip:'21111', level: 1, lot_area: 150.20, house_area: 52.50,rental_price_basic: 800, rental_price_total: 1100, rental_deposit: 2400, purchase_price: 130000, building_type:'Haus', overall_condition:'gut',furnishing_condition:'neu', construction_date: knex.fn.now(), renovation_date: knex.fn.now(), number_of_floors: 2, rooms: 6, bedrooms: 2, livingrooms: 1, bathrooms: 2, basement: true, basement_area: 30, pets_allowed: true, barrier_free: true, heating: 'Zentralheizung', pool: false, offstreet_parking: true, vacancy: knex.fn.now(), object_number:'Test_0001', advertisement_purpose:'Aus Lust', advertisement_title:'kaufen kaufen kaufen',advertisement_description:'kaufen kaufen immer nur kaufen', furnishing_description:'top in schuss', location_description:'beste lage (VDP)',other_description:'beste Nachbarn', is_public: true, is_location_public: false}
      ]);
    });
};