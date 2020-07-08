
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('group_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('group_users').insert([
        {id_group_users: 1, name: 'Administrador'},
        {id_group_users: 2, name: 'Gestor'},
        {id_group_users: 3, name: 'Caixa'},
        {id_group_users: 4, name: 'Leitor'},
      ]);
    });
};
