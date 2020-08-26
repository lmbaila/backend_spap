
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('custumer').del()
    .then(function () {
      // Inserts seed entries
      return knex('custumer').insert([
        {id_custumer: 'CUS2020', id_person: 3, nacionality: 'mocambicana'}
      ]);
    });
};
