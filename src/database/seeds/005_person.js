
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {
      // Inserts seed entries
      return knex('person').insert([
        { id_person: 1, name: 'Joao Fulano', surname: 'da Silva', born_at: '2000-01-01',nr_document: '110100150251B', gender: 'M'},
        { id_person: 2, name: 'Jessica Fulano', surname: 'da Costa', born_at: '2000-01-01',nr_document: '110100150250C', gender: 'F'}
      ]);
    });
};
