exports.up = function(knex) {
  return knex.schema.createTable('payment_invoice', function(table){
    table.increments('id_payment_invoice')
    table.string('id_employee').notNullable();
    table.integer('id_invoice').notNullable();
    table.datetime('date_payment');
    table.enum('kind_payment',['cash','m-pesa','bank']).defaultTo('cash');
    table.string('file_path_proof');
    table.double('amount_pay').notNullable();// se nao pagar o valor todo deve -se acrescentar no saldo do cliente
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.foreign('id_employee').references('id_employee').inTable('employee').onDelete('SET NULL');
    table.foreign('id_invoice').references('id_invoice').inTable('invoice').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('payment_invoice');
};
