exports.up = function(knex) {
  return knex.schema.createTable('fee_payment', function(table){
    table.string('id_fee',12).primary();
    table.string('id_company').notNullable();
    table.string('description');
    table.integer('initial_consumption').notNullable();
    table.integer('final_consumption').notNullable();
    table.double('price').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
    table.foreign('id_company').references('id_company').inTable('company').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('payment');
};
