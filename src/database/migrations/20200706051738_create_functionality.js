
exports.up = function(knex) {
  return knex.schema.createTable('functionality', function(table){
    table.increments('id_functionality').primary();
    table.string('description').unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('functionality');
};
