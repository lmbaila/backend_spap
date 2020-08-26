
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('fee_payment').del()
    .then(function () {
      // Inserts seed entries
      return knex('fee_payment').insert([
        {id_fee: 'FEE202007',id_company: '50b66fa4a', description: 'Cliente Sem Contandor', initial_consumption: 0, final_consumption: 0, price: 500},
        {id_fee: 'FEE202008',id_company: '50b66fa4a', description: 'Taxa domestica', initial_consumption: 0, final_consumption: 7, price: 500}
      ]);
    });
};
