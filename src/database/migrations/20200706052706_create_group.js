exports.up = function(knex) {
  return knex.schema.createTable('group_users', function(table){
    table.increments('id_group_users').primary();
    table.string('name').unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('group_users');
};
