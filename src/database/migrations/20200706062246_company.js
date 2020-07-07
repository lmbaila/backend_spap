exports.up = function(knex) {
  return knex.schema.createTable('company', function(table){
    table.string('id_company',12).primary();
    table.integer('id_person').notNullable();
    table.string('full_name').notNullable();
    table.string('license',50);
    table.integer('nuit');
    table.string('obs')
    table.datetime('contrat_time');
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());   
    table.foreign('id_person').references('id_person').inTable('person').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('company');
};
