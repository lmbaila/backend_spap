
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('functionality').del()
    .then(function () {
      // Inserts seed entries
      return knex('functionality').insert([
        {description: 'Administrador{Faz tudo}'},
        {description: 'Gestor{Excepto cliente}'},
        { description: 'Leitor{Leitura}'}
      ]);
    });
};
