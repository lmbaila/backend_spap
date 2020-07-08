exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('province').del()
    .then(function () {
      // Inserts seed entries
      return knex('province').insert([
       {province_code: 'MZ-MPM', province_name: 'Maputo Cidade'},
       {province_code: 'MZ-PMB', province_name: 'Cabo Delgado'},
       {province_code: 'MZ-XAI', province_name: 'Gaza'},
       {province_code: 'MZ-INH', province_name: 'Inhambane'},
       {province_code: 'MZ-CHM', province_name: 'Manica'},
       {province_code: 'MZ-MTL', province_name: 'Maputo Provincia'},
       {province_code: 'MZ-NPL', province_name: 'Nampula'},
       {province_code: 'MZ-LCG', province_name: 'Niassa'},
       {province_code: 'MZ-BRA', province_name: 'Sofala'},
       {province_code: 'MZ-TET', province_name: 'Tete'},
       {province_code: 'MZ-QLM', province_name: 'Zambézia'},
      ]);
    });
};