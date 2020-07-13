
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('company').del()
    .then(function () {
      // Inserts seed entries
      return knex('company').insert([
        {
          id_company: '50b66fa4a',id_person: 1,full_name: 'AGUA CORP', license: 'AAA0001',
          nuit: 1000001,contact_number1: '821234567', contact_number2: '841234567', email: 'aguacorp@email.com',
          obs: '',address_description: 'Maputo, Hulene A',iva: 0.17,fine: 0.23,logo_company: '',
          slogan: '',contrat_expire: '2021-01-01' 
        }
      ]);
    });
};
