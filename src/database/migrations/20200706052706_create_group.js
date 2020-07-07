exports.up = function(knex) {
  return knex.schema.createTable('group', function(table){
    table.increments('id_group').primary();
    table.string('name').unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('group');
};
