exports.up = function(knex) {
  return knex.schema.createTable('comments', function(table) {
    table.increments('id').primary();
    table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE');
    table.text('content').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
