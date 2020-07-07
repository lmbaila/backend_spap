exports.up = function(knex) {
  return knex.schema.createTable('custumer', function(table){
    table.string('id_custumer',12).primary();
    table.integer('id_person').notNullable();
    table.string('nacionality');
    table.foreign('id_person').references('id_person').inTable('person').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('custumer');
};
