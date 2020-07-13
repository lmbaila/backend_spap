
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id_user: 'USR012020',id_group_users: 1,id_person: 2, user_name: 'administrador',password: '12345@2020', state: 'enable'}
      ]);
    });
};
