exports.up = function(knex) {
  return knex.schema.createTable('monthly_management', function(table){
    table.increments('id_monthly_management')
    table.string('id_employee').notNullable();
    table.string('reading_date',10);
    table.date('date_invoice');
    table.date('limit_payment');
    table.enum('state',['opened', 'closed', 'removed']).defaultTo('opened');
    table.foreign('id_employee').references('id_employee').inTable('employee').onDelete('SET NULL'); 
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());   
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('monthly_management');
};
