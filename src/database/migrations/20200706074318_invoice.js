exports.up = function(knex) {
  return knex.schema.createTable('invoice', function(table){
    table.increments('id_invoice')
    table.string('id_employee').notNullable();
    table.string('id_reading',12).notNullable();
    table.double('value_pay').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());   
    table.foreign('id_employee').references('id_employee').inTable('employee').onDelete('SET NULL');
    table.foreign('id_reading').references('id_reading').inTable('reading').onDelete('SET NULL');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('invoice');
};
