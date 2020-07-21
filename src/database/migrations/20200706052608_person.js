exports.up = function(knex) {
  return knex.schema.createTable('person', function(table){
    table.increments('id_person').primary();
    table.string('name', 75).notNullable();
    table.string('surname', 50).notNullable();
    table.date('born_at').notNullable();
    table.string('nr_document', 13).unique();
    table.enum('gender',['M','F']);
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());   
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('person');
};
