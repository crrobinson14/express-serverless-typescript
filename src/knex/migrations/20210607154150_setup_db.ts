import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id', 36).notNullable().primary();
    table.string('email', 50).notNullable();
    table.string('passwordHash', 191).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());

    table.unique(['email'], 'uniqueEmail');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
