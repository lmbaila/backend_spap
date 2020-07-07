exports.up = function(knex) {
  return knex.schema.createTable('group_functionality', function(table){
    table.increments('id_group_functionality').primary();
    table.integer('id_group').notNullable();
    table.integer('id_functionality').notNullable();
    table.foreign('id_group').references('id_group').inTable('group').onDelete('SET NULL'); 
    table.foreign('id_functionality').references('id_functionality').inTable('functionality').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('group_functionality');
};
