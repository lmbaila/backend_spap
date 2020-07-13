exports.up = function(knex) {
  return knex.schema.createTable('company', function(table){
    table.string('id_company',12).primary();
    table.integer('id_person').notNullable();
    table.string('full_name').notNullable();
    table.string('license');
    table.integer('nuit');
    table.string('contact_number1').notNullable();
    table.string('contact_number2');
    table.string('email');
    table.string('obs');
    table.string('address_description');
    table.decimal('iva',3,2).defaultTo(0); //%
    table.decimal('fine').defaultTo(0);//taxa de multa
    table.string('logo_company');
    table.string('slogan');
    table.datetime('contrat_expire');
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());   
    table.foreign('id_person').references('id_person').inTable('person').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('company');
};
