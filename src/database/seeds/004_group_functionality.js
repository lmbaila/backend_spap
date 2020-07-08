
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('group_functionality').del()
    .then(function () {
      // Inserts seed entries
      return knex('group_functionality').insert([
        {id_group_users:1, id_functionality: 1},
        
      ]);
    });
};
