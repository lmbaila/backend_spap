exports.up = function(knex) {
  return knex.schema.createTable('invoice', function(table){
    table.increments('id_invoice')
    table.string('id_employee').notNullable();
    table.datetime('current_datemonth');
    table.datetime('reading_date');
    table.datetime('date_invoice');
    table.datetime('limit_payment');
    table.foreign('id_employee').references('id_employee').inTable('employee').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('invoice');
};
