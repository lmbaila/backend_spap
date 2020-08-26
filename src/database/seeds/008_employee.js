
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employee').del()
    .then(function () {
      // Inserts seed entries
      return knex('employee').insert([
        {id_employee: 'EMP0012020',id_user: 'USR012020',id_company: '50b66fa4a'}
      ]);
    });
};
